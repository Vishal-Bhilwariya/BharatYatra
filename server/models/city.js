const mongoose = require("mongoose");

// City schema
const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    state: {
      type: String,
    },
    image: {
      type: String, // image URL
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("City", citySchema);
