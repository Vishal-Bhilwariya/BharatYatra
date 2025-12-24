const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema(
  {
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    type: {
      type: String, // Bus, Train, Metro, Auto
      required: true,
    },
    description: String,
    charges: String,
    route: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transport", transportSchema);
