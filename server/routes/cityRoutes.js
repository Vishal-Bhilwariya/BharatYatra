const express = require("express");
const router = express.Router();
const { getCities, addCity } = require("../controllers/cityController");

// GET all cities
router.get("/", getCities);

// POST add city
router.post("/", addCity);

module.exports = router;
