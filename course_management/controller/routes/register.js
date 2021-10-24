require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/users");
const auth = require("../authetication/auth");
const app = express();
const { check, validationResult } = require('express-validator');

app.post ("/", [
    check('password').isLength({ min: 10 }),
    check('email').isEmail(),
  ],  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    //after validation..
    try {
      // Get users input
      const { first_name, last_name, email, mobile_number, password, confirm_password,country } = req.body;
  
      // Validate users input
      if (!(email && password && confirm_password && first_name && last_name && mobile_number && country)) {
        res.status(400).send("All input is required");
      }
  
      // check if users already exist
      // Validate if users exist in our database
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist.");
      }
      if (password != confirm_password) {
        return res.status(409).send("Password does not matches");
      }
      //Encrypt users password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create users in our database
      const users = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        mobile_number,
        password: encryptedPassword,
        country,
      });
  
      // Create token
      const token = jwt.sign(
        { users_id: users._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save users token
      users.token = token;
      // return new users
      res.status(201).json(users);
      
    } catch (err) {
      console.log(err);
    }
  });

  module.exports = app;