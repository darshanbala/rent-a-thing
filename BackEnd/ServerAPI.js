import { Application } from 'https://deno.land/x/abc@v1.3.1/mod.ts';
import { cors } from 'https://deno.land/x/abc@v1.3.1/middleware/cors.ts';
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { intervalToDuration } from 'https://deno.land/x/date_fns@v2.15.0/index.js';
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
    const user = (await client.queryObject("SELECT * FROM users WHERE id = $1", userIdFinal)).rows;
    return await user[0]
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
      await server.json( user );
    }else {
      await server.json(false);
    }
  })
  .post("/login", async server => {
    const { email, password } = await server.body;
    const user = (await client.queryObject("SELECT * FROM users WHERE email = $1", email)).rows;
    const retrieveSaltedHash = (await client.queryObject("SELECT salted_password FROM users WHERE email = $1", email)).rows;
    const existingSaltedHash = retrieveSaltedHash[0].salted_password;
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
    let encrypted_password = ''
    let salt = ''
    if(new_user.password1 === new_user.password2){
      const salt = await bcrypt.genSalt(8);
      encrypted_password = await bcrypt.hash(new_user.password1, await salt)
    }else{
      server.json({  code: 500,  error: 'Passwords do not match'  })
    }
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
  .post("/isValidNewEmail", async server => {
    const { email } = await server.body
    const check = (await client.queryObject("SELECT * FROM users WHERE email = $1", await email)).rows;

    if(check[0]){
      server.json( false )
    }else{
      server.json( true )
    }
  })

  .get('/items', async (server) => {

        const items = (await client.queryObject(`
        SELECT id, name, is_available FROM items
      `)).rows

        await server.json({ items })
    })

    .post("getUserReviews", async server => {
      const  body  = await server.body
      //console.log(await server.body)
      const user = await body.user
      //console.log(await user)


      const reviews = (await client.queryObject(`
          SELECT * FROM user_reviews WHERE reviewee_id = $1
        `, await user.id)).rows
        const formattedReviews = await formattedUserReviews(await reviews)
        return(await formattedReviews)



      //CHECK DB FOR REVIEWS HERE
      //Return in format: [{review1}, {review2}, {review3}]
      //TODO replace temporary reviews
      //Review structure: { user: {user object}, reviewContent: some_review_text, howLongAgo: formatted_string_of_how_long_ago, rating: star_rating_x/5 }
      if(await user){
        return([{user: await user, content: 'Always returns items quickly!', howLongAgo: '3 weeks ago', rating: 5}, {user: user, content: "DONT RENT TO HER, SHE WON'T GIVE YOUR ITEM BACK!!!!", howLongAgo: 'yesterday', rating: 1}])
      }
    })
    .post("postUserReview", async server => {   //TODO WRITE REAL POST REVIEW HANDLER
      const sessionId = server.cookies['sessionId'];
      const user = await getCurrentUser(sessionId);
      //console.log(JSON.stringify(user)+' is logged in')
      const body = await server.body
      //console.log(await body)
      //if(user.id !== await body.user.id) {
        const review = (await client.queryObject(`
          INSERT INTO user_reviews(reviewer_id, reviewee_id, review_title, review_content, star_rating, created_at) VALUES ($1, $2, $3, $4, $5, NOW())
          `, user.id, body.user.id, body.title, body.review, body.star_rating)).rows
    //  }
    })
    .post('getStarRating', async server => {
      const body = await server.body
      const user_id = body.id
      //console.log(await server.body)
      //console.log('user id: '+await user_id)
      const reviews = (await client.queryObject(`
          SELECT * FROM user_reviews WHERE reviewee_id = $1
        `, await user_id)).rows;
      let total = 0;
      let count = 0;
      for await (const review of await reviews){
        total += review.star_rating;
        count++;
      }
      const avg = (total/count).toFixed(2)
      if(!isNaN(avg)){
        server.json({rating: avg})
      }
    })

  .start({ port: PORT })
console.log(`Server running on http://localhost:${PORT}`);


  async function formattedUserReviews(reviewsRaw) {
    const newReviews = [];
    for await(const review of reviewsRaw){
      const user = (await client.queryObject(`
          SELECT first_name, last_name FROM users WHERE id = $1
        `, review.reviewer_id)).rows
      const timeSinceReview = howLongAgoCalculator(review.created_at)
      const reviewObject = {first_name: await user[0].first_name, last_name: await user[0].last_name, title: review.review_title, content: review.review_content, howLongAgo: timeSinceReview, rating: review.star_rating}
      newReviews.push(reviewObject)
    }
    return newReviews
  }

  function howLongAgoCalculator(when) {  //Takes a timestamp and returns a formatted string containing only one time unit

      const now = Date.now();
      //console.log(now)
      const made_at = new Date(when);

      const time = new intervalToDuration({   //gets duration between now and christmas
        start: made_at,
        end: now
      })

      //console.log(time)
      if(time.years>0){
        if(time.years===1){
          return `${time.years} year`
        }else{
          return `${time.years} years`
        }
      }
      if(time.months>0){
        if(time.months===1){
          return `${time.months} month`
        }else{
          return `${time.months} months`
        }
      }
      if(time.weeks>0 ){
        if(time.weeks===1){
          return `${time.weeks} week`
        }else{
          return `${time.weeks} weeks`
        }
      }
      if(time.days>0 ){
        if(time.days===1){
          return `${time.days} day`
        }else{
          return `${time.days} days`
        }
      }
      if(time.hours>1 ){
        if(time.hours===1){
          return `${time.hours} hour`
        }else{
          return `${time.hours} hours`
        }
      }
      if(time.minutes>0 ){
        if(time.minutes===1){
          return `${time.minutes} minute`
        }else{
          return `${time.minutes} minutes`
        }
      }
      if(time.seconds>-1 ){
        if(time.seconds===1){
          return `${time.seconds} second`
        }else{
          return `${time.seconds} seconds`
        }
      }
  }
