var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivityDetail = new Schema({
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'ActivityModel'
  },
  price: {
    type: Number,
    required: true
  },
  profit: {
    type: Number,
    required: true
  },
  fromwalletaddress: {
    type: String,
    required: true
  },
  towalletaddress: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  transactionhash: {
    type: String,
    required: true
  }
},{timestamps : true});

module.exports = mongoose.model('ActivityDetail', ActivityDetail)