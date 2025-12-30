const Culture = require("../models/Culture");
const State = require("../models/State");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// 🌐 GET CULTURE BY STATE SLUG (PUBLIC)
exports.getCultureByStateSlug = async (req, res) => {
  try {
    const { stateSlug } = req.params;

    const state = await State.findOne({ slug: stateSlug, isActive: true });
    if (!state) {
      return errorResponse(res, "State not found", 404);
    }

    const culture = await Culture.findOne({
      stateId: state._id,
      isActive: true,
    }).populate("stateId", "name slug");

    if (!culture) {
      return errorResponse(
        res,
        "Culture information not available for this state",
        404
      );
    }

    return successResponse(res, "Culture fetched successfully", culture);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// 🌐 GET ALL CULTURES (PUBLIC)
exports.getAllCultures = async (req, res) => {
  try {
    const cultures = await Culture.find({ isActive: true })
      .populate("stateId", "name slug image")
      .select("stateId hinduCulture.generalCulture");

    return successResponse(res, "Cultures fetched successfully", cultures);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

