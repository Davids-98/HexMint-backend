const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.get(
  "/user-details-from-walletaddress",
  authController.authenticate,
  userController.getUserDetailsFromWalletAddress
);
router.get(
  "/user-details-from-userid",
  userController.getUserDetailsFromUserId
);
router.get("/time-auction-details", userController.getTimeAuctionDetails);

module.exports = router;
