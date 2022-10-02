var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserStatus = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  isblocked: {
    type: Boolean,
    default: false,
    required: true
  },

},{timestamps : true});

module.exports = mongoose.model('UserStatus', UserStatus)