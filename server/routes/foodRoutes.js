const express = require("express");
const router = express.Router();
const { addFood, getFoodByCity } = require("../controllers/foodController");

// Add food
router.post("/", addFood);

// Get food of a city
router.get("/city/:cityId", getFoodByCity);

module.exports = router;
