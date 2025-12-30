const Itinerary = require("../models/Itinerary");
const City = require("../models/city");
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

    // Calculate days per city
    const daysPerCity = Math.floor(duration / cities.length);
    const extraDays = duration % cities.length;

    // Build itinerary days
    const days = [];
    let currentDate = startDate ? new Date(startDate) : new Date();
    let cityIndex = 0;
    let dayNumber = 1;

    for (let i = 0; i < cities.length; i++) {
      const city = cities[i];
      const daysInCity = daysPerCity + (i < extraDays ? 1 : 0);

      // Fetch places and foods for this city
      const [places, foods] = await Promise.all([
        Place.find({ cityId: city._id, isActive: true }).limit(5),
        Food.find({ cityId: city._id, isActive: true }).limit(3),
      ]);

      for (let d = 0; d < daysInCity && dayNumber <= duration; d++) {
        const dayActivities = [];

        // Add places
        if (places.length > 0) {
          const placesForDay = places.slice(0, 3);
          placesForDay.forEach((place, idx) => {
            dayActivities.push({
              type: "place",
              placeId: place._id,
              time: idx === 0 ? "09:00 AM" : idx === 1 ? "02:00 PM" : "05:00 PM",
              duration: "2 hours",
              notes: `Visit ${place.name}`,
            });
          });
        }

        // Add food
        if (foods.length > 0 && d === 0) {
          // Add food on first day in city
          dayActivities.push({
            type: "food",
            foodId: foods[0]._id,
            time: "12:30 PM",
            duration: "1 hour",
            notes: `Try local specialty: ${foods[0].name}`,
          });
        }

        days.push({
          dayNumber,
          date: new Date(currentDate),
          cityId: city._id,
          activities: dayActivities,
          accommodation: {
            type: "hotel",
            name: `Hotel in ${city.name}`,
            location: city.name,
          },
        });

        currentDate.setDate(currentDate.getDate() + 1);
        dayNumber++;
      }
    }

    // Calculate estimated budget
    const estimatedBudget = {
      accommodation: duration * (budget === "luxury" ? 3000 : budget === "moderate" ? 1500 : 800),
      food: duration * (budget === "luxury" ? 2000 : budget === "moderate" ? 1000 : 500),
      transport: cities.length * (budget === "luxury" ? 5000 : budget === "moderate" ? 2000 : 1000),
      activities: duration * (budget === "luxury" ? 1500 : budget === "moderate" ? 800 : 400),
    };
    estimatedBudget.total =
      estimatedBudget.accommodation +
      estimatedBudget.food +
      estimatedBudget.transport +
      estimatedBudget.activities;

    const itinerary = new Itinerary({
      userId,
      title: `${duration}-Day Trip to ${cities.map((c) => c.name).join(", ")}`,
      description: `A ${duration}-day itinerary covering ${cities.length} cities`,
      duration,
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: new Date(currentDate.getTime() - 24 * 60 * 60 * 1000),
      stateId: cities[0].stateId._id,
      cities: cities.map((city, index) => ({
        cityId: city._id,
        days: daysPerCity + (index < extraDays ? 1 : 0),
        order: index + 1,
      })),
      days,
      estimatedBudget,
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

