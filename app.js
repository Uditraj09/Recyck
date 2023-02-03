const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const env = require("dotenv");
const md5 = require("md5");
const db = require('./models')
env.config();
app.use(express.json());
const imgUpload= db.images;

app.use(express.static("images"));
app.use(cors());
app.use(bodyParser.json());
const port = 8000;
const multer = require("multer");

app.get("/", (req, res) => {
    res.send({ message: "server is running!" });
  });


  db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch((err) => {
    console.log("Can't Connect to Databse!", err);
    process.exit();
  });

const formidable = require("express-formidable");
app.use(formidable());
require('./routes.js/uploadimg.routes')(app)
require('./routes.js/otp.routes')(app)

  app.listen(port, () => {
    console.log(`Server is Listening on ${port}`);
  });
  