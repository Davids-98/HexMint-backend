const UserModel = require("../models/UserModel");
const AdminDetailsModel = require("../models/AdminDetailsModel");
const AdminUpdatingDetailsModel = require("../models/AdminUpdatingDetailsModel");

const handleAddAdmin = async (req, res) => {
  const { usertype } = req.data;
  const { name, walletaddress, email, mobilenumber, DOB } = req.body;
  if (usertype === "Super Admin") {
    try {
      const user = await UserModel.findOne({
        walletaddress: walletaddress,
      });

      if (user) {
        return res.status(200).json({
          message: "Already exists with this Wallet Address!",
          AdminName: user.name,

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
          email: newAdmin.email,
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: "error",
        message: "Error Occured!",
      });
    }
  } else {
    return res.status(401).json({
      message: "Unauthorized!",
      status: 401,
    });
  }
};

const handleUpdateAdmin = async (req, res) => {
  const { walletaddress, email, mobilenumber, propic } = req.body;
  const { usertype } = req.data;
  if (usertype !== "Admin") {
    return res.status(401).json({
      message: "Unauthorized!",
    });
  } else {
    try {
      //Update userModel and adminDetailsModel
      const user = await UserModel.findOne({ walletaddress: walletaddress });
      const request = await AdminUpdatingDetailsModel.findOne({
        userid: user._id,
      });
      if (request) {
        return res.status(202).json({
          message: "Already exists a request with this Wallet Address!",
        });
      } else {
        if (user) {
          if (user.usertype === "Admin") {
            const newAdminUpdatingDetails =
              await AdminUpdatingDetailsModel.create({
                userid: user._id,
                email: email,
                mobilenumber: mobilenumber,
                propic: propic,
              });

            if (newAdminUpdatingDetails) {
              return res.status(200).json({
                message: "Successfully Updated!",
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
        } else {
          return res.status(400).json({
            message: "Error Occured!",
            status: 400,
          });
        }
      }
    } catch (err) {
      return res.status(500).json({
        message: "Error Occured!",

        status: 500,
      });
    }
  }
};

const getAllAdmins = async (req, res) => {
  const { usertype } = req.data;
  if (usertype === "Super Admin") {
    const out = [];

    try {
      const users = await UserModel.find({ usertype: "Admin" });
      for (var i = 0; i < users.length; i++) {
        const admin = await AdminDetailsModel.findOne({
          userid: users[i]._id,
        }).populate("userid");
        out.push(admin);
      }

      return res.status(200).json({
        status: "success",
        data: out,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error Occured!",
      });
    }
  } else {
    return res.status(401).json({
      message: "Unauthorized!",
      status: 401,
    });
  }
};

const getAdminDetails = async (req, res) => {
  const { walletaddress } = req.body;
  const { usertype } = req.data;
  if (usertype === "Admin") {
    try {
      const user = await UserModel.findOne({ walletaddress: walletaddress });

      const admin = await AdminDetailsModel.findOne({
        userid: user._id,
      }).populate("userid");

      return res.status(200).json({
        message: "Successfully Fetched!",
        data: admin,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error Occured!",
      });
    }
  } else {
    return res.status(401).json({
      message: "Unauthorized!",
      status: 401,
    });
  }
};

const deleteAdmin = async (req, res) => {
  const { usertype } = req.data;
  if (usertype === "Super Admin") {
    try {
      const { id } = req.params;

      const admin = await AdminDetailsModel.deleteOne({ userid: id });
      const user = await UserModel.deleteOne({ _id: id });

      return res.status(200).json({
        message: "Successfully Deleted!",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error Occured!",
      });
    }
  } else {
    return res.status(401).json({
      message: "Unauthorized!",
      status: 401,
    });
  }
};

const getAdminRequests = async (req, res) => {
  const out = [];
  const { usertype } = req.data;
  if (usertype === "Super Admin") {
    try {
      const requests = await AdminUpdatingDetailsModel.find();

      for (var i = 0; i < requests.length; i++) {
        const user = await UserModel.findOne({ _id: requests[i].userid });
        if (user) {
          const admin = await AdminDetailsModel.findOne({
            userid: requests[i].userid,
          });
          const obj = {
            userid: requests[i].userid,
            walletaddress: user.walletaddress,
            name: user.name,
            DOB: admin.DOB,
            exist: {
              email: admin.email,
              mobilenumber: admin.mobilenumber,
              propic: admin.propic,
            },
            new: {
              email: requests[i].email,
              mobilenumber: requests[i].mobilenumber,
              propic: requests[i].propic,
            },
          };
          out.push(obj);
        }
      }
      return res.status(200).json({
        status: "ok",
        message: "Successfully Fetched!",
        data: out,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error Occured!",
      });
    }
  } else {
    return res.status(401).json({
      message: "Unauthorized!",
      status: 401,
    });
  }
};

const approveRequest = async (req, res) => {
  const { usertype } = req.data;
  if (usertype === "Super Admin") {
    try {
      const { id } = req.params;
      const request = await AdminUpdatingDetailsModel.findOneAndDelete({
        userid: id,
      });
      const user = await UserModel.findOneAndUpdate(
        { _id: id },
        { propic: request.propic },
        { new: true }
      );
      const admin = await AdminDetailsModel.findOneAndUpdate(
        { userid: id },
        { email: request.email, mobilenumber: request.mobilenumber },
        { new: true }
      );

      return res.status(200).json({
        data: { user: user, admin: admin },
        message: "Successfully Approved!",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error Occured!",
      });
    }
  } else {
    return res.status(401).json({
      message: "Unauthorized!",
      status: 401,
    });
  }
};

const declineRequest = async (req, res) => {
  const { usertype } = req.data;
  if (usertype === "Super Admin") {
    try {
      const { id } = req.params;
      const request = await AdminUpdatingDetailsModel.findOneAndDelete({
        userid: id,
      });

      return res.status(200).json({
        data: request,
        message: "Successfully Rejected!",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error Occured!",
      });
    }
  } else {
    return res.status(401).json({
      message: "Unauthorized!",
      status: 401,
    });
  }
};

module.exports = {
  handleAddAdmin,
  getAdminDetails,
  handleUpdateAdmin,
  getAllAdmins,
  deleteAdmin,
  getAdminRequests,
  approveRequest,
  declineRequest,
};
