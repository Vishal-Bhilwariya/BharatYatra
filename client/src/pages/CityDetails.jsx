import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

const CityDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get(`/cities/${id}/places`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>{data.city.name}</h1>
      <p>{data.city.description}</p>

      <h2>Places</h2>
      {data.places.map((place) => (
        <div key={place._id}>
          <h3>{place.name}</h3>
          <p>{place.description}</p>
          <p>{place.entryFee}</p>
        </div>
      ))}
    </div>
  );
};

export default CityDetails;
