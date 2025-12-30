const State = require("../models/State");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// 🌐 GET ALL ACTIVE STATES (PUBLIC)
exports.getAllStates = async (req, res) => {
  try {
    const states = await State.find({ isActive: true })
      .select("name slug description image")
      .sort({ name: 1 });

    return successResponse(
      res,
      "States fetched successfully",
      states
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// 🌐 GET SINGLE STATE BY SLUG (PUBLIC)
exports.getStateBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const state = await State.findOne({ slug, isActive: true })
      .select("name slug description culturalSummary image");

    if (!state) {
      return errorResponse(res, "State not found", 404);
    }

    return successResponse(
      res,
      "State fetched successfully",
      state
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
