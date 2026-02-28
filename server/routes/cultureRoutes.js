const express = require("express");
const router = express.Router();
const {
  getCultureByStateSlug,
  getAllCultures,
} = require("../controllers/cultureController");

// Public routes
router.get("/", getAllCultures);
router.get("/state/:stateSlug", getCultureByStateSlug);

module.exports = router;

