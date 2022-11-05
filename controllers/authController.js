const UserModel = require("../models/UserModel");

const handleConnectWallet = async (req, res) => {
  // console.log("handle connect wallet calling ")
  const { walletaddress } = req.body;
  console.log("wallet address", walletaddress);

  try {
    const user = await UserModel.findOne({
      walletaddress: walletaddress["address"],
    });

    if (user) {
      return res.status(200).json({
        message: "success",
        userType: user.usertype,
      });
    } else {
      const newUser = await UserModel.create({
        walletaddress: walletaddress["address"],
        usertype: "Customer",
        name: "Customer",
        username: "Customer",
        propic: null,
      });
      return res.status(201).json({
        userType: newUser.usertype,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "error",
    });
  }
};

module.exports = {
  handleConnectWallet,
};
