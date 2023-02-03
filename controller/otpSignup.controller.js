const bcrypt = require("bcrypt");
const _ = require("lodash");
const axios = require("axios");
const db = require("../models");

const otpGenerator = require("otp-generator");
const otpVerify = db.verifieduser;
const Registration = db.registration;
const loginOtp = db.otpno;
const jwt = require("jsonwebtoken");

exports.otpSignUp = async (req, res) => {
  const userno = await loginOtp.findOne({
    phonenumber: req.fields.phonenumber,
  });
  if (userno) {
    return res.status(400).send("Number already registered!");
  }
  const OTP = otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    uppercase: false,
    specialChars: false,
  });

  const phonenumber = req.fields.phonenumber;
  console.log(OTP);
  const otp = new otpVerify({ phonenumber: phonenumber, otp: OTP });
  const salt = await bcrypt.genSalt(10);
  otp.otp = await bcrypt.hash(otp.otp, salt);
  const result = await otp.save();
  console.log(result);
  return res.status(200).send("OTP send Successfully!");
};

exports.verifyOtp = async (req, res) => {
  const otpHolder = await otpVerify.find({
    phonenumber: req.fields.phonenumber,
  });

  if (otpHolder.length === 0) {
    return res.status(400).send("You have used an expired OTP!");
  }
  const rightOtpFind = otpHolder.sort((a, b) => b.createdAt - a.createdAt)[0];
  const validUser = await bcrypt.compare(req.fields.otp, rightOtpFind.otp);
  if (
    rightOtpFind.phonenumber === parseInt(req.fields.phonenumber) &&
    validUser
  ) {
    const user = new loginOtp({
      phonenumber: parseInt(req.fields.phonenumber),
    });
    //   const token = user.generateJWT();
    //   const result = await user.save();
    user.save(user).then((data) => {
      const token = jwt.sign(
        {
          _id: data.id,
          phonenumber: parseInt(req.fields.phonenumber),
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
      );
      //   return token;
      //   const OTPDelete = await otpVerify.deleteMany({
      //     phonenumber: rightOtpFind.phonenumber,
      //   });
      return res.status(200).send({
        message: "User Registration Successfull!",
        token: token,
        data: user,
      });
    });
  } else {
    return res.status(400).send("Your OTP was wrong!");
  }
};

// exports.verifyOtp = async(req,res) =>{
//     const otpHolder = await otpVerify.find({
//         phonenumber : req.fields.phonenumber
//     })

//     // if(otpHolder.length === 0)
//     //     return res.status(400).send("You have used expired OTP!");
//     const rightOtpFind = otpHolder[{createdAt:-1.[0]}];
//     const validUser = await bcrypt.compare(req.fields.otp,rightOtpFind.otp)

//     if(rightOtpFind.phonenumber === req.fields.phonenumber && validUser){
//         const user = new loginOtp(_.pick(req.fields,["phonenumber"]));
//         const token = user.generateJWT();
//         const result = await user.save()
//         const OTPDelete = await otpVerify.deleteMany({
//            phonenumber: rightOtpFind.phonenumber,
//         });
//         return res.status(200).send({
//             message: "User Registration Successfull!",
//             token: token,
//             data: result,
//           });
//         } else{
//             return res.status(400).send("Your OTP was wrong!");
//         }

//     }
