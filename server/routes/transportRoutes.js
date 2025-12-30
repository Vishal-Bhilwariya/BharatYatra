const express = require("express");
const router = express.Router();

const {
  getTransportByCity,
} = require("../controllers/transportController");

// GET TRANSPORT BY CITY ID
router.get("/city/:cityId", getTransportByCity);

module.exports = router;
