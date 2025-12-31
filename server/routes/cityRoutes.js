const express = require("express");
const router = express.Router();

const {
  getAllCities,
  getCitiesByStateSlug,
  getCityBySlug,
} = require("../controllers/cityController");

// 🌐 PUBLIC ROUTES
router.get("/", getAllCities);
router.get("/state/:stateSlug", getCitiesByStateSlug);
router.get("/:slug", getCityBySlug);

module.exports = router;
