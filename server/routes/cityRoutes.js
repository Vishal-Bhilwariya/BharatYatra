const express = require("express");
const router = express.Router();
const { getCities, addCity , getCityById} = require("../controllers/cityController");

// GET all cities
router.get("/", getCities);
// POST add city
router.post("/", addCity);
// GET single city
router.get("/:id", getCityById);
module.exports = router;
