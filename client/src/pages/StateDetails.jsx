import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const StateDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState(null);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStateAndCities = async () => {
      try {
        // 1️⃣ get state by slug
        const stateRes = await API.get(`/states/${slug}`);
        const stateData = stateRes.data;
        setState(stateData);

        // 2️⃣ get cities by stateId
        const citiesRes = await API.get(
          `/cities/state/${stateData._id}`
        );
        setCities(citiesRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStateAndCities();
  }, [slug]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{state.name}</h1>

      <h2>Cities</h2>
      {cities.length === 0 ? (
        <p>No cities available</p>
      ) : (
        cities.map((city) => (
          <div
            key={city._id}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/city/${city.slug}`)}
          >
            {city.name}
          </div>
        ))
      )}
    </div>
  );
};

export default StateDetails;
