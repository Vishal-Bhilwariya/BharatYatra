const City = require("../models/City");
const Place = require("../models/Place");

// Get cities by state
const getCitiesByState = async (req, res) => {
  try {
    const cities = await City.find({ stateId: req.params.stateId });
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all cities
const getCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new city (STATE-FIRST)
const addCity = async (req, res) => {
  try {
    const { name, description, stateId, image } = req.body;

    const city = new City({
      name,
      description,
      stateId,
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

    const places = await Place.find({ city: city._id });

    res.json({ city, places });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ TEMP SAFE FUNCTIONS (to prevent crash)
const updateCity = async (req, res) => {
  res.json({ message: "Update city not implemented yet" });
};

const deleteCity = async (req, res) => {
  res.json({ message: "Delete city not implemented yet" });
};

module.exports = {
  getCities,
  addCity,
  getCityById,
  getCityWithPlaces,
  updateCity,
  deleteCity,
  getCitiesByState,
};
