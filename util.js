const bcrypt = require("bcrypt");

function createHash(input) {
  const saltRounds = parseInt(process.env.saltRounds);
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(input, salt);
  return hash;
}

function comparePasswords(typedPassword, storedPassword) {
  return bcrypt.compareSync(typedPassword, storedPassword);
}

module.exports = {
  createHash: createHash,
  comparePasswords: comparePasswords
};
