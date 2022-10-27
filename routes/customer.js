const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router
  .post("/update-details", customerController.updateUserDetails)
  .get("/get-all-customers", customerController.getAllUsers)
  .get("/get-collection-count", customerController.getAllCollections)
  .post("/create-collection", customerController.createCollection);

module.exports = router;
