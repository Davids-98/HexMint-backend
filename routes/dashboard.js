const express = require("express");
const router = express.Router();
const userController = require("../controllers/dashboardController");
const authController = require("../controllers/authController");

router.get(
  "/get-nft-count",
  authController.authenticate,
  userController.getNFTCount
);

router.get(
  "/get-balance",
  authController.authenticate,
  userController.getBalance
);

router.get(
  "/get-top-users",
  userController.geTopUsers
);
module.exports = router;
