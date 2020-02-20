const jwt = require("jsonwebtoken");
const auth = require("./authentication");
const util = require("./util");
const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT
});

async function checkUserInDatabase(username) {
  try {
    const res = await pool.query(
      `SELECT * FROM users WHERE username = '${username}'`
    );
    return res;
  } catch (err) {
    return err.stack;
  }
}

module.exports = {
  checkUserInDatabase: checkUserInDatabase
};
