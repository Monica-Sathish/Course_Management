const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    first_name : {type: String, default: null},
    last_name: {type: String},
    email: {type: String,unique: true},
    mobile_number: {type: Number,unique: true},
    password: {type: String},
    country: {type:String},
    token: {type: String}
},
{
  collection:'users'
}

);

module.exports = mongoose.model('users', usersSchema)