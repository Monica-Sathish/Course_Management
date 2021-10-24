const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
    title : {type: String},
    description: {type: String},
    image: {type: String},
    category: {type: String},
    duration: {type: String},
    price: {type:String},
    rating: {type: Number}
},
{
  collection:'courses'
}

);

module.exports = mongoose.model('courses', coursesSchema)