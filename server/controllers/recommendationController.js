const { GoogleGenAI } = require("@google/genai");
const Recommendation = require("../models/Recommendation");
const Place = require("../models/Place");
const City = require("../models/City");
const Food = require("../models/Food");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// 🎯 GENERATE PERSONALIZED RECOMMENDATIONS
exports.generateRecommendations = async (req, res) => {
  try {
    const { interests, budget, duration, preferredStates } = req.body;
    const userId = req.body.userId || "anonymous";

    if (!interests || !Array.isArray(interests) || interests.length === 0) {
      return errorResponse(
        res,
        "Interests array is required",
        400
      );
    }

    // Build query based on interests
    const placeCategoryMap = {
      adventure: ["nature", "other"],
      historical: ["fort", "palace", "museum", "heritage"],
      food: [], // Handled separately
      cultural: ["temple", "religious", "heritage"],
      nature: ["nature"],
      religious: ["temple", "religious"],
      heritage: ["heritage", "fort", "palace"],
    };

    const relevantCategories = [];
    interests.forEach((interest) => {
      if (placeCategoryMap[interest]) {
        relevantCategories.push(...placeCategoryMap[interest]);
      }
    });

    // Find matching places
    const placeQuery = {
      isActive: true,
    };

    if (relevantCategories.length > 0) {
      placeQuery.category = { $in: relevantCategories };
    }

    if (preferredStates && preferredStates.length > 0) {
      const cities = await City.find({
        stateId: { $in: preferredStates },
        isActive: true,
      }).select("_id");
      const cityIds = cities.map((c) => c._id);
      placeQuery.cityId = { $in: cityIds };
    }

    const places = await Place.find(placeQuery)
      .populate("cityId", "name slug stateId")
      .limit(20)
      .sort({ createdAt: -1 });

    // Find matching cities
    let cityQuery = { isActive: true };
    if (preferredStates && preferredStates.length > 0) {
      cityQuery.stateId = { $in: preferredStates };
    }

    const cities = await City.find(cityQuery)
      .populate("stateId", "name slug")
      .limit(10)
      .sort({ isPopular: -1 });

    // Find matching foods
    let foodQuery = { isActive: true };
    if (preferredStates && preferredStates.length > 0) {
      const cityIds = cities.map((c) => c._id);
      foodQuery.cityId = { $in: cityIds };
    }

    const foods = await Food.find(foodQuery)
      .populate("cityId", "name slug")
      .limit(15);

    // ==========================================
    // AI GENERATION ATTEMPT
    // ==========================================

    let isAiGenerated = false;
    let fallbackToStatic = false;
    let recommendationObj = null;

    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.startsWith("AIza")) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        // Prepare streamlined data for AI context
        const contextPlaces = places.map((p) => ({ id: p._id.toString(), name: p.name, category: p.category, description: p.description?.substring(0, 50) }));
        const contextCities = cities.map((c) => ({ id: c._id.toString(), name: c.name, state: c.stateId?.name }));
        const contextFoods = foods.map((f) => ({ id: f._id.toString(), name: f.name, famousFor: f.famousFor?.substring(0, 50) }));

        const promptText = `
You are an expert Indian travel planner. Generate personalized travel recommendations based on the following:
- User Interests: ${interests.join(", ")}
- Budget: ${budget || "moderate"}
- Duration: ${duration || 7} days

Here is the database of available options:
Cities: ${JSON.stringify(contextCities)}
Places: ${JSON.stringify(contextPlaces)}
Foods: ${JSON.stringify(contextFoods)}

Select the most highly relevant options matching the user's criteria. You must answer ONLY with a raw JSON object adhering strictly to this schema (no markdown, no backticks, just raw JSON):
{
  "recommendedPlaces": [
    { "placeId": "<place_id>", "reason": "<Short personalized 1-sentence reason why this matches their specific interests>", "priority": <number 1-5> }
  ],
  "recommendedCities": [
    { "cityId": "<city_id>", "reason": "<Short personalized 1-sentence reason>", "priority": <number 1-5> }
  ],
  "recommendedFoods": [
    { "foodId": "<food_id>", "reason": "<Short appetizing reason>", "priority": <number 1-5> }
  ]
}
RULES:
1. "placeId", "cityId", and "foodId" MUST be exactly matched from the database options provided. Do not make up IDs.
2. Return up to 6 places, 3 cities, and 4 foods.
3. Your reasons MUST be highly personalized based on their interests.
`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: promptText,
        });

        let jsonStr = response.text.trim();
        if (jsonStr.startsWith("\`\`\`json")) {
          jsonStr = jsonStr.substring(7);
        }
        if (jsonStr.endsWith("\`\`\`")) {
          jsonStr = jsonStr.substring(0, jsonStr.length - 3);
        }

        const generatedData = JSON.parse(jsonStr.trim());

        if (generatedData.recommendedPlaces && generatedData.recommendedCities && generatedData.recommendedFoods) {
          recommendationObj = {
            userId,
            interests,
            budget: budget || "moderate",
            duration: duration || 7,
            preferredStates: preferredStates || [],
            recommendedPlaces: generatedData.recommendedPlaces,
            recommendedCities: generatedData.recommendedCities,
            recommendedFoods: generatedData.recommendedFoods,
          };
          isAiGenerated = true;
          console.log("AI Recommendations generated successfully.");
        } else {
          fallbackToStatic = true;
        }

      } catch (err) {
        console.error("AI Generation failed, falling back to static tag matching: ", err);
        fallbackToStatic = true;
      }
    } else {
      fallbackToStatic = true;
      console.log("No valid GEMINI_API_KEY found. Using static recommendations fallback.");
    }

    // ==========================================
    // STATIC FALLBACK
    // ==========================================
    if (fallbackToStatic) {
      recommendationObj = {
        userId,
        interests,
        budget: budget || "moderate",
        duration: duration || 7,
        preferredStates: preferredStates || [],
        recommendedPlaces: places.slice(0, 10).map((place, index) => ({
          placeId: place._id,
          reason: `Matches your interest in ${interests.join(", ")}`,
          priority: index + 1,
        })),
        recommendedCities: cities.slice(0, 5).map((city, index) => ({
          cityId: city._id,
          reason: `Popular destination with ${interests.join(", ")} attractions`,
          priority: index + 1,
        })),
        recommendedFoods: foods.slice(0, 8).map((food, index) => ({
          foodId: food._id,
          reason: "Local specialty you should try",
          priority: index + 1,
        })),
      };
    }

    // Create recommendation object
    const recommendation = new Recommendation(recommendationObj);

    await recommendation.save();

    return successResponse(
      res,
      "Recommendations generated successfully",
      recommendation
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// 🌐 GET USER RECOMMENDATIONS
exports.getUserRecommendations = async (req, res) => {
  try {
    const userId = req.query.userId || "anonymous";

    const recommendations = await Recommendation.find({ userId })
      .populate("recommendedPlaces.placeId")
      .populate("recommendedCities.cityId")
      .populate("recommendedFoods.foodId")
      .sort({ createdAt: -1 })
      .limit(5);

    return successResponse(
      res,
      "Recommendations fetched successfully",
      recommendations
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

