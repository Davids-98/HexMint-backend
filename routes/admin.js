const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");

router.post(
  "/add-admin",
  authController.authenticate,
  adminController.handleAddAdmin
);

router.post(
  "/update-admin-details",
  authController.authenticate,
  adminController.handleUpdateAdmin
);

router.get(
  "/get-admin-details",
  authController.authenticate,
  adminController.getAdminDetails
);
router.get(
  "/get-admin-requests",
  authController.authenticate,
  adminController.getAdminRequests
);
router.post(
  "/approve-request/:id",
  authController.authenticate,
  adminController.approveRequest
);
router.delete(
  "/decline-request/:id",
  authController.authenticate,
  adminController.declineRequest
);
router
  .post(
    "/add-admin",
    authController.authenticate,
    adminController.handleAddAdmin
  )
  .get(
    "/get-all-admins",
    authController.authenticate,
    adminController.getAllAdmins
  )
  .delete(
    "/delete-admin/:id",
    authController.authenticate,
    adminController.deleteAdmin
  );

module.exports = router;
