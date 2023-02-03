const db = require("../models");
const Registration = db.registration;


const md5 = require("md5");

exports.addUser = async (req, res) => {
  const user = new Registration({
    fname: req.fields.fname,
    lname: req.fields.lname,
    gender: req.fields.gender,
    email: req.fields.email,
    phonenumber: req.fields.phonenumber,
    birthdate: req.fields.birthdate,
    password: md5(req.fields.password),
    confirmpassword: md5(req.fields.confirmpassword),
  });
  try {
    let user = await Registration.findOne({
      phonenumber: req.fields.phonenumber,
    });
    if (user) {
      return res
        .status(400)
        .json({ error: "Sorry a user with this phonenumber already exists!" });
    }
  } catch (error) {
    console.error(error.message);
  }

  const pwd = md5(req.fields.password);
  const cpwd = md5(req.fields.confirmpassword);
  if (pwd !== cpwd) {
    return res.status(400).send({
      message: "Password and confirm password do not match.",
    });
  }
  user
    .save()
    .then((data) => {
      res.status(200).send({
        success: "true",
        message: "User Added!",
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).send({
        success: "false",
        message: "User Not Added!",
        data: error,
      });
    });
};
exports.loginUser = async (req, res) => {
    // const password = req.fields.password
    try {
        let users = await Registration.findOne({ 
            phonenumber: req.fields.phonenumber,
            password: md5(req.fields.password)
        });
        if (!users) {
          return res
            .status(400)
            .json({ success: "Invalid Credentials!" });
        }
        else{
            return res.send("Login SuccesFull!")
        }
      } catch (error) {
        console.error(error.message);
      }

//   const { phonenumber, password } = req.fields;
//   try {
//     let pwd = await Registration.findOne({ phonenumber });
//     if (!pwd == phonenumber) {
//       return res
//         .send(400)
//         .json({ error: "Please try to login with correct credentials!" });
//     } else {
//       return res.send("Err");
//     }
//     let pwdcompare = await Registration.findOne({ password });
//     if (!pwdcompare == password) {
//       return res.status(400).send({ message: "Invalid Credentials!" });
//     }
//   } catch (error) {
//     console.log(error);
//   }
   
//   const pwd = req.fields.password;
//   const dpw = await Registration.findOne({ password: md5(req.fields.password)})
//   if (pwd == dpw ) {
//      return res.status(400).send({
//        message: "Invalid Credentials!"
//      });
//   }else{
//       res.status(200).send({success:"Logged in"})
//   }
//   const password = req.fields.password;
//   const phonenumber = req.fields.phonenumber;
//   let compareno = await Registration.findOne({ phonenumber: req.fields.phonenumber});
//   if(!compareno == phonenumber){
//       return res
//       .status(200)
//       .json({ success: "Login Successful!" });
//   } else{
//       return res.status(400).json({error:"Invalid credentials!"})
//   }
};
