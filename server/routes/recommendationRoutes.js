const express = require("express");
const router = express.Router();
const {
  generateRecommendations,
  getUserRecommendations,
} = require("../controllers/recommendationController");

// Public routes
router.post("/generate", generateRecommendations);
router.get("/", getUserRecommendations);

module.exports = router;

