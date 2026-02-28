import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Globe, Utensils, Bus, MapPin, BookOpen, ArrowRight, CheckCircle, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* 🌄 Hero Section with Welcome Overlay */}
      <section className="relative h-[600px] md:h-[750px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90"
            alt="Taj Mahal, India"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>

        {/* 👤 Welcome Card Overlay */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl px-4">
          <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 shadow-2xl flex items-center gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border-2 border-orange-400 shadow" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center border-2 border-orange-400 shadow">
                  <span className="text-lg font-bold text-white">{user?.name?.charAt(0)?.toUpperCase()}</span>
                </div>
              )}
            </div>
            {/* Name + Badge */}
            <div className="flex-1">
              <div className="text-white font-bold text-lg leading-tight">Welcome, {user?.name}! 🙏</div>
              <div className="flex items-center gap-1.5 mt-1">
                <User size={13} className="text-blue-300" />
                <span className="text-blue-200 text-xs font-medium">Traveler</span>
              </div>
            </div>
            {/* Stats */}
            <div className="flex gap-2">
              <div className="text-center px-3 py-1.5 bg-orange-500/80 rounded-lg text-white shadow">
                <div className="text-base font-bold leading-none">28+</div>
                <div className="text-[10px] opacity-90 mt-0.5">States</div>
              </div>
              <div className="text-center px-3 py-1.5 bg-blue-500/80 rounded-lg text-white shadow">
                <div className="text-base font-bold leading-none">700+</div>
                <div className="text-[10px] opacity-90 mt-0.5">Cities</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Badge */}
        <div className="absolute top-8 right-8 z-10 hidden md:block">
          <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 text-white text-center shadow-2xl">
            <div className="text-2xl font-bold text-orange-400">🇮🇳</div>
            <div className="text-xs font-semibold tracking-widest uppercase mt-1">Incredible India</div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-400/40 rounded-full text-orange-300 text-sm font-semibold mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
                Explore 28+ States & 700+ Destinations
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Discover India,<br />
                <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">Beyond Just Places</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Culture, food, transport & local language — all in one platform.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/explore"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-orange-500/30 hover:shadow-2xl transform hover:-translate-y-1"
                >
                  <Search size={24} />
                  Explore Destinations
                </Link>
                <Link
                  to="/translator"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all shadow-lg transform hover:-translate-y-1"
                >
                  <Globe size={24} />
                  Use Translator
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
      </section>

      {/* 🖼️ India Destinations Showcase */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Popular Destinations</h2>
            <p className="text-gray-500 dark:text-gray-400">From snow-capped peaks to tropical beaches</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: "Rajasthan", label: "Desert Royalty", img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
              { name: "Kerala", label: "God's Own Country", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
              { name: "Varanasi", label: "Spiritual Capital", img: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
              { name: "Himalayas", label: "Peak of the World", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
            ].map((dest) => (
              <Link key={dest.name} to="/explore" className="group relative overflow-hidden rounded-2xl aspect-[3/4] block">
                <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <div className="font-bold text-lg leading-tight">{dest.name}</div>
                  <div className="text-xs text-orange-300 font-medium">{dest.label}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 🧩 C. Feature Highlight Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Explore India
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              BharatYatra brings together all the information you need for a complete Indian travel experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature Card 1 */}
            <Link
              to="#explore-destinations"
              className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100 dark:border-gray-600"
            >
              <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="text-orange-600 dark:text-orange-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Explore by State & City
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Discover detailed information about states, cities, and tourist places across India.
              </p>
            </Link>

            {/* Feature Card 2 */}
            <Link
              to="/translator"
              className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100 dark:border-gray-600"
            >
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <Globe className="text-blue-600 dark:text-blue-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Language Translator
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Break language barriers with our real-time translator supporting multiple Indian languages.
              </p>
            </Link>

            {/* Feature Card 3 */}
            <Link
              to="/explore-culture"
              className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100 dark:border-gray-600"
            >
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <Utensils className="text-purple-600 dark:text-purple-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Food & Local Culture
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Explore local cuisine, cultural traditions, festivals, and lifestyle of each region.
              </p>
            </Link>

            {/* Feature Card 4 */}
            <Link
              to="#explore-destinations"
              className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100 dark:border-gray-600"
            >
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <Bus className="text-green-600 dark:text-green-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Transport & Routes
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get complete transport information including buses, trains, flights, and local transport options.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* 🛠️ D. How BharatYatra Works */}
      <section className="py-20 relative overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Background Decorative Image */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <img
            src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="India Map"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 rounded-full text-sm font-semibold mb-4">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How BharatYatra Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Three simple steps to plan your perfect Indian journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector Line (desktop) */}
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-orange-300 to-amber-300 z-0"></div>

            {/* Step 1 */}
            <div className="relative text-center group">
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-orange-200 dark:shadow-orange-900/50 group-hover:scale-110 transition-transform duration-300">
                  <Search className="text-white" size={36} />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-white dark:bg-gray-800 border-2 border-orange-500 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm shadow">1</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Search Destination</h3>
              <p className="text-gray-600 dark:text-gray-300">Search for any state, city, or place you want to explore. Get instant access to detailed information.</p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center group">
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-200 dark:shadow-blue-900/50 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="text-white" size={36} />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-white dark:bg-gray-800 border-2 border-blue-500 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm shadow">2</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Explore Details</h3>
              <p className="text-gray-600 dark:text-gray-300">Discover places to visit, local food, transport options, cultural information, and more.</p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center group">
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-green-200 dark:shadow-green-900/50 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="text-white" size={36} />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-white dark:bg-gray-800 border-2 border-green-500 rounded-full flex items-center justify-center text-green-600 font-bold text-sm shadow">3</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Travel Smart</h3>
              <p className="text-gray-600 dark:text-gray-300">Use our translator, get recommendations, create itineraries, and travel with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🌟 E. Why BharatYatra? */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why BharatYatra?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Built specifically for Indian travelers who want more than just directions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md flex items-start gap-4">
              <CheckCircle className="text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">India-First Cultural Depth</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Deep insights into regional culture, traditions, festivals, and local lifestyle.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md flex items-start gap-4">
              <CheckCircle className="text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Regional Language Support</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Real-time translation in Hindi, Tamil, Bengali, and more Indian languages.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md flex items-start gap-4">
              <CheckCircle className="text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Local Food & Transport Info</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Complete details about local cuisine, transport options, and connectivity.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md flex items-start gap-4">
              <CheckCircle className="text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Built for Real Indian Travelers</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Designed by Indians, for Indians. Understand local context and travel like a local.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📣 F. Call to Action */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1609920658906-8223bd289001?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=85"
            alt="India Festival"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/90 via-orange-800/85 to-amber-900/80"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-orange-200 text-sm font-semibold mb-6 backdrop-blur-sm">
            🌟 Your Journey Starts Here
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Start Exploring <span className="text-amber-300">Incredible India</span> Today
          </h2>
          <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
            Discover amazing destinations, rich cultures, vibrant festivals, and unforgettable experiences across India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/explore"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-orange-700 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all shadow-2xl hover:shadow-white/25 transform hover:-translate-y-1"
            >
              Explore Destinations
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/explore-culture"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white/50 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all shadow-lg transform hover:-translate-y-1"
            >
              <Globe size={20} />
              Explore Culture
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;
