import { Link } from "react-router-dom";

const CityCard = ({ city }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden">
      {/* City Image */}
      <img
        src={
          city.image ||
          "https://images.unsplash.com/photo-1548013146-72479768bada"
        }
        alt={city.name}
        className="h-40 w-full object-cover"
      />

      {/* City Info */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">
          {city.name}
        </h3>

        <Link to={`/city/${city._id}`}>
          <button className="mt-3 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CityCard;
