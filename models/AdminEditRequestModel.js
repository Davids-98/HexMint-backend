var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AdminEditRequest = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'rejected'],
    default: 'rejected'
    
  },

},{timestamps : true});

module.exports = mongoose.model('AdminEditRequest', AdminEditRequest)