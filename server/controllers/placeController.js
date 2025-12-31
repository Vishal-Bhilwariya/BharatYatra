const Place = require("../models/Place");
const City = require("../models/City");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// 🌐 GET ALL PLACES (PUBLIC - FOR SEARCH)
exports.getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find({ isActive: true })
      .select("name slug description images cityId")
      .populate("cityId", "name slug stateId")
      .sort({ name: 1 });

    return successResponse(res, "Places fetched successfully", places);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// 🌐 GET PLACES BY CITY ID (PUBLIC)
exports.getPlacesByCity = async (req, res) => {
  try {
    const { cityId } = req.params;

    // 1️⃣ Check city exists & active
    const city = await City.findOne({ _id: cityId, isActive: true });
    if (!city) {
      return errorResponse(res, "City not found", 404);
    }

    // 2️⃣ Fetch active places
    const places = await Place.find({
      cityId,
      isActive: true,
    })
      .select("name slug category description images bestTimeToVisit entryFee")
      .sort({ name: 1 });

    return successResponse(
      res,
      "Places fetched successfully",
      places
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// 🌐 GET PLACE BY SLUG (PUBLIC)
exports.getPlaceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const place = await Place.findOne({
      slug,
      isActive: true,
    })
      .select(
        "name slug category description history images bestTimeToVisit entryFee location"
      )
      .populate("cityId", "name slug");

    if (!place) {
      return errorResponse(res, "Place not found", 404);
    }

    return successResponse(
      res,
      "Place fetched successfully",
      place
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
