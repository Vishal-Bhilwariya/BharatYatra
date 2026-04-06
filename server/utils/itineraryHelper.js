// server/utils/itineraryHelper.js

/**
 * Helper to dynamically generate realistic itineraries without relying entirely on AI generation.
 */
exports.generateAlgorithmicItinerary = (config) => {
  const { duration, citiesData, interests, budget, startDate } = config;

  const daysAllocated = allocateDays(duration, citiesData.length);
  const isoStartDate = startDate ? new Date(startDate) : new Date();

  let days = [];
  let currentDay = 1;
  let currentDate = new Date(isoStartDate);

  // Constants for estimated budget per day (in INR approx)
  const budgetMultiplier = budget === "budget" ? 1 : budget === "luxury" ? 5 : 2;
  const costPerDay = {
    accommodation: 1500 * budgetMultiplier,
    food: 800 * budgetMultiplier,
    transport: 500 * budgetMultiplier,
    activities: 600 * budgetMultiplier,
  };

  const citiesOutput = [];

  citiesData.forEach((cityObj, index) => {
    const daysInThisCity = daysAllocated[index];
    
    citiesOutput.push({
      cityId: cityObj.cityId,
      days: daysInThisCity,
      order: index + 1
    });

    let availablePlaces = [...cityObj.availablePlaces];
    let availableFoods = [...cityObj.availableFoods];

    for (let d = 0; d < daysInThisCity; d++) {
      // Pick 3-4 random/sequential places
      const numPlaces = Math.min(3 + Math.floor(Math.random() * 2), availablePlaces.length);
      const dayPlaces = availablePlaces.splice(0, numPlaces); // Take first N

      // Pick 1-2 foods
      const numFoods = Math.min(1 + Math.floor(Math.random() * 2), availableFoods.length);
      const dayFoods = availableFoods.splice(0, numFoods);

      let activities = [];
      let startTime = 9; // 9 AM

      dayPlaces.forEach((p, i) => {
        activities.push({
          type: "place",
          placeId: p.id,
          time: `${startTime}:00 AM`,
          duration: "2 hours",
          notes: `Visit ${p.name} - known for its ${p.category} significance.`
        });
        startTime += 2; // Add 2 hours
      });

      if (dayFoods.length > 0) {
        activities.push({
          type: "food",
          foodId: dayFoods[0].id,
          time: "01:00 PM", // Lunch
          duration: "1 hour",
          notes: `Try ${dayFoods[0].name} at a local spot.`
        });
      }

      days.push({
        dayNumber: currentDay,
        date: new Date(currentDate),
        cityId: cityObj.cityId,
        activities,
        accommodation: {
          type: budget === "luxury" ? "5-Star Hotel" : budget === "budget" ? "Hostel / Backpacker" : "3-Star Hotel",
          name: `Suggested ${budgetMultiplier === 1 ? 'Budget' : 'Comfort'} Stay in ${cityObj.cityName}`,
          location: cityObj.cityName
        },
        transport: {
          type: "Local Transit / Taxi",
          from: "Hotel",
          to: "City Attractions",
          time: "Morning"
        }
      });

      currentDay++;
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  const estimatedBudget = {
    accommodation: costPerDay.accommodation * duration,
    food: costPerDay.food * duration,
    transport: costPerDay.transport * duration,
    activities: costPerDay.activities * duration,
  };
  estimatedBudget.total = estimatedBudget.accommodation + estimatedBudget.food + estimatedBudget.transport + estimatedBudget.activities;

  return { cities: citiesOutput, days, estimatedBudget };
};

// Helper: Distribute 'totalDays' among 'numCities' evenly
function allocateDays(totalDays, numCities) {
  const base = Math.floor(totalDays / numCities);
  const remainder = totalDays % numCities;
  const daysArray = Array(numCities).fill(base);
  for (let i = 0; i < remainder; i++) {
    daysArray[i]++;
  }
  return daysArray;
}
