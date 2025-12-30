import { Link } from "react-router-dom";

const StateCard = ({ state }) => {
  return (
    <Link to={`/state/${state.slug}`}>
      <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
        <img
          src={state.image}
          alt={state.name}
          className="h-48 w-full object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold">{state.name}</h2>
          <p className="text-sm text-gray-600 mt-2">
            {state.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default StateCard;
