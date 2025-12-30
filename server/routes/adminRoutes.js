const express = require("express");
const router = express.Router();

const { loginAdmin } = require("../controllers/adminController");
const verifyAdmin = require("../middlewares/auth.middleware");

// PUBLIC ROUTE
router.post("/login", loginAdmin);

// 🔒 PROTECTED TEST ROUTE
router.get("/test", verifyAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin middleware working",
    adminId: req.adminId,
  });
});

module.exports = router;
