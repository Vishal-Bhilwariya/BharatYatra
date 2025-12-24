const Food = require("../models/Food");

// Add food
const addFood = async (req, res) => {
  try {
    const food = await Food.create(req.body);
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get food by city
const getFoodByCity = async (req, res) => {
  try {
    const foods = await Food.find({ city: req.params.cityId });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addFood, getFoodByCity };
