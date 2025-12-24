const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    priceRange: String,
    bestPlace: String,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
