const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router
  .post("/update-details", customerController.updateUserDetails)
  .get("/get-all-customers", customerController.getAllUsers)
  .get("/get-collection-count", customerController.getAllCollections)
  .post("/create-collection", customerController.createCollection)
  .post("/save-user-activity", customerController.saveUserActivity)
  .post("/block-user/:id", customerController.handleBlockUser)
  .get("/get-all-blocked-users", customerController.getAllBlockedUsers)
  .delete("/unblock-user/:id", customerController.handleUnblockUser)
  .post("/get-collection-name", customerController.getCollectionName)
  .get("/get-reports", customerController.getReports)
  .delete("/delete-report/:id", customerController.handleDeleteReport);
  
module.exports = router;
