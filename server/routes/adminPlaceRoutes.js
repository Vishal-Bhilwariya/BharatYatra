const express = require("express");
const router = express.Router();

const verifyAdmin = require("../middlewares/auth.middleware");
const {
  createPlace,
  updatePlace,
  deletePlace,
  getAllPlaces,
  getPlaceById,
  togglePlaceActive,
} = require("../controllers/adminPlaceController");
const { bulkUploadPlaces } = require("../controllers/adminBulkUploadPlaceController");

router.get("/", verifyAdmin, getAllPlaces);
router.get("/:id", verifyAdmin, getPlaceById);
router.post("/", verifyAdmin, createPlace);
router.post("/bulk-upload", verifyAdmin, bulkUploadPlaces);
router.put("/:id", verifyAdmin, updatePlace);
router.patch("/:id/toggle-active", verifyAdmin, togglePlaceActive);
router.delete("/:id", verifyAdmin, deletePlace);

module.exports = router;
