const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema(
  {
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },

    type: {
      type: String,
      enum: ["bus", "train", "flight", "taxi", "auto", "metro"],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    connectivity: {
      type: String, // nearby cities, airports, stations
    },

    approxCost: {
      type: String, // "₹200–₹500", "₹50", "Varies"
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transport", transportSchema);
