const mongoose = require('mongoose')

const Schema = mongoose.Schema

var User = new Schema({
  walletaddress: {
    type: String,
    required: true
  },
  usertype: {
    type: String,
    required: true,
    enum: ["Customer", "Super Admin", "Admin"]
  },
  name: {
    type: String
  },
  username: {
    type: String
  },
  propic: {
    type : String
    // type: {
    //   data: Buffer,
    //   contentType: String
    // }
  },
  isblocked: {
    type: Boolean,
    default: false,
    required: true
  },
},{timestamps : true});

module.exports = mongoose.model('User', User)
