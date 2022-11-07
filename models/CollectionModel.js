// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var Collection = new Schema({
//   // collectionId: {
//   //   type: Schema.Types.ObjectId,
//   //   required: true
//   // },
//   collectionName: {
//     type: String,
//     required: true
//   },
//   collectionDescription: {
//     type: String,
//     required: true
//   },
//   logoImg: {
//     type: {
//       data: Buffer,
//       contentType: String
//     }
//   },
//   NFTcount: {
//     type: Number,
//     required: true
//   },
//   floorprize: {
//     type: Number,
//     required: true
//   },
//   totalprize: {
//     type: Number,
//     required: true
//   }
// },{timestamps : true});

// module.exports = mongoose.model('Collection', Collection)

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
