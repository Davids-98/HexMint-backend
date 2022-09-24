var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AdminEditRequest = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },

},{timestamps : true});

module.exports = mongoose.model('AdminEditRequest', AdminEditRequest)