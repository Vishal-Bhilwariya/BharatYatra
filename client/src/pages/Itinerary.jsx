import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { Calendar, MapPin, Clock, DollarSign, Loader } from "lucide-react";
import PlaceMap from "../components/Map/PlaceMap";

const Itinerary = () => {
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [duration, setDuration] = useState(3);
  const [startDate, setStartDate] = useState("");
  const [budget, setBudget] = useState("moderate");
  const [interests, setInterests] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await api.get("/states");
        setStates(res.data.data);
      } catch (error) {
        console.error("Failed to load states", error);
      }
    };
    fetchStates();
  }, []);

  const fetchCities = async (stateId) => {
    try {
      const res = await api.get(`/cities?stateId=${stateId}&limit=200`);
      const allCities = res.data.data?.data || res.data.data || [];
      const stateCities = allCities.filter(
        (city) => city.stateId === stateId || city.stateId?._id === stateId
      );
      setCities(stateCities);
    } catch (error) {
      console.error("Failed to load cities", error);
    }
  };

  const toggleCity = (cityId) => {
    setSelectedCities((prev) =>
      prev.includes(cityId)
        ? prev.filter((id) => id !== cityId)
        : [...prev, cityId]
    );
  };

  const toggleInterest = (interestId) => {
    setInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleGenerate = async () => {
    if (selectedCities.length === 0) {
      alert("Please select at least one city");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/itineraries/generate", {
        duration,
        cityIds: selectedCities,
        interests: interests.length > 0 ? interests : ["cultural", "historical"],
        startDate: startDate || undefined,
        budget,
      });
      setItinerary(res.data.data);
    } catch (error) {
      console.error("Error generating itinerary", error);
      alert("Failed to generate itinerary");
    } finally {
      setLoading(false);
    }
  };

  const interestOptions = [
    "adventure",
    "historical",
    "food",
    "cultural",
    "nature",
    "religious",
    "heritage",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Hero Section with HD Background */}
      <div className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90"
            alt="Travel Planning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-950/90 via-emerald-900/80 to-teal-900/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-green-50 via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-green-100 text-sm font-semibold mb-6">
            <Calendar size={16} className="text-green-300" />
            Plan Your Perfect Trip
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Create Your <span className="text-emerald-300">Itinerary</span>
          </h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto drop-shadow">
            Plan your perfect trip with a personalized itinerary crafted just for you
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-8 -mt-8">

        {!itinerary ? (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
            {/* Duration */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Trip Duration (Days)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:border-green-500 focus:outline-none"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Start Date (Optional)
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:border-green-500 focus:outline-none"
              />
            </div>

            {/* State Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Select State
              </label>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedCities([]); // reset cities when state changes
                  if (e.target.value) {
                    fetchCities(e.target.value);
                  } else {
                    setCities([]);
                  }
                }}
                className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:border-green-500 focus:outline-none"
              >
                <option value="">-- Choose a State --</option>
                {states.map((state) => (
                  <option key={state._id} value={state._id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Cities Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Select Cities (Select multiple)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-4 border border-gray-200 rounded-lg">
                {cities.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    Select a state to see cities, or cities will be auto-selected
                  </p>
                ) : (
                  cities.map((city) => (
                    <button
                      key={city._id}
                      onClick={() => toggleCity(city._id)}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${selectedCities.includes(city._id)
                        ? "border-green-500 bg-green-100 text-green-900"
                        : "border-gray-200 bg-white text-gray-700 hover:border-green-300"
                        }`}
                    >
                      <span className="font-medium">{city.name}</span>
                    </button>
                  ))
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                💡 Tip: If no cities are selected, we'll suggest popular cities
              </p>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Budget Range
              </label>
              <div className="flex gap-4">
                {["budget", "moderate", "luxury"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setBudget(opt)}
                    className={`flex-1 p-3 rounded-lg border-2 font-medium capitalize ${budget === opt
                      ? "border-green-500 bg-green-100 text-green-900"
                      : "border-gray-200 bg-white text-gray-700 hover:border-green-300"
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Interests (Optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-lg border-2 font-medium capitalize ${interests.includes(interest)
                      ? "border-green-500 bg-green-100 text-green-900"
                      : "border-gray-200 bg-white text-gray-700 hover:border-green-300"
                      }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-green-600 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Generating Itinerary...
                </>
              ) : (
                "Generate Itinerary"
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Itinerary Header */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-3xl font-bold text-green-900 mb-2">
                {itinerary.title}
              </h2>
              <p className="text-gray-600 mb-4">{itinerary.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {itinerary.duration} days
                </span>
                {itinerary.estimatedBudget && (
                  <span className="flex items-center gap-1">
                    <DollarSign size={16} />
                    ₹{itinerary.estimatedBudget.total?.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Interactive Map */}
            {(() => {
              const locationsToMap = [];
              if (itinerary.days) {
                itinerary.days.forEach(day => {
                  if (day.activities) {
                    day.activities.forEach(act => {
                      if (act.type === 'place' && act.placeId && act.placeId.coordinates) {
                        locationsToMap.push({
                          name: act.placeId.name,
                          lat: act.placeId.coordinates.lat,
                          lng: act.placeId.coordinates.lng,
                          description: "Day " + day.dayNumber + ": " + act.time
                        });
                      }
                    });
                  }
                  if (day.cityId && day.cityId.coordinates) {
                    locationsToMap.push({
                      name: day.cityId.name,
                      lat: day.cityId.coordinates.lat,
                      lng: day.cityId.coordinates.lng,
                      description: 'City marker'
                    });
                  }
                });
              }

              // Mock some standard coordinates for demo if empty
              if (locationsToMap.length === 0 && itinerary.cities?.length > 0) {
                 locationsToMap.push({ name: itinerary.cities[0]?.cityId?.name || "Destination", lat: 26.9124, lng: 75.7873, description: "Demo City Location" });
              }

              return (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-2xl font-bold text-green-900 mb-4">Trip Map</h3>
                  <div className="h-96 w-full rounded-2xl overflow-hidden shadow-inner border border-gray-100">
                    <PlaceMap locations={locationsToMap} />
                  </div>
                </div>
              );
            })()}

            {/* Daily Itinerary */}
            <div className="space-y-4">
              {itinerary.days &&
                itinerary.days.map((day, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-green-500"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-green-900">
                        Day {day.dayNumber}
                      </h3>
                      {day.cityId && (
                        <span className="flex items-center gap-1 text-gray-600">
                          <MapPin size={16} />
                          {day.cityId.name}
                        </span>
                      )}
                    </div>

                    {/* Activities */}
                    {day.activities && day.activities.length > 0 && (
                      <div className="space-y-3 mb-4">
                        <h4 className="font-semibold text-gray-700">Activities:</h4>
                        {day.activities.map((activity, actIdx) => (
                          <div
                            key={actIdx}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Clock size={16} className="text-green-600" />
                                  <span className="font-medium text-gray-700">
                                    {activity.time}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    ({activity.duration})
                                  </span>
                                </div>
                                {activity.type === "place" && activity.placeId && (
                                  <div>
                                    <h5 className="font-semibold text-gray-800">
                                      {activity.placeId.name}
                                    </h5>
                                    {activity.notes && (
                                      <p className="text-sm text-gray-600 mt-1">
                                        {activity.notes}
                                      </p>
                                    )}
                                  </div>
                                )}
                                {activity.type === "food" && activity.foodId && (
                                  <div>
                                    <h5 className="font-semibold text-gray-800">
                                      {activity.foodId.name}
                                    </h5>
                                    {activity.notes && (
                                      <p className="text-sm text-gray-600 mt-1">
                                        {activity.notes}
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Accommodation */}
                    {day.accommodation && (
                      <div className="bg-blue-50 rounded-lg p-4 mb-2">
                        <h4 className="font-semibold text-gray-700 mb-1">
                          Accommodation:
                        </h4>
                        <p className="text-sm text-gray-600">
                          {day.accommodation.name || day.accommodation.type}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {/* Budget Breakdown */}
            {itinerary.estimatedBudget && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-2xl font-bold text-green-900 mb-4">
                  Budget Breakdown
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Accommodation</p>
                    <p className="text-lg font-semibold">
                      ₹{itinerary.estimatedBudget.accommodation?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Food</p>
                    <p className="text-lg font-semibold">
                      ₹{itinerary.estimatedBudget.food?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Transport</p>
                    <p className="text-lg font-semibold">
                      ₹{itinerary.estimatedBudget.transport?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Activities</p>
                    <p className="text-lg font-semibold">
                      ₹{itinerary.estimatedBudget.activities?.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t-2 border-green-200">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold text-gray-700">Total</p>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{itinerary.estimatedBudget.total?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Reset Button */}
            <div className="text-center">
              <button
                onClick={() => setItinerary(null)}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Create New Itinerary
              </button>
            </div>
          </div>
        )}
      </div>
    </div >
  );
};

export default Itinerary;

