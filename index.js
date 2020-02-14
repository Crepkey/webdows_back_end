require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log(process.env.TEST_DATA);
  res.send("Hello world");
});

const port = process.env.port || 9000;

app.listen(port, () => {
  console.log(`I am listening on ${port} port...`);
});
