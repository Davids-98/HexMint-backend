var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bid = new Schema({
  auctionid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Auction'
  },
  bidamount: {
    type: Number,
    required: true
  },
  bidderuserid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },

},{timestamps : true});

module.exports = mongoose.model('bid', bid)