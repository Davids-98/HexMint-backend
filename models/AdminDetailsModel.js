var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AdminDetails = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  email: {
    type: String,
    required: true
  },
  DOB: {
    type: Date,
    required: true
  },
  mobilenumber: {
    type: Number,
    required: true
  },

},{timestamps : true});

module.exports = mongoose.model('AdminDetails', AdminDetails)