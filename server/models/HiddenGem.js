const mongoose = require("mongoose");

const hiddenGemSchema = new mongoose.Schema(
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

    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "scenic",
        "historical",
        "cultural",
        "adventure",
        "food",
        "nature",
        "spiritual",
        "offbeat",
      ],
      required: true,
    },

    location: {
      address: { type: String },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },

    images: [{ type: String }],

    whyHidden: {
      type: String, // Why it's a hidden gem
    },

    bestTimeToVisit: {
      type: String,
    },

    accessibility: {
      type: String,
      enum: ["easy", "moderate", "difficult"],
    },

    localTips: [{ type: String }],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HiddenGem", hiddenGemSchema);

