const Transport = require("../models/Transport");

// Add transport
const addTransport = async (req, res) => {
  try {
    const transport = await Transport.create(req.body);
    res.status(201).json(transport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get transport by city
const getTransportByCity = async (req, res) => {
  try {
    const transport = await Transport.find({ city: req.params.cityId });
    res.json(transport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addTransport, getTransportByCity };
