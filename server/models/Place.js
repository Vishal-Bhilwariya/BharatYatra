const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
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
    entryFee: String,
    timing: String,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Place", placeSchema);
