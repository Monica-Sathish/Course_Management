const express = require('express');
require("dotenv").config();
require("./config/database").connect();
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // for parsing application/json
//port
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

//routing the files
const register = require('./controller/routes/register');
app.use('/register', register)

const addCourse = require('./controller/routes/addCourse');
app.use('/addCourse', addCourse)

const viewCourse = require('./controller/routes/viewCourse');
app.use('/viewCourse', viewCourse)

//port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;