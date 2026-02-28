const express = require("express");
const router = express.Router();
const { translateText , getPresetPhrases} = require("../controllers/translatorController");

// Translate API
router.post("/", translateText);
router.get("/phrases", getPresetPhrases);

module.exports = router;
