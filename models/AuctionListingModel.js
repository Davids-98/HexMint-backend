var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var auctionlisting = new Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bidderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    tokenId: {
      type: String,
      required: true,
    },
    currentbid: {
      type: String,
      required: true,
    },
    referralRate: {
      type: Number,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("auctionlisting", auctionlisting);
