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

module.exports = { getCities, addCity };
