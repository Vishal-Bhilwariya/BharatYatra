const City = require("../models/City");
const State = require("../models/State");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// 🌐 GET ALL CITIES (PUBLIC - FOR SEARCH)
exports.getAllCities = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const cities = await City.find({ isActive: true })
      .select("name slug description image stateId")
      .populate("stateId", "name slug")
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit);

    const total = await City.countDocuments({ isActive: true });

    return successResponse(res, "Cities fetched successfully", {
      data: cities,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

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
// 🌐 GET TRENDING CITIES (PUBLIC)
exports.getTrendingCities = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    const cities = await City.find({ isActive: true, isPopular: true })
      .select("name slug image stateId")
      .populate("stateId", "name slug")
      .limit(limit)
      .sort({ isPopular: -1, name: 1 });

    return successResponse(res, "Trending cities fetched successfully", cities);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
