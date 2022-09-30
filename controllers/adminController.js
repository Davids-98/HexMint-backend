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
        message: "Already exists with this Wallet Address!",
        AdminName: user.name,
        status: 200,
        view: user,
      });
    } else {
      const newUser = await UserModel.create({
        walletaddress: walletaddress,
        usertype: "Admin",
        name: name,
        username: "Admin",
        propic: null,
      });

      const newAdmin = await AdminDetailsModel.create({
        userid: newUser._id,
        email: email,
        DOB: DOB,
        mobilenumber: mobilenumber,
      });

      return res.status(201).json({
        message: "Successfully Added!",
        name: newUser.name,
        status: 201,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error Occured!",
    });
  }
};

module.exports = {
  handleAddAdmin,
};
