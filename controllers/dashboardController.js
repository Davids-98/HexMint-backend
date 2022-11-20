const ActivityModel = require("../models/ActivityModel");
const ActivityDetailsModel = require("../models/ActivityDetailsModel");
const UserModel = require("../models/UserModel");

const getNFTCount = async (req, res) => {
  const { usertype } = req.data;
  const { activityType } = req.params;
  if (usertype === "Super Admin" || usertype === "Admin") {
    const dateScale = 7;
    const countArray = {};
    const date_ = new Date();
    for (var i = 0; i < dateScale; i++) {
      const key = date_.getMonth() + "/" + date_.getDate();
      countArray[key] = 0;
      date_.setTime(date_.getTime() - 24 * 3600 * 1000);
    }

    try {
      const activities = await ActivityModel.find({
        activitytype: activityType,
      });

      for (var i = 0; i < activities.length; i++) {
        const activity = await ActivityDetailsModel.findOne({
          activityId: activities[i]._id,
        });

        const date = new Date(activity.createdAt);
        const key = date.getMonth() + "/" + date.getDate();
        if (countArray[key] !== undefined) {
          countArray[key] = countArray[key] + 1;
        }
      }

      const result = {
        date: Object.keys(countArray).reverse(),
        data: Object.values(countArray).reverse(),
      };

      return res.status(200).json({
        status: "success",
        data: result,
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

const getBalance = async (req, res) => {
  const { usertype } = req.data;
  const { balanceType } = req.params;
  if (usertype === "Super Admin" || usertype === "Admin") {
    const dateScale = 7;
    const countArray = {};
    const date = new Date();
    for (var i = 0; i < dateScale; i++) {
      const key = date.getMonth() + "/" + date.getDate();
      countArray[key] = 0;
      date.setTime(date.getTime() - 24 * 3600 * 1000);
    }

    try {
      const activities = await ActivityModel.find({
        activitytype: "bought",
      });

      for (var i = 0; i < activities.length; i++) {
        const activity = await ActivityDetailsModel.findOne({
          activityId: activities[i]._id,
        });
        const date = new Date(activity.createdAt);
        const key = date.getMonth() + "/" + date.getDate();
        if (balanceType === "bought") {
          countArray[key] = countArray[key] + activity.price;
        } else {
          countArray[key] = countArray[key] + activity.profit;
        }
      }
      const result = {
        date: Object.keys(countArray).reverse(),
        data: Object.values(countArray).reverse(),
      };
      return res.status(200).json({
        status: "success",
        data: result,
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

const geTopUsers = async (req, res) => {
  const { userType } = req.params;
  try {
    const users = {};
    let activities;
    if (userType === "creator") {
      activities = await ActivityModel.find({
        activitytype: "minted",
      });
    } else {
      activities = await ActivityModel.find({
        activitytype: "bought",
      });
    }
    for (var i = 0; i < activities.length; i++) {
      const activity = await ActivityDetailsModel.findOne({
        activityId: activities[i]._id,
      });
      if (userType === "seller") {
        if (users[activity.fromwalletaddress]) {
          users[activity.fromwalletaddress] =
            users[activity.fromwalletaddress] + 1;
        } else {
          users[activity.fromwalletaddress] = 1;
        }
      } else {
        if (users[activity.towalletaddress]) {
          users[activity.towalletaddress] = users[activity.towalletaddress] + 1;
        } else {
          users[activity.towalletaddress] = 1;
        }
      }
    }
    var tuples = [];
    const sorted_users = {};

    for (var key in users) tuples.push([key, users[key]]);

    tuples.sort(function (a, b) {
      return b[1] - a[1];
    });

    for (var i = 0; i < tuples.length; i++) {
      var key = tuples[i][0];
      var value = tuples[i][1];
      sorted_users[key] = value;
    }

    const result = [];
    const sorted_users_keys = Object.keys(sorted_users);
    let usersLimit;
    if (sorted_users_keys.length >= 8) {
      usersLimit = 8;
    } else {
      usersLimit = sorted_users_keys.length;
    }

    for (var i = 0; i < usersLimit; i++) {
      const user = await UserModel.findOne({
        walletaddress: sorted_users_keys[i],
      });
      if (user) {
        let element;
        if (userType === "seller") {
          element = {
            id: i,
            sellerName: user.name,
            sellerWalletAddress:
              sorted_users_keys[i].slice(0, 9) +
              "..." +
              sorted_users_keys[i].slice(38, 42),
            sellerImage: user.propic,
          };
        } else if (userType === "buyer") {
          element = {
            id: i,
            buyerName: user.name,
            buyerWalletAddress:
              sorted_users_keys[i].slice(0, 9) +
              "..." +
              sorted_users_keys[i].slice(38, 42),
            buyerImage: user.propic,
          };
        } else {
          element = {
            id: i,
            creatorName: user.name,
            creatorWalletAddress:
              sorted_users_keys[i].slice(0, 9) +
              "..." +
              sorted_users_keys[i].slice(38, 42),
            creatorImage: user.propic,
          };
        }
        result.push(element);
      }
    }
    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error Occured!",
    });
  }
};

const getTotalBalance = async (req, res) => {
  const { usertype } = req.data;
  if (usertype === "Super Admin" || usertype === "Admin") {
    let balance = 0;

    try {
      const activities = await ActivityModel.find({
        activitytype: "bought",
      });

      for (var i = 0; i < activities.length; i++) {
        const activity = await ActivityDetailsModel.findOne({
          activityId: activities[i]._id,
        });
        balance += activity.price;
      }
      return res.status(200).json({
        status: "success",
        data: balance.toFixed(5),
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
  getNFTCount,
  getBalance,
  geTopUsers,
  getTotalBalance,
};
