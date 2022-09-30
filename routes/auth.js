const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/connect-wallet", authController.handleConnectWallet);

module.exports = router;
