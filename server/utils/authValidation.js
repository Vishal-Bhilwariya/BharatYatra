const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (email) => EMAIL_REGEX.test(String(email || "").toLowerCase().trim());

const validatePassword = (password) => typeof password === "string" && password.length >= 6;

const validateOtp = (otp) => /^\d{6}$/.test(String(otp || "").trim());

module.exports = {
  validateEmail,
  validatePassword,
  validateOtp,
};
