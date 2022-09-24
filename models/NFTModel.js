var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var NFT = new Schema({
  tokenid: {
    type: Number,
    required: true
  },
  contractaddress: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Collection'
  },
  owneraddress: {
    type: String,
    required: true
  },

},{timestamps : true});

module.exports = mongoose.model('NFT', NFT)