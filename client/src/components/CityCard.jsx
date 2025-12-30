import { Link } from "react-router-dom";

const CityCard = ({ city }) => {
  return (
    <Link to={`/city/${city.slug}`}>
      <div className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
        <img
          src={city.image}
          alt={city.name}
          className="h-48 w-full object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold">{city.name}</h3>
          <p className="text-sm text-gray-600 mt-2">
            {city.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CityCard;
