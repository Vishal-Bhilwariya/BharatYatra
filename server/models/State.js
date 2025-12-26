const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    languages: [String],
    image: {
      type: String, // image URL (later)
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("State", stateSchema);
