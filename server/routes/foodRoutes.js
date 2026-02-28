const express = require("express");
const router = express.Router();

const {
  getAllFoods,
  getFoodsByCity,
  getFoodBySlug,
} = require("../controllers/foodController");


router.get("/", getAllFoods);
// GET FOODS BY CITY ID
router.get("/city/:cityId", getFoodsByCity);

// GET FOOD BY SLUG
router.get("/:slug", getFoodBySlug);

module.exports = router;
