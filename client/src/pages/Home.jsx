import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import StateCard from "../components/StateCard";

const Home = () => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    API.get("/states")
      .then((res) => setStates(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* ================= HERO SECTION ================= */}
      <section
        className="relative h-[80vh] flex items-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1548013146-72479768bada)",
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
            Explore states, cities, culture, food, transport and local
            languages — all in one place.
          </p>

          <div className="mt-6 flex gap-4 flex-wrap">
            <a href="#states">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg">
                Explore States
              </button>
            </a>

            <Link to="/translator">
              <button className="border border-white text-white px-6 py-3 rounded-full text-lg hover:bg-white hover:text-black transition">
                🌐 Translator
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* ================================================= */}
{/* ================= FEATURE CARDS ================= */}
<section className="py-16 px-8 bg-gray-100 dark:bg-gray-900">
  <div className="max-w-6xl mx-auto">

    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10">
      Explore BharatYatra
    </h2>

    <div className="grid md:grid-cols-3 gap-8">

      {/* Popular Destinations */}
      <div
        onClick={() => window.location.href = "#states"}
        className="cursor-pointer bg-gradient-to-br from-pink-500 to-red-500 text-white rounded-2xl p-8 shadow-lg hover:scale-105 transition"
      >
        <div className="text-5xl mb-4">🏛️</div>
        <h3 className="text-2xl font-bold mb-2">
          Popular Destinations
        </h3>
        <p className="text-white/90">
          Discover top tourist places across Indian states and cities.
        </p>
      </div>

      {/* Language Translator */}
      <div
        onClick={() => window.location.href = "/translator"}
        className="cursor-pointer bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl p-8 shadow-lg hover:scale-105 transition"
      >
        <div className="text-5xl mb-4">🌐</div>
        <h3 className="text-2xl font-bold mb-2">
          Language Translator
        </h3>
        <p className="text-white/90">
          Translate local languages and communicate easily anywhere in India.
        </p>
      </div>

      {/* Transport Information */}
      <div
        onClick={() => window.location.href = "/transport"}
        className="cursor-pointer bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-2xl p-8 shadow-lg hover:scale-105 transition"
      >
        <div className="text-5xl mb-4">🚌</div>
        <h3 className="text-2xl font-bold mb-2">
          Transport Information
        </h3>
        <p className="text-white/90">
          Find buses, trains, routes and travel charges with ease.
        </p>
      </div>

    </div>
  </div>
</section>
{/* =============================================== */}

      {/* ================= TOP STATES ================= */}
      <section id="states" className="p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
          Top States to Explore
        </h2>

        {states.length === 0 ? (
          <p className="text-center text-gray-500">
            Loading states...
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {states.map((state) => (
              <StateCard key={state._id} state={state} />
            ))}
          </div>
        )}
      </section>
      {/* ============================================== */}
    </div>
  );
};

export default Home;
