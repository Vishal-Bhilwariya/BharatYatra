const express = require("express");
const {
  sendSignupOtp,
  verifySignupOtp,
  register,
  login,
  forgotPassword,
  resetPassword,
  logout,
  getProfile,
} = require("../controllers/authController");
const { protect } = require("../middlewares/userAuth.middleware");
const { otpRequestLimiter, loginLimiter } = require("../middlewares/rateLimit.middleware");

const router = express.Router();

router.post("/send-otp", otpRequestLimiter, sendSignupOtp);
router.post("/verify-otp", verifySignupOtp);
router.post("/register", register);
router.post("/login", loginLimiter, login);
router.post("/forgot-password", otpRequestLimiter, forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/logout", logout);
router.get("/me", protect, getProfile);

module.exports = router;
