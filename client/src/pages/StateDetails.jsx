import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import CityCard from "../components/CityCard";

const StateDetails = () => {
  const { id } = useParams();

  const [state, setState] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    API.get(`/states/${id}`).then((res) => setState(res.data));
    API.get(`/cities/state/${id}`).then((res) => setCities(res.data));
  }, [id]);

  if (!state) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-orange-600">{state.name}</h1>
      <p className="text-gray-600 mb-6">{state.description}</p>

      <h2 className="text-2xl font-bold mb-4">Cities</h2>

      {cities.length === 0 ? (
        <p>No cities added yet</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cities.map((city) => (
            <div
              key={city._id}
              className="bg-white p-4 rounded shadow"
            >
              <h3 className="text-xl font-semibold">{city.name}</h3>

              <a
                href={`/city/${city._id}`}
                className="inline-block mt-2 text-blue-600"
              >
                View Details →
              </a>
            </div>
          ))}
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4">
  Cities in {state.name}
</h2>

{cities.length === 0 ? (
  <p className="text-gray-600">
    No cities added yet.
  </p>
) : (
  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {cities.map((city) => (
      <CityCard key={city._id} city={city} />
    ))}
  </div>
)}

    </div>
    
  );
};

export default StateDetails;
