const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const authController = require("../controllers/authController");

router

  .post(
    "/update-details",
    authController.authenticate,
    customerController.updateUserDetails
  )
  .get(
    "/get-all-customers",
    authController.authenticate,
    customerController.getAllUsers
  )
  .get("/get-collection-count", customerController.getAllCollections)
  .post(
    "/create-collection",
    authController.authenticate,
    customerController.createCollection
  )
  .post(
    "/create-collection-owner",
    authController.authenticate,
    customerController.createCollectionOwner
  )
  .post(
    "/save-user-activity",
    authController.authenticate,
    customerController.saveUserActivity
  )
  .get(
    "/get-user-activity-details/:walletAddress",
    authController.authenticate,
    customerController.getUserActivityDetails
  )
  .post(
    "/block-user/:id",
    authController.authenticate,
    customerController.handleBlockUser
  )
  .get(
    "/get-all-blocked-users",
    authController.authenticate,
    customerController.getAllBlockedUsers
  )
  .delete(
    "/unblock-user/:id",
    authController.authenticate,
    customerController.handleUnblockUser
  )
  .post(
    "/get-collection-name",
    authController.authenticate,
    customerController.getCollectionName
  )
  .get(
    "/get-reports",
    authController.authenticate,
    customerController.getReports
  )
  .delete(
    "/delete-report/:id",
    authController.authenticate,
    customerController.handleDeleteReport
  )
  .get(
    "/get-customer-details-from-wallet-address/:walletaddress",
    authController.authenticate,
    customerController.getCustomerDetailsFromWalletAddress
  )
  .post(
    "/report-seller",
    authController.authenticate,
    customerController.handleReportSeller
  )

module.exports = router;
