const MissingData = require("./customErrors/missingData");
const db = require("./queries");
const util = require("./util");
const auth = require("./authentication");

async function login(req, res, next) {
  try {
    if (!req.body) {
      throw new MissingData("There is no body in the request");
    }
    if (!req.body.username) {
      throw new MissingData("There is no username data in the request's body");
    }
    if (!req.body.password) {
      throw new MissingData("There is no password data in the request's body");
    }

    const { username, password } = req.body;

    const result = await db.checkUserInDatabase(username);

    if (result.rows.length !== 0) {
      const incomingPassword = password;
      const storedPassword = result.rows[0].password;

      if (util.comparePasswords(incomingPassword, storedPassword)) {
        const token = auth.generateToken(username);
        res.cookie("token", token);
        res.status(200).json("You are successfully logged in");
      } else {
        const errorMessage = "Incorrect password, please type it again.";
        res.status(200).json(errorMessage);
      }
    } else {
      /* TODO */
      const responseMessage =
        "The username is not found in our system, please check it.";
      res.status(200).json(responseMessage);
    }
  } catch (error) {
    if (error instanceof MissingData) {
      res.json(error);
    }

    const errorPackage = {
      name: "Unhandled error",
      message: "An undhandled or generic error occured",
      details: error,
      date: new Date()
    };
    console.log(error);
    res.json(errorPackage);
  }
}

module.exports = {
  login: login
};
