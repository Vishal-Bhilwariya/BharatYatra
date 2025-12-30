const express = require("express");
const router = express.Router();

const {
  getTransportsByCity,
} = require("../controllers/transportController");

// 🌐 PUBLIC ROUTE
router.get("/city/:cityId", getTransportsByCity);

module.exports = router;
