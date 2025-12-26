const express = require("express");
const router = express.Router();
const {
  addState,
  getStates,
  getStateById,
} = require("../controllers/stateController");

router.post("/", addState);
router.get("/", getStates);
router.get("/:id", getStateById);

module.exports = router;
