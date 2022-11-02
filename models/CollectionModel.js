var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Collection = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  collectionName: {
    type: String,
    required: true
  },
  collectionDescription: {
    type: String,
    required: true
  },
  logoImg: {
    type: String,
  },
  ownersCount: {
    type: Number,
    required: true
  },
},{timestamps : true});

module.exports = mongoose.model('Collection', Collection)