const Place = require("../models/Place");
const City = require("../models/city");

// CREATE PLACE
exports.createPlace = async (req, res) => {
  try {
    const {
      name,
      cityId,
      category,
      description,
      history,
      images,
      bestTimeToVisit,
      entryFee,
      location,
      isActive,
    } = req.body;

    // 1️⃣ Basic validation
    if (!name || !cityId || !category || !description) {
      return res.status(400).json({
        message: "Name, cityId, category and description are required",
      });
    }

    // 2️⃣ Check if city exists
    const cityExists = await City.findById(cityId);
    if (!cityExists) {
      return res.status(404).json({
        message: "Invalid cityId. City not found.",
      });
    }

    // 3️⃣ Generate slug from place name
    const slug = name.toLowerCase().trim().replace(/\s+/g, "-");

    // 4️⃣ Prevent duplicate place in same city
    const existingPlace = await Place.findOne({ slug, cityId });
    if (existingPlace) {
      return res.status(409).json({
        message: "Place already exists in this city",
      });
    }

    // 5️⃣ Create place
    const place = await Place.create({
      name,
      slug,
      cityId,
      category,
      description,
      history,
      images,
      bestTimeToVisit,
      entryFee,
      location,
      isActive,
    });

    res.status(201).json({
      message: "Place created successfully",
      place,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET PLACES BY CITY ID
exports.getPlacesByCity = async (req, res) => {
  try {
    const { cityId } = req.params;

    const places = await Place.find({
      cityId,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET PLACE BY SLUG
exports.getPlaceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const place = await Place.findOne({
      slug,
      isActive: true,
    }).populate("cityId", "name slug");

    if (!place) {
      return res.status(404).json({
        message: "Place not found",
      });
    }

    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
