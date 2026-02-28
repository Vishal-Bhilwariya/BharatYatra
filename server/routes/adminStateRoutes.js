const express = require("express");
const router = express.Router();

const verifyAdmin = require("../middlewares/auth.middleware");
const {
  createState,
  updateState,
  deleteState,
  getAllStates,
  getStateById,
  toggleStateActive,
  bulkUpdateStateImages,
} = require("../controllers/adminStateController");
const { bulkUploadStates } = require("../controllers/adminBulkUploadStateController");

// 🔒 ADMIN-ONLY ROUTES
router.get("/", verifyAdmin, getAllStates);
router.get("/:id", verifyAdmin, getStateById);
router.post("/", verifyAdmin, createState);
// IMPORTANT: bulk-upload must come before /:id routes to avoid route conflicts
router.post("/bulk-upload", verifyAdmin, ...bulkUploadStates);
router.post("/bulk-update-images", bulkUpdateStateImages); // one-time no-auth for easy use
router.put("/:id", verifyAdmin, updateState);
router.patch("/:id/toggle-active", verifyAdmin, toggleStateActive);
router.delete("/:id", verifyAdmin, deleteState);

module.exports = router;
