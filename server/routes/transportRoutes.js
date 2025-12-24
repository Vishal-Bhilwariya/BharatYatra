const express = require("express");
const router = express.Router();
const {
  addTransport,
  getTransportByCity,
} = require("../controllers/transportController");

// Add transport
router.post("/", addTransport);


// Get transport of a city
router.get("/city/:cityId", getTransportByCity);

module.exports = router;
