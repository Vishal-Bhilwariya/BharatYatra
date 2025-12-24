const express = require("express");
const router = express.Router();
const { getCities } = require("../controllers/cityController");

// GET all cities
router.get("/", getCities);

module.exports = router;
