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
    <div>
      <h1>BharatYatra</h1>
      <p>Explore cities, culture, food, transport & language</p>

      <hr />

      {cities.length === 0 ? (
        <p>No cities found</p>
      ) : (
        cities.map((city) => (
          <div key={city._id} style={{ marginBottom: "20px" }}>
            <h2>{city.name}</h2>
            <p>{city.state}</p>
            <Link to={`/city/${city._id}`}>View Details</Link>
          </div>
        ))
      )}
      <Link to="/translator">
  <button>🌐 Translator</button>
</Link>

    </div>
    
  );
};

export default Home;
