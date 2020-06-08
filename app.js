const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./configs/moongose.config");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to note taking app list",
  });
});

app.use("/api/user", require("./routes/user.routes"));

module.exports = app;