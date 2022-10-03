const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router
    .get('/user-details', userController.getUserDetails)
    // .get('/user-type', userController.getUserType)


module.exports = router;
