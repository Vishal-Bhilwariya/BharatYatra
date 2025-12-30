const express = require("express");
const router = express.Router();

const verifyAdmin = require("../middlewares/auth.middleware");
const {
  createCity,
  updateCity,
  deleteCity,
  getAllCities,
  getCityById,
} = require("../controllers/adminCityController");

router.get("/", verifyAdmin, getAllCities);
router.get("/:id", verifyAdmin, getCityById);
router.post("/", verifyAdmin, createCity);
router.put("/:id", verifyAdmin, updateCity);
router.delete("/:id", verifyAdmin, deleteCity);

module.exports = router;
