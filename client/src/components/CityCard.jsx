import { Link } from "react-router-dom";

const CityCard = ({ city }) => {
  return (
    <Link to={`/city/${city.slug}`}>
      <div className="bg-white border rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img
            src={city.image}
            alt={city.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(city.name)}`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          {city.isPopular && (
            <div className="absolute top-2 right-2 px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
              ⭐ Popular
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
            {city.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {city.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CityCard;
