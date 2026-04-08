import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/api";
import { MapPin, Utensils, Camera, Loader } from "lucide-react";

const Recommendations = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialInterest = searchParams.get("interest");

  const [interests, setInterests] = useState(initialInterest ? [initialInterest] : []);
  const [budget, setBudget] = useState("moderate");
  const [duration, setDuration] = useState(7);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    if (initialInterest && !interests.includes(initialInterest)) {
      setInterests([initialInterest]);
    }
  }, [initialInterest]);

  const interestOptions = [
    { id: "adventure", label: "Adventure", icon: "🏔️" },
    { id: "historical", label: "Historical", icon: "🏛️" },
    { id: "food", label: "Food", icon: "🍜" },
    { id: "cultural", label: "Cultural", icon: "🎭" },
    { id: "nature", label: "Nature", icon: "🌲" },
    { id: "religious", label: "Religious", icon: "🕉️" },
    { id: "heritage", label: "Heritage", icon: "🏰" },
    { id: "beach", label: "Beach", icon: "🏖️" },
    { id: "mountains", label: "Mountains", icon: "⛰️" },
  ];

  const toggleInterest = (interestId) => {
    setInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleGenerate = async () => {
    if (interests.length === 0) {
      alert("Please select at least one interest");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/recommendations/generate", {
        interests,
        budget,
        duration,
      });
      setRecommendations(res.data.data);
    } catch (error) {
      console.error("Error generating recommendations", error);
      alert("Failed to generate recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Hero Section with HD Background */}
      <div className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1509114397022-ed747cca3f65?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90"
            alt="India Travel Recommendations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950/90 via-purple-900/80 to-pink-900/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-purple-50 via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-purple-100 text-sm font-semibold mb-6">
            🎯 AI-Powered Recommendations
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Personalized <span className="text-pink-300">Recommendations</span>
          </h1>
          <p className="text-purple-100 text-lg max-w-2xl mx-auto drop-shadow">
            Get travel recommendations tailored perfectly to your interests and dreams
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-8 -mt-8">

        {!recommendations ? (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
            {/* Interests Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                Select Your Interests (Select multiple)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interestOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => toggleInterest(option.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${interests.includes(option.id)
                      ? "border-purple-500 bg-purple-100 text-purple-900"
                      : "border-gray-200 bg-white text-gray-700 hover:border-purple-300"
                      }`}
                  >
                    <span className="text-2xl mb-2 block">{option.icon}</span>
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Selection */}
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
                      ? "border-purple-500 bg-purple-100 text-purple-900"
                      : "border-gray-200 bg-white text-gray-700 hover:border-purple-300"
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

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
                className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading || interests.length === 0}
              className="w-full bg-purple-600 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Generating Recommendations...
                </>
              ) : (
                "Generate Recommendations"
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Recommended Places */}
            {recommendations.recommendedPlaces &&
              recommendations.recommendedPlaces.length > 0 && (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                    <Camera size={24} />
                    Recommended Places
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recommendations.recommendedPlaces.map((rec, idx) => {
                      const place = rec.placeId;
                      if (!place) return null;
                      return (
                        <div
                          key={idx}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                          onClick={() => navigate(`/city/${place.cityId?.slug}`)}
                        >
                          <h3 className="font-semibold text-lg text-gray-800 mb-2">
                            {place.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {place.description?.substring(0, 100)}...
                          </p>
                          <p className="text-xs text-purple-600">{rec.reason}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            {/* Recommended Cities */}
            {recommendations.recommendedCities &&
              recommendations.recommendedCities.length > 0 && (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                    <MapPin size={24} />
                    Recommended Cities
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recommendations.recommendedCities.map((rec, idx) => {
                      const city = rec.cityId;
                      if (!city) return null;
                      return (
                        <div
                          key={idx}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                          onClick={() => navigate(`/city/${city.slug}`)}
                        >
                          <h3 className="font-semibold text-lg text-gray-800 mb-2">
                            {city.name}
                          </h3>
                          <p className="text-xs text-purple-600">{rec.reason}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            {/* Recommended Foods */}
            {recommendations.recommendedFoods &&
              recommendations.recommendedFoods.length > 0 && (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                    <Utensils size={24} />
                    Recommended Foods
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recommendations.recommendedFoods.map((rec, idx) => {
                      const food = rec.foodId;
                      if (!food) return null;
                      return (
                        <div
                          key={idx}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
                        >
                          <h3 className="font-semibold text-lg text-gray-800 mb-2">
                            {food.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {food.description?.substring(0, 80)}...
                          </p>
                          {food.approxPrice && (
                            <p className="text-sm font-medium text-green-600">
                              {food.approxPrice}
                            </p>
                          )}
                          <p className="text-xs text-purple-600 mt-2">
                            {rec.reason}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            {/* Reset Button */}
            <div className="text-center">
              <button
                onClick={() => setRecommendations(null)}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Generate New Recommendations
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;

