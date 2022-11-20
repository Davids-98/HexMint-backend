const ActivityDetailsModel = require("../models/ActivityDetailsModel");
const ActivityModel = require("../models/ActivityModel");
const AuctionListingModel = require("../models/AuctionListingModel");
const CollectionModel = require("../models/CollectionModel");
const CollectionOwnerModel = require("../models/CollectionOwnerModel");
const ReportModel = require("../models/ReportModel");
const UserModel = require("../models/UserModel");

//update user details
const updateUserDetails = async (req, res) => {
  const { walletaddress, name, username, propic } = req.body;

  //authariation check
  const { usertype } = req.data;

  if (usertype !== "Customer") {
    return res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    try {
      const user = await UserModel.findOneAndUpdate(
        { walletaddress: walletaddress },
        {
          name: name,
          username: username,
          propic: propic,
        },
        { new: true }
      );

      if (user) {
        return res.status(200).json({
          message: "success",
          user: user,
        });
      } else {
        return res.status(400).json({
          message: "error",
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: err,
      });
    }
  }
};

const createCollection = async (req, res) => {
  const { usertype } = req.data;

  const {
    userid,
    collectionName,
    collectionDescription,
    logoImg,
    ownersCount,
  } = req.body;

  if (usertype !== "Customer") {
    return res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    try {
      const user = await UserModel.findOne({ walletaddress: userid });

      if (user) {
        try {
          const collection = await CollectionModel.findOne({
            collectionName: collectionName,
          });

          if (collection) {
            return res.status(200).json({
              message: "Already exists with this Collection Name!",
              collectionName: collection.collectionName,
              view: collection,
            });
          } else {
            const newCollection = await CollectionModel.create({
              userid: user._id,
              collectionName: collectionName,
              collectionDescription: collectionDescription,
              logoImg: logoImg,
              ownersCount: ownersCount,
            });

            return res.status(202).json({
              message: "Successfully Added!",
              name: newCollection.collectionName,
            });
          }
        } catch (err) {
          return res.status(500).json({
            message: err,
          });
        }
      } else {
        return res.status(400).json({
          message: "user not existing",
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: err,
      });
    }
  }
};

const createCollectionOwner = async (req, res) => {
  const { usertype } = req.data;

  const { userid, collectionId } = req.body;

  if (usertype !== "Customer") {
    return res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    try {
      const user = await UserModel.findOne({ walletaddress: userid });
      const collection = await CollectionModel.findOne({ _id: collectionId });

      if (user && collection) {
        try {
          const collectionOwner = await CollectionOwnerModel.findOne({
            userid: userid,
            collectionId: collectionId,
          });

          if (collectionOwner) {
            return res.status(200).json({
              message:
                "Collection owner Already exists with this user id in this collection!",
              collectionId: collectionOwner.collectionId,
              view: collectionOwner,
            });
          } else {
            const newCollectionOwner = await CollectionOwnerModel.create({
              userid: userid,
              collectionId: collectionId,
            });
            const user = await CollectionModel.findOneAndUpdate(
              { _id: collectionId },
              {
                userid: userid,
                collectionName: collection.collectionName,
                collectionDescription: collection.collectionDescription,
                logoImg: collection.logoImg,
                ownersCount: collection.ownersCount + 1,
              },
              { new: true }
            );

            return res.status(200).json({
              message: "Successfully Added!",
              name: newCollectionOwner.userid,
            });
          }
        } catch (err) {
          return res.status(500).json({
            message: err,
          });
        }
      } else {
        return res.status(400).json({
          message: "user or collection not existing",
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: err,
      });
    }
  }
};

const getAllUsers = async (req, res) => {
  const { usertype } = req.data;

  if (usertype === "Admin" || usertype === "Super Admin") {
    try {
      const users = await UserModel.find({
        usertype: "Customer",
        isblocked: false,
      });

      return res.status(200).json({
        status: "success",
        data: users,
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
      });
    }
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

const getAllBlockedUsers = async (req, res) => {
  const { usertype } = req.data;

  if (usertype !== "Admin") {
    return res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    try {
      const users = await UserModel.find({
        usertype: "Customer",
        isblocked: true,
      });

      return res.status(200).json({
        message: "success",
        data: users,
        status: 200,
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
      });
    }
  }
};

const getAllCollections = async (req, res) => {
  try {
    const collections = await CollectionModel.find();

    return res.status(200).json({
      status: "success",
      collections: collections,
    });
  } catch (error) {
    return res.status(400).json({
      message: "error",
      status: 400,
    });
  }
};

const getCollectionName = async (req, res) => {
  const { collectionID } = req.body;

  try {
    const collection = await CollectionModel.findOne({
      _id: collectionID,
    });

    if (collection) {
      collectionName = collection.collectionName;
      return res.status(200).json({
        message: "success",
        collectionName: collectionName,
      });
    } else {
      return res.status(400).json({
        message: "error",
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: err,
    });
  }
};

const getUserActivityDetails = async (req, res) => {
  const { walletAddress } = req.params;

  const { usertype } = req.data;

  if (usertype !== "Customer") {
    return res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    const dataArray = [];
    const resultArray = [];
    try {
      const user = await UserModel.findOne({ walletaddress: walletAddress });

      if (user) {
        const userActivity = await ActivityModel.find({ userid: user._id });

        if (userActivity) {
          for (var i = 0; i < userActivity.length; i++) {
            const activityDetails = await ActivityDetailsModel.findOne({
              activityId: userActivity[i]._id,
            }).populate("activityId");

            dataArray.push(activityDetails);
          }

          for (var i = 0; i < dataArray.length; i++) {
            item = dataArray[i];
            resultArray.push({
              activitytype: item.activityId.activitytype,
              NFTid: item.activityId.NFTid,
              price: item.price,
              fromwalletaddress: item.fromwalletaddress,
              towalletaddress: item.towalletaddress,
              time: item.time,
              transactionhash: item.transactionhash,
            });
          }

          return res.status(200).json({
            message: "success",
            userActivity: resultArray,
          });
        } else {
          return res.status(400).json({
            message: "error",
          });
        }
      } else {
        return res.status(400).json({
          message: "error",
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: err,
      });
    }
  }
};

const saveUserActivity = async (req, res) => {
  //Access authentincate data
  const { usertype } = req.data;

  if (usertype === "Customer") {
    try {
      const user = await UserModel.findOne({
        walletaddress: req.body.transaction.from,
      });

      if (user) {
        const userId = user._id;

        //Create a new activity

        const newActivity = await ActivityModel.create({
          userid: userId,
          activitytype: req.body.activityType,
          NFTid: parseInt(req.body.tokenID.tokenId.hex, 16).toString(),
        });

        if (newActivity) {
          //Create a new activity details for the new activity
          const Price = parseInt(req.body.transaction.value.hex, 16);

          if (req.body.activityType === "minted") {
            const newActivityDetails = await ActivityDetailsModel.create({
              activityId: newActivity._id,
              price: Price / 10 ** 18,
              profit: 0,
              fromwalletaddress: "0x0000...",
              towalletaddress: req.body.transaction.from,
              time: req.body.transactionTime,
              transactionhash: req.body.transaction.hash,
            });

            if (newActivityDetails) {
              return res.status(200).json({
                message: "success",
              });
            } else {
              return res.status(400).json({
                message: "error",
              });
            }
          } else if (req.body.activityType === "transferred") {
            const newActivityDetails = await ActivityDetailsModel.create({
              activityId: newActivity._id,
              price: Price / 10 ** 18,
              profit: 0,
              fromwalletaddress: "0x0000...",
              towalletaddress: req.body.tokenID.seller,
              time: req.body.transactionTime,
              transactionhash: req.body.transaction.hash,
            });

            if (newActivityDetails) {
              return res.status(200).json({
                message: "success",
              });
            } else {
              return res.status(400).json({
                message: "error",
              });
            }
          } else if (req.body.activityType === "bought") {
            const newActivityDetails = await ActivityDetailsModel.create({
              activityId: newActivity._id,
              price: Price / 10 ** 18,
              profit:
                ((Price / 10 ** 18) *
                  parseInt(req.body.transaction.referralRate)) /
                (100 + parseInt(req.body.transaction.referralRate)),
              fromwalletaddress: req.body.tokenID.seller,
              towalletaddress: req.body.transaction.from,
              time: req.body.transactionTime,
              transactionhash: req.body.transaction.hash,
            });

            if (newActivityDetails) {
              return res.status(200).json({
                message: "success",
              });
            } else {
              return res.status(400).json({
                message: "error",
              });
            }
          } else if (req.body.activityType === "listed") {
            const newActivityDetails = await ActivityDetailsModel.create({
              activityId: newActivity._id,
              price: Price / 10 ** 18,
              profit: 0,
              fromwalletaddress: "0x0000...",
              towalletaddress: "-",
              time: req.body.transactionTime,
              transactionhash: req.body.transaction.hash,
            });

            if (req.body.transaction.listingType === "2") {
              const newListing = await AuctionListingModel.create({
                ownerId: userId,
                bidderId: userId,
                tokenId: parseInt(req.body.tokenID.tokenId.hex, 16).toString(),
                currentbid: req.body.transaction.currentbid,
                referralRate: req.body.transaction.referralRate,
                endDate: req.body.transaction.endDate,
              });
            }
            if (newActivityDetails) {
              return res.status(200).json({
                message: "success",
              });
            } else {
              return res.status(400).json({
                message: "error",
              });
            }
          } else if (req.body.activityType === "bade") {
            const newActivityDetails = await ActivityDetailsModel.create({
              activityId: newActivity._id,
              price: Price / 10 ** 18,
              profit:
                ((Price / 10 ** 18) *
                  parseInt(req.body.transaction.referralRate)) /
                (100 + parseInt(req.body.transaction.referralRate)),
              fromwalletaddress: "0x0000...",
              towalletaddress: "-",
              time: req.body.transactionTime,
              transactionhash: req.body.transaction.hash,
            });

            const newBidding = await AuctionListingModel.create({
              ownerId: req.body.transaction.ownerId,
              bidderId: userId,
              tokenId: parseInt(req.body.tokenID.tokenId.hex, 16).toString(),
              currentbid: req.body.transaction.currentbid,
              endDate: req.body.transaction.endDate,
              referralRate: req.body.transaction.referralRate,
            });

            if (newActivityDetails) {
              return res.status(200).json({
                message: "success",
              });
            } else {
              return res.status(400).json({
                message: "error",
              });
            }
          } else {
            return res.status(400).json({
              message: "Activity type not found",
            });
          }
        } else {
          return res.status(400).json({
            message: "error",
          });
        }
      } else {
        return res.status(400).json({
          message: "error",
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: "error",
      });
    }
  } else {
    return res.status(401).json({
      message: "You are not authorized to perform this action",
      status: 401,
    });
  }
};

const handleBlockUser = async (req, res) => {
  const { usertype } = req.data;
  if (usertype !== "Admin") {
    return res.status(401).json({
      message: "You are not authorized to perform this action",
      status: 401,
    });
  } else {
    try {
      const { id } = req.params;
      const blockuser = await UserModel.findOneAndUpdate(
        { _id: id },
        { isblocked: true },
        { new: true }
      );

      return res.status(200).json({
        data: blockuser,
        message: "Successfully Blocked!",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error Occured!",
      });
    }
  }
};

const handleUnblockUser = async (req, res) => {
  const { usertype } = req.data;
  if (usertype !== "Admin") {
    return res.status(401).json({
      message: "You are not authorized to perform this action",
      status: 401,
    });
  } else {
    try {
      const { id } = req.params;
      const blockuser = await UserModel.findOneAndUpdate(
        { _id: id },

        { isblocked: false },
        { new: true }
      );

      return res.status(200).json({
        data: blockuser,
        message: "Successfully Unblocked!",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error Occured!",
      });
    }
  }
};

const getReports = async (req, res) => {
  const { usertype } = req.data;

  if (usertype !== "Admin") {
    return res.status(401).json({
      message: "You are not authorized to perform this action",
      status: 401,
    });
  } else {
    const out = [];
    try {
      const reports = await ReportModel.find();

      for (let i = 0; i < reports.length; i++) {
        const fromuser = await UserModel.findOne({
          _id: reports[i].fromuserid,
        });
        const touser = await UserModel.findOne({ _id: reports[i].touserid });
        const temp = {
          _id: reports[i]._id,
          from: fromuser,
          to: touser,
          reason: reports[i].reason,
        };
        out.push(temp);
      }

      return res.status(200).json({
        data: out,
        message: "Successfully Fetched!",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error Occured!",
      });
    }
  }
};

const handleDeleteReport = async (req, res) => {
  const { usertype } = req.data;

  if (usertype !== "Admin") {
    return res.status(401).json({
      message: "You are not authorized to perform this action",
      status: 401,
    });
  } else {
    try {
      const { id } = req.params;
      const report = await ReportModel.deleteMany({ touserid: id });

      return res.status(200).json({
        data: report,
        message: "Successfully Deleted!",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error Occured!",
      });
    }
  }
};

const getCustomerDetailsFromWalletAddress = async (req, res) => {
  const { usertype } = req.data;
  const { walletaddress } = req.params;
  if (
    usertype === "Customer" ||
    usertype === "Admin" ||
    usertype === "Super Admin"
  ) {
    try {
      const user = await UserModel.findOne({ walletaddress: walletaddress });
      if (user) {
        if (user.usertype === "Customer") {
          return res.status(200).json({
            message: "success",
            name: user.name,
            username: user.username,
            propic: user.propic,
            walletaddress: user.walletaddress,
            status: 200,
          });
        } else {
          return res.status(400).json({
            message: "Error Occured!",
            status: 400,
          });
        }
      } else {
        return res.status(400).json({
          message: "Error Occured!",
          status: 400,
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: "Error Occured!",
        status: 400,
      });
    }
  } else {
    return res.status(401).json({
      message: "You are not authorized to perform this action",
      status: 401,
    });
  }
};

const handleReportSeller = async (req, res) => {
  const { usertype } = req.data;

  if (usertype !== "Customer") {
    return res.status(401).json({
      message: "You are not authorized to perform this action",
      status: 401,
    });
  } else {
    try {
      const { sellerWalletAddress, reason, ViewerAddress } = req.body;

      const seller = await UserModel.findOne({
        walletaddress: sellerWalletAddress,
      });
      const sellerUID = seller._id;

      const viewer = await UserModel.findOne({
        walletaddress: ViewerAddress,
      });
      const viewerUID = viewer._id;

      const reportedBefore = await ReportModel.findOne({
        touserid: sellerUID,
        fromuserid: viewerUID,
      });

      if (reportedBefore || seller.isblocked) {
        return res.status(400).json({
          message: "You have already reported this seller",
          status: 400,
        });
      } else {
        if (sellerUID && viewerUID) {
          const report = await ReportModel.create({
            fromuserid: viewerUID,
            touserid: sellerUID,
            reason: reason,
          });

          return res.status(200).json({
            message: "Successfully Reported!",
            status: 200,
          });
        } else {
          return res.status(400).json({
            message: "Error Occured!",
            status: 400,
          });
        }
      }
    } catch (error) {
      return res.status(400).json({
        message: "Error Occured!",
        status: 400,
      });
    }
  }
};

getIsBlocked = async (req, res) => {
  const { walletaddress } = req.params;

  try {
    const blockedUser = await UserModel.findOne({
      walletaddress: walletaddress,
    });
    const isblocked = blockedUser.isblocked;
    return res.status(200).json({
      message: "Successfully Fetched!",
      data: isblocked,
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error Occured!",
    });
  }
};

module.exports = {
  updateUserDetails,
  getAllUsers,
  createCollection,
  createCollectionOwner,
  getAllCollections,
  saveUserActivity,
  getUserActivityDetails,
  handleBlockUser,
  getAllBlockedUsers,
  handleUnblockUser,
  getCollectionName,
  getReports,
  handleDeleteReport,
  getCustomerDetailsFromWalletAddress,
  handleReportSeller,
  getIsBlocked,
};
