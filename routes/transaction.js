const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const authController = require("../controllers/authController");
const transactionController = require("../controllers/transactionController");

router.post(
  "/mint-nft",
  authController.authenticate,
  transactionController.mintNFT
);
