const Food = require("../models/Food");
const City = require("../models/city");
// CREATE FOOD
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
      isActive,
    } = req.body;

    // 1️⃣ Basic validation
    if (!name || !cityId || !type || !description || !image) {
      return res.status(400).json({
        message: "Name, cityId, type, description and image are required",
      });
    }

    // 2️⃣ Check if city exists
    const cityExists = await City.findById(cityId);
    if (!cityExists) {
      return res.status(404).json({
        message: "Invalid cityId. City not found.",
      });
    }

    // 3️⃣ Generate slug from food name
    const slug = name.toLowerCase().trim().replace(/\s+/g, "-");

    // 4️⃣ Prevent duplicate food in same city
    const existingFood = await Food.findOne({ slug, cityId });
    if (existingFood) {
      return res.status(409).json({
        message: "Food item already exists in this city",
      });
    }

    // 5️⃣ Create food
    const food = await Food.create({
      name,
      slug,
      cityId,
      type,
      description,
      famousFor,
      approxPrice,
      image,
      isActive,
    });

    res.status(201).json({
      message: "Food created successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET FOODS BY CITY ID
exports.getFoodsByCity = async (req, res) => {
  try {
    const { cityId } = req.params;

    const foods = await Food.find({
      cityId,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET FOOD BY SLUG
exports.getFoodBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const food = await Food.findOne({
      slug,
      isActive: true,
    }).populate("cityId", "name slug");

    if (!food) {
      return res.status(404).json({
        message: "Food item not found",
      });
    }

    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// GET ALL FOODS (Only Active)
exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};