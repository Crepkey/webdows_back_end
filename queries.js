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
  pool.query(
    `SELECT * FROM users WHERE username = '${request.body.username}'`,
    (error, results) => {
      if (error) {
        throw error;
      } else {
        if (results.rows.length !== 0) {
          const typedPassword = request.body.password;
          const storedPassword = results.rows[0].password;
          if (util.comparePasswords(typedPassword, storedPassword)) {
            response.status(200).json(results.rows);
            /* TODO: JWT sends back from here*/
          } else {
            const errorMessage = "Incorrect password, please type it again.";
            response.status(200).json(errorMessage);
          }
        } else {
          const responseMessage =
            "The username is not found in our system, please check it.";
          response.status(200).json(responseMessage);
        }
      }
    }
  );
};

module.exports = {
  checkUserAccount: checkUserAccount
};
