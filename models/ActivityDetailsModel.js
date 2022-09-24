var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivityDetail = new Schema({
  activitydetailsid: {
    type: Schema.Types.ObjectId,
    required: true
  },
  price: {
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
    type: Date,
    required: true
  }
},{timestamps : true});

module.exports = mongoose.model('ActivityDetail', ActivityDetail)