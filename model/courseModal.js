const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({

// , videolink, duration, description

title:{
  type:String,
  required:true
},
thumbnail:{
  type:String,
  required:true
},

videolink:{
  type:String,
  required:true
},
duration:{
  type:String,
  required:true
},
content:{
  type:String,
  required:true

},
description:{
  type:String,
  required:true
}



})
const courses = mongoose.model("courses",courseSchema);

module.exports = courses