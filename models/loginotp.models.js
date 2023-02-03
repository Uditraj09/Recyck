module.exports=(mongoose)=>{
    var loginotpSchema = mongoose.Schema({
       
        phonenumber : Number,
       
 },
    {timestamp : true}
 )
//  const loginOtp = mongoose.model("otpno",loginotpSchema);
//  return loginOtp;
loginotpSchema.methods.generateJWT = function () {
    const token = jwt.sign(
      {
        _id: this._id,
       phonenumber: this.phonenumber,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    return token;
  };
  
const loginOtp = mongoose.model("otpno",loginotpSchema)
return loginOtp; 
}