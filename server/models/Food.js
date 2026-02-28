const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
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

    type: {
      type: String,
      enum: ["veg", "non-veg", "vegan"],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    famousFor: {
      type: String, // why this dish is special
    },

    approxPrice: {
      type: String, // "₹40–₹80", "₹150", "Free"
    },

    image: {
      type: String, // image URL
      required: true,
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

module.exports = mongoose.model("Food", foodSchema);
