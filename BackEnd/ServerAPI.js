import { Application } from 'https://deno.land/x/abc@v1.3.1/mod.ts';
import { cors } from 'https://deno.land/x/abc@v1.3.1/middleware/cors.ts';
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
//ENVIROMENT VARIABLES
import { Client } from "https://deno.land/x/postgres@v0.11.3/mod.ts";
import { config } from 'https://deno.land/x/dotenv/mod.ts';
const DENO_ENV = Deno.env.get('DENO_ENV') ?? 'development';
config({ path: `./.env.${DENO_ENV}`, export: true });
console.log(`Deno Enviroment: ${DENO_ENV}`);
const client = new Client(Deno.env.get("PG_URL"));
await client.connect();
const PORT = Number(Deno.env.get("PORT"));

const app = new Application();
const headersWhitelist = [
  "Authorization",
  "Content-Type",
  "Accept",
  "Origin",
  "User-Agent",
];
app.use(cors({ allowOrigins: [Deno.env.get("ALLOWED_ORIGINS")], allowHeaders: headersWhitelist, allowCredentials: true }));

async function getCurrentUser(sessionIdArg)
{
  const sessionId = sessionIdArg;
  const userId = (await client.queryObject("SELECT user_id FROM sessions WHERE uuid = $1", sessionId)).rows;
  if(userId[0])
  {
    const userIdFinal = userId[0].user_id;
    return (await client.queryObject("SELECT * FROM users WHERE id = $1", userIdFinal)).rows;
  }
  else
  {
    return false;
  }
}

app
.get('/checkWhoIsSignedIn', async server => {
    const sessionId = server.cookies['sessionId'];
    const user = await getCurrentUser(sessionId);
    if(user){
      await server.json({ user });
    }else {
      await server.json(false);
    }
  })
  .post("/login", async server => {
    const { email, password } = await server.body;
    const user = (await client.queryObject("SELECT * FROM users WHERE email = $1", email)).rows;
    const retrieveSaltedHash = (await client.queryObject("SELECT encrypted_password FROM users WHERE email = $1", email)).rows;
    const existingSaltedHash = retrieveSaltedHash[0].encrypted_password;
    const authenticated = await bcrypt.compare(password, existingSaltedHash);
    if(authenticated)
    {
      const sessionId = v4.generate();
      const insert = (await client.queryObject("INSERT INTO sessions (uuid, user_id, created_at) VALUES ($1, $2, NOW())", sessionId, user[0].id)).rows;
      server.setCookie({
        name: "sessionId",
        value: sessionId,
        path: "/",
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000 ),
        sameSite: 'none',
        secure: true
      });
      await server.json({  code: 200 });
    }
    else
    {
      await server.json({  code: 500  });
    }
  })
  .post("/createAccount", async server => {
    const new_user = await server.body
    console.log(new_user)
    let encrypted_password = ''
    let salt = ''
    if(new_user.password1 === new_user.password2){
      const salt = await bcrypt.genSalt(8);
      console.log('encrypting with salt: '+await salt)
      encrypted_password = await bcrypt.hash(new_user.password1, await salt)
      console.log('encrypted pw: '+encrypted_password)
    }else{
      server.json({  code: 500,  error: 'Passwords do not match'  })
    }
    console.log('encrypted pw: '+encrypted_password)
    const insert_user = (await client.queryObject("INSERT INTO users (first_name, last_name, email, salted_password, star_rating, date_of_birth, phone_number, address1, address2, city, postcode, created_at, updated_at, salt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW(), $12)", new_user.first_name, new_user.last_name, new_user.email, encrypted_password, 0, new_user.DoB, new_user.phone_number, new_user.address_1, new_user.address_2, new_user.city, new_user.postcode, salt).rows)
    const sessionId = v4.generate();
    const user = (await client.queryObject("SELECT * FROM users WHERE email = $1", new_user.email)).rows;
    const insert_session = (await client.queryObject("INSERT INTO sessions (uuid, user_id, created_at) VALUES ($1, $2, NOW())", sessionId, user[0].id)).rows;
    server.setCookie({
      name: "sessionId",
      value: sessionId,
      path: "/",
      expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000 ),
      sameSite: 'none',
      secure: true
    });
    await server.json({  code: 200  })
  })
  .start({ port: PORT })
console.log(`Server running on http://localhost:${PORT}`);
