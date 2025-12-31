const express = require("express");
const router = express.Router();

const verifyAdmin = require("../middlewares/auth.middleware");
const {
  createCity,
  updateCity,
  deleteCity,
  getAllCities,
  getCityById,
  toggleCityActive,
} = require("../controllers/adminCityController");
const { bulkUploadCities } = require("../controllers/adminBulkUploadCityController");

router.get("/", verifyAdmin, getAllCities);
router.get("/:id", verifyAdmin, getCityById);
router.post("/", verifyAdmin, createCity);
router.post("/bulk-upload", verifyAdmin, bulkUploadCities);
router.put("/:id", verifyAdmin, updateCity);
router.patch("/:id/toggle-active", verifyAdmin, toggleCityActive);
router.delete("/:id", verifyAdmin, deleteCity);

module.exports = router;
