require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const Course = require("../../models/courses");
const auth = require("../authetication/auth");
const app = express();

app.get('/:id', auth, async(req,res) => {
    try{
           const course = await Course.find(req.params.rating)
           res.json(course)
    }catch(err){
        res.send('Error ' + err)
    }
})
module.exports = app;