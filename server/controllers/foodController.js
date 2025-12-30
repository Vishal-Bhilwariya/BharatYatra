const Food = require("../models/Food");
const City = require("../models/city");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// 🌐 GET FOODS BY CITY ID (PUBLIC)
exports.getFoodsByCity = async (req, res) => {
  try {
    const { cityId } = req.params;

    // 1️⃣ Check city exists & active
    const city = await City.findOne({ _id: cityId, isActive: true });
    if (!city) {
      return errorResponse(res, "City not found", 404);
    }

    // 2️⃣ Fetch active foods
    const foods = await Food.find({
      cityId,
      isActive: true,
    })
      .select("name slug type description famousFor approxPrice image")
      .sort({ name: 1 });

    return successResponse(
      res,
      "Foods fetched successfully",
      foods
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// 🌐 GET FOOD BY SLUG (PUBLIC)
exports.getFoodBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const food = await Food.findOne({
      slug,
      isActive: true,
    })
      .select("name slug type description famousFor approxPrice image")
      .populate("cityId", "name slug");

    if (!food) {
      return errorResponse(res, "Food item not found", 404);
    }

    return successResponse(
      res,
      "Food fetched successfully",
      food
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// 🌐 GET ALL FOODS (PUBLIC)
exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find({ isActive: true })
      .select("name slug type image approxPrice")
      .sort({ name: 1 });

    return successResponse(
      res,
      "Foods fetched successfully",
      foods
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
