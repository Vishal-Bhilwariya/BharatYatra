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

    const promptText = `
Generate a realistic and engaging ${duration}-day travel itinerary for the following cities, matching a "${budget}" budget and these interests: ${interests ? interests.join(", ") : "cultural"}.
Here are the available cities and their respective places and foods:
${JSON.stringify(citiesData, null, 2)}

Distribute the ${duration} days among the cities reasonably based on the total duration.
Create a day-by-day plan. For each day, provide the date, the city ID, activities (using ONLY the provided place and food IDs), accommodation details, and transport details.
You MUST respond ONLY with a valid JSON object matching this schema exactly (no markdown formatting, no backticks, just raw JSON):
{
  "cities": [
    { "cityId": "<city_id_here>", "days": <number_of_days_in_this_city>, "order": <order_number_starting_from_1> }
  ],
  "days": [
    {
      "dayNumber": <day_number>,
      "date": "<ISO_date_string>",
      "cityId": "<city_id_here>",
      "activities": [
        {
          "type": "place",
          "placeId": "<place_id>",
          "time": "<e.g. 09:00 AM>",
          "duration": "<e.g. 2 hours>",
          "notes": "<short description>"
        },
        {
          "type": "food",
          "foodId": "<food_id>",
          "time": "<e.g. 12:30 PM>",
          "duration": "<e.g. 1 hour>",
          "notes": "<short description>"
        }
      ],
      "accommodation": { "type": "hotel", "name": "<suggested hotel name>", "location": "<city name>" },
      "transport": { "type": "taxi", "from": "<from>", "to": "<to>", "time": "<time>" }
    }
  ],
  "estimatedBudget": {
    "accommodation": <number>,
    "food": <number>,
    "transport": <number>,
    "activities": <number>,
    "total": <number>
  }
}
CRITICAL INSTRUCTIONS:
- Ensure that the placeId and foodId used in "activities" strictly match the IDs provided in the list of available cities. Do not invent new IDs.
- Ensure the types for "activities" are strictly either "place" or "food". Do not make up types like "rest", only "place" or "food". Do not add an activity if you don't use a place or food from the list.
- Make sure to provide a valid JSON string.
- The "startDate" for Day 1 should be ${startDate ? new Date(startDate).toISOString() : new Date().toISOString()}. Increment for following days.
`;

    // Initialize Google Gen AI
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy_key" });

    let generatedData;
    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is missing in env");
      }
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
      generatedData = JSON.parse(jsonStr.trim());
    } catch (aiError) {
      console.error("AI Generation Error: ", aiError);
      return errorResponse(res, "Failed to generate AI itinerary. Make sure GEMINI_API_KEY is set in .env", 500);
    }

    // Fallback if AI didn't provide required keys
    if (!generatedData || !generatedData.cities || !generatedData.days || !generatedData.estimatedBudget) {
      return errorResponse(res, "AI generated invalid format", 500);
    }

    const isoStartDate = startDate ? new Date(startDate) : new Date();
    const isoEndDate = new Date(isoStartDate.getTime() + (duration - 1) * 24 * 60 * 60 * 1000);

    const itinerary = new Itinerary({
      userId,
      title: `${duration}-Day Trip to ${cities.map((c) => c.name).join(", ")}`,
      description: `A personalized ${duration}-day itinerary crafted for you`,
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

