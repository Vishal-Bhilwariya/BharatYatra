import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";

const CityDetails = () => {
  const { id } = useParams();

  const [cityData, setCityData] = useState(null);
  const [foods, setFoods] = useState([]);
  const [transports, setTransports] = useState([]);

  useEffect(() => {
    API.get(`/cities/${id}/places`)
      .then((res) => setCityData(res.data))
      .catch((err) => console.error(err));

    API.get(`/foods/city/${id}`)
      .then((res) => setFoods(res.data))
      .catch((err) => console.error(err));

    API.get(`/transports/city/${id}`)
      .then((res) => setTransports(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // 🔗 Google Maps helper
  const openInMaps = (query) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      query
    )}`;
    window.open(url, "_blank");
  };

  if (!cityData) {
    return (
      <p className="text-center mt-10 text-gray-500">Loading city details...</p>
    );
  }

  const { city, places } = cityData;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 md:px-8 py-8 space-y-8">
      {/* ================= CITY GREETING ================= */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-600">
          Welcome to {city.name}
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-4xl text-lg leading-relaxed">
          {city.description ||
            "Discover the culture, food, transport and attractions of this beautiful city."}
        </p>

        {/* City Map Button */}
        <button
          onClick={() => openInMaps(city.name)}
          className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition"
        >
          📍 View {city.name} on Google Maps
        </button>
      </div>

      {/* ================= PLACES ================= */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6">📍 Places to Visit</h2>
        {places.length === 0 ? (
          <p className="text-gray-500">No places added yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <div
                key={place._id}
                className="bg-white dark:bg-slate-800 border rounded-2xl overflow-hidden hover:shadow-lg transition"
              >
                {/* Image */}
                <img
                  src={place.image || DEFAULT_IMAGE}
                  alt={place.name}
                  className="h-48 w-full object-cover"
                />

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{place.name}</h3>

                  <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                    {place.description}
                  </p>

                  <button
                    onClick={() => openInMaps(`${place.name}, ${city.name}`)}
                    className="mt-4 inline-flex items-center gap-2 text-sm bg-gray-100 dark:bg-slate-700 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600 transition"
                  >
                    🗺️ View on Map
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>

      {/* ================= BEST TIME ================= */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-4">🌤️ Best Time to Visit</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          {city.bestTimeToVisit ||
            "October to March is considered the best time to visit due to pleasant weather and cultural festivals."}
        </p>
      </div>

      {/* ================= FOOD ================= */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6">🍽️ Famous Food</h2>

        {foods.length === 0 ? (
          <p className="text-gray-500">No food data available.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map((food) => (
              <div
                key={food._id}
                className="bg-white dark:bg-slate-800 border rounded-2xl overflow-hidden hover:shadow-lg transition"
              >
                {/* Image */}
                <img
                  src={food.image || DEFAULT_IMAGE}
                  alt={food.name}
                  className="h-48 w-full object-cover"
                />

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{food.name}</h3>

                  <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                    {food.description}
                  </p>

                  {food.bestPlace && (
                    <p className="text-sm text-gray-500 mt-2">
                      Best place:{" "}
                      <span className="font-medium">{food.bestPlace}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= TRANSPORT ================= */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6">🚕 Transport</h2>

        {transports.length === 0 ? (
          <p className="text-gray-500">No transport information.</p>
        ) : (
          <div className="space-y-5">
            {transports.map((t) => (
              <div
                key={t._id}
                className="border border-gray-200 dark:border-slate-700 rounded-xl p-5 hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold">{t.type}</h3>

                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {t.description}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Charges: <span className="font-medium">{t.charges}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= CULTURE ================= */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-4">🧿 Culture & Traditions</h2>

        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          {city.culture ||
            "This city is known for its rich traditions, festivals, local art forms and cultural heritage that reflect the true spirit of India."}
        </p>
      </div>
    </div>
  );
};

export default CityDetails;
