const express = require("express");
const router = express.Router();

const verifyAdmin = require("../middlewares/auth.middleware");
const {
  createTransport,
  updateTransport,
  deleteTransport,
} = require("../controllers/adminTransportController");

router.post("/", verifyAdmin, createTransport);
router.put("/:id", verifyAdmin, updateTransport);
router.delete("/:id", verifyAdmin, deleteTransport);

module.exports = router;
