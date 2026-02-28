const Food = require("../models/Food");
const City = require("../models/City");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// ✅ CREATE FOOD (ADMIN)
exports.createFood = async (req, res) => {
  try {
    const {
      name,
      cityId,
      type,
      description,
      famousFor,
      approxPrice,
      image,
    } = req.body;

    if (!name || !cityId) {
      return errorResponse(res, "Food name and cityId are required", 400);
    }

    // check city exists
    const city = await City.findById(cityId);
    if (!city || !city.isActive) {
      return errorResponse(res, "Invalid or inactive city", 404);
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const existingFood = await Food.findOne({ slug, cityId });
    if (existingFood) {
      return errorResponse(res, "Food already exists in this city", 409);
    }

    const food = await Food.create({
      name,
      slug,
      cityId,
      type,
      description,
      famousFor,
      approxPrice,
      image,
      createdBy: req.adminId,
    });

    return successResponse(res, "Food created successfully", food, 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ UPDATE FOOD
exports.updateFood = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedFood = await Food.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedFood) {
      return errorResponse(res, "Food not found", 404);
    }

    return successResponse(res, "Food updated successfully", updatedFood);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ GET ALL FOODS (ADMIN)
exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find()
      .populate("cityId", "name slug stateId")
      .sort({ createdAt: -1 });
    return successResponse(res, "Foods fetched successfully", foods);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ GET SINGLE FOOD (ADMIN)
exports.getFoodById = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findById(id).populate("cityId", "name slug");
    if (!food) {
      return errorResponse(res, "Food not found", 404);
    }
    return successResponse(res, "Food fetched successfully", food);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ SOFT DELETE FOOD
exports.deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await Food.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!food) {
      return errorResponse(res, "Food not found", 404);
    }

    return successResponse(res, "Food deleted successfully", food);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ TOGGLE FOOD ACTIVE STATUS
exports.toggleFoodActive = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await Food.findById(id);
    if (!food) {
      return errorResponse(res, "Food not found", 404);
    }

    food.isActive = !food.isActive;
    await food.save();

    return successResponse(res, `Food ${food.isActive ? "activated" : "deactivated"} successfully`, food);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};