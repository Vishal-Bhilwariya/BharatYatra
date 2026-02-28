const express = require("express");
const router = express.Router();

const {
  getTransportsByCity,
  getTransportsByCitySlug,
  getStatesWithCities,
} = require("../controllers/transportController");

// 🌐 PUBLIC ROUTES
router.get("/states-cities", getStatesWithCities);
router.get("/city/slug/:citySlug", getTransportsByCitySlug);
router.get("/city/:cityId", getTransportsByCity);

module.exports = router;
