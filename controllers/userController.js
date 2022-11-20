const UserModel = require("../models/UserModel");
const AdminDetailsModel = require("../models/AdminDetailsModel");
const AuctionListingModel = require("../models/AuctionListingModel");

const getUserDetailsFromWalletAddress = async (req, res) => {
  const { walletAddress } = req.query;
  const { usertype } = req.data;

  if (usertype === "Super Admin") {
    return res.status(401).json({
      message: "Unauthorized Access!",
      status: 401,
    });
  } else {
    try {
      const user = await UserModel.findOne({ walletaddress: walletAddress });

      if (user) {
        if (user.usertype === "Customer") {
          return res.status(200).json({
            message: "Successfully Fetched!",
            userid: user._id,
            name: user.name,
            username: user.username,
            usertype: user.usertype,
            propic: user.propic,
            status: 200,
          });
        } else {
          const admin = await AdminDetailsModel.findOne({
            userid: user._id,
          }).populate("userid");

          return res.status(200).json({
            message: "Successfully Fetched!",
            name: admin.userid.name,
            username: admin.userid.username,
            usertype: admin.userid.usertype,
            propic: admin.userid.propic,
            email: admin.email,
            mobilenumber: admin.mobilenumber,
            DOB: admin.DOB,
            status: 200,
          });
        }
      } else {
        return res.status(400).json({
          message: "Error Occured!",
          status: 400,
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: err,
      });
    }
  }
};

const getUserDetailsFromUserId = async (req, res) => {
  const { userid } = req.query;

  try {
    const user = await UserModel.findOne({ _id: userid });

    if (user) {
      if (user.usertype === "Customer") {
        return res.status(200).json({
          message: "Successfully Fetched!",
          name: user.name,
          username: user.username,
          usertype: user.usertype,
          propic: user.propic,
          walletaddress: user.walletaddress,
          status: 200,
        });
      } else {
        const admin = await AdminDetailsModel.findOne({
          userid: user._id,
        }).populate("userid");

        return res.status(200).json({
          message: "Successfully Fetched!",
          name: admin.userid.name,
          username: admin.userid.username,
          usertype: admin.userid.usertype,
          propic: admin.userid.propic,
          email: admin.email,
          mobilenumber: admin.mobilenumber,
          DOB: admin.DOB,
          status: 200,
        });
      }
    } else {
      return res.status(400).json({
        message: "Error Occured!",
        status: 400,
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: err,
    });
  }
};

const getTimeAuctionDetails = async (req, res) => {
  const { tokenId } = req.query;

  try {
    const auctionListing = await AuctionListingModel.find({
      tokenId: tokenId,
    });

    if (auctionListing) {
      let highestBid = 0;
      let initialBid = Number.MAX_SAFE_INTEGER;
      let item = "";
      let timeDiff_ = 0;
      // let endDate = new Date();
      auctionListing.map((item_) => {
        const timeNow = new Date();
        const endTime = new Date(item_.endDate);
        const timeDiff = endTime.getTime() - timeNow.getTime();

        if (timeDiff > 0) {
          if (item_.currentbid > highestBid) {
            if (item_.currentbid < initialBid) {
              initialBid = item_.currentbid;
            }
            highestBid = item_.currentbid;

            item = item_;
            timeDiff_ = timeDiff;
          }
        }
      });
      if (item !== "") {
        return res.status(200).json({
          message: "Time auction found!",
          status: 200,
          item: item,
          timeDiff: timeDiff_,
          initialBid: initialBid,
        });
      } else {
        return res.status(202).json({
          message: "Time auction not found!",
          status: 202,
        });
      }
    } else {
      return res.status(202).json({
        message: "Time auction not found!",
        status: 202,
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: err,
    });
  }
};

module.exports = {
  getUserDetailsFromWalletAddress,
  getUserDetailsFromUserId,
  getTimeAuctionDetails,
};
