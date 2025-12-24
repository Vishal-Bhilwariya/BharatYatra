const Place = require("../models/Place");

// Add place
const addPlace = async (req, res) => {
  try {
    const place = await Place.create(req.body);
    res.status(201).json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get places by city
const getPlacesByCity = async (req, res) => {
  try {
    const places = await Place.find({ city: req.params.cityId });
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addPlace, getPlacesByCity };
