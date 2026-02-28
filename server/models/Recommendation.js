const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // Can be session ID or actual user ID if auth is added
      default: "anonymous",
    },

    interests: [
      {
        type: String,
        enum: [
          "adventure",
          "historical",
          "food",
          "cultural",
          "nature",
          "religious",
          "heritage",
          "beach",
          "mountains",
        ],
      },
    ],

    budget: {
      type: String,
      enum: ["budget", "moderate", "luxury"],
    },

    duration: {
      type: Number, // Number of days
    },

    preferredStates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "State",
      },
    ],

    recommendedPlaces: [
      {
        placeId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Place",
        },
        reason: { type: String }, // Why this place matches their interests
        priority: { type: Number, default: 1 }, // 1 = high priority
      },
    ],

    recommendedCities: [
      {
        cityId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "City",
        },
        reason: { type: String },
        priority: { type: Number, default: 1 },
      },
    ],

    recommendedFoods: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
        },
        reason: { type: String },
        priority: { type: Number, default: 1 },
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recommendation", recommendationSchema);

