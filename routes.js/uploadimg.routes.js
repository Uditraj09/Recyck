module.exports=(app)=>{
    const express = require("express");
    const router = express.Router();
    const img = require('../controller/img.controller')
    const regi = require('../controller/regi.controller')
   

    router.post('/imgupload',img.uploadImg)
    router.post('/addUser',regi.addUser)
    router.post('/login',regi.loginUser)


    app.use('/api',router)  
}