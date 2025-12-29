const express = require("express");
const router = express.Router();

const {
  createTransport,
  getTransportByCity,
} = require("../controllers/transportController");

// CREATE TRANSPORT
router.post("/", createTransport);

// GET TRANSPORT BY CITY ID
router.get("/city/:cityId", getTransportByCity);

module.exports = router;
