import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Globe, Utensils, Bus, MapPin, BookOpen, ArrowRight, CheckCircle, User, Mail, Calendar } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* 👤 Profile Section */}
      <section className="py-12 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-32 h-32 rounded-full border-4 border-orange-500 shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center border-4 border-orange-500 shadow-lg">
                    <span className="text-5xl font-bold text-white">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome, {user?.name}! 🙏
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                  Ready to explore the incredible diversity of India?
                </p>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <Mail className="text-orange-600 dark:text-orange-400" size={20} />
                    <span className="text-gray-700 dark:text-gray-300">{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <User className="text-blue-600 dark:text-blue-400" size={20} />
                    <span className="text-gray-700 dark:text-gray-300">Traveler</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-4">
                <div className="text-center px-6 py-4 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl text-white shadow-lg">
                  <div className="text-3xl font-bold">28+</div>
                  <div className="text-sm opacity-90">States</div>
                </div>
                <div className="text-center px-6 py-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl text-white shadow-lg">
                  <div className="text-3xl font-bold">700+</div>
                  <div className="text-sm opacity-90">Cities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 🌄 B. Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="India Travel"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/2000x700/FF6B35/FFFFFF?text=Discover+India";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Discover India,<br />
                <span className="text-orange-600 dark:text-orange-400">Beyond Just Places</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Culture, food, transport & local language — all in one platform.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/explore"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Search size={24} />
                  Explore Destinations
                </Link>
                <Link
                  to="/translator"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 rounded-lg font-semibold text-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Globe size={24} />
                  Use Translator
                </Link>
              </div>
            </div>
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
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100"
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
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How BharatYatra Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Three simple steps to plan your perfect Indian journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">1</span>
              </div>
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="text-orange-600 dark:text-orange-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Search Destination
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Search for any state, city, or place you want to explore. Get instant access to detailed information.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">2</span>
              </div>
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-orange-600 dark:text-orange-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Explore Details
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Discover places to visit, local food, transport options, cultural information, and more.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">3</span>
              </div>
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-orange-600 dark:text-orange-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Travel Smart
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use our translator, get recommendations, create itineraries, and travel with confidence.
              </p>
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
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Exploring India Today
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Discover amazing destinations, cultures, and experiences across India
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 rounded-lg font-semibold text-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Explore Destinations
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>


    </div>
  );
};

export default Home;
