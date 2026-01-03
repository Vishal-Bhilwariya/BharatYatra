import { useEffect, useState } from "react";
import api from "../api/api";
import StateCard from "../components/StateCard";
import { MapPin } from "lucide-react";

const ExploreStates = () => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await api.get("/states");
        setStates(res.data.data || []);
      } catch (error) {
        console.error("Failed to load states", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore India by State
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a state to discover its cities, places, culture, food, and transport
          </p>
        </div>

        {states.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 text-lg">No states available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {states.map((state) => (
              <StateCard key={state.slug || state._id} state={state} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreStates;
