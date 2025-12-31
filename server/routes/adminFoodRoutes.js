const express = require("express");
const router = express.Router();

const verifyAdmin = require("../middlewares/auth.middleware");
const {
  createFood,
  updateFood,
  deleteFood,
  getAllFoods,
  getFoodById,
  toggleFoodActive,
} = require("../controllers/adminFoodController");
const { bulkUploadFoods } = require("../controllers/adminBulkUploadFoodController");

router.get("/", verifyAdmin, getAllFoods);
router.get("/:id", verifyAdmin, getFoodById);
router.post("/", verifyAdmin, createFood);
router.post("/bulk-upload", verifyAdmin, bulkUploadFoods);
router.put("/:id", verifyAdmin, updateFood);
router.patch("/:id/toggle-active", verifyAdmin, toggleFoodActive);
router.delete("/:id", verifyAdmin, deleteFood);

module.exports = router;
