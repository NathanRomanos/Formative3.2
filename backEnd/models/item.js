const mongoose = require('mongoose'); // since we are using mongoose we have to require it

const  itemSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name : String,
  imgUrl : String,
  author :String,
  description : String,
  link : String
});

module.exports = mongoose.model('Item', itemSchema);
