const { GoogleGenAI } = require("@google/genai");
const Itinerary = require("../models/Itinerary");
const City = require("../models/City");
const Place = require("../models/Place");
const Food = require("../models/Food");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// 📅 GENERATE ITINERARY
exports.generateItinerary = async (req, res) => {
  try {
    const {
      duration,
      stateId,
      cityIds,
      interests,
      startDate,
      budget,
      userId = "anonymous",
    } = req.body;

    if (!duration || duration < 1) {
      return errorResponse(res, "Duration is required (minimum 1 day)", 400);
    }

    if (!cityIds || !Array.isArray(cityIds) || cityIds.length === 0) {
      return errorResponse(res, "At least one city is required", 400);
    }

    // Fetch cities
    const cities = await City.find({
      _id: { $in: cityIds },
      isActive: true,
    })
      .populate("stateId", "name slug")
      .limit(10);

    if (cities.length === 0) {
      return errorResponse(res, "No valid cities found", 404);
    }

    // Fetch places and foods for all cities to provide to AI
    const citiesData = await Promise.all(
      cities.map(async (city) => {
        const places = await Place.find({ cityId: city._id, isActive: true });
        const foods = await Food.find({ cityId: city._id, isActive: true });
        return {
          cityId: city._id.toString(),
          cityName: city.name,
          availablePlaces: places.map((p) => ({ id: p._id.toString(), name: p.name, category: p.category })),
          availableFoods: foods.map((f) => ({ id: f._id.toString(), name: f.name, type: f.type, famousFor: f.famousFor })),
        };
      })
    );

    // AI PROMPT/GEMINI REPLACED WITH SMART ALGORITHM FOR STABILITY
    // Initialize Smart Algorithmic Itinerary Generator
    const { generateAlgorithmicItinerary } = require("../utils/itineraryHelper");
    
    const generatedData = generateAlgorithmicItinerary({
      duration,
      citiesData,
      interests,
      budget: budget || "moderate",
      startDate
    });

    const isoStartDate = startDate ? new Date(startDate) : new Date();
    const isoEndDate = new Date(isoStartDate.getTime() + (duration - 1) * 24 * 60 * 60 * 1000);

    const itinerary = new Itinerary({
      userId,
      title: `${duration}-Day Trip to ${cities.map((c) => c.name).join(", ")}`,
      description: `A personalized ${duration}-day itinerary crafted algorithmically for you`,
      duration,
      startDate: isoStartDate,
      endDate: isoEndDate,
      stateId: cities[0].stateId._id,
      cities: generatedData.cities,
      days: generatedData.days,
      estimatedBudget: generatedData.estimatedBudget,
      interests: interests || ["cultural", "historical"],
    });

    await itinerary.save();

    const populatedItinerary = await Itinerary.findById(itinerary._id)
      .populate("stateId", "name slug")
      .populate("cities.cityId", "name slug image")
      .populate("days.cityId", "name slug")
      .populate("days.activities.placeId", "name slug images")
      .populate("days.activities.foodId", "name slug image");

    return successResponse(
      res,
      "Itinerary generated successfully",
      populatedItinerary
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// 🌐 GET USER ITINERARIES
exports.getUserItineraries = async (req, res) => {
  try {
    const userId = req.query.userId || "anonymous";

    const itineraries = await Itinerary.find({ userId, isActive: true })
      .populate("stateId", "name slug")
      .populate("cities.cityId", "name slug image")
      .sort({ createdAt: -1 });

    return successResponse(
      res,
      "Itineraries fetched successfully",
      itineraries
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// 🌐 GET SINGLE ITINERARY
exports.getItineraryById = async (req, res) => {
  try {
    const { id } = req.params;

    const itinerary = await Itinerary.findById(id)
      .populate("stateId", "name slug")
      .populate("cities.cityId", "name slug image")
      .populate("days.cityId", "name slug")
      .populate("days.activities.placeId", "name slug images description")
      .populate("days.activities.foodId", "name slug image description approxPrice");

    if (!itinerary) {
      return errorResponse(res, "Itinerary not found", 404);
    }

    return successResponse(res, "Itinerary fetched successfully", itinerary);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

