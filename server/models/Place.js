const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
    },

    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },

    category: {
      type: String,
      enum: [
        "temple",
        "fort",
        "palace",
        "museum",
        "nature",
        "heritage",
        "religious",
        "other",
      ],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    history: {
      type: String,
    },

    images: {
      type: [String], // array of image URLs
      default: [],
    },

    bestTimeToVisit: {
      type: String,
    },

    entryFee: {
      type: String, // keep string: "Free", "₹50", "₹50–₹100"
    },

    location: {
      type: String, // address / landmark
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

module.exports = mongoose.model("Place", placeSchema);
