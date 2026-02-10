const express = require("express");
const router = express.Router();
const { signup, login, getProfile } = require("../controllers/userController");
const { verifyUser } = require("../middlewares/auth.middleware");

// PUBLIC ROUTES
router.post("/signup", signup);
router.post("/login", login);

// PROTECTED ROUTES
router.get("/profile", verifyUser, getProfile);

module.exports = router;
