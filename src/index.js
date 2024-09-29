const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");
const pg = require("pg");

const port = 4000 || process.env.PORT;
const app = express();

console.log(process.env.NODE_ENV);

const REDIS_HOST = "redis";
const REDIS_PORT = 6379;

const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

redisClient
  .connect()
  .then((x) => {})
  .catch((err) => console.log("reddis error: " + err));

// connect db
// const DB_USER = "root";
// const DB_PASSWORD = "example";
// const DB_PORT = 27017;
// const DB_HOST = "mongo-db";

// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// mongoose
//   .connect(URI)
//   .then(() => {
//     console.log("connected to db");
//   })
//   .catch((err) => console.log("failed to connect to db", err));

// postgres db
const POSTGRES_PASSWORD = "POSTGRES_PASSWORD";
const POSTGRES_USER = "POSTGRES_USER";
const POSTGRES_HOST = "postgres";
const POSTGRES_PORT = 5432;

const pgClient = new pg.Client({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
});
pgClient
  .connect()
  .then(() => {
    console.log("connected to postgres db");
  })
  .catch((err) => console.log("failed to connect to postgres, err", err));

// app listen
app.get("/", (req, res, next) => {
  redisClient.set("products", "cached products");
  res.send("<h1>Welcome!  prod from aws </h1>");
});

app.get("/data", async (req, res, next) => {
  const products = await redisClient.get("products");

  res.send(`<h2> ${products}</h2>`);
});

app.listen(4000, () => {
  console.log("listening on port " + port);
});
