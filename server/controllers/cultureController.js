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

// 🔒 CREATE CULTURE (ADMIN)
exports.createCulture = async (req, res) => {
  try {
    const { stateId } = req.body;

    // Check if culture already exists for this state
    const existingCulture = await Culture.findOne({ stateId });
    if (existingCulture) {
      return errorResponse(res, "Culture already exists for this state", 400);
    }

    const newCulture = await Culture.create(req.body);
    return successResponse(res, "Culture created successfully", newCulture, 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// 🔒 UPDATE CULTURE (ADMIN)
exports.updateCulture = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCulture = await Culture.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCulture) {
      return errorResponse(res, "Culture not found", 404);
    }

    return successResponse(res, "Culture updated successfully", updatedCulture);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// 🔒 DELETE CULTURE (ADMIN)
exports.deleteCulture = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCulture = await Culture.findByIdAndDelete(id);

    if (!deletedCulture) {
      return errorResponse(res, "Culture not found", 404);
    }

    return successResponse(res, "Culture deleted successfully");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// 🔒 GET ALL CULTURES FOR ADMIN (INCLUDES INACTIVE)
exports.getAdminCultures = async (req, res) => {
  try {
    const cultures = await Culture.find()
      .populate("stateId", "name slug image");
    
    return successResponse(res, "All cultures fetched successfully", cultures);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// 🔒 GET SINGLE CULTURE BY ID (ADMIN)
exports.getCultureById = async (req, res) => {
  try {
    const { id } = req.params;
    const culture = await Culture.findById(id).populate("stateId", "name slug");
    
    if (!culture) {
      return errorResponse(res, "Culture not found", 404);
    }

    return successResponse(res, "Culture details fetched", culture);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

