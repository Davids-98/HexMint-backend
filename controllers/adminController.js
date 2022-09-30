const UserModel = require("../models/UserModel");
const AdminDetailsModel = require("../models/AdminDetailsModel");

const handleAddAdmin = async (req, res) => {
  console.log("handle add admin calling, ", req.body);
  const { name, walletaddress, email, mobilenumber, DOB } = req.body;
  console.log("passing data", name, walletaddress, email, mobilenumber, DOB);

  try {
    const user = await UserModel.findOne({
      walletaddress: walletaddress,
    });

    if (user) {
      return res.status(200).json({
        message: "already exists with this wallet address!",
        AdminName: user.name,
      });
    } else {
      const newUser = await UserModel.create({
        walletaddress: walletaddress,
        usertype: "Admin",
        name: name,
        username: "Admin",
        propic: null,
      });
      return res.status(201).json({
        message: "successfully added!",
        name: newUser.name,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "error",
    });
  }
};

module.exports = {
  handleAddAdmin,
};
