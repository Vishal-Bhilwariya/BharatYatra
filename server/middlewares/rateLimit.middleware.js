const rateLimit = require("express-rate-limit");

const createLimiter = (options) =>
  rateLimit({
    windowMs: options.windowMs,
    max: options.max,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: options.skipSuccessfulRequests || false,
    message: {
      success: false,
      message: options.message,
    },
  });

const otpRequestLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many OTP requests. Please try again after 15 minutes.",
});

const loginLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  skipSuccessfulRequests: true,
  message: "Too many failed login attempts. Please try again later.",
});

module.exports = {
  otpRequestLimiter,
  loginLimiter,
};
