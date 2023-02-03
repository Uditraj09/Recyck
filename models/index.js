const dbConfig = require("../config/db.config");
const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.images = require("./img.models.js")(mongoose);
db.registration = require("./regi.model")(mongoose)
db.verifieduser=require("./otpVerify.model")(mongoose)
db.otpno = require("./loginotp.models")(mongoose)

module.exports = db;
