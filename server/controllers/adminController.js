const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const { successResponse, errorResponse } = require("../utils/apiResponse");

exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return errorResponse(res, "Username and password are required", 400);
    }

    const admin = await Admin.findOne({ username, isActive: true });

    if (!admin || admin.password !== password) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    // 🔐 Generate JWT
    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return successResponse(
      res,
      "Admin login successful",
      { token },
      200
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
