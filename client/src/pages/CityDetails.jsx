import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

const CityDetails = () => {
  const { id } = useParams();

  const [cityData, setCityData] = useState(null);
  const [foods, setFoods] = useState([]);
  const [transports, setTransports] = useState([]);

  useEffect(() => {
    // City + places
    API.get(`/cities/${id}/places`)
      .then((res) => setCityData(res.data))
      .catch((err) => console.error(err));

    // Food
    API.get(`/foods/city/${id}`)
      .then((res) => setFoods(res.data))
      .catch((err) => console.error(err));

    // Transport
    API.get(`/transports/city/${id}`)
      .then((res) => setTransports(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!cityData) return <p>Loading...</p>;

  return (
  <div className="min-h-screen bg-gray-100 p-6">

    {/* ===== CITY HEADER ===== */}
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h1 className="text-3xl font-bold text-orange-600">
        {cityData.city.name}
      </h1>
      <p className="text-gray-600 mt-2">
        {cityData.city.description}
      </p>
    </div>

    {/* ===== PLACES CARD ===== */}
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-2xl font-bold mb-4">📍 Places to Visit</h2>

      {cityData.places.length === 0 ? (
        <p className="text-gray-500">No places added yet.</p>
      ) : (
        cityData.places.map((place) => (
          <div
            key={place._id}
            className="border-b pb-3 mb-3 last:border-none"
          >
            <h3 className="text-xl font-semibold">{place.name}</h3>
            <p className="text-gray-600">{place.description}</p>
            <p className="text-gray-700">Entry Fee: {place.entryFee}</p>
          </div>
        ))
      )}
    </div>

    {/* ===== FOOD CARD ===== */}
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-2xl font-bold mb-4">🍽️ Famous Food</h2>

      {foods.length === 0 ? (
        <p className="text-gray-500">No food data available.</p>
      ) : (
        foods.map((food) => (
          <div
            key={food._id}
            className="border-b pb-3 mb-3 last:border-none"
          >
            <h3 className="text-xl font-semibold">{food.name}</h3>
            <p className="text-gray-600">{food.description}</p>
            <p className="text-gray-700">
              Best Place: {food.bestPlace}
            </p>
            <p className="text-gray-700">
              Price: {food.priceRange}
            </p>
          </div>
        ))
      )}
    </div>

    {/* ===== TRANSPORT CARD ===== */}
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">🚕 Transport</h2>

      {transports.length === 0 ? (
        <p className="text-gray-500">No transport info available.</p>
      ) : (
        transports.map((t) => (
          <div
            key={t._id}
            className="border-b pb-3 mb-3 last:border-none"
          >
            <h3 className="text-xl font-semibold">{t.type}</h3>
            <p className="text-gray-600">{t.description}</p>
            <p className="text-gray-700">
              Charges: {t.charges}
            </p>
            <p className="text-gray-700">
              Route: {t.route}
            </p>
          </div>
        ))
      )}
    </div>

  </div>
);

};

export default CityDetails;
