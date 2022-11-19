const express = require("express");
const router = express.Router();
const userController = require("../controllers/dashboardController");
const authController = require("../controllers/authController");

router.get(
  "/get-nft-count/:activityType",
  authController.authenticate,
  userController.getNFTCount
);

router.get(
  "/get-balance/:balanceType",
  authController.authenticate,
  userController.getBalance
);

router.get("/get-top-users/:userType", userController.geTopUsers);
module.exports = router;
