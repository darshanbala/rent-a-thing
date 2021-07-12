import { config } from 'https://deno.land/x/dotenv/mod.ts'
import { Client } from "https://deno.land/x/postgres@v0.11.3/mod.ts"

const DENO_ENV = Deno.env.get('DENO_ENV') ?? 'development'
config({ path: `./.env.${DENO_ENV}`, export: true })

const client = new Client(Deno.env.get("PG_URL"))
await client.connect()

await client.queryObject(
  `CREATE EXTENSION fuzzystrmatch;`
)

await client.queryArray(`DROP TABLE IF EXISTS users, sessions, items, categories, user_reviews, rentals, location;`);

await client.queryObject(
  `CREATE TABLE location (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
  )`
)

await client.queryObject(
  `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    salted_password TEXT NOT NULL,
    salt TEXT NOT NULL,
    star_rating REAL,
    date_of_birth DATE NOT NULL,
    phone_number TEXT NOT NULL,
    address1 TEXT NOT NULL,
    address2 TEXT NOT NULL,
    city_id INTEGER,
    postcode TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    FOREIGN KEY (city_id) REFERENCES location (id)
  )`
)

await client.queryObject(
  `CREATE TABLE sessions (
    uuid TEXT PRIMARY KEY,
    user_id INTEGER,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`
)

await client.queryObject(
  `CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    imgURL TEXT NOT NULL
  )`
)

await client.queryObject(
  `CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    category_id INTEGER,
    owner_id INTEGER,
    age_restriction INTEGER,
    img_url TEXT,
    FOREIGN KEY (category_id) REFERENCES categories (id)
  )`
)

await client.queryObject(
  `CREATE TABLE user_reviews (
    id SERIAL PRIMARY KEY,
    reviewer_id INTEGER NOT NULL,
    reviewee_id INTEGER NOT NULL,
    review_title TEXT NOT NULL,
    review_content TEXT NOT NULL,
    star_rating INTEGER,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (reviewer_id) REFERENCES users (id),
    FOREIGN KEY (reviewee_id) REFERENCES users (id)
  )`
)

await client.queryObject(
  `CREATE TABLE rentals (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL,
    borrower_id INTEGER NOT NULL,
    rented_from DATE NOT NULL,
    rented_until DATE NOT NULL
  )`
)
