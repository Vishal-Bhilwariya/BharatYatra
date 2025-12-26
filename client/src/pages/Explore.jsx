import { useEffect, useState } from "react";
import API from "../services/api";
import StateCard from "../components/StateCard";

const Explore = () => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    API.get("/states")
      .then(res => setStates(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Explore Destinations
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {states.map(state => (
          <StateCard key={state._id} state={state} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
