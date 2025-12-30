const express = require("express");
const router = express.Router();

const {
  getAllStates,
  getStateBySlug,
  getCitiesByStateSlug, // 👈 add this
} = require("../controllers/stateController");

// Existing routes
router.get("/", getAllStates);
router.get("/:slug", getStateBySlug);

// ✅ ADD THIS
router.get("/:stateSlug/cities", getCitiesByStateSlug);

module.exports = router;
