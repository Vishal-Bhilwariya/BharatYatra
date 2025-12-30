import { useEffect, useState } from "react";
import api from "../api/api";
import StateCard from "../components/StateCard";

const Home = () => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await api.get("/states");
        setStates(res.data.data);
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
        <p className="text-center text-xl">Loading states...</p>
      </div>
    );
  }

  if (states.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">No states available</p>
          <p className="text-sm text-gray-500">
            Please check if the backend server is running and MongoDB is connected.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4">
            🗺️ Explore India
          </h1>
          <p className="text-lg text-gray-700">
            Discover amazing destinations across India
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {states.map((state) => (
            <StateCard key={state.slug || state._id} state={state} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
