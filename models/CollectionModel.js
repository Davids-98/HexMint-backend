var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Collection = new Schema({
  collectionid: {
    type: Schema.Types.ObjectId,
    required: true
  },
  // contractaddress: {
  //   type: String,
  //   required: true
  // },
  // ownerscount: {
  //   type: Number,
  //   required: true
  // },
  NFTcount: {
    type: Number,
    required: true
  },
  floorprize: {
    type: Number,
    required: true
  },
  totalprize: {
    type: Number,
    required: true
  }
},{timestamps : true});

module.exports = mongoose.model('Collection', Collection)