const express = require("express");
const router = express.Router();

const verifyAdmin = require("../middlewares/auth.middleware");
const {
    createCulture,
    updateCulture,
    deleteCulture,
    getAdminCultures,
    getCultureById,
} = require("../controllers/cultureController");

// 🔒 ADMIN-ONLY ROUTES
router.get("/", verifyAdmin, getAdminCultures);
router.get("/:id", verifyAdmin, getCultureById);
router.post("/", verifyAdmin, createCulture);
router.put("/:id", verifyAdmin, updateCulture);
router.delete("/:id", verifyAdmin, deleteCulture);

module.exports = router;
