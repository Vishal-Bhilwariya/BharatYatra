const mongoose = require("mongoose");

const safetyInfoSchema = new mongoose.Schema(
  {
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
    },

    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },

    emergencyContacts: [
      {
        name: { type: String, required: true }, // e.g., "Police", "Hospital"
        number: { type: String, required: true },
        type: {
          type: String,
          enum: ["police", "medical", "fire", "tourist-helpline", "other"],
        },
      },
    ],

    safetyTips: [
      {
        category: {
          type: String,
          enum: [
            "general",
            "transport",
            "food",
            "health",
            "weather",
            "cultural",
            "scams",
          ],
        },
        tip: { type: String, required: true },
        priority: { type: String, enum: ["high", "medium", "low"] },
      },
    ],

    healthInfo: {
      vaccinations: [{ type: String }],
      commonHealthIssues: [{ type: String }],
      hospitals: [
        {
          name: { type: String },
          address: { type: String },
          contact: { type: String },
        },
      ],
    },

    weatherAlerts: [
      {
        season: { type: String },
        alert: { type: String },
        precautions: [{ type: String }],
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SafetyInfo", safetyInfoSchema);

