const util = require("./util");
const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT
});

const checkUserAccount = (request, response) => {
  console.log(util.createHash(request.body.username));
  pool.query(
    `SELECT * FROM users WHERE username = '${request.body.username}'`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  checkUserAccount: checkUserAccount
};
