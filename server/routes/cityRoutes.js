const express = require("express");
const router = express.Router();

const {
  getAllCities,
  getCitiesByStateSlug,
  getCityBySlug,
  getTrendingCities,
} = require("../controllers/cityController");

// 🌐 PUBLIC ROUTES
router.get("/trending", getTrendingCities);
router.get("/", getAllCities);
router.get("/state/:stateSlug", getCitiesByStateSlug);
router.get("/:slug", getCityBySlug);

module.exports = router;
