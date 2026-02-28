const express = require("express");
const router = express.Router();
const {
  generateItinerary,
  getUserItineraries,
  getItineraryById,
} = require("../controllers/itineraryController");

// Public routes
router.post("/generate", generateItinerary);
router.get("/", getUserItineraries);
router.get("/:id", getItineraryById);

module.exports = router;

