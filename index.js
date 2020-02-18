require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./queries");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", db.checkUserAccount);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`I am listening on ${port} port...`);
});
