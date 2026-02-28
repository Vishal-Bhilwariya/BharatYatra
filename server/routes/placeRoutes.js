const express = require("express");
const router = express.Router();

const {
  getAllPlaces,
  getPlacesByCity,
  getPlaceBySlug,
} = require("../controllers/placeController");

// 🌐 PUBLIC ROUTES
router.get("/", getAllPlaces);
// GET PLACES BY CITY ID
router.get("/city/:cityId", getPlacesByCity);

// GET PLACE BY SLUG
router.get("/:slug", getPlaceBySlug);

module.exports = router;
