var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Activity = new Schema({
  activityid: {
    type: Schema.Types.ObjectId,
    required: true
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  activitytype: {
    type: String,
    required: true,
    enum: ["minted", "listed", "buyed", "transfered"]
  },
  NFTid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'NFT'
  },

  activitydetailsid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'ActivityDetails'
  },

},{timestamps : true});

module.exports = mongoose.model('ActivityModel', Activity)