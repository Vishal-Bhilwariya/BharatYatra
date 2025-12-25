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
    <div>
      <h1>{cityData.city.name}</h1>
      <p>{cityData.city.description}</p>

      <hr />

      {/* PLACES */}
      <h2>📍 Places</h2>
      {cityData.places.map((place) => (
        <div key={place._id}>
          <h3>{place.name}</h3>
          <p>{place.description}</p>
          <p>{place.entryFee}</p>
        </div>
      ))}

      <hr />

      {/* FOOD */}
      <h2>🍽️ Famous Food</h2>
      {foods.length === 0 ? (
        <p>No food data</p>
      ) : (
        foods.map((food) => (
          <div key={food._id}>
            <h3>{food.name}</h3>
            <p>{food.description}</p>
            <p>Best place: {food.bestPlace}</p>
            <p>Price: {food.priceRange}</p>
          </div>
        ))
      )}

      <hr />

      {/* TRANSPORT */}
      <h2>🚕 Transport</h2>
      {transports.length === 0 ? (
        <p>No transport info</p>
      ) : (
        transports.map((t) => (
          <div key={t._id}>
            <h3>{t.type}</h3>
            <p>{t.description}</p>
            <p>Charges: {t.charges}</p>
            <p>Route: {t.route}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CityDetails;
