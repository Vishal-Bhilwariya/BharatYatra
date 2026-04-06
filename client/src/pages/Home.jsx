import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, Compass, Landmark, Coffee, Heart, ChevronRight, User, Mic } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [trendingCities, setTrendingCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isListening, setIsListening] = useState(false);

  const startVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice search.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN"; // Target Indian English for states/cities
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
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
    const fetchTrending = async () => {
      try {
        const res = await api.get("/cities/trending?limit=6");
        if (res.data?.data) {
          setTrendingCities(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch trending cities:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrending();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      {/* 🌟 HERO SECTION */}
      <section className="relative h-[85vh] min-h-[600px] w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Dynamic High-Res Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=95"
            alt="Beautiful Indian Palace"
            className="w-full h-full object-cover animate-pan-slow"
          />
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center text-center mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-semibold mb-6 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Discover the soul of India
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight animate-fade-in-up animation-delay-100">
            Where do you want to <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">
              go today?
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl font-medium drop-shadow-md mb-12 animate-fade-in-up animation-delay-200">
            Explore diverse cultures, hidden gems, and iconic monuments.
          </p>

          {/* Centralized Glassmorphism Search */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="w-full max-w-3xl bg-white/20 dark:bg-black/30 backdrop-blur-xl p-2 rounded-2xl md:rounded-full border border-white/30 shadow-2xl flex flex-col md:flex-row items-center gap-2 animate-fade-in-up animation-delay-300"
          >
            <div className="relative flex-1 w-full mt-2 md:mt-0">
              <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-white/70" size={20} />
              <input
                type="text"
                placeholder="Search for cities, states, or places..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder:text-white/70 pl-12 pr-12 py-4 outline-none text-lg"
              />
              <button
                type="button"
                className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                onClick={startVoiceSearch}
                title="Search by Voice"
              >
                <Mic size={20} />
              </button>
            </div>
            <button 
              type="submit" 
              className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 outline-none text-white px-10 py-4 rounded-xl md:rounded-full font-bold text-lg transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <Search size={20} />
              Explore
            </button>
          </form>
        </div>
      </section>

      {/* 🏙️ TRENDING DESTINATIONS */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Trending Destinations</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">Most visited locations across India right now.</p>
          </div>
          <Link to="/explore" className="hidden md:flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
            View All <ChevronRight size={18} />
          </Link>
        </div>

        {isLoading ? (
          /* Skeleton Loaders */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="rounded-3xl h-80 bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingCities.map((city) => (
              <Link 
                key={city._id} 
                to={`/city/${city.slug}`}
                className="group relative h-80 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img 
                  src={city.image || "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800"} 
                  alt={city.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold uppercase tracking-wider">
                      {city.stateId?.name || "India"}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">{city.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 🎭 EXPLORE BY CATEGORY */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Travel Your Way</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">Find the perfect spots matching your vibe</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 'heritage', icon: Landmark, title: "Heritage", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
              { id: 'nature', icon: Compass, title: "Nature & Wildlife", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
              { id: 'spiritual', icon: Heart, title: "Spiritual", color: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" },
              { id: 'food', icon: Coffee, title: "Cuisine Hubs", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" }
            ].map(cat => (
              <div 
                key={cat.title}
                className="group flex flex-col items-center p-8 bg-gray-50 dark:bg-gray-700/50 rounded-3xl cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 border border-gray-100 dark:border-gray-600"
              >
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform ${cat.color}`}>
                  <cat.icon size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">{cat.title}</h3>
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">Explore &rarr;</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 QUICK ACTION / CALL TO ACTION */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=2000&q=80" className="w-full h-full object-cover" alt="India mountains" />
          <div className="absolute inset-0 bg-emerald-900/80 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Plan Your Complete Journey</h2>
          <p className="text-xl text-emerald-50 mb-10 opacity-90 max-w-2xl mx-auto">Skip the hassle. Try our new AI-assisted Smart Itinerary generator to map out your perfect vacation day by day.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/itinerary" className="px-8 py-4 bg-white text-emerald-900 font-bold rounded-full hover:bg-emerald-50 transition-colors shadow-2xl hover:shadow-white/20 transform hover:-translate-y-1">
              Create Smart Itinerary
            </Link>
            {!user && (
              <Link to="/login" className="px-8 py-4 bg-transparent border-2 border-white/50 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
                Sign In to Save Trips
              </Link>
            )}
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;
