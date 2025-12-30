import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import CityCard from "../components/CityCard";

const StateDetails = () => {
  const { slug: stateSlug } = useParams();

  const [state, setState] = useState(null);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStateAndCities = async () => {
      try {
        const stateRes = await api.get(`/states/${stateSlug}`);
        setState(stateRes.data.data);

        const cityRes = await api.get(
          `/states/${stateSlug}/cities`
        );
        setCities(cityRes.data.data);
      } catch (error) {
        console.error("Error loading state details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStateAndCities();
  }, [stateSlug]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6">
      {/* State Info */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{state.name}</h1>
        <p className="mt-2 text-gray-700">{state.description}</p>
        {state.culturalSummary && (
          <p className="mt-3 text-gray-600 italic">{state.culturalSummary}</p>
        )}
        
        {/* Explore Culture Button */}
        <div className="mt-4">
          <Link
            to={`/explore-culture/${stateSlug}`}
            className="inline-block px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            🕉️ Explore Culture
          </Link>
        </div>
      </div>

      {/* Cities */}
      <h2 className="text-2xl font-semibold mb-4">Cities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cities.map((city) => (
          <CityCard key={city.slug} city={city} />
        ))}
      </div>
    </div>
  );
};

export default StateDetails;
