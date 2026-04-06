const { GoogleGenAI } = require("@google/genai");
const Recommendation = require("../models/Recommendation");
const Place = require("../models/Place");
const City = require("../models/City");
const Food = require("../models/Food");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// 🎯 GENERATE PERSONALIZED RECOMMENDATIONS (Weighted Scoring Algorithm)
exports.generateRecommendations = async (req, res) => {
  try {
    const { interests, budget, duration, preferredStates } = req.body;
    const userId = req.body.userId || "anonymous";

    if (!interests || !Array.isArray(interests) || interests.length === 0) {
      return errorResponse(res, "Interests array is required", 400);
    }

    // 1. Define categorization mapping
    const placeCategoryMap = {
      adventure: ["nature", "other"],
      historical: ["fort", "palace", "museum", "heritage"],
      food: [], // Handled via foods collection
      cultural: ["temple", "religious", "heritage", "museum"],
      nature: ["nature"],
      religious: ["temple", "religious"],
      heritage: ["heritage", "fort", "palace", "museum"],
      beach: ["nature"],
      mountains: ["nature"]
    };

    const relevantCategories = [];
    interests.forEach((interest) => {
      if (placeCategoryMap[interest]) {
        relevantCategories.push(...placeCategoryMap[interest]);
      }
    });

    // 2. Fetch Base Data (Applying primary filters)
    const placeQuery = { isActive: true };
    let cityQuery = { isActive: true };
    let foodQuery = { isActive: true };

    if (preferredStates && preferredStates.length > 0) {
      cityQuery.stateId = { $in: preferredStates };
      const citiesInState = await City.find(cityQuery).select("_id");
      const cityIds = citiesInState.map((c) => c._id);
      
      placeQuery.cityId = { $in: cityIds };
      foodQuery.cityId = { $in: cityIds };
    }

    // Fetch significantly more records to score them properly
    const allPlaces = await Place.find(placeQuery).populate("cityId", "name slug stateId isPopular");
    const allCities = await City.find(cityQuery).populate("stateId", "name slug");
    const allFoods = await Food.find(foodQuery).populate("cityId", "name slug");

    // 3. WEIGHTED SCORING ALGORITHM
    
    // Helper to determine budget score
    const getBudgetScore = (entryFee, userBudget) => {
      if (!entryFee) return 0;
      const desc = entryFee.toLowerCase();
      if (userBudget === "budget" && (desc.includes("free") || desc.includes("not required"))) return 10;
      if (userBudget === "luxury" && (desc.includes("expensive") || desc.includes("luxury"))) return 10;
      return 5; // Default moderate match
    };

    // A) Score Places
    const scoredPlaces = allPlaces.map((place) => {
      let score = 0;
      let matchReason = "Highly rated destination.";

      // Feature: Interest Match (+20)
      if (relevantCategories.includes(place.category)) {
        score += 20;
        const matchedInterest = interests.find(i => placeCategoryMap[i]?.includes(place.category)) || interests[0];
        matchReason = `Perfectly matches your interest in ${matchedInterest}.`;
      }

      // Feature: Budget Match (+10)
      score += getBudgetScore(place.entryFee, budget || "moderate");

      // Feature: Popularity Boost (+5)
      if (place.cityId && place.cityId.isPopular) {
        score += 5;
      }

      return {
        placeId: place._id,
        score,
        reason: matchReason
      };
    });

    // B) Score Cities based on aggregate Place scores
    const cityScores = {};
    scoredPlaces.forEach((sp) => {
      const place = allPlaces.find(p => p._id.equals(sp.placeId));
      if (place && place.cityId) {
        const cId = place.cityId._id.toString();
        if (!cityScores[cId]) cityScores[cId] = { score: 0, count: 0 };
        cityScores[cId].score += sp.score;
        cityScores[cId].count += 1;
      }
    });

    const scoredCities = allCities.map((city) => {
      const cId = city._id.toString();
      let score = city.isPopular ? 15 : 0; // Base popularity score
      
      if (cityScores[cId]) {
        score += cityScores[cId].score / cityScores[cId].count; // Add average place score
      }

      return {
        cityId: city._id,
        score,
        reason: city.isPopular ? "A must-visit popular destination." : `Great hub for ${interests[0] || "exploration"}.`
      };
    });

    // 4. SORT AND SELECT TOP N

    scoredPlaces.sort((a, b) => b.score - a.score);
    scoredCities.sort((a, b) => b.score - a.score);
    
    // Foods are selected generally from the top cities for simplicity in scoring
    const topCityIdsArr = scoredCities.slice(0, 3).map(c => c.cityId.toString());
    const matchedFoods = allFoods.filter(f => f.cityId && topCityIdsArr.includes(f.cityId._id.toString()));

    const topPlaces = scoredPlaces.slice(0, 10).map((sp, idx) => ({ 
      placeId: sp.placeId, 
      reason: sp.reason, 
      priority: idx + 1 
    }));
    
    const topCities = scoredCities.slice(0, 5).map((sc, idx) => ({ 
      cityId: sc.cityId, 
      reason: sc.reason, 
      priority: idx + 1 
    }));

    const topFoods = matchedFoods.slice(0, 8).map((f, idx) => ({
      foodId: f._id,
      reason: "Local delicacy you must try.",
      priority: idx + 1
    }));

    // 5. SAVE RECOMMENDATION
    const recommendationObj = {
      userId,
      interests,
      budget: budget || "moderate",
      duration: duration || 7,
      preferredStates: preferredStates || [],
      recommendedPlaces: topPlaces,
      recommendedCities: topCities,
      recommendedFoods: topFoods,
    };

    const recommendation = new Recommendation(recommendationObj);
    await recommendation.save();

    return successResponse(res, "Recommendations generated successfully", recommendation);
  } catch (error) {
    console.error("Error generating recommendations:", error);
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

