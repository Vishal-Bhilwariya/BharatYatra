const Transport = require("../models/Transport");
const City = require("../models/City");
const State = require("../models/State");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// 🌐 GET TRANSPORT BY CITY ID (PUBLIC)
exports.getTransportsByCity = async (req, res) => {
  try {
    const { cityId } = req.params;

    // 1️⃣ Check city exists & active
    const city = await City.findOne({ _id: cityId, isActive: true });
    if (!city) {
      return errorResponse(res, "City not found", 404);
    }

    // 2️⃣ Fetch active transport options
    const transports = await Transport.find({
      cityId,
      isActive: true,
    })
      .select("type description connectivity approxCost")
      .sort({ type: 1 });

    return successResponse(
      res,
      "Transport fetched successfully",
      transports
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// 🌐 GET TRANSPORT BY CITY SLUG (PUBLIC)
exports.getTransportsByCitySlug = async (req, res) => {
  try {
    const { citySlug } = req.params;

    const city = await City.findOne({ slug: citySlug, isActive: true }).populate("stateId", "name slug");
    if (!city) {
      return errorResponse(res, "City not found", 404);
    }

    const transports = await Transport.find({
      cityId: city._id,
      isActive: true,
    })
      .select("type description connectivity approxCost")
      .sort({ type: 1 });

    return successResponse(res, "Transport fetched successfully", {
      city: { _id: city._id, name: city.name, slug: city.slug, state: city.stateId },
      transports,
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// 🌐 GET ALL STATES WITH CITIES (for route planner dropdown)
exports.getStatesWithCities = async (req, res) => {
  try {
    const states = await State.find({ isActive: true }).select("name slug").sort({ name: 1 });
    const cities = await City.find({ isActive: true }).select("name slug stateId").sort({ name: 1 }).populate("stateId", "name slug");

    return successResponse(res, "States and cities fetched", { states, cities });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
