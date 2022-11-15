// const UserModel = require("../models/UserModel");
// const AdminDetailsModel = require("../models/AdminDetailsModel");

// //Get the user's user type by user's wallet address
// const getUserType = async (req, res) => {
//   // console.log("get user type calling");
//   const { walletAddress } = req.query;

//   try {
//     const user = await UserModel.findOne({ walletaddress: walletAddress });
//     // console.log(user)
//     if (user) {
//       return res.status(200).json({
//         message: "Successfully Fetched!",
//         usertype: user.usertype,
//         status: 200,
//       });
//     } else {
//       return res.status(400).json({
//         message: "Error Occured!",
//         status: 400,
//       });
//     }
//   } catch (err) {
//     return res.status(500).json({
//       message: "Error Occured!",
//     });
//   }
// };

// const getUserDetails = async (req, res) => {
//   const { walletAddress } = req.query;

//   // console.log("in the get user",walletAddress)
//   // console.log(typeof(walletAddress))

//   try {
//     const user = await UserModel.findOne({ walletaddress: walletAddress });
//     // console.log(user)
//     if (user) {
//       if (user.usertype === "Customer") {
//         return res.status(200).json({
//           message: "Successfully Fetched!",
//           name: user.name,
//           username: user.username,
//           usertype: user.usertype,
//           propic: user.propic,
//           status: 200,
//         });
//       } else {
//         // console.log("I am a admin")
//         const admin = await AdminDetailsModel.findOne({
//           userid: user._id,
//         }).populate("userid");
//         // console.log("admin", admin);

//         return res.status(200).json({
//           message: "Successfully Fetched!",
//           name: admin.userid.name,
//           username: admin.userid.username,
//           usertype: admin.userid.usertype,
//           propic: admin.userid.propic,
//           email: admin.email,
//           mobilenumber: admin.mobilenumber,
//           DOB: admin.DOB,
//           status: 200,
//         });
//       }
//     } else {
//       return res.status(400).json({
//         message: "Error Occured!",
//         status: 400,
//       });
//     }
//   } catch (err) {
//     return res.status(400).json({
//       message: err,
//     });
//   }
// };

// module.exports = {
//   getUserDetails,
//   getUserType,

// };

const UserModel = require("../models/UserModel");
const AdminDetailsModel = require("../models/AdminDetailsModel");

//Get the user's user type by user's wallet address
// const getUserType = async (req, res) => {
//   // console.log("get user type calling");
//   const { walletAddress } = req.query;

//   try {
//     const user = await UserModel.findOne({ walletaddress: walletAddress });
//     console.log(user);
//     if (user) {
//       return res.status(200).json({
//         message: "Successfully Fetched!",
//         usertype: user.usertype,
//         status: 200,
//       });
//     } else {
//       return res.status(400).json({
//         message: "Error Occured!",
//         status: 400,
//       });
//     }
//   } catch (err) {
//     return res.status(500).json({
//       message: "Error Occured!",
//     });
//   }
// };

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
      // console.log(user)
      if (user) {
        if (user.usertype === "Customer") {
          return res.status(200).json({
            message: "Successfully Fetched!",
            name: user.name,
            username: user.username,
            usertype: user.usertype,
            propic: user.propic,
            status: 200,
          });
        } else {
          console.log("I am a admin");
          const admin = await AdminDetailsModel.findOne({
            userid: user._id,
          }).populate("userid");
          console.log("admin", admin);

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
  const { usertype } = req.data;
  if (usertype === "Super Admin") {
    return res.status(401).json({
      message: "Unauthorized Access!",
      status: 401,
    });
  } else {
    try {
      const user = await UserModel.findOne({ _id: userid });
      // console.log(user)
      if (user) {
        if (user.usertype === "Customer") {
          return res.status(200).json({
            message: "Successfully Fetched!",
            name: user.name,
            username: user.username,
            usertype: user.usertype,
            propic: user.propic,
            status: 200,
          });
        } else {
          console.log("I am a admin");
          const admin = await AdminDetailsModel.findOne({
            userid: user._id,
          }).populate("userid");
          console.log("admin", admin);

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

module.exports = {
  getUserDetailsFromWalletAddress,
  getUserDetailsFromUserId,
};
