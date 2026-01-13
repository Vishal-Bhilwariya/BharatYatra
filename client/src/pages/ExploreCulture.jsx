import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import {
  Calendar, Music, Users, BookOpen, MapPin,
  ShoppingBag, Utensils, Shirt, Palette, Globe,
  ChevronRight, ArrowLeft, Star
} from "lucide-react";

// Hardcoded Region Mapping since Backend doesn't have it yet
const REGIONS = {
  "North India": ["Jammu and Kashmir", "Himachal Pradesh", "Punjab", "Haryana", "Delhi", "Uttar Pradesh", "Uttarakhand", "Rajasthan"],
  "South India": ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana"],
  "East India": ["West Bengal", "Odisha", "Bihar", "Jharkhand"],
  "West India": ["Maharashtra", "Gujarat", "Goa"],
  "Central India": ["Madhya Pradesh", "Chhattisgarh"],
  "North East India": ["Assam", "Sikkim", "Meghalaya", "Arunachal Pradesh", "Nagaland", "Manipur", "Mizoram", "Tripura"]
};

// Section Icons Map
const ICONS = {
  overview: Globe,
  food: Utensils,
  shops: ShoppingBag,
  dance: Music,
  clothing: Shirt,
  festivals: Calendar,
  art: Palette,
  heritage: Users,
  places: MapPin,
  extras: BookOpen
};

