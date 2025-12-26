import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* ================= HERO SECTION ================= */}
      <section
        className="relative h-[80vh] flex items-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1548013146-72479768bada",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Discover the Rich Cultural <br /> Heritage of India
          </h1>

          <p className="mt-4 text-lg text-gray-200">
            Explore destinations, culture, food, transport and communicate in
            local languages — all in one place.
          </p>

          <div className="mt-6 flex gap-4 flex-wrap">
            <Link to="/explore">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg">
                Explore Destinations
              </button>
            </Link>

            <Link to="/translator">
              <button className="border border-white text-white px-6 py-3 rounded-full text-lg hover:bg-white hover:text-black transition">
                🌐 Translator
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* ================================================= */}

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Heading */}
          <h2 className="text-4xl font-bold text-center mb-4">
            How BharatYatra Works
          </h2>
          <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto">
            From planning to exploring — BharatYatra is your complete travel
            companion for discovering India.
          </p>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {/* Step 1 */}
            <div className="group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition">
                🔍
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                Search Your Destination
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Search any{" "}
                <span className="text-orange-400">state, city, or place </span>
                 using our smart search and start exploring instantly.
              </p>
            </div>

            {/* Step 2 */}
            <div className="group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition">
                🏙️
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                Explore Everything
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Learn about{" "}
                <span className="text-orange-400">
                  culture, food, transport
                </span>
                , attractions and hidden gems — all in one place.
              </p>
            </div>

            {/* Step 3 */}
            <div className="group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition">
                🌍
              </div>
              <h3 className="text-2xl font-semibold mb-3">Travel Smart</h3>
              <p className="text-gray-300 leading-relaxed">
                Use our{" "}
                <span className="text-orange-400">language translator</span>
                and local insights to travel confidently anywhere in India.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* =============================================== */}
      {/* ================= FEATURE CARDS ================= */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Explore BharatYatra
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Link
              to="/explore"
              className="bg-gradient-to-br from-pink-500 to-red-500 text-white rounded-2xl p-8 shadow-lg hover:scale-105 transition"
            >
              <div className="text-5xl mb-4">🏛️</div>
              <h3 className="text-2xl font-bold mb-2">Popular Destinations</h3>
              <p>Discover states, cities and hidden cultural gems of India.</p>
            </Link>

            <Link
              to="/translator"
              className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl p-8 shadow-lg hover:scale-105 transition"
            >
              <div className="text-5xl mb-4">🌐</div>
              <h3 className="text-2xl font-bold mb-2">Language Translator</h3>
              <p>Communicate easily across regions using local languages.</p>
            </Link>

            <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-2xl p-8 shadow-lg hover:scale-105 transition">
              <div className="text-5xl mb-4">🚌</div>
              <h3 className="text-2xl font-bold mb-2">Transport Information</h3>
              <p>Find routes, buses, trains and travel charges easily.</p>
            </div>
          </div>
        </div>
      </section>
      {/* ================================================ */}
    </div>
  );
};

export default Home;
