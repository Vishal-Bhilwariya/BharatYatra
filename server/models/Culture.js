const mongoose = require("mongoose");

const cultureSchema = new mongoose.Schema(
  {
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
      unique: true, // One culture entry per state
    },
    stateName: { // Added for easier identification in info
      type: String,
      required: true,
    },

    // 1. Short Cultural Summary (Overview)
    overview: {
      introduction: { type: String, required: true },
      lifestyle: { type: String },
      traditions: { type: String },
      history: { type: String },
      images: [{ type: String }],
    },

    // 2. Famous Food
    cuisine: {
      description: { type: String },
      dishes: [
        {
          name: { type: String, required: true },
          type: { type: String, enum: ["Veg", "Non-Veg", "Vegan", "Beverage", "Sweet"], default: "Veg" },
          priceRange: { type: String }, // e.g., "₹150–₹300"
          description: { type: String },
          image: { type: String },
        },
      ],
    },

    // 3. Famous Food Shops / Restaurants
    foodShops: [
      {
        name: { type: String, required: true },
        location: { type: String }, // City/Area
        famousDish: { type: String },
        priceRange: { type: String },
        rating: { type: Number, min: 0, max: 5 },
        timings: { type: String },
      },
    ],

    // 4. Dance & Music Culture
    danceAndMusic: {
      dances: [
        {
          name: { type: String },
          type: { type: String, enum: ["Classical", "Folk", "Tribal", "Modern"] },
          description: { type: String },
          image: { type: String },
          video: { type: String },
        },
      ],
      music: [
        {
          name: { type: String },
          description: { type: String },
          image: { type: String },
        },
      ],
      instruments: [
        {
          name: { type: String },
          description: { type: String },
          image: { type: String },
        },
      ],
    },

    // 5. Traditional Clothing
    traditionalAttire: {
      men: {
        description: { type: String },
        attire: [{ name: { type: String }, description: { type: String } }],
        images: [{ type: String }],
      },
      women: {
        description: { type: String },
        attire: [{ name: { type: String }, description: { type: String } }],
        images: [{ type: String }],
      },
      fabrics: [
        {
          name: { type: String },
          description: { type: String }, // e.g., Silk, Cotton, Bandhani
        },
      ],
    },

    // 6. Festivals & Celebrations
    festivals: [
      {
        name: { type: String, required: true },
        celebrationTime: { type: String }, // e.g. "October-November" or "Kartik Month"
        significance: { type: String },
        description: { type: String },
        images: [{ type: String }],
      },
    ],

    // 7. Art, Handicrafts & Local Products
    artAndHandicrafts: [
      {
        name: { type: String },
        type: { type: String }, // Painting, Pottery, Handloom, etc.
        description: { type: String },
        famousFor: { type: String },
        images: [{ type: String }],
      },
    ],

    // 8. Cultural Heritage & Traditions
    heritageAndTraditions: {
      customs: [{ title: { type: String }, description: { type: String } }], // Marriage, etc.
      rituals: [{ title: { type: String }, description: { type: String } }],
      dailyLife: { type: String },
      values: { type: String },
    },

    // 9. Places Related to Culture
    culturalPlaces: [
      {
        name: { type: String },
        type: { type: String }, // Museum, Village, Temple, etc.
        location: { type: String },
        description: { type: String },
        image: { type: String },
      },
    ],

    // 10. Extra Sections (Expandable)
    extraSections: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true }, // Markdown supported
      },
    ],

    // 11. Cultural Experience Planner
    culturalExperience: {
      liveEvents: [
        {
          name: { type: String, required: true },
          location: { type: String },
          date: { type: Date },
          entryFee: { type: String },
          image: { type: String },
          audience: [{ type: String }], // e.g. ["Tourist", "Family"]
        },
      ],
      foodTrails: [
        {
          name: { type: String, required: true },
          type: { type: String },
          description: { type: String },
          priceRange: { type: String },
          duration: { type: String },
          audience: [{ type: String }],
        },
      ],
      workshops: [
        {
          name: { type: String, required: true },
          type: { type: String },
          duration: { type: String },
          price: { type: String },
          skillLevel: { type: String },
          audience: [{ type: String }],
        },
      ],
      festivalCalendar: [
        {
          name: { type: String, required: true },
          priority: { type: Number, default: 0 }, // For sorting importance
          date: { type: Date },
          significance: { type: String },
          images: [{ type: String }],
          audience: [{ type: String }],
        },
      ],
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
