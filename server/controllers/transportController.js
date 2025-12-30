const Transport = require("../models/Transport");
const City = require("../models/city");
const { successResponse, errorReponse } = require("../utils/apiResponse");

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
