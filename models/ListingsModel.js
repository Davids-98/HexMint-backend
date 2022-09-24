var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Listings = new Schema({
  ownerid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  NFTID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'NFT'
  },
  status: {
    type: Boolean,
    required: true
  },
  llistingtype: {
    type: String,
    required: true,
    enum: ["fixed", "timeauction"]
  },

},{timestamps : true});

module.exports = mongoose.model('Listing', Listings)