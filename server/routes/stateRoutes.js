const express = require("express");
const router = express.Router();

const {
  createState,
  getAllStates,
  getStateBySlug,
} = require("../controllers/stateController");

// CREATE STATE
router.post("/", createState);

// GET ALL STATES
router.get("/", getAllStates);

// GET STATE BY SLUG
router.get("/:slug", getStateBySlug);

module.exports = router;
