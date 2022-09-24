var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var auctionlisting = new Schema({
  listingid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Listings'
  },
  currentbid: {
    type: Number,
    required: true
  },
  duration: {
    type: Date,
    required: true
  },
  highestbidderid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },

},{timestamps : true});

module.exports = mongoose.model('auctionlisting', auctionlisting)