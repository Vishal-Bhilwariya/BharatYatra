const express = require("express");
const router = express.Router();
const { addPlace, getPlacesByCity } = require("../controllers/placeController");

router.post("/", addPlace);
router.get("/city/:cityId", getPlacesByCity);

module.exports = router;
