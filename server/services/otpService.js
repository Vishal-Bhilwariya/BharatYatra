const crypto = require("crypto");

const OTP_SECRET = process.env.OTP_SECRET || process.env.JWT_SECRET || "bharatyatra-otp-secret";

const generateOtp = () => crypto.randomInt(100000, 1000000).toString();

const hashOtp = ({ email, otp, purpose }) => {
  const payload = `${email.toLowerCase().trim()}:${purpose}:${otp}`;
  return crypto.createHmac("sha256", OTP_SECRET).update(payload).digest("hex");
};

const verifyOtpHash = ({ email, otp, purpose, otpHash }) => {
  const computed = hashOtp({ email, otp, purpose });
  if (!otpHash || computed.length !== otpHash.length) return false;
  return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(otpHash));
};

module.exports = {
  generateOtp,
  hashOtp,
  verifyOtpHash,
};
