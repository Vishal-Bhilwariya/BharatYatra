const City = require("../models/city");
const State = require("../models/State");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// ✅ CREATE CITY (ADMIN)
exports.createCity = async (req, res) => {
  try {
    const { name, stateId, description, image } = req.body;

    if (!name || !stateId) {
      return errorResponse(res, "City name and stateId are required", 400);
    }

    // check state exists
    const state = await State.findById(stateId);
    if (!state || !state.isActive) {
      return errorResponse(res, "Invalid or inactive state", 404);
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const existingCity = await City.findOne({ slug, stateId });
    if (existingCity) {
      return errorResponse(res, "City already exists in this state", 409);
    }

    const city = await City.create({
      name,
      slug,
      stateId,
      description,
      image,
      createdBy: req.adminId,
    });

    return successResponse(res, "City created successfully", city, 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ UPDATE CITY
exports.updateCity = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCity = await City.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedCity) {
      return errorResponse(res, "City not found", 404);
    }

    return successResponse(res, "City updated successfully", updatedCity);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ GET ALL CITIES (ADMIN)
exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find().populate("stateId", "name slug").sort({ name: 1 });
    return successResponse(res, "Cities fetched successfully", cities);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ GET SINGLE CITY (ADMIN)
exports.getCityById = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await City.findById(id).populate("stateId", "name slug");
    if (!city) {
      return errorResponse(res, "City not found", 404);
    }
    return successResponse(res, "City fetched successfully", city);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ SOFT DELETE CITY
exports.deleteCity = async (req, res) => {
  try {
    const { id } = req.params;

    const city = await City.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!city) {
      return errorResponse(res, "City not found", 404);
    }

    return successResponse(res, "City deleted successfully", city);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
