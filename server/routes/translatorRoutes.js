const express = require("express");
const router = express.Router();
const { translateText } = require("../controllers/translatorController");

// Translate API
router.post("/", translateText);

module.exports = router;
