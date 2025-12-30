const State = require("../models/State");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// ✅ CREATE STATE (ADMIN ONLY)
exports.createState = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    if (!name) {
      return errorResponse(res, "State name is required", 400);
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const existing = await State.findOne({ slug });
    if (existing) {
      return errorResponse(res, "State already exists", 409);
    }

    const state = await State.create({
      name,
      slug,
      description,
      image,
      createdBy: req.adminId,
    });

    return successResponse(res, "State created successfully", state, 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ UPDATE STATE
exports.updateState = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedState = await State.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedState) {
      return errorResponse(res, "State not found", 404);
    }

    return successResponse(res, "State updated successfully", updatedState);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ GET ALL STATES (ADMIN - INCLUDES INACTIVE)
exports.getAllStates = async (req, res) => {
  try {
    const states = await State.find().sort({ name: 1 });
    return successResponse(res, "States fetched successfully", states);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ GET SINGLE STATE (ADMIN)
exports.getStateById = async (req, res) => {
  try {
    const { id } = req.params;
    const state = await State.findById(id);
    if (!state) {
      return errorResponse(res, "State not found", 404);
    }
    return successResponse(res, "State fetched successfully", state);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ SOFT DELETE STATE
exports.deleteState = async (req, res) => {
  try {
    const { id } = req.params;

    const state = await State.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!state) {
      return errorResponse(res, "State not found", 404);
    }

    return successResponse(res, "State deleted successfully", state);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
