const Transport = require("../models/Transport");
const City = require("../models/city");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// ✅ CREATE TRANSPORT (ADMIN)
exports.createTransport = async (req, res) => {
  try {
    const {
      cityId,
      type,          // train | bus | flight | road
      description,
      connectivity,
      approxCost,
    } = req.body;

    if (!cityId || !type) {
      return errorResponse(res, "cityId and transport type are required", 400);
    }

    // check city exists
    const city = await City.findById(cityId);
    if (!city || !city.isActive) {
      return errorResponse(res, "Invalid or inactive city", 404);
    }

    // prevent duplicate transport type for same city
    const existingTransport = await Transport.findOne({ cityId, type });
    if (existingTransport) {
      return errorResponse(
        res,
        "Transport type already exists for this city",
        409
      );
    }

    const transport = await Transport.create({
      cityId,
      type,
      description,
      connectivity,
      approxCost,
      createdBy: req.adminId,
    });

    return successResponse(
      res,
      "Transport created successfully",
      transport,
      201
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ UPDATE TRANSPORT
exports.updateTransport = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTransport = await Transport.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedTransport) {
      return errorResponse(res, "Transport not found", 404);
    }

    return successResponse(
      res,
      "Transport updated successfully",
      updatedTransport
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ SOFT DELETE TRANSPORT
exports.deleteTransport = async (req, res) => {
  try {
    const { id } = req.params;

    const transport = await Transport.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!transport) {
      return errorResponse(res, "Transport not found", 404);
    }

    return successResponse(
      res,
      "Transport deleted successfully",
      transport
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
