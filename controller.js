const MissingData = require("./customErrors/missingData");

function login(req, res, next) {
  try {
    if (!req.body) {
      throw new MissingData("There is no body in the request");
    }
    if (!req.body.username) {
      throw new MissingData("There is no username data in the request's body");
    }
  } catch (error) {
    if (error instanceof MissingData) {
      console.log(error);
    }
  }
}

module.exports = {
  login: login
};
