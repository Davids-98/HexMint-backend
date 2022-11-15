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
  authController.authenticate,
  userController.getUserDetailsFromUserId
);

router.get(
  "/user-type",
  authController.authenticate,
  userController.getUserType
);

module.exports = router;
