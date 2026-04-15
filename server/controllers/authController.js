const User = require("../models/User");
const Otp = require("../models/Otp");
const VerifiedAction = require("../models/VerifiedAction");
const { sendOtpEmail } = require("../services/emailService");
const { generateOtp, hashOtp, verifyOtpHash } = require("../services/otpService");
const { signAuthToken, setAuthCookie, clearAuthCookie } = require("../services/tokenService");
const { validateEmail, validatePassword, validateOtp } = require("../utils/authValidation");

const OTP_EXPIRY_MINUTES = Number(process.env.OTP_EXPIRY_MINUTES || 5);
const OTP_RESEND_COOLDOWN_SECONDS = Number(process.env.OTP_RESEND_COOLDOWN_SECONDS || 30);
const VERIFIED_WINDOW_MINUTES = Number(process.env.VERIFIED_SIGNUP_WINDOW_MINUTES || 10);
const MAX_OTP_ATTEMPTS = Number(process.env.MAX_OTP_ATTEMPTS || 5);

const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
});

const getOtpRecord = async (email, purpose) =>
  Otp.findOne({ email: email.toLowerCase().trim(), purpose }).sort({ createdAt: -1 });

const createAndSendOtp = async ({ email, purpose }) => {
  const normalizedEmail = email.toLowerCase().trim();
  const now = new Date();
  const otp = generateOtp();
  const otpHash = hashOtp({ email: normalizedEmail, otp, purpose });
  const expiresAt = new Date(now.getTime() + OTP_EXPIRY_MINUTES * 60 * 1000);
  const resendAvailableAt = new Date(now.getTime() + OTP_RESEND_COOLDOWN_SECONDS * 1000);

  await Otp.findOneAndUpdate(
    { email: normalizedEmail, purpose },
    {
      email: normalizedEmail,
      purpose,
      otpHash,
      expiresAt,
      resendAvailableAt,
      isUsed: false,
      isVerified: false,
      verifiedAt: null,
      attempts: 0,
    },
    { upsert: true, new: true }
  );

  await sendOtpEmail({
    email: normalizedEmail,
    otp,
    purpose,
    expiryMinutes: OTP_EXPIRY_MINUTES,
  });

  return {
    expiresAt,
    resendAvailableAt,
    ...(process.env.NODE_ENV !== "production" ? { otp } : {}),
  };
};

const validateOtpAndConsume = async ({ email, otp, purpose }) => {
  const otpRecord = await getOtpRecord(email, purpose);

  if (!otpRecord) {
    return { ok: false, status: 400, message: "No OTP request found for this email." };
  }

  if (otpRecord.isUsed) {
    return { ok: false, status: 400, message: "OTP already used. Please request a new OTP." };
  }

  if (otpRecord.expiresAt < new Date()) {
    otpRecord.isUsed = true;
    await otpRecord.save();
    return { ok: false, status: 400, message: "OTP expired. Please request a new OTP." };
  }

  const isValid = verifyOtpHash({
    email,
    otp,
    purpose,
    otpHash: otpRecord.otpHash,
  });

  if (!isValid) {
    otpRecord.attempts += 1;
    if (otpRecord.attempts >= MAX_OTP_ATTEMPTS) {
      otpRecord.isUsed = true;
    }
    await otpRecord.save();

    return {
      ok: false,
      status: 400,
      message:
        otpRecord.attempts >= MAX_OTP_ATTEMPTS
          ? "Too many invalid attempts. OTP invalidated."
          : "Invalid OTP.",
    };
  }

  otpRecord.isVerified = true;
  otpRecord.isUsed = true;
  otpRecord.verifiedAt = new Date();
  await otpRecord.save();

  return { ok: true };
};

