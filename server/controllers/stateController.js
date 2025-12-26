const State = require("../models/State");

// Add new state
const addState = async (req, res) => {
  try {
    const state = await State.create(req.body);
    res.status(201).json(state);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all states
const getStates = async (req, res) => {
  try {
    const states = await State.find();
    res.json(states);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single state
const getStateById = async (req, res) => {
  try {
    const state = await State.findById(req.params.id);
    res.json(state);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addState, getStates, getStateById };
