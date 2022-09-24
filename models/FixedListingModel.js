var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fixedlisting = new Schema({
  listingid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Listings'
  },
  prize: {
    type: String,
    required: true
  },

},{timestamps : true});

module.exports = mongoose.model('fixedlisting', fixedlisting)