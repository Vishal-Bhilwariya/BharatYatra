const express = require("express");
const router = express.Router();

const verifyAdmin = require("../middlewares/auth.middleware");
const {
  createCity,
  updateCity,
  deleteCity,
} = require("../controllers/adminCityController");

router.post("/", verifyAdmin, createCity);
router.put("/:id", verifyAdmin, updateCity);
router.delete("/:id", verifyAdmin, deleteCity);

module.exports = router;
