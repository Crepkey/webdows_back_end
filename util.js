const bcrypt = require("bcrypt");

function createHash(input) {
  const saltRounds = parseInt(process.env.saltRounds);
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(input, salt);
  return hash;
}

module.exports = {
  createHash: createHash
};
