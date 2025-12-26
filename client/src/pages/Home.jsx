import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const Home = () => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    API.get("/states")
      .then((res) => setStates(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HERO */}
      <h1 className="text-4xl font-bold text-center text-orange-600">
        BharatYatra
      </h1>
      <p className="text-center text-gray-600 mt-2">
        Explore India state by state 🇮🇳
      </p>

      <div className="text-center mt-4">
        <Link to="/translator">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            🌐 Translator
          </button>
        </Link>
      </div>

      {/* STATES */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-center">
        Top States
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {states.map((state) => (
          <div
            key={state._id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{state.name}</h3>
            <div
  key={state._id}
  className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
>
  {/* STATE IMAGE */}
  <img
    src={
      state.image ||
      "https://images.unsplash.com/photo-1587474260584-136574528ed5"
    }
    alt={state.name}
    className="h-40 w-full object-cover"
  />

  {/* STATE INFO */}
  <div className="p-4">
    <h3 className="text-xl font-bold text-gray-800">
      {state.name}
    </h3>

    <Link to={`/state/${state._id}`}>
      <button className="mt-3 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
        View All Cities
      </button>
    </Link>
  </div>
</div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
