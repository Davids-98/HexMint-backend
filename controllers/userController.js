const UserModel = require("../models/UserModel");

//Get the user's user type by user's wallet address
const getUserType = async (req, res) => {
  const { walletAddress } = req.query;

  console.log("in the get user", walletAddress);
  console.log(typeof walletAddress);
  try {
    const user = await UserModel.findOne({ walletaddress: walletAddress });
    console.log(user);
    if (user) {
      console.log(user);
      return res.status(200).json({
        message: "success",
        userType: user.usertype,
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

module.exports = {
  getUserType,
};
