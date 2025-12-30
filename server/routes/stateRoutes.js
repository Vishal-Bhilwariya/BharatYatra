const express = require("express");
const router = express.Router();

const {
  getAllStates,
  getStateBySlug,
} = require("../controllers/stateController");


// GET ALL STATES
router.get("/", getAllStates);

// GET STATE BY SLUG
router.get("/:slug", getStateBySlug);

module.exports = router;
