var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Report = new Schema({
  fromuserid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  touserid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },

},{timestamps : true});

module.exports = mongoose.model('Report', Report)