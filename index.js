const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

const port = process.env.port || 9000;

app.listen(port, () => {
  console.log(`I am listening on ${port} port...`);
});
