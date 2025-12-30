const City = require("../models/city");
const Place = require("../models/Place");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// ✅ CREATE PLACE (ADMIN)
exports.createPlace = async (req, res) => {
  try {
    const {
      name,
      cityId,
      category,
      description,
      images,
      bestTimeToVisit,
      entryFee,
      location,
    } = req.body;

    if (!name || !cityId) {
      return errorResponse(res, "Place name and cityId are required", 400);
    }

    // Check city exists
    const city = await City.findById(cityId);
    if (!city || !city.isActive) {
      return errorResponse(res, "Invalid or inactive city", 404);
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const existingPlace = await Place.findOne({ slug, cityId });
    if (existingPlace) {
      return errorResponse(res, "Place already exists in this city", 409);
    }

    const place = await Place.create({
      name,
      slug,
      cityId,
      category,
      description,
      images,
      bestTimeToVisit,
      entryFee,
      location,
      createdBy: req.adminId,
    });

    return successResponse(res, "Place created successfully", place, 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ UPDATE PLACE
exports.updatePlace = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPlace = await Place.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedPlace) {
      return errorResponse(res, "Place not found", 404);
    }

    return successResponse(res, "Place updated successfully", updatedPlace);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ SOFT DELETE PLACE
exports.deletePlace = async (req, res) => {
  try {
    const { id } = req.params;

    const place = await Place.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!place) {
      return errorResponse(res, "Place not found", 404);
    }

    return successResponse(res, "Place deleted successfully", place);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
