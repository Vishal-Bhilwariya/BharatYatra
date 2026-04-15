const mongoose = require("mongoose");

const verifiedActionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    purpose: {
      type: String,
      enum: ["signup"],
      required: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
    consumed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

verifiedActionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
verifiedActionSchema.index({ email: 1, purpose: 1 }, { unique: true });

module.exports = mongoose.model("VerifiedAction", verifiedActionSchema);
