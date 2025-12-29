const City = require("../models/city");
const State = require("../models/State");
// CREATE CITY
exports.createCity = async (req, res) => {
  try {
    const {
      name,
      stateId,
      description,
      history,
      image,
      isPopular,
      isActive,
    } = req.body;

    // 1️⃣ Basic validation
    if (!name || !stateId || !description || !image) {
      return res.status(400).json({
        message: "Name, stateId, description and image are required",
      });
    }

    // 2️⃣ Check if state exists
    const stateExists = await State.findById(stateId);
    if (!stateExists) {
      return res.status(404).json({
        message: "Invalid stateId. State not found.",
      });
    }

    // 3️⃣ Generate slug from city name
    const slug = name.toLowerCase().trim().replace(/\s+/g, "-");

    // 4️⃣ Check duplicate city in SAME state
    const existingCity = await City.findOne({ slug, stateId });
    if (existingCity) {
      return res.status(409).json({
        message: "City already exists in this state",
      });
    }

    // 5️⃣ Create city
    const city = await City.create({
      name,
      slug,
      stateId,
      description,
      history,
      image,
      isPopular,
      isActive,
    });

    res.status(201).json({
      message: "City created successfully",
      city,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET CITIES BY STATE ID
exports.getCitiesByState = async (req, res) => {
  try {
    const { stateId } = req.params;

    const cities = await City.find({
      stateId,
      isActive: true,
    }).sort({ isPopular: -1, name: 1 });

    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET CITY BY SLUG
exports.getCityBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const city = await City.findOne({
      slug,
      isActive: true,
    }).populate("stateId", "name slug");

    if (!city) {
      return res.status(404).json({
        message: "City not found",
      });
    }

    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// EXPORT CONTROLLER
module.exports = exports; 