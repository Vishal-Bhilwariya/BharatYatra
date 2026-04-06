import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/api";
import StateCard from "../components/StateCard";
import { MapPin, Search, Compass, Loader2, Mic } from "lucide-react";

const ExploreStates = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  
  const [states, setStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isListening, setIsListening] = useState(false);

  const startVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice search.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setSearchParams({ search: transcript });
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Voice search error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

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
    const stateAliases = {
      "up": "uttar pradesh",
      "mp": "madhya pradesh",
      "hp": "himachal pradesh",
      "uk": "uttarakhand",
      "ap": "andhra pradesh",
      "wb": "west bengal",
      "tn": "tamil nadu",
      "rj": "rajasthan",
      "hr": "haryana",
      "cg": "chhattisgarh",
      "kl": "kerala",
      "mh": "maharashtra",
      "jk": "jammu and kashmir"
    };

    let searchTarget = searchQuery.toLowerCase().trim();
    if (stateAliases[searchTarget]) {
      searchTarget = stateAliases[searchTarget];
    }

    const filtered = states.filter((state) =>
      state.name.toLowerCase().includes(searchTarget)
    );
    setFilteredStates(filtered);
  }, [searchQuery, states]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-4" />
          <p className="text-gray-500 dark:text-gray-400 font-medium">Discovering India's gems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* HD Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90"
            alt="Incredible India"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/85 via-orange-800/70 to-amber-900/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-orange-50/80 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full text-white mb-6">
            <Compass size={18} className="text-orange-300" />
            <span className="text-sm font-semibold tracking-wide uppercase text-orange-100">Discover Incredible India</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
            Explore <span className="bg-gradient-to-r from-orange-300 to-amber-200 bg-clip-text text-transparent">India</span> by State
          </h1>
          <p className="text-lg md:text-xl text-orange-100 max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow">
            Embark on a journey through the diverse tapestry of India. Select a state to uncover its unique culture, heritage, cuisine, and breathtaking destinations.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-orange-600 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-12 py-4 border-2 border-transparent rounded-full leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 dark:focus:ring-orange-500/20 transition-all duration-300 shadow-xl"
              placeholder="Search for a state (e.g., Rajasthan, Kerala)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) {
                  setSearchParams({ search: e.target.value });
                } else {
                  setSearchParams({});
                }
              }}
            />
            <button
              type="button"
              className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : 'text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-gray-700'}`}
              onClick={startVoiceSearch}
              title="Search by Voice"
            >
              <Mic size={20} />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center gap-6 mt-8 flex-wrap">
            {[
              { number: "28+", label: "States" },
              { number: "8", label: "Union Territories" },
              { number: "700+", label: "Cities" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3 text-white text-center">
                <div className="text-2xl font-bold text-amber-300">{stat.number}</div>
                <div className="text-xs text-orange-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filteredStates.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-600">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full inline-block mb-4">
              <MapPin className="text-gray-400" size={48} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No states found</h3>
            <p className="text-gray-600 dark:text-gray-400">
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                All States
                <span className="ml-3 text-sm font-normal text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full">
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
