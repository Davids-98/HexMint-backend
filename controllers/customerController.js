
const AdminDetailsModel = require("../models/AdminDetailsModel");

const ActivityDetailsModel = require("../models/ActivityDetailsModel");
const ActivityModel = require("../models/ActivityModel");

const CollectionModel = require("../models/CollectionModel");
const ReportModel = require("../models/ReportModel");
const UserModel = require("../models/UserModel");
const UserStatusModel = require("../models/UserStatusModel");

//update user details
const updateUserDetails = async (req, res) => {

  const { walletaddress, name, username, propic } = req.body;

  //authariation check
  const {usertype} = req.data;

  if(usertype !== "Customer"){
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  else{
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
      console.log("user");
      console.log(user);
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
  // console.log("hello");
  // console.log("handle create collection calling, ", req.body);
  
  const {usertype} = req.data;

  const {
    userid,
    collectionName,
    collectionDescription,
    logoImg,
    ownersCount,
  } = req.body;

  if(usertype !== "Customer"){
    return res.status(401).json({
      message: "Unauthorized",
    });
  }else{
    try {
      const user = await UserModel.findOne({ walletaddress: userid });
      // console.log("user",user," ",user._id);
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

const getAllUsers = async (req, res) => {
  const { usertype } = req.data;

  if (usertype === "Admin" || usertype === "Super Admin") {


    out = [];
      try {
        const users = await UserModel.find({ usertype: "Customer" });
        const blockusers = await UserStatusModel.find({ isblocked: true });

        const out = users.filter((user) => {
          return !blockusers.some((blockuser) => {
            return blockuser.userid.equals(user._id);
          });
        });

        // console.log(users);
        return res.status(200).json({
          status: "success",
          data: out,
        });
      } catch (error) {
        return res.status(400).json({
          status: "error",
        });
        // console.log("error");
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
      out = [];
      try {
        const users = await UserModel.find({ usertype: "Customer" });
        const blockusers = await UserStatusModel.find({ isblocked: true });

        const out = users.filter((user) => {
          return blockusers.some((blockuser) => {
            return blockuser.userid.equals(user._id);
          });
        });

        // console.log(users);
        return res.status(200).json({
          status: "success",
          data: out,
        });
      } catch (error) {
        return res.status(400).json({
          status: "error",
        });
        // console.log("error");
      }
    }
};

const getAllCollections = async (req, res) => {
  // console.log("hello");
  const { usertype } = req.data;

    try {
      const collections = await CollectionModel.find();
  
      // console.log(collections);
      return res.status(200).json({
        status: "success",
        collections: collections,
      });
    } catch (error) {
      // console.log("error: ", error);
    }
  }


const getCollectionName = async (req, res) => {
  const { usertype } = req.data;

  if (usertype !== "Customer") {
    return res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    const { collectionID } = req.body;
    console.log("collectionID", collectionID);
    try {
      const collection = await CollectionModel.findOne({
        _id: collectionID,
      });
      console.log("collection", collection);
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
  }

};

const getUserActivityDetails = async (req, res) => {
  console.log("In get User Activity Details");

  const {walletAddress} = req.params;
  console.log("walletAddress", walletAddress);
  const {usertype} = req.data;

  if(usertype !== "Customer"){
    return res.status(401).json({
      message: "Unauthorized",
    });
  }else{
    const dataArray = [];
    const resultArray = [];
    try {
      const user = await UserModel.findOne({ walletaddress: walletAddress });
      console.log("user", user);
      if (user) {
        const userActivity = await ActivityModel.find({ userid: user._id });
        
        if (userActivity) {
          for (var i = 0; i < userActivity.length; i++) {
            const activityDetails = await ActivityDetailsModel.findOne({
              activityId: userActivity[i]._id,
            }).populate("activityId");
            // console.log("activityDetails", activityDetails);
            dataArray.push(activityDetails);
          }
          console.log("resultArray", resultArray);

          for (var i = 0; i < dataArray.length; i++){
            item = dataArray[i];
            resultArray.push({
              activitytype: item.activityId.activitytype,
              NFTid: item.activityId.NFTid,
              price: item.price,
              fromwalletaddress: item.fromwalletaddress,
              towalletaddress: item.towalletaddress,
              time: item.time,
              transactionhash: item.transactionhash
            })
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
    }catch(err){
      console.log(err);
      return res.status(400).json({
        message: err,
      });
    }
}
  
};
const saveUserActivity = async (req, res) => {
  console.log("in save user activity");
  console.log(req.body);

  //Access authentincate data
  const {usertype} = req.data;

  if (usertype === "Customer") {
    try {
      const user  = await UserModel.findOne({walletaddress: req.body.transaction.from});
      console.log("user", user);
      if(user){
        const userId = user._id;
        console.log("Inside user userId", userId);
        //Create a new activity
        console.log("Activity type is",req.body.activityType)
        console.log("NFT id is",parseInt(req.body.tokenID.tokenId.hex, 16)) 
        const newActivity = await ActivityModel.create({
          userid: userId,
          activitytype: req.body.activityType,
          NFTid: (parseInt(req.body.tokenID.tokenId.hex, 16)).toString(),
        });
  
        console.log("new activity", newActivity);
        if (newActivity) {
          console.log("new activity created transfer");
          //Create a new activity details for the new activity
          const Price = parseInt(req.body.transaction.value.hex, 16)
  
          if(req.body.activityType === "minted"){
            console.log("Inside minted");
            const newActivityDetails = await ActivityDetailsModel.create({
              activityId: newActivity._id,
              price: Price,
              fromwalletaddress: '0x0000...',
              towalletaddress: req.body.transaction.from,
              time: req.body.transactionTime,
              transactionhash: req.body.transaction.hash,
            });
  
            if (newActivityDetails) {
              return res.status(200).json({
                message: "success",
              });
            }else{
              return res.status(400).json({
                message: "error",
              });
            }
  
          }else if(req.body.activityType === "transferred"){
            console.log("Inside transferred");
            const newActivityDetails = await ActivityDetailsModel.create({
              activityId: newActivity._id,
              price: Price,
              fromwalletaddress: '0x0000...',
              towalletaddress: req.body.tokenID.seller,
              time: req.body.transactionTime,
              transactionhash: req.body.transaction.hash,
            });
  
            if (newActivityDetails) {
              console.log("new activity details created transfer");
              return res.status(200).json({
                message: "success",
              });
            }else{
              return res.status(400).json({
                message: "error",
              });
            }
  
          }else if(req.body.activityType === "bought"){
            console.log("Inside bought");
            const newActivityDetails = await ActivityDetailsModel.create({
              activityId: newActivity._id,
              price: Price,
              fromwalletaddress: req.body.tokenID.seller,
              towalletaddress: '0x0000...' ,
              time: req.body.transactionTime,
              transactionhash: req.body.transaction.hash,
            });
  
            if (newActivityDetails) {
              return res.status(200).json({
                message: "success",
              });
            }else{
              return res.status(400).json({
                message: "error",
              });
            }
  
          }else if(req.body.activityType === "listed"){
            console.log("Inside listed");
            const newActivityDetails = await ActivityDetailsModel.create({
              activityId: newActivity._id,
              price: Price,
              fromwalletaddress: '0x0000...',
              towalletaddress: '-',
              time: req.body.transactionTime,
              transactionhash: req.body.transaction.hash,
            });
  
            if (newActivityDetails) {
              return res.status(200).json({
                message: "success",
              });
            }else{
              return res.status(400).json({
                message: "error",
              });
            }
          
          } else {
            
            console.log("activity type not found");
            return res.status(400).json({
              message: "Activity type not found",
              
            });
          }
  
        }else{
          return res.status(400).json({
            message: "error",
          });
        }
      }else{
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
      status : 401
    });
  }

};

const handleBlockUser = async (req, res) => {
  const {usertype} = req.data;
  if (usertype !== "Admin") {
    return res.status(401).json({
      message: "You are not authorized to perform this action",
      status : 401
    });
  }else{
    try {
      const { id } = req.params;
      const blockuser = await UserStatusModel.create({
        userid: id,
        isblocked: true,
      });
  
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
  const {usertype} = req.data;
  if (usertype !== "Admin") {
    return res.status(401).json({
      message: "You are not authorized to perform this action",
      status : 401
    });
  }else{
    try {
      const { id } = req.params;
      const blockuser = await UserStatusModel.findOneAndDelete({
        userid: id,
      });
  
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
  console.log("in get reports");

  const { usertype } = req.data;

  if (usertype !== "Admin") {
    return res.status(401).json({
      message: "You are not authorized to perform this action",
      status : 401
    });
  }else{
    const out = [];
    try {
      console.log("in try");
      const reports = await ReportModel.find();
      console.log(1);
      for (let i = 0; i < reports.length; i++) {
        const fromuser = await UserModel.findOne({ _id: reports[i].fromuserid });
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
  const usertype = req.data;

  if (usertype !== "Admin") {
    return res.status(401).json({
      message: "You are not authorized to perform this action",
      status : 401
    });
  }else{
    try {
      const { id } = req.params;
      const report = await ReportModel.findOneAndDelete({ _id: id });
  
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

module.exports = {
  updateUserDetails,
  getAllUsers,
  createCollection,
  getAllCollections,
  saveUserActivity,
  getUserActivityDetails,
  handleBlockUser,
  getAllBlockedUsers,
  handleUnblockUser,
  getCollectionName,
  getReports,
  handleDeleteReport,
};
