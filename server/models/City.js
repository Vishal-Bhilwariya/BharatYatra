const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
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

    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    history: {
      type: String,
    },

    image: {
      type: String, // banner / card image URL
      required: true,
    },

    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },

    isPopular: {
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

// Indexes for performance
citySchema.index({ stateId: 1, isPopular: -1 });
citySchema.index({ slug: 1 });

module.exports = mongoose.model("City", citySchema);
