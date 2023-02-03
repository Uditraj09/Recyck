const validator = require("validator");
const { mongoose } = require(".");
module.exports=(mongoose)=>{
    var regiSchema = mongoose.Schema({
        fname : String,
        lname : String,
        email : String,
        phonenumber : Number,
        birthdate : Date,
        gender : String,
        password : String,
        confirmpassword : String
 })
 const Registration = mongoose.model("registration",regiSchema);
 return Registration;
}