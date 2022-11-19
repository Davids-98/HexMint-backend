const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const authController = require("../controllers/authController");

router.get(
  "/get-nft-count/:activityType",
  authController.authenticate,
  dashboardController.getNFTCount
);

router.get(
  "/get-balance/:balanceType",
  authController.authenticate,
  dashboardController.getBalance
);

router.get(
  "/get-total-balance",
  authController.authenticate,
  dashboardController.getTotalBalance
);

router.get("/get-top-users/:userType", dashboardController.geTopUsers);
module.exports = router;
