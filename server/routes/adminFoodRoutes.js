const express = require("express");
const router = express.Router();

const verifyAdmin = require("../middlewares/auth.middleware");
const {
  createFood,
  updateFood,
  deleteFood,
  getAllFoods,
  getFoodById,
} = require("../controllers/adminFoodController");

router.get("/", verifyAdmin, getAllFoods);
router.get("/:id", verifyAdmin, getFoodById);
router.post("/", verifyAdmin, createFood);
router.put("/:id", verifyAdmin, updateFood);
router.delete("/:id", verifyAdmin, deleteFood);

module.exports = router;
