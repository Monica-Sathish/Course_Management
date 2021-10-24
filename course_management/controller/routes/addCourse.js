require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const User = require("../../models/users");
const Course = require("../../models/courses");
const auth = require("../authetication/auth");
const app = express();
const uploadImg ="";
const newCourse ="";
app.post ("/", auth, async (req, res) => {
    try {
      // Get courses input
      newCourse = new Course({
        title:req.body.title,
        description:req.body.description,
        image:req.file.path,
        category:req.body.category,
        duration:req.body.duration,
        price:req.body.price,
        rating:req.body.rating
      })
      
      // Validate courses input
      if (!(title && description && image && category && duration && price && rating)) {
        res.status(400).send("All input is required");
      }
      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads');
          },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
        });
        uploadImg = multer({storage: storage}).single('image');

        if(!(rating>=1 && rating<=5)){
            res.status(400).send("Enter rating between 1 - 5")
        }
      // Create courses in our database
      const courses = await Course.create({ 
        title, 
        description, 
        image, 
        category, 
        duration, 
        price, 
        rating
      });

      // return new courses
      res.status(201).json(courses);
      
    } catch (err) {
      console.log(err);
    }
  });

  module.exports ={
    uploadImg,
    newCourse,
}
  module.exports = app;