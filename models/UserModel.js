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
    type: {
      data: Buffer,
      contentType: String
    }
  }
},{timestamps : true});

module.exports = mongoose.model('User', User)
