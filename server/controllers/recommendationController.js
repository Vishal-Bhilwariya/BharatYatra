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

    // Create recommendation object
    const recommendation = new Recommendation({
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
    });

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

