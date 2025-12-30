const express = require("express");
const router = express.Router();

const verifyAdmin = require("../middlewares/auth.middleware");
const {
  createTransport,
  updateTransport,
  deleteTransport,
  getAllTransports,
  getTransportById,
} = require("../controllers/adminTransportController");

router.get("/", verifyAdmin, getAllTransports);
router.get("/:id", verifyAdmin, getTransportById);
router.post("/", verifyAdmin, createTransport);
router.put("/:id", verifyAdmin, updateTransport);
router.delete("/:id", verifyAdmin, deleteTransport);

module.exports = router;
