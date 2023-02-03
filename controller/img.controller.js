const db =require("../models")
const imgUpload = db.images;
const multer = require("multer");
const md5 = require('md5');
const path = require('path');


exports.uploadImg = async (req, res) => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "./images");
        },
        filename: function (req, file, callback) {
          callback(null, md5(Date.now()) + path.extname(file.originalname));
        },
      });
    
      const uploaFile = multer({
        storage: storage,
      }).single("image");
    
      uploaFile(req, res, async (err) => {
        if (!req.file) {
            res.status(500).send({
                success: false,
                data: [],
                message: "Select Image",
            });
        } else if (err) {
            res.status(500).send({
                success: false,
                data: [],
                message: "not upload",
            });
        } else {
            imgUpload.create({ pic:process.env.MAIN_URL + req.file.filename}).then((data) => {
                res.status(200).send({
                    success: true,
                    data: {
                        filepath_url: req.file.filename,
                        url: process.env.MAIN_URL + req.file.filename,
                    },
                    message: "Image Stored in databse!",
                });
            }).catch((err) => {
                res.send(err);
            });
        }
    })
  }
