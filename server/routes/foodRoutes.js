const express = require("express");
const router = express.Router();

const {
  createFood,
  getFoodsByCity,
  getFoodBySlug,
} = require("../controllers/foodController");

// CREATE FOOD
router.post("/", createFood);

// GET FOODS BY CITY ID
router.get("/city/:cityId", getFoodsByCity);

// GET FOOD BY SLUG
router.get("/:slug", getFoodBySlug);

module.exports = router;
