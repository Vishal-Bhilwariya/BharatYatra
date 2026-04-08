import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, Compass, Landmark, Coffee, Heart, ChevronRight, User, Mic, BookOpen, CheckCircle } from "lucide-react";
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

      {/* 🛠️ HOW BHARATYATRA WORKS */}
      <section className="py-24 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg')", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">How BharatYatra Works</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-16">Three simple steps to plan your perfect Indian journey</p>
          
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 relative max-w-5xl mx-auto">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-orange-300 via-blue-300 to-green-300 z-0"></div>
            
            {/* Step 1 */}
            <div className="flex-1 flex flex-col items-center relative z-10 w-full text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-[20px] flex items-center justify-center shadow-lg shadow-orange-500/30 text-white transform hover:scale-105 transition-transform">
                  <Search size={32} />
                </div>
                <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-white dark:bg-gray-800 border-[1.5px] border-orange-500 flex items-center justify-center text-orange-500 font-bold text-xs shadow-sm">1</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Search Destination</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Search for any state, city, or place you want to explore. Get instant access to detailed information.</p>
            </div>
            
            {/* Step 2 */}
            <div className="flex-1 flex flex-col items-center relative z-10 w-full text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-500 rounded-[20px] flex items-center justify-center shadow-lg shadow-blue-500/30 text-white transform hover:scale-105 transition-transform">
                  <MapPin size={32} />
                </div>
                <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-white dark:bg-gray-800 border-[1.5px] border-blue-500 flex items-center justify-center text-blue-500 font-bold text-xs shadow-sm">2</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Explore Details</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Discover places to visit, local food, transport options, cultural information, and more.</p>
            </div>
            
            {/* Step 3 */}
            <div className="flex-1 flex flex-col items-center relative z-10 w-full text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-[20px] flex items-center justify-center shadow-lg shadow-green-500/30 text-white transform hover:scale-105 transition-transform">
                  <BookOpen size={32} />
                </div>
                <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-white dark:bg-gray-800 border-[1.5px] border-green-500 flex items-center justify-center text-green-500 font-bold text-xs shadow-sm">3</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Travel Smart</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Use our translator, get recommendations, create itineraries, and travel with confidence.</p>
            </div>
          </div>
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
      <section className="py-20 bg-white dark:bg-[#1a222f] transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Travel Your Way</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">Find the perfect spots matching your vibe</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 'heritage', icon: Landmark, title: "Heritage", color: "bg-amber-100 text-amber-700 dark:bg-[#3d2c23] dark:text-amber-400" },
              { id: 'nature', icon: Compass, title: "Nature & Wildlife", color: "bg-emerald-100 text-emerald-700 dark:bg-[#1b342e] dark:text-emerald-400" },
              { id: 'religious', icon: Heart, title: "Spiritual", color: "bg-rose-100 text-rose-700 dark:bg-[#3b212f] dark:text-rose-400" },
              { id: 'food', icon: Coffee, title: "Cuisine Hubs", color: "bg-blue-100 text-blue-700 dark:bg-[#232e4a] dark:text-blue-400" }
            ].map(cat => (
              <div 
                key={cat.title}
                onClick={() => navigate(`/recommendations?interest=${cat.id}`)}
                className="group flex flex-col items-center p-8 bg-gray-50 dark:bg-[#242f40] rounded-[20px] cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:bg-white dark:hover:bg-[#2b3749] transition-all duration-300 border border-gray-100 dark:border-gray-700/30"
              >
                <div className={`w-16 h-16 rounded-[14px] flex items-center justify-center mb-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform ${cat.color}`}>
                  <cat.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 text-center tracking-wide">{cat.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ❓ WHY BHARATYATRA */}
      <section className="py-24 bg-[#fffaf0] dark:bg-gray-900 border-t border-orange-50 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Why BharatYatra?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Built specifically for Indian travelers who want more than just directions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="shrink-0 mt-1">
                  <CheckCircle className="text-orange-500" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">India-First Cultural Depth</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">Deep insights into regional culture, traditions, festivals, and local lifestyle.</p>
                </div>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="shrink-0 mt-1">
                  <CheckCircle className="text-orange-500" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Regional Language Support</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">Real-time translation in Hindi, Tamil, Bengali, and more Indian languages.</p>
                </div>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="shrink-0 mt-1">
                  <CheckCircle className="text-orange-500" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Local Food & Transport Info</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">Complete details about local cuisine, transport options, and connectivity.</p>
                </div>
              </div>
            </div>
            
            {/* Card 4 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="shrink-0 mt-1">
                  <CheckCircle className="text-orange-500" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Built for Real Indian Travelers</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">Designed by Indians, for Indians. Understand local context and travel like a local.</p>
                </div>
              </div>
            </div>
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
