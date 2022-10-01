const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router
  .post("/add-admin", adminController.handleAddAdmin)
  .get("/get-all-admins", adminController.getAllAdmins);

module.exports = router;
