// const express = require("express");
// const router = express.Router();
// const userController = require('../controllers/userController');


// router.get('/user-details', userController.getUserDetails)
//     // .get('/user-type', userController.getUserType)


// router.get("/user-type", userController.getUserType);

// module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/user-details-from-walletaddress', userController.getUserDetailsFromWalletAddress)
router.get('/user-details-from-userid', userController.getUserDetailsFromUserId)


router.get("/user-type", userController.getUserType);

module.exports = router;
