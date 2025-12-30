const express = require("express");
const router = express.Router();

const verifyAdmin = require("../middlewares/auth.middleware");
const {
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/adminPlaceController");

router.post("/", verifyAdmin, createPlace);
router.put("/:id", verifyAdmin, updatePlace);
router.delete("/:id", verifyAdmin, deletePlace);

module.exports = router;
