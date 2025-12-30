const express = require("express");
const router = express.Router();

const verifyAdmin = require("../middlewares/auth.middleware");
const {
  createPlace,
  updatePlace,
  deletePlace,
  getAllPlaces,
  getPlaceById,
} = require("../controllers/adminPlaceController");

router.get("/", verifyAdmin, getAllPlaces);
router.get("/:id", verifyAdmin, getPlaceById);
router.post("/", verifyAdmin, createPlace);
router.put("/:id", verifyAdmin, updatePlace);
router.delete("/:id", verifyAdmin, deletePlace);

module.exports = router;
