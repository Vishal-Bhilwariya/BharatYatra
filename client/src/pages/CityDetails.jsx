import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

import PlaceCard from "../components/PlaceCard";
import FoodCard from "../components/FoodCard";
import TransportCard from "../components/TransportCard";

const CityDetails = () => {
  const { slug: citySlug } = useParams();

  const [city, setCity] = useState(null);
  const [places, setPlaces] = useState([]);
  const [foods, setFoods] = useState([]);
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        // 1️⃣ Fetch city
        const cityRes = await api.get(`/cities/${citySlug}`);
        const cityData = cityRes.data.data;
        setCity(cityData);

        const cityId = cityData._id;

        // 2️⃣ Fetch related data in parallel
        const [placesRes, foodsRes, transportsRes] = await Promise.all([
          api.get(`/places/city/${cityId}`),
          api.get(`/foods/city/${cityId}`),
          api.get(`/transports/city/${cityId}`),
        ]);

        setPlaces(placesRes.data.data);
        setFoods(foodsRes.data.data);
        setTransports(transportsRes.data.data);
      } catch (error) {
        console.error("Error loading city details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityData();
  }, [citySlug]);

  if (loading) {
    return <p className="text-center mt-10">Loading city details...</p>;
  }

  if (!city) {
    return <p className="text-center mt-10">City not found</p>;
  }

  return (
    <div className="p-6 space-y-12">
      {/* City Info */}
      <section>
        <h1 className="text-3xl font-bold">{city.name}</h1>
        <p className="mt-2 text-gray-700">{city.description}</p>
      </section>

      {/* Places */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Places to Visit</h2>
        {places.length === 0 ? (
          <p>No places available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {places.map((place) => (
              <PlaceCard key={place.slug} place={place} />
            ))}
          </div>
        )}
      </section>

      {/* Food */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Local Food</h2>
        {foods.length === 0 ? (
          <p>No food data available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {foods.map((food) => (
              <FoodCard key={food.slug} food={food} />
            ))}
          </div>
        )}
      </section>

      {/* Transport */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Transport</h2>
        {transports.length === 0 ? (
          <p>No transport info available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {transports.map((t) => (
              <TransportCard key={t._id} transport={t} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CityDetails;
