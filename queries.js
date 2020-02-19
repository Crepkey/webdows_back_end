const jwt = require("jsonwebtoken");
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
            const user = results.rows[0];
            /* TODO: Secrect key will be a random charchain from dotenv */
            jwt.sign(user, "secretKey", (err, token) => {
              response.cookie("valami", "VALAMI");
              response.status(200).json({ Valami: "Valami" });
            });
            response.status(200);
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
