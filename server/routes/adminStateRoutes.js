const express = require("express");
const router = express.Router();

const verifyAdmin = require("../middlewares/auth.middleware");
const {
  createState,
  updateState,
  deleteState,
} = require("../controllers/adminStateController");

// 🔒 ADMIN-ONLY ROUTES
router.post("/", verifyAdmin, createState);
router.put("/:id", verifyAdmin, updateState);
router.delete("/:id", verifyAdmin, deleteState);

module.exports = router;
