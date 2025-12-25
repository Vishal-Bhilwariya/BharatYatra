import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const Home = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    API.get("/cities")
      .then((res) => setCities(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
  <div className="min-h-screen bg-gray-100 p-6">
    <h1 className="text-4xl font-bold text-center text-orange-600">
      BharatYatra
    </h1>

    <p className="text-center mt-2 text-gray-600">
      Explore cities, culture, food, transport & language
    </p>

    <div className="text-center mt-4">
      <Link to="/translator">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          🌐 Translator
        </button>
      </Link>
    </div>

    <div className="grid md:grid-cols-3 gap-6 mt-10">
      {cities.map((city) => (
        <div
          key={city._id}
          className="bg-white p-4 rounded shadow hover:shadow-lg"
        >
          <h2 className="text-xl font-semibold">{city.name}</h2>
          <p className="text-gray-500">{city.state}</p>

          <Link to={`/city/${city._id}`}>
            <button className="mt-3 bg-orange-500 text-white px-3 py-1 rounded">
              View Details
            </button>
          </Link>
        </div>
      ))}
    </div>
  </div>
);

};

export default Home;
