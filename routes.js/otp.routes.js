module.exports=(app)=>{
    const express = require("express");
    const router = express.Router();
   
   const otpsignUp = require("../controller/otpSignup.controller")
   
   router.post('/signup',otpsignUp.otpSignUp)
   router.post('/signup/verify',otpsignUp.verifyOtp)
   
    app.use('/api',router)  
}