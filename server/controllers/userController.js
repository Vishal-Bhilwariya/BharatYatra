const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// POST /api/user/signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return errorResponse(res, "Name, email, and password are required", 400);
        }

        if (password.length < 6) {
            return errorResponse(res, "Password must be at least 6 characters", 400);
        }

        // Check if email already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return errorResponse(res, "Email is already registered", 409);
        }

        const user = await User.create({ name, email, password });

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return successResponse(
            res,
            "Account created successfully",
            {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            },
            201
        );
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

// POST /api/user/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return errorResponse(res, "Email and password are required", 400);
        }

        const user = await User.findOne({ email });
        if (!user) {
            return errorResponse(res, "Invalid email or password", 401);
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return errorResponse(res, "Invalid email or password", 401);
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return successResponse(res, "Login successful", {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

// GET /api/user/profile  (protected)
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return errorResponse(res, "User not found", 404);
        }

        return successResponse(res, "Profile fetched", {
            id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};
