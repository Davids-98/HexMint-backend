var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AdminUpdatingDetail = new Schema({
  requestid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'AdminEditRequest'
  },
  name: {
    type: String,
    required: true
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

module.exports = mongoose.model('AdminUpdatingDetail', AdminUpdatingDetail)