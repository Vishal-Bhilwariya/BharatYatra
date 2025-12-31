import { Link } from "react-router-dom";

const StateCard = ({ state }) => {
  return (
    <Link to={`/state/${state.slug}`}>
      <div className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
        <div className="relative h-48 overflow-hidden">
          <img
            src={state.image}
            alt={state.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(state.name)}`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
            {state.name}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-2">
            {state.description}
          </p>
          {state.culturalSummary && (
            <p className="text-xs text-orange-600 mt-2 line-clamp-1">
              🕉️ {state.culturalSummary.substring(0, 50)}...
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default StateCard;
