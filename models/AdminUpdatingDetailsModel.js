var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AdminUpdatingDetail = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // name: {
  //   type: String,
  //   required: true
  // },
  email: {
    type: String,
    required: true
  },
  // DOB: {
  //   type: Date,
  //   required: true
  // },
  propic: {
    type : String
    // type: {
    //   data: Buffer,
    //   contentType: String
    // }
  },
  mobilenumber: {
    type: Number,
    required: true
  },
},{timestamps : true});

module.exports = mongoose.model('AdminUpdatingDetail', AdminUpdatingDetail)