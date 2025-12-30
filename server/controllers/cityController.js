const City = require("../models/city");
const State = require("../models/State");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// 🌐 GET CITIES BY STATE SLUG (PUBLIC)
exports.getCitiesByStateSlug = async (req, res) => {
  try {
    const { stateSlug } = req.params;

    // 1️⃣ Find state by slug
    const state = await State.findOne({
      slug: stateSlug,
      isActive: true,
    });

    if (!state) {
      return errorResponse(res, "State not found", 404);
    }

    // 2️⃣ Find active cities for that state
    const cities = await City.find({
      stateId: state._id,
      isActive: true,
    })
      .select("name slug description image isPopular")
      .sort({ isPopular: -1, name: 1 });

    return successResponse(
      res,
      "Cities fetched successfully",
      cities
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// 🌐 GET CITY BY SLUG (PUBLIC)
exports.getCityBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const city = await City.findOne({
      slug,
      isActive: true,
    })
      .select("name slug description history image isPopular")
      .populate("stateId", "name slug");

    if (!city) {
      return errorResponse(res, "City not found", 404);
    }

    return successResponse(
      res,
      "City fetched successfully",
      city
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
