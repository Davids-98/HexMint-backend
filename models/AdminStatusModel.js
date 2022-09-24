var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AdminStatus = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  isdeleted: {
    type: Boolean
  },

},{timestamps : true});

module.exports = mongoose.model('AdminStatus', AdminStatus)