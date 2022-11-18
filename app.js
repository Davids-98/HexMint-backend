require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());
const bodyParser = require("body-parser");
const multer = require("multer");

//midlewaee

const cors = require("cors");

app.use(bodyParser.json());

//middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ mssg: "Welcome to the app!" });
});
app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));
app.use("/customer", multer().array(), require("./routes/customer"));
app.use("/admin", multer().array(), require("./routes/admin"));

module.exports = app;
