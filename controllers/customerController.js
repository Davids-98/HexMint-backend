const UserModel = require("../models/UserModel");

//update user details
const updateUserDetails = async (req, res) => {
  console.log("walletaddress", req.body);
  console.log("update user details calling");
  const { walletaddress, name, username, propic } = req.body;
  console.log("wallet address", walletaddress);
  // var profilepic = Buffer.from(propic, 'base64')

  //update user details

  try {
    const user = await UserModel.findOneAndUpdate(
      { walletaddress: walletaddress },
      {
        name: name,
        username: username,
        propic: {
          data: propic,
          contentType: "image/png",
        },
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
};

const getAllUsers = async (req, res) => {
  console.log("hello");
  try {
    const users = await UserModel.find({ usertype: "Customer" });

    console.log(users);
    return res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
    });
    console.log("error");
  }
};

module.exports = {
  updateUserDetails,
  getAllUsers,
};
