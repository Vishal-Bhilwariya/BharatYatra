const express = require("express");
const router = express.Router();

const verifyAdmin = require("../middlewares/auth.middleware");
const {
  createTransport,
  updateTransport,
  deleteTransport,
  getAllTransports,
  getTransportById,
  toggleTransportActive,
} = require("../controllers/adminTransportController");
const { bulkUploadTransports } = require("../controllers/adminBulkUploadTransportController");

router.get("/", verifyAdmin, getAllTransports);
router.get("/:id", verifyAdmin, getTransportById);
router.post("/", verifyAdmin, createTransport);
router.post("/bulk-upload", verifyAdmin, bulkUploadTransports);
router.put("/:id", verifyAdmin, updateTransport);
router.patch("/:id/toggle-active", verifyAdmin, toggleTransportActive);
router.delete("/:id", verifyAdmin, deleteTransport);

module.exports = router;
