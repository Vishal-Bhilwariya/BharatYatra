import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import PlaceCard from "../components/PlaceCard";
import FoodCard from "../components/FoodCard";
import TransportCard from "../components/TransportCard";
import { Camera, Utensils, Bus, ArrowLeft, MapPin, Info } from "lucide-react";

const CityDetails = () => {
  const { slug: citySlug } = useParams();

  const [city, setCity] = useState(null);
  const [places, setPlaces] = useState([]);
  const [foods, setFoods] = useState([]);
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        setError(null);
        // 1️⃣ Fetch city
        const cityRes = await api.get(`/cities/${citySlug}`);
        if (cityRes.data.success) {
          const cityData = cityRes.data.data;
          setCity(cityData);

          const cityId = cityData._id;

          // 2️⃣ Fetch related data in parallel
          const [placesRes, foodsRes, transportsRes] = await Promise.all([
            api.get(`/places/city/${cityId}`),
            api.get(`/foods/city/${cityId}`),
            api.get(`/transports/city/${cityId}`),
          ]);

          setPlaces(placesRes.data?.data || []);
          setFoods(foodsRes.data?.data || []);
          setTransports(transportsRes.data?.data || []);
        } else {
          setError("City not found");
        }
      } catch (error) {
        console.error("Error loading city details", error);
        setError("Failed to load city details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCityData();
  }, [citySlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading city details...</p>
        </div>
      </div>
    );
  }

  if (error || !city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">{error || "City not found"}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Hero Section with City Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src={city.image}
          alt={city.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/1200x400?text=${encodeURIComponent(city.name)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-orange-200 mb-2">
              <MapPin size={18} />
              <span>{city.stateId?.name || "India"}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{city.name}</h1>
            <p className="text-orange-200 text-lg">{city.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* City History */}
        {city.history && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-orange-500">
            <div className="flex items-start gap-3">
              <Info className="text-orange-600 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">About {city.name}</h3>
                <p className="text-gray-700 leading-relaxed">{city.history}</p>
              </div>
            </div>
          </div>
        )}

        {/* Places Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Camera className="text-orange-600" size={28} />
            <h2 className="text-3xl font-bold text-gray-900">Places to Visit</h2>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              {places.length} {places.length === 1 ? "Place" : "Places"}
            </span>
          </div>
          {places.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <Camera className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 text-lg">No places available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {places.map((place) => (
                <PlaceCard key={place.slug || place._id} place={place} />
              ))}
            </div>
          )}
        </section>

        {/* Food Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Utensils className="text-orange-600" size={28} />
            <h2 className="text-3xl font-bold text-gray-900">Local Food & Cuisine</h2>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              {foods.length} {foods.length === 1 ? "Dish" : "Dishes"}
            </span>
          </div>
          {foods.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <Utensils className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 text-lg">No food information available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {foods.map((food) => (
                <FoodCard key={food.slug || food._id} food={food} />
              ))}
            </div>
          )}
        </section>

        {/* Transport Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Bus className="text-orange-600" size={28} />
            <h2 className="text-3xl font-bold text-gray-900">Transportation</h2>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              {transports.length} {transports.length === 1 ? "Option" : "Options"}
            </span>
          </div>
          {transports.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <Bus className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 text-lg">No transport information available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {transports.map((t) => (
                <TransportCard key={t._id} transport={t} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CityDetails;