const ExploreCulture = () => {
  const { stateSlug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Data States
  const [allStates, setAllStates] = useState([]);
  const [culture, setCulture] = useState(null);
  const [stateInfo, setStateInfo] = useState(null); // Basic state info (name, etc)

  // View States
  const [selectedRegion, setSelectedRegion] = useState("North India");

  useEffect(() => {
    if (stateSlug) {
      fetchCultureBySlug();
    } else {
      fetchAllStates();
    }
  }, [stateSlug]);

  const fetchAllStates = async () => {
    setLoading(true);
    try {
      const res = await api.get("/states");
      if (res.data?.data) {
        setAllStates(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching states", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCultureBySlug = async () => {
    setLoading(true);
    try {
      // 1. Fetch Culture Data
      const res = await api.get(`/cultures/state/${stateSlug}`);
      if (res.data?.data) {
        setCulture(res.data.data);
        setStateInfo(res.data.data.stateId); // Populated state info
      } else {
        setCulture(null);
      }
    } catch (error) {
      console.error("Error fetching culture", error);
      setCulture(null);
    } finally {
      setLoading(false);
    }
  };

  // --- RENDERERS ---

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600"></div>
      </div>
    );
  }

  // --- VIEW 1: LANDING PAGE (HIERARCHY) ---
  if (!stateSlug) {
    return (
      <div className="min-h-screen bg-orange-50 py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold text-orange-900 mb-4 font-serif">
              Discover Cultural India
            </h1>
            <p className="text-lg text-orange-800 max-w-2xl mx-auto">
              Explore the diverse traditions, cuisines, and heritage of India, region by region.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {Object.keys(REGIONS).map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${selectedRegion === region
                    ? "bg-orange-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-orange-100 border border-orange-200"
                  }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* States Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-orange-900 mb-6 flex items-center">
              <MapPin className="mr-2" /> States in {selectedRegion}
            </h2>

            {/* Filter States for Region */}
            {(() => {
              const regionStatesNames = REGIONS[selectedRegion];
              const statesInRegion = allStates.filter(s => regionStatesNames.includes(s.name));

              if (statesInRegion.length === 0) {
                return <p className="text-gray-500 italic">No states found for this region in our database yet.</p>;
              }

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {statesInRegion.map(state => (
                    <Link to={`/explore-culture/${state.slug}`} key={state._id} className="group">
                      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full border border-orange-100">
                        <div className="h-40 overflow-hidden">
                          <img src={state.image} alt={state.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="p-4">
                          <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                            {state.name}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mt-2">{state.description}</p>
                          <div className="mt-4 flex items-center text-orange-600 font-medium text-sm">
                            Explore Culture <ChevronRight size={16} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 2: STATE DETAILED CULTURE PAGE ---

  if (!culture) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 p-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Culture Not Found</h2>
          <p className="text-gray-600 mb-6">We haven't documented the detailed culture for this state yet.</p>
          <Link to="/explore-culture" className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700">Explore Other States</Link>
        </div>
      </div>
    );
  }

  // Determine Region for breadcrumb
  const currentRegion = Object.keys(REGIONS).find(r => REGIONS[r].includes(stateInfo?.name)) || "India";

  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      {/* Navigation / Breadcrumbs */}
      <div className="bg-orange-900 text-orange-100 py-3 px-4 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center text-sm md:text-base overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-white">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to="/explore-culture" className="hover:text-white">Culture</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="opacity-80 cursor-default">{currentRegion}</span>
          <ChevronRight size={16} className="mx-2" />
          <span className="font-semibold text-white">{stateInfo?.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh]">
        <img
          src={culture.overview?.images?.[0] || stateInfo?.image}
          alt={`${stateInfo?.name} Culture`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end">
          <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12 w-full">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 font-serif">{stateInfo?.name}</h1>
            <p className="text-xl md:text-2xl text-orange-200 max-w-3xl leading-relaxed">
              {culture.overview?.introduction}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16">

        {/* 1. Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Lifestyle", content: culture.overview?.lifestyle, icon: Users },
            { title: "Traditions", content: culture.overview?.traditions, icon: BookOpen },
            { title: "History", content: culture.overview?.history, icon: Globe },
          ].filter(item => item.content).map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-orange-500 hover:shadow-lg transition">
              <item.icon className="text-orange-600 mb-4 h-8 w-8" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.content}</p>
            </div>
          ))}
        </div>

        {/* 2. Famous Food */}
        {culture.cuisine?.dishes?.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Utensils className="text-orange-600 h-8 w-8" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Famous Cuisine</h2>
            </div>
            <p className="text-gray-700 mb-8 max-w-4xl text-lg">{culture.cuisine.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {culture.cuisine.dishes.map((dish, idx) => (
                <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                  {dish.image && <div className="h-48 overflow-hidden"><img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" /></div>}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{dish.name}</h3>
                      {dish.type && <span className={`text-xs px-2 py-1 rounded-full ${dish.type === 'Veg' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{dish.type}</span>}
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{dish.description}</p>
                    <div className="text-orange-600 font-semibold">{dish.priceRange}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. Famous Shops */}
        {culture.foodShops?.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <ShoppingBag className="text-orange-600 h-8 w-8" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Iconic Food Spots</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {culture.foodShops.map((shop, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-orange-100 shadow-sm hover:shadow-md flex flex-col md:flex-row gap-4 items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{shop.name}</h3>
                    <p className="text-gray-500 text-sm mb-2"><MapPin size={14} className="inline mr-1" />{shop.location}</p>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p><span className="font-semibold text-orange-700">Famous for:</span> {shop.famousDish}</p>
                      <p><span className="font-semibold text-orange-700">Price:</span> {shop.priceRange}</p>
                      {shop.timings && <p><span className="font-semibold text-orange-700">Open:</span> {shop.timings}</p>}
                    </div>
                  </div>
                  {shop.rating > 0 && (
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg font-bold flex items-center gap-1">
                      {shop.rating} <Star size={14} fill="currentColor" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. Dance & Music */}
        {(culture.danceAndMusic?.dances?.length > 0 || culture.danceAndMusic?.music?.length > 0) && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Music className="text-orange-600 h-8 w-8" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Dance & Music</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Dances */}
              {culture.danceAndMusic.dances.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-orange-500 pl-4">Folk & Classical Dance</h3>
                  <div className="space-y-6">
                    {culture.danceAndMusic.dances.map((dance, idx) => (
                      <div key={idx} className="flex gap-4 items-start bg-white p-4 rounded-xl shadow-sm">
                        {dance.image ? (
                          <img src={dance.image} alt={dance.name} className="w-24 h-24 rounded-lg object-cover" />
                        ) : (
                          <div className="w-24 h-24 rounded-lg bg-orange-100 flex items-center justify-center text-orange-300"><Music /></div>
                        )}
                        <div>
                          <h4 className="text-lg font-bold text-gray-800">{dance.name}</h4>
                          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-uppercase tracking-wider">{dance.type || 'Dance'}</span>
                          <p className="text-sm text-gray-600 mt-2">{dance.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Music & Instruments */}
              {culture.danceAndMusic.instruments?.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-orange-500 pl-4">Music & Instruments</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {culture.danceAndMusic.instruments.map((inst, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-xl text-center shadow-sm hover:shadow-md transition">
                        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Music size={20} />
                        </div>
                        <h4 className="font-bold text-gray-800">{inst.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{inst.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 5. Traditional Clothing */}
        {culture.traditionalAttire && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Shirt className="text-orange-600 h-8 w-8" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Traditional Attire</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Men */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-blue-600">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">For Men</h3>
                <p className="text-gray-600 text-center mb-6">{culture.traditionalAttire.men?.description}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {culture.traditionalAttire.men?.attire?.map((item, idx) => (
                    <span key={idx} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-medium">{typeof item === 'string' ? item : item.name || item}</span>
                  ))}
                </div>
              </div>
              {/* Women */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-pink-500">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">For Women</h3>
                <p className="text-gray-600 text-center mb-6">{culture.traditionalAttire.women?.description}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {culture.traditionalAttire.women?.attire?.map((item, idx) => (
                    <span key={idx} className="px-4 py-2 bg-pink-50 text-pink-700 rounded-full font-medium">{typeof item === 'string' ? item : item.name || item}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 6. Festivals */}
        {culture.festivals?.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="text-orange-600 h-8 w-8" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Festivals & Celebrations</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {culture.festivals.map((fest, idx) => (
                <div key={idx} className="bg-gradient-to-br from-white to-orange-50 rounded-xl overflow-hidden shadow-md border border-orange-100">
                  {fest.images?.[0] && <div className="h-40 overflow-hidden"><img src={fest.images[0]} alt={fest.name} className="w-full h-full object-cover" /></div>}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-orange-900">{fest.name}</h3>
                    </div>
                    <div className="text-sm text-orange-600 font-medium mb-3 flex items-center gap-1">
                      <Calendar size={14} /> {fest.celebrationTime}
                    </div>
                    <p className="text-gray-600 text-sm">{fest.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. Art & Handicrafts */}
        {culture.artAndHandicrafts?.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Palette className="text-orange-600 h-8 w-8" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Art, Handicrafts & Local Products</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {culture.artAndHandicrafts.map((art, idx) => (
                <div key={idx} className="flex gap-6 items-center bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition">
                  {art.images?.[0] && <img src={art.images[0]} alt={art.name} className="w-24 h-24 rounded-full object-cover border-4 border-orange-100" />}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{art.name}</h3>
                    <span className="text-sm text-gray-500 block mb-2">{art.type}</span>
                    <p className="text-gray-600 text-sm">{art.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. Heritage */}
        {culture.heritageAndTraditions && (
          <section className="bg-orange-900 text-white rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Users className="text-orange-300 h-8 w-8" />
              <h2 className="text-3xl md:text-4xl font-bold">Heritage & Values</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-orange-200 mb-6">Customs & Rituals</h3>
                <ul className="space-y-4">
                  {culture.heritageAndTraditions.customs?.map((c, idx) => (
                    <li key={idx} className="border-l-4 border-orange-500 pl-4 py-1">
                      <h4 className="font-bold text-lg">{c.title}</h4>
                      <p className="text-orange-100 opacity-80">{c.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-orange-200 mb-6">Daily Life & Values</h3>
                <div className="space-y-6">
                  <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                    <h4 className="font-bold text-lg mb-2 text-white">Daily Life</h4>
                    <p className="text-orange-100 leading-relaxed">{culture.heritageAndTraditions.dailyLife}</p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                    <h4 className="font-bold text-lg mb-2 text-white">Community Values</h4>
                    <p className="text-orange-100 leading-relaxed">{culture.heritageAndTraditions.values}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 9. Cultural Places */}
        {culture.culturalPlaces?.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <MapPin className="text-orange-600 h-8 w-8" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Cultural Places</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {culture.culturalPlaces.map((place, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-2xl shadow-lg h-64">
                  <img src={place.image} alt={place.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{place.name}</h3>
                    <p className="text-xs text-orange-300 mb-2 uppercase tracking-wide">{place.type} • {place.location}</p>
                    <p className="text-sm opacity-90 line-clamp-2">{place.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 10. Extras */}
        {culture.extraSections?.map((section, idx) => (
          <section key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100">
            <h2 className="text-2xl font-bold text-orange-900 mb-4">{section.title}</h2>
            <div className="prose prose-orange max-w-none text-gray-700">
              {/* Simple markdown rendering or direct text */}
              {section.content}
            </div>
          </section>
        ))}

      </div>
    </div>
  );
};

export default ExploreCulture;
