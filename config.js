/** Common config for message.ly */

// read .env files and make environmental variables

require("dotenv").config();

const DB_URI = (process.env.NODE_ENV === "test")
  ? `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/books_test`
  : `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/books`;

const SECRET_KEY = process.env.SECRET_KEY || "secret";

const BCRYPT_WORK_FACTOR = 12;


module.exports = {
  DB_URI,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
};