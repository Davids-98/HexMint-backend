const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");

router.post("/add-admin", adminController.handleAddAdmin);
router.post(
  "/update-admin-details",
  authController.authenticate,
  adminController.handleUpdateAdmin
);
router.get("/get-admin-details", adminController.getAdminDetails);
router.get("/get-admin-requests", adminController.getAdminRequests);
router.post("/approve-request/:id", adminController.approveRequest);
router.delete("/decline-request/:id", adminController.declineRequest);
router
  .post("/add-admin", adminController.handleAddAdmin)
  .get("/get-all-admins", adminController.getAllAdmins)
  .delete("/delete-admin/:id", adminController.deleteAdmin);

module.exports = router;