exports.sendSignupOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered." });
    }

    const activeOtp = await getOtpRecord(normalizedEmail, "signup");
    if (activeOtp?.resendAvailableAt > new Date()) {
      const secondsLeft = Math.ceil((activeOtp.resendAvailableAt.getTime() - Date.now()) / 1000);
      return res
        .status(429)
        .json({ success: false, message: "Please wait before requesting another OTP.", retryAfter: secondsLeft });
    }

    const result = await createAndSendOtp({ email: normalizedEmail, purpose: "signup" });

    await VerifiedAction.deleteOne({ email: normalizedEmail, purpose: "signup" });

    res.status(200).json({
      success: true,
      message: "Signup OTP sent successfully.",
      expiresAt: result.expiresAt,
      resendAvailableAt: result.resendAvailableAt,
      ...(result.otp ? { devOtp: result.otp } : {}),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Failed to send OTP." });
  }
};

exports.verifySignupOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!validateEmail(email) || !validateOtp(otp)) {
      return res.status(400).json({ success: false, message: "Email or OTP is invalid." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const verification = await validateOtpAndConsume({
      email: normalizedEmail,
      otp: String(otp).trim(),
      purpose: "signup",
    });

    if (!verification.ok) {
      return res.status(verification.status).json({ success: false, message: verification.message });
    }

    const expiresAt = new Date(Date.now() + VERIFIED_WINDOW_MINUTES * 60 * 1000);

    await VerifiedAction.findOneAndUpdate(
      { email: normalizedEmail, purpose: "signup" },
      { email: normalizedEmail, purpose: "signup", expiresAt, consumed: false },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: "OTP verified. You can now complete registration.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Failed to verify OTP." });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || String(name).trim().length < 2) {
      return res.status(400).json({ success: false, message: "Name must be at least 2 characters." });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters." });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered." });
    }

    const verifiedAction = await VerifiedAction.findOne({
      email: normalizedEmail,
      purpose: "signup",
      consumed: false,
      expiresAt: { $gt: new Date() },
    });

    if (!verifiedAction) {
      return res.status(400).json({ success: false, message: "Please verify OTP before registration." });
    }

    const user = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      password,
    });

    verifiedAction.consumed = true;
    await verifiedAction.save();
    await Otp.deleteMany({ email: normalizedEmail, purpose: "signup" });

    const token = signAuthToken(user._id);
    setAuthCookie(res, token);

    res.status(201).json({
      success: true,
      message: "Registration successful.",
      user: formatUser(user),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Registration failed." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validateEmail(email) || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user || !user.password) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const token = signAuthToken(user._id);
    setAuthCookie(res, token);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: formatUser(user),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Login failed." });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    const genericMessage = "If the email is registered, an OTP has been sent.";

    if (!user) {
      return res.status(200).json({ success: true, message: genericMessage });
    }

    const activeOtp = await getOtpRecord(normalizedEmail, "reset_password");
    if (activeOtp?.resendAvailableAt > new Date()) {
      const secondsLeft = Math.ceil((activeOtp.resendAvailableAt.getTime() - Date.now()) / 1000);
      return res
        .status(429)
        .json({ success: false, message: "Please wait before requesting another OTP.", retryAfter: secondsLeft });
    }

    const result = await createAndSendOtp({ email: normalizedEmail, purpose: "reset_password" });

    res.status(200).json({
      success: true,
      message: genericMessage,
      expiresAt: result.expiresAt,
      resendAvailableAt: result.resendAvailableAt,
      ...(result.otp ? { devOtp: result.otp } : {}),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Failed to process request." });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    if (!validateOtp(otp)) {
      return res.status(400).json({ success: false, message: "Invalid OTP format." });
    }

    if (!validatePassword(newPassword)) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid reset request." });
    }

    const verification = await validateOtpAndConsume({
      email: normalizedEmail,
      otp: String(otp).trim(),
      purpose: "reset_password",
    });

    if (!verification.ok) {
      return res.status(verification.status).json({ success: false, message: verification.message });
    }

    user.password = newPassword;
    await user.save();
    await Otp.deleteMany({ email: normalizedEmail, purpose: "reset_password" });

    const token = signAuthToken(user._id);
    setAuthCookie(res, token);

    res.status(200).json({ success: true, message: "Password reset successful.", user: formatUser(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Failed to reset password." });
  }
};

exports.getProfile = async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

exports.logout = async (req, res) => {
  clearAuthCookie(res);
  res.status(200).json({ success: true, message: "Logged out successfully." });
};
