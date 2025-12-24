const City = require("../models/City");

// Get all cities
const getCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Add a new city
const addCity = async (req, res) => {
  try {
    const { name, description, state, image } = req.body;

    const city = new City({
      name,
      description,
      state,
      image,
    });

    const savedCity = await city.save();
    res.status(201).json(savedCity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single city by ID
const getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);

    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    res.json(city);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get city with its places
const getCityWithPlaces = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);

    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    // Find places of this city
    const places = await require("../models/Place").find({
      city: city._id,
    });

    res.json({
      city,
      places,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCities, addCity, getCityById, getCityWithPlaces };
