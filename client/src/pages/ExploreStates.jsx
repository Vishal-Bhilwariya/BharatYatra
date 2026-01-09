import { useEffect, useState } from "react";
import api from "../api/api";
import StateCard from "../components/StateCard";
import { MapPin, Search, Compass, Loader2 } from "lucide-react";

const ExploreStates = () => {
  const [states, setStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await api.get("/states");
        setStates(res.data.data || []);
        setFilteredStates(res.data.data || []);
      } catch (error) {
        console.error("Failed to load states", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const filtered = states.filter((state) =>
      state.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStates(filtered);
  }, [searchQuery, states]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Discovering India's gems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-orange-100 rounded-full text-orange-700 mb-6 animate-fade-in-up">
            <Compass size={20} className="mr-2" />
            <span className="text-sm font-semibold tracking-wide uppercase">Discover Incredible India</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">India</span> by State
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Embark on a journey through the diverse tapestry of India. Select a state to uncover its unique culture, heritage, cuisine, and breathtaking destinations.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-orange-600 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-4 border-2 border-gray-200 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 shadow-sm"
              placeholder="Search for a state (e.g., Rajasthan, Kerala)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filteredStates.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="bg-gray-100 p-4 rounded-full inline-block mb-4">
              <MapPin className="text-gray-400" size={48} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No states found</h3>
            <p className="text-gray-600">
              We couldn't find any states matching "{searchQuery}". Try a different search term.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-6 px-6 py-2 bg-orange-600 text-white rounded-full font-medium hover:bg-orange-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                All States
                <span className="ml-3 text-sm font-normal text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                  {filteredStates.length}
                </span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredStates.map((state) => (
                <StateCard key={state.slug || state._id} state={state} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreStates;
