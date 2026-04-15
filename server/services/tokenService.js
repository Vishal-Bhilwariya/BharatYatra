const jwt = require("jsonwebtoken");

const signAuthToken = (userId) => {
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn });
};

const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

const setAuthCookie = (res, token) => {
  res.cookie("accessToken", token, getCookieOptions());
};

const clearAuthCookie = (res) => {
  res.clearCookie("accessToken", getCookieOptions());
};

module.exports = {
  signAuthToken,
  setAuthCookie,
  clearAuthCookie,
};
