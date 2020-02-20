const jwt = require("jsonwebtoken");

/* TODO: It would be more fast if used here an async func */

function generateToken(input) {
  return jwt.sign(input, process.env.JWT_SECRET_KEY);
}

function verifyToken(req, res, next) {
  const token = req.cookies.token || "";
  try {
    if (!token) {
      return res.status(401).json("You need to Login");
    }
    const decrypt = jwt.verify(token, process.env.JWT_SECRET_KEY);
    /* TODO: Here I decrypt the content of token but I don't do nothing with it */
    next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
}

module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken
};
