const express = require("express");
const router = express.Router();
const { getCities, addCity , getCityById} = require("../controllers/cityController");
const { getCityWithPlaces } = require("../controllers/cityController");

// GET all cities
router.get("/", getCities);
// POST add city
router.post("/", addCity);
// Get city with places
router.get("/:id/places", getCityWithPlaces);
// GET single city
router.get("/:id", getCityById);
module.exports = router;
