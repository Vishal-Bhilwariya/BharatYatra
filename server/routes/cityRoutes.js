const express = require("express");
const router = express.Router();

const {
  getCitiesByStateSlug,
  getCityBySlug,
} = require("../controllers/cityController");

// 🌐 PUBLIC ROUTES
router.get("/state/:stateSlug", getCitiesByStateSlug);
router.get("/:slug", getCityBySlug);

module.exports = router;
