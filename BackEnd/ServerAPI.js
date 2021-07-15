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


async function getCurrentUser(sessionIdArg) {
  const sessionId = sessionIdArg;
  const userId = (await client.queryObject("SELECT user_id FROM sessions WHERE uuid = $1", sessionId)).rows;
  if (userId[0]) {
    const userIdFinal = userId[0].user_id;
    const user = (await client.queryObject("SELECT * FROM users WHERE id = $1", userIdFinal)).rows;
    return await user[0]
  }
  else {
    return false;
  }
}

app
  .get('/checkWhoIsSignedIn', async server => {
    const sessionId = server.cookies['sessionId'];
    const user = await getCurrentUser(sessionId);
    if (user) {
      await server.json(user);
    } else {
      await server.json(false);
    }
  })
  .get('/checkUserLocation', async server => {
    /*
    const { user } = await server.body;
    const userLocation = (await client.queryObject("SELECT city_id FROM users WHERE ", email)).rows;
    await server.json(userLocation);
    */
  })
  .post("/login", async server => {
    const { email, password } = await server.body;
    const user = (await client.queryObject("SELECT * FROM users WHERE email = $1", email)).rows;
    const retrieveSaltedHash = (await client.queryObject("SELECT salted_password FROM users WHERE email = $1", email)).rows;
    const existingSaltedHash = retrieveSaltedHash[0].salted_password;
    const authenticated = await bcrypt.compare(password, existingSaltedHash);
    if (authenticated) {
      const sessionId = v4.generate();
      const insert = (await client.queryObject("INSERT INTO sessions (uuid, user_id, created_at) VALUES ($1, $2, NOW())", sessionId, user[0].id)).rows;
      server.setCookie({
        name: "sessionId",
        value: sessionId,
        path: "/",
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        sameSite: 'none',
        secure: true
      });
      await server.json({ code: 200 });
    }
    else {
      await server.json({ code: 500 });
    }
  })
  .post("/createAccount", async server => {
    const new_user = await server.body
    console.log(new_user);
    let encrypted_password = ''
    let salt = ''
    if (new_user.password1 === new_user.password2) {
      const salt = await bcrypt.genSalt(8);
      encrypted_password = await bcrypt.hash(new_user.password1, await salt)
    } else {
      server.json({ code: 500, error: 'Passwords do not match' })
    }
    const insert_user = (await client.queryObject("INSERT INTO users (first_name, last_name, img_url, email, salted_password, star_rating, date_of_birth, phone_number, address1, address2, city_id, postcode, created_at, updated_at, salt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW(), $13)", new_user.first_name, new_user.last_name, new_user.img_url, new_user.email, encrypted_password, 0, new_user.DoB, new_user.phone_number, new_user.address_1, new_user.address_2, new_user.city, new_user.postcode, salt).rows)
    const sessionId = v4.generate();
    const user = (await client.queryObject("SELECT * FROM users WHERE email = $1", new_user.email)).rows;
    const insert_session = (await client.queryObject("INSERT INTO sessions (uuid, user_id, created_at) VALUES ($1, $2, NOW())", sessionId, user[0].id)).rows;
    server.setCookie({
      name: "sessionId",
      value: sessionId,
      path: "/",
      expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      sameSite: 'none',
      secure: true
    });
    await server.json({ code: 200})
  })
  .post("/isValidNewEmail", async server => {
    const { email } = await server.body
    const check = (await client.queryObject("SELECT * FROM users WHERE email = $1", await email)).rows;

    if (check[0]) {
      server.json(false)
    } else {
      server.json(true)
    }
  })
  .get('/items', async (server) => {

    const items = (await client.queryObject(`
        SELECT id, name, price, img_url FROM items WHERE is_available = TRUE
      `)).rows

    return (await items)
  })
  .get('/categories', async (server) => {

    const categories = (await client.queryObject(`
        SELECT id, name, description, imgURL FROM categories
      `)).rows

    await server.json(categories)
  })
  .get('/itemListLocationData', async (server) => {

    const itemListLocationData = (await client.queryObject(`
        SELECT id, name AS item_name, description, is_available, category_id, owner_id, age_restriction, img_url, city_id FROM items JOIN location ON items.city_id = location.id
      `)).rows

    await server.json(itemListLocationData)
  })
  .post('/currentLocationData', async (server) => {

    const { currentLocationId } = await server.body;
    console.log(currentLocationId);
    const currentLocationData = (await client.queryObject(`SELECT * FROM location WHERE id = $1`, currentLocationId)).rows

    await server.json(currentLocationData)
  })
  .get('/cities', async (server) => {

    const cities = (await client.queryObject(`
        SELECT id, name FROM location
      `)).rows

    await server.json(cities);
  })
  .get('/teamMembers', async (server) => {

    const teamMembers = (await client.queryObject(`
        SELECT id, name, description, email, number, cv_img, linkedin_link FROM team_members
      `)).rows;

    console.log(teamMembers);

    await server.json(teamMembers);
  })
  .post('/getCity', async (server) => {
    const { cityId } = await server.body;
    //console.log('CityId: '+cityId);
    const city = (await client.queryObject(`SELECT id, name FROM location WHERE id = $1`, await cityId)).rows;
    //console.log(await JSON.stringify(city));
    await server.json(city);
  })
  .post("/logout", async server => {
    console.log("Logging out...")
    server.setCookie({
      name: "sessionId",
      value: "",
      path: "/",
      expires: new Date(0),
      sameSite: 'none',
      secure: true
    });

    await server.json(true);
  })

  .post("/postItem", async server => {
    const { name, description, price, category, age_restriction, ownerID, img_url, cityId } = await server.body

    const insertItem = (await client.queryObject("INSERT INTO items(name, description, price, category_id, age_restriction, owner_id, img_url, city_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", name, description, price, category, age_restriction, ownerID, img_url, cityId).rows)
    //console.log(insertItem, "insertItem")
    // Returns items table with new values:
    const result = (await client.queryObject(`SELECT * FROM items WHERE owner_id = $1`, ownerID)).rows
    console.log("DATABASE SEARCH: ")
    console.log(result)
    console.log(price.toString(), "price")

    // Returns boolean to check if submitted item is successful:
    const submitted = result.some(item =>
      item.name === name &&
      item.description === description &&
      item.price === price.toString() &&
      item.category_id === category &&
      item.age_restriction === age_restriction &&
      item.owner_id === ownerID &&
      item.img_url === img_url
    )
    // console.log("SUBMITTED: ")
    // console.log(submitted)
    // console.log("FROM FRONTEND: ")
    // console.log(name, description, category, age_restriction, ownerID)
    // console.log("Data-type: ")
    // console.log(typeof category)

    //SELECT name, description, category_id, age_restriction, owner_id FROM items;

    await server.json({ submitted })
  })


  .get('/item/:id', async (server) => {
    const { id } = server.params

    const sessionId = server.cookies['sessionId']
    const user = await getCurrentUser(sessionId)

    const itemInArray = (await client.queryObject(`
    SELECT items.id, items.name, items.description, items.price, items.is_available, items.category_id, items.owner_id, items.age_restriction, items.img_url,
      users.first_name, users.last_name, users.star_rating
    FROM items JOIN users ON items.owner_id = users.id
    WHERE items.id = $1`,
      id)).rows
    console.log(itemInArray, "itemInArray")

    itemInArray[0].price = parseFloat(itemInArray[0].price).toFixed(2)
    // console.log(itemInArray[0])
    // console.log(typeof itemInArray[0].price)
    // Check if this is the logged in user's own item
    const usersOwnItem = (user && (user.id === itemInArray[0].owner_id)) ? true : false

    await server.json({ itemInArray, usersOwnItem })
  })

  .post('/rentItem', async (server) => {
    const { itemId, rentFrom, rentUntil } = await server.body
    let errorMessage = ''

    if (!rentFrom || !rentUntil) {
      errorMessage = 'Please enter a valid rent from and rent until date'
      await server.json({ errorMessage })
      return
    }

    if (rentFrom > rentUntil) {
      errorMessage = 'You cannot time travel (please set the return date to be later than the rental date)'
      await server.json({ errorMessage })
      return
    }

    const sessionId = server.cookies['sessionId']
    const borrower = await getCurrentUser(sessionId)

    const [clashes] = (await client.queryObject(`
    SELECT SUM(CASE (DATE($1) - 1, DATE($2) + 1) OVERLAPS (rented_from, rented_until) WHEN TRUE THEN 1 ELSE 0 END)::integer AS num_of_clashes
    FROM rentals
    WHERE item_id = $3`,
      rentFrom, rentUntil, itemId)).rows

    const [item] = (await client.queryObject(`SELECT owner_id FROM items WHERE id = $1`, itemId)).rows

    if (!borrower) {
      errorMessage = 'You need to be logged in to rent an item'
      await server.json({ errorMessage })
    } else if (clashes.num_of_clashes) {
      errorMessage = 'This item is not available for some part of the requested time period'
      await server.json({ errorMessage })
    } else if (borrower.id === item.owner_id) {
      errorMessage = 'You cannot rent your own item'
      await server.json({ errorMessage })
    } else {
      await client.queryObject(`
        INSERT INTO rentals (item_id, borrower_id, rented_from, rented_until)
        VALUES ($1, $2, $3, $4)`,
        itemId, borrower.id, rentFrom, rentUntil).rows
      await server.json({ errorMessage })
    }
  })

  .put('/editItemName', async (server) => {
    const { itemId, ownerId, changedValue } = await server.body

    const sessionId = server.cookies['sessionId']
    const user = await getCurrentUser(sessionId)

    // If the item is the logged in user's, update it
    if (user.id === ownerId) await (client.queryObject(`UPDATE items SET name = $1 WHERE id = $2`, changedValue, itemId)).rows
  })

  .put('/editItemDescription', async (server) => {
    const { itemId, ownerId, changedValue } = await server.body

    const sessionId = server.cookies['sessionId']
    const user = await getCurrentUser(sessionId)

    // If the item is the logged in user's, update it
    if (user.id === ownerId) await (client.queryObject(`UPDATE items SET description = $1 WHERE id = $2`, changedValue, itemId)).rows
  })

  .put('/changeItemAvailability', async (server) => {
    const { itemId, ownerId, isAvailable } = await server.body

    const sessionId = server.cookies['sessionId']
    const user = await getCurrentUser(sessionId)

    // If the item is the logged in user's, update it
    if (user.id === ownerId) await (client.queryObject(`UPDATE items SET is_available = $1 WHERE id = $2`, isAvailable, itemId)).rows
  })

  .post("getUserReviews", async server => {
    const body = await server.body
    //console.log(await server.body)
    const user = await body.user
    console.log(await user)


    const reviews = (await client.queryObject(`
          SELECT * FROM user_reviews WHERE reviewee_id = $1
        `, await user.id)).rows
    const formattedReviews = await formattedUserReviews(await reviews)
    return (await formattedReviews)



    //CHECK DB FOR REVIEWS HERE
    //Return in format: [{review1}, {review2}, {review3}]
    //TODO replace temporary reviews
    //Review structure: { user: {user object}, reviewContent: some_review_text, howLongAgo: formatted_string_of_how_long_ago, rating: star_rating_x/5 }
    if (await user) {
      return ([{ user: await user, content: 'Always returns items quickly!', howLongAgo: '3 weeks ago', rating: 5 }, { user: user, content: "DONT RENT TO HER, SHE WON'T GIVE YOUR ITEM BACK!!!!", howLongAgo: 'yesterday', rating: 1 }])
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
    for await (const review of await reviews) {
      total += review.star_rating;
      count++;
    }
    const avg = (total / count).toFixed(2)
    if (!isNaN(avg)) {
      server.json({ rating: avg })
    }
  })
  .post('/visitAnotherProfile', async server => {
    const { user_id } = await server.body
    //console.log(await user)
    console.log(user_id)
    const queryResponse = ( await client.queryObject(`
          SELECT id, first_name, last_name, email, created_at, img_url FROM users WHERE id = ${user_id}`)
          ).rows
          console.log(await queryResponse[0])
    const user = await queryResponse[0]
    return (user)
  })
  .post('searchByCategory', async server => {
    const body = await server.body;
    let { category_id, searchCriteria } = await body;
    if(searchCriteria.length === 0) {
      searchCriteria = false;
    }
    console.log(category_id)
    let items = []
    if(searchCriteria){
      if (searchCriteria.length < 3 && searchCriteria.length > 0) {
        items = (await client.queryObject(`
                  SELECT *, levenshtein($1, name) , location.name AS city_Name, location.latitude, location.longitude FROM items INNER JOIN location ON items.city_id = location.id WHERE (levenshtein($1, name) < 3 OR name ILIKE '%${searchCriteria}%' OR name ILIKE '${searchCriteria}%') AND is_available = TRUE AND category_id = $2;
                `, await searchCriteria, await category_id)).rows;
        console.log(await items)
      } else if (searchCriteria.length < 6 && searchCriteria.length > 2) {
        items = (await client.queryObject(`
                  SELECT *, levenshtein($1, name) , location.name AS city_Name, location.latitude, location.longitude FROM items INNER JOIN location ON items.city_id = location.id WHERE  levenshtein($1, name) < 3 OR  name ILIKE '%${searchCriteria}%' AND is_available = TRUE AND category_id = $2;
                `, await searchCriteria, await category_id)).rows;
      } else if (searchCriteria.length < 7 && searchCriteria.length > 5) {
        items = (await client.queryObject(`
                  SELECT *, levenshtein($1, name) , location.name AS city_Name, location.latitude, location.longitude FROM items INNER JOIN location ON items.city_id = location.id WHERE levenshtein($1, name) < 4 OR name ILIKE '%${searchCriteria}%' AND is_available = TRUE AND category_id = $2;
                `, await searchCriteria, await category_id)).rows;
      } else if (searchCriteria.length < 10 && searchCriteria.length > 6) {
        items = (await client.queryObject(`
                  SELECT *, levenshtein($1, name) , location.name AS city_Name, location.latitude, location.longitude FROM items INNER JOIN location ON items.city_id = location.id WHERE levenshtein($1, name) < 5 OR name ILIKE '%${searchCriteria}%' AND is_available = TRUE AND category_id = $2;
                `, await searchCriteria, await category_id)).rows;
      } else if (searchCriteria.length > 10) {
        items = (await client.queryObject(`
                  SELECT *, levenshtein($1, name), location.name AS city_Name, location.latitude, location.longitude FROM items INNER JOIN location ON items.city_id = location.id WHERE levenshtein($1, name) < 6  OR name ILIKE '%${searchCriteria}%' AND is_available = TRUE AND category_id = $2;
                `, await searchCriteria, await category_id)).rows;
      }
    }else{
        items = (await client.queryObject(`
            SELECT *, location.name AS city_Name, location.latitude, location.longitude FROM items INNER JOIN location ON items.city_id = location.id WHERE category_id = $1 AND is_available = TRUE
          `, await category_id)).rows;
          console.log('ERROR CAUGHT')
      }
    if(items[0]){
      items = await items.map(e => ({ ...e, price: parseFloat(e.price).toFixed(2) })); // Converts price
    }
    //console.log(await items, "items - searchByCategory")
    return await items
  })
  .post('searchByFilter', async server => {
    const { searchCriteria } = await server.body;
    console.log('string to search: ' + await searchCriteria)
      //SEARCH BY JUST ITEM
      let items = [];

      if (searchCriteria.length < 3 && searchCriteria.length > 0) {
        items = (await client.queryObject(`
        SELECT items.id, items.name AS item_name, items.description, items.is_available, items.category_id, items.owner_id, items.age_restriction, items.img_url, items.city_id, location.name AS city_Name, location.latitude, location.longitude, levenshtein($1, items.name) FROM items INNER JOIN location ON items.city_id = location.id WHERE  levenshtein($1, items.name) < 3 OR items.name ILIKE '%${searchCriteria.item}%' OR items.name ILIKE '${searchCriteria.item}%';
                `, await searchCriteria)).rows;
        console.log(await items)
      } else if (searchCriteria.length < 6 && searchCriteria.length > 2) {
        items = (await client.queryObject(`
        SELECT items.id, items.name AS item_name, items.description, items.is_available, items.category_id, items.owner_id, items.age_restriction, items.img_url, items.city_id, location.name AS city_Name, location.latitude, location.longitude, levenshtein($1, items.name) FROM items INNER JOIN location ON items.city_id = location.id WHERE  levenshtein($1, items.name) < 3 OR  items.name ILIKE '${searchCriteria.item}%';
                `, await searchCriteria)).rows;
      } else if (searchCriteria.length < 7 && searchCriteria.length > 5) {
        items = (await client.queryObject(`
        SELECT items.id, items.name AS item_name, items.description, items.is_available, items.category_id, items.owner_id, items.age_restriction, items.img_url, items.city_id, location.name AS city_Name, location.latitude, location.longitude, levenshtein($1, items.name) FROM items INNER JOIN location ON items.city_id = location.id WHERE levenshtein($1, items.name) < 4 OR items.name ILIKE '${searchCriteria.item}%';
                `, await searchCriteria)).rows;
      } else if (searchCriteria.length < 10 && searchCriteria.length > 6) {
        items = (await client.queryObject(`
        SELECT items.id, items.name AS item_name, items.description, items.is_available, items.category_id, items.owner_id, items.age_restriction, items.img_url, items.city_id, location.name AS city_Name, location.latitude, location.longitude, levenshtein($1, items.name) FROM items INNER JOIN location ON items.city_id = location.id WHERE levenshtein($1, items.name) < 5 OR items.name ILIKE '${searchCriteria.item}%';
                `, await searchCriteria)).rows;
      } else if (searchCriteria.length > 10) {
        items = (await client.queryObject(`
        SELECT items.id, items.name AS item_name, items.description, items.is_available, items.category_id, items.owner_id, items.age_restriction, items.img_url, items.city_id, location.name AS city_Name, location.latitude, location.longitude, levenshtein($1, items.name) FROM items INNER JOIN location ON items.city_id = location.id WHERE levenshtein($1, items.name) < 6  OR items.name ILIKE '${searchCriteria.item}%';
                `, await searchCriteria)).rows;
      }

      console.log(items)
      //  try {
      return (items);
      //  } catch {
      return [];
      //  }

  })

  .get('/myrentals', async (server) => {
    const sessionId = server.cookies['sessionId'];
    const user = await getCurrentUser(sessionId);
    //console.log(user)

    if (!user) {
      return;
    } else {
      let rentals = (await client.queryObject(`
    SELECT rentals.id, rentals.item_id, rentals.borrower_id, rentals.rented_from, rentals.rented_until,
    items.name, items.owner_id, items.img_url, items.price,
    users_borrowing.first_name AS borrowers_first_name, users_borrowing.last_name AS borrowers_last_name,
    users_lending.first_name AS lenders_first_name, users_lending.last_name AS lenders_last_name
    FROM rentals
    JOIN items ON rentals.item_id = items.id
    JOIN users AS users_borrowing ON rentals.borrower_id = users_borrowing.id
    JOIN users AS users_lending ON items.owner_id = users_lending.id
    WHERE items.owner_id  = $1
    OR rentals.borrower_id = $1`,
        user.id)).rows


      rentals = rentals.map(e => ({ ...e, price: parseFloat(e.price).toFixed(2) })); // Converts price


      let lending = rentals.filter(e => e.owner_id === user.id)

      lending = lending.map(e => {
        delete e.lenders_first_name
        delete e.lenders_last_name
        e.trader_first_name = e.borrowers_first_name
        e.trader_last_name = e.borrowers_last_name
        delete e.borrowers_first_name
        delete e.borrowers_last_name
        return e
      })


      let borrowing = rentals.filter(e => e.borrower_id === user.id)
      borrowing = borrowing.map(e => {
        delete e.borrowers_first_name
        delete e.borrowers_last_name
        e.trader_first_name = e.lenders_first_name
        e.trader_last_name = e.lenders_last_name
        delete e.lenders_first_name
        delete e.lenders_last_name
        return e
      })



      // console.log(lending, "lending")
      // console.log(borrowing, "borrowing")


      await server.json({ lending, borrowing })
    }
  })


  .post('/getID', async (server) => {
    const email = await server.body;


  const id = (await client.queryObject(`SELECT id FROM users WHERE email = $1`, email)).rows

    // await server.json({ id})
    return id[0];


   })

  .start({ port: PORT })
console.log(`Server running on http://localhost:${PORT}`);


async function formattedUserReviews(reviewsRaw) {
  const newReviews = [];
  for await (const review of reviewsRaw) {
    const user = (await client.queryObject(`
          SELECT first_name, last_name FROM users WHERE id = $1
        `, review.reviewer_id)).rows
    const timeSinceReview = howLongAgoCalculator(review.created_at)
    const reviewObject = { first_name: await user[0].first_name, last_name: await user[0].last_name, title: review.review_title, content: review.review_content, howLongAgo: timeSinceReview, rating: review.star_rating }
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
  if (time.years > 0) {
    if (time.years === 1) {
      return `${time.years} year`
    } else {
      return `${time.years} years`
    }
  }
  if (time.months > 0) {
    if (time.months === 1) {
      return `${time.months} month`
    } else {
      return `${time.months} months`
    }
  }
  if (time.weeks > 0) {
    if (time.weeks === 1) {
      return `${time.weeks} week`
    } else {
      return `${time.weeks} weeks`
    }
  }
  if (time.days > 0) {
    if (time.days === 1) {
      return `${time.days} day`
    } else {
      return `${time.days} days`
    }
  }
  if (time.hours > 1) {
    if (time.hours === 1) {
      return `${time.hours} hour`
    } else {
      return `${time.hours} hours`
    }
  }
  if (time.minutes > 0) {
    if (time.minutes === 1) {
      return `${time.minutes} minute`
    } else {
      return `${time.minutes} minutes`
    }
  }
  if (time.seconds > -1) {
    if (time.seconds === 1) {
      return `${time.seconds} second`
    } else {
      return `${time.seconds} seconds`
    }
  }
}
