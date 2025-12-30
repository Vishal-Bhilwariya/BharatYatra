const mongoose = require("mongoose");

const cultureSchema = new mongoose.Schema(
  {
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
      unique: true, // One culture entry per state
    },

    // Hindu Culture Focus
    hinduCulture: {
      festivals: [
        {
          name: { type: String, required: true },
          description: { type: String, required: true },
          significance: { type: String },
          celebrationPeriod: { type: String }, // e.g., "October-November"
          images: [{ type: String }], // Array of image URLs
          videos: [{ type: String }], // Array of video URLs
        },
      ],

      traditions: [
        {
          name: { type: String, required: true },
          description: { type: String, required: true },
          practice: { type: String }, // How it's practiced
          images: [{ type: String }],
          videos: [{ type: String }],
        },
      ],

      rituals: [
        {
          name: { type: String, required: true },
          description: { type: String, required: true },
          whenPerformed: { type: String },
          importance: { type: String },
          images: [{ type: String }],
          videos: [{ type: String }],
        },
      ],

      lifestyle: {
        description: { type: String, required: true },
        dailyPractices: [{ type: String }],
        familyStructure: { type: String },
        socialCustoms: [{ type: String }],
        images: [{ type: String }],
        videos: [{ type: String }],
      },

      culturalHistory: {
        description: { type: String, required: true },
        historicalEvents: [
          {
            event: { type: String },
            year: { type: String },
            significance: { type: String },
          },
        ],
        ancientPractices: [{ type: String }],
        images: [{ type: String }],
        videos: [{ type: String }],
      },
    },

    // General State Culture
    generalCulture: {
      languages: [{ type: String }],
      artForms: [
        {
          name: { type: String },
          description: { type: String },
          images: [{ type: String }],
        },
      ],
      music: {
        description: { type: String },
        instruments: [{ type: String }],
        videos: [{ type: String }],
      },
      dance: {
        description: { type: String },
        forms: [{ type: String }],
        videos: [{ type: String }],
      },
      cuisine: {
        description: { type: String },
        specialties: [{ type: String }],
      },
      clothing: {
        description: { type: String },
        traditionalAttire: [{ type: String }],
        images: [{ type: String }],
      },
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

module.exports = mongoose.model("Culture", cultureSchema);

