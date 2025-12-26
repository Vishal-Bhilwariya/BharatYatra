const mongoose = require("mongoose");

// City schema
const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String, // image URL
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("City", citySchema);
