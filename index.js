require("dotenv").config();
const ctlr = require("./controller");
const auth = require("./authentication");
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./queries");
const cookieParser = require("cookie-parser");

/* 
This settings are responsible for: 
  - to read credentials from cookie to avoid CORS block
  - to return 200 HTTP status
  - to use the request origin as the origin of response in the header props, called: 'Access-Control-Allow-Origin',
    so that we don't get CORS policy block.
  */
app.use(
  cors({
    origin: function(origin, callback) {
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/login", ctlr.login);

app.get("/test", auth.verifyToken, (req, res) => {
  res.status(200).json({ valami: "VALAMI" });
});

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`I am listening on ${port} port...`);
});
