const State = require("../models/State");

// CREATE STATE
exports.createState = async (req, res) => {
  try {
    const { name, description, culturalSummary, image, isActive } = req.body;

    // 1️⃣ Basic validation
    if (!name || !description || !image) {
      return res.status(400).json({
        message: "Name, description and image are required",
      });
    }

    // 2️⃣ Generate slug from name
    const slug = name.toLowerCase().trim().replace(/\s+/g, "-");

    // 3️⃣ Check if state already exists (by slug)
    const existingState = await State.findOne({ slug });
    if (existingState) {
      return res.status(409).json({
        message: "State already exists",
      });
    }

    // 4️⃣ Create new state
    const state = await State.create({
      name,
      slug,
      description,
      culturalSummary,
      image,
      isActive,
    });

    res.status(201).json({
      message: "State created successfully",
      state,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL STATES (Only Active)
exports.getAllStates = async (req, res) => {
  try {
    const states = await State.find({ isActive: true }).sort({ createdAt: -1 });

    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE STATE BY SLUG
exports.getStateBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const state = await State.findOne({ slug, isActive: true });

    if (!state) {
      return res.status(404).json({
        message: "State not found",
      });
    }

    res.status(200).json(state);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// EXPORT CONTROLLER
module.exports = exports;