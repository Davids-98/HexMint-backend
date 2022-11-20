var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CollectionOwners = new Schema({
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Collection'
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
},{timestamps : true});

module.exports = mongoose.model('CollectionOwners', CollectionOwners)
