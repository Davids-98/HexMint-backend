const ActivityModel = require("../models/ActivityModel");
const ActivityDetailsModel = require("../models/ActivityDetailsModel");
const UserController = require("./userController");
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
    // console.log("countArray: ", countArray, activityType);
    try {
      const activities = await ActivityModel.find({
        activitytype: activityType,
      });
      console.log(
        "activities################################################: ",
        activities
      );
      for (var i = 0; i < activities.length; i++) {
        const activity = await ActivityDetailsModel.findOne({
          activityId: activities[i]._id,
        });
        console.log(
          "activity####################################################: ",
          activity
        );
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
      console.log("Result:..................................... ", result);
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
  console.log("geTopUsers", userType);
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
    // console.log;
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
    // console.log("users: ", users);
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
    // console.log("sorted_users: ", sorted_users);

    const result = [];
    const sorted_users_keys = Object.keys(sorted_users);
    let usersLimit;
    if (sorted_users_keys.length >= 8) {
      usersLimit = 8;
    } else {
      usersLimit = sorted_users_keys.length;
    }
    console.log("sorted user keys: ", sorted_users_keys);
    for (var i = 0; i < usersLimit; i++) {
      console.log("sorted_users[i]: ", sorted_users_keys[i]);
      const user = await UserModel.findOne({
        walletaddress: sorted_users_keys[i],
      });
      // console.log("user: ... .. . . . ", user);
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
        console.log("element: ", element);
        result.push(element);
      }
    }
    console.log("resilt: ", result);
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

module.exports = {
  getNFTCount,
  getBalance,
  geTopUsers,
};
