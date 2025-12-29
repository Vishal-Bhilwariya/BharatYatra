const express = require("express");
const router = express.Router();

const {
  createCity,
  getCitiesByState,
  getCityBySlug,
} = require("../controllers/cityController");

// CREATE CITY
router.post("/", createCity);

// GET CITIES BY STATE ID
router.get("/state/:stateId", getCitiesByState);

// GET CITY BY SLUG
router.get("/:slug", getCityBySlug);

module.exports = router;
