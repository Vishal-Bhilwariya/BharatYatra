const State = require("../models/State");
const City = require("../models/city");

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

// GET CITIES BY STATE SLUG
exports.getCitiesByStateSlug = async (req, res) => {
  try {
    const { stateSlug } = req.params;

    const state = await State.findOne({ slug: stateSlug, isActive: true });
    if (!state) {
      return res.status(404).json({
        success: false,
        message: "State not found",
      });
    }

    const cities = await City.find({
      stateId: state._id,
      isActive: true,
    }).sort({ isPopular: -1, name: 1 });

    res.status(200).json({
      success: true,
      data: cities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
