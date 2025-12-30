const express = require("express");
const router = express.Router();

const {
  getPlacesByCity,
  getPlaceBySlug,
} = require("../controllers/placeController");

// GET PLACES BY CITY ID
router.get("/city/:cityId", getPlacesByCity);

// GET PLACE BY SLUG
router.get("/:slug", getPlaceBySlug);

module.exports = router;
