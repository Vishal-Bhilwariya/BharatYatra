const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: "anonymous",
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    duration: {
      type: Number, // Number of days
      required: true,
    },

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
    },

    cities: [
      {
        cityId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "City",
        },
        days: { type: Number }, // Number of days in this city
        order: { type: Number }, // Order in itinerary
      },
    ],

    days: [
      {
        dayNumber: { type: Number, required: true },
        date: { type: Date },
        cityId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "City",
        },
        activities: [
          {
            type: {
              type: String,
              enum: ["place", "food", "culture", "transport", "rest"],
            },
            placeId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Place",
            },
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            time: { type: String }, // e.g., "09:00 AM", "Afternoon"
            duration: { type: String }, // e.g., "2 hours", "30 minutes"
            notes: { type: String },
          },
        ],
        accommodation: {
          type: { type: String }, // "hotel", "homestay", "camping"
          name: { type: String },
          location: { type: String },
        },
        transport: {
          type: { type: String }, // "bus", "train", "flight", "taxi"
          from: { type: String },
          to: { type: String },
          time: { type: String },
        },
      },
    ],

    estimatedBudget: {
      accommodation: { type: Number },
      food: { type: Number },
      transport: { type: Number },
      activities: { type: Number },
      total: { type: Number },
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
        ],
      },
    ],

    isPublic: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model("Itinerary", itinerarySchema);

