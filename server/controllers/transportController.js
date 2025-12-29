const Transport = require("../models/Transport");
const City = require("../models/city");
// CREATE TRANSPORT
exports.createTransport = async (req, res) => {
  try {
    const {
      cityId,
      type,
      description,
      connectivity,
      approxCost,
      isActive,
    } = req.body;

    // 1️⃣ Basic validation
    if (!cityId || !type || !description) {
      return res.status(400).json({
        message: "cityId, type and description are required",
      });
    }

    // 2️⃣ Check if city exists
    const cityExists = await City.findById(cityId);
    if (!cityExists) {
      return res.status(404).json({
        message: "Invalid cityId. City not found.",
      });
    }

    // 3️⃣ Prevent duplicate transport type for same city
    const existingTransport = await Transport.findOne({ cityId, type });
    if (existingTransport) {
      return res.status(409).json({
        message: `Transport type '${type}' already exists for this city`,
      });
    }

    // 4️⃣ Create transport entry
    const transport = await Transport.create({
      cityId,
      type,
      description,
      connectivity,
      approxCost,
      isActive,
    });

    res.status(201).json({
      message: "Transport information added successfully",
      transport,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET TRANSPORT BY CITY ID
exports.getTransportByCity = async (req, res) => {
  try {
    const { cityId } = req.params;

    const transports = await Transport.find({
      cityId,
      isActive: true,
    }).sort({ type: 1 });

    res.status(200).json(transports);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// EXPORT CONTROLLER
module.exports = exports;