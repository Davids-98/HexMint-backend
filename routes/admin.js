const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/add-admin", adminController.handleAddAdmin);
router.post("/update-admin-details", adminController.handleUpdateAdmin);
router.get("/get-admin-details", adminController.getAdminDetails);
router
  .post("/add-admin", adminController.handleAddAdmin)
  .get("/get-all-admins", adminController.getAllAdmins)
  .delete("/delete-admin/:id", adminController.deleteAdmin);


module.exports = router;
