import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import CityCard from "../components/CityCard";
import { MapPin, BookOpen, ArrowLeft } from "lucide-react";

const StateDetails = () => {
  const { slug: stateSlug } = useParams();

  const [state, setState] = useState(null);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStateAndCities = async () => {
      try {
        setError(null);
        const stateRes = await api.get(`/states/${stateSlug}`);
        if (stateRes.data.success) {
          setState(stateRes.data.data);
        } else {
          setError("State not found");
        }

        const cityRes = await api.get(`/states/${stateSlug}/cities`);
        if (cityRes.data.success) {
          setCities(cityRes.data.data || []);
        }
      } catch (error) {
        console.error("Error loading state details", error);
        setError("Failed to load state details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStateAndCities();
  }, [stateSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading state details...</p>
        </div>
      </div>
    );
  }

  if (error || !state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">{error || "State not found"}</p>
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
      {/* Hero Section with State Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src={state.image}
          alt={state.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/1200x400?text=${encodeURIComponent(state.name)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{state.name}</h1>
            <p className="text-orange-200 text-lg">{state.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cultural Summary */}
        {state.culturalSummary && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-orange-500">
            <div className="flex items-start gap-3">
              <BookOpen className="text-orange-600 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Cultural Heritage</h3>
                <p className="text-gray-700 leading-relaxed">{state.culturalSummary}</p>
              </div>
            </div>
          </div>
        )}

        {/* Explore Culture Button */}
        <div className="mb-8">
          <Link
            to={`/explore-culture/${stateSlug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
          >
            <BookOpen size={20} />
            Explore Culture & Traditions
          </Link>
        </div>

        {/* Cities Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="text-orange-600" size={28} />
            <h2 className="text-3xl font-bold text-gray-900">
              Cities in {state.name}
            </h2>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              {cities.length} {cities.length === 1 ? "City" : "Cities"}
            </span>
          </div>

          {cities.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <MapPin className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 text-lg">No cities available for this state yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cities.map((city) => (
                <CityCard key={city.slug || city._id} city={city} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StateDetails;
