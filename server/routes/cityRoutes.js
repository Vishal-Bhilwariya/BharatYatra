const express = require("express");
const router = express.Router();

const {
  getCities,
  addCity,
  getCityById,
  getCityWithPlaces,
  updateCity,
  deleteCity,
  getCitiesByState,
} = require("../controllers/cityController");

router.get("/", getCities);
router.post("/", addCity);

// ✅ STATE ROUTE FIRST
router.get("/state/:stateId", getCitiesByState);

// ✅ OTHER SPECIFIC ROUTES
router.get("/:id/places", getCityWithPlaces);

// ❌ GENERIC ROUTES LAST
router.get("/:id", getCityById);
router.put("/:id", updateCity);
router.delete("/:id", deleteCity);

module.exports = router;
