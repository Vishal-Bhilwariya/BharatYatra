import { Link } from "react-router-dom";

const PlaceCard = ({ place }) => {
  const cardContent = (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300">
      {place.images && place.images.length > 0 ? (
        <img
          src={place.images[0]}
          alt={place.name}
          className="h-48 w-full object-cover"
        />
      ) : (
        <div className="h-48 w-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
          <span className="text-white text-2xl">🏛️</span>
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{place.name}</h3>
          <span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded-full capitalize">
            {place.category}
          </span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">
          {place.description}
        </p>
        {place.entryFee && (
          <p className="text-sm text-green-600 font-medium mt-2">
            Entry: {place.entryFee}
          </p>
        )}
        {place.location && (
          <p className="text-xs text-gray-500 mt-1">📍 {place.location}</p>
        )}
      </div>
    </div>
  );

  // If cityId is available, wrap in Link, otherwise return plain div
  if (place.cityId?.slug || place.cityId?._id || place.cityId) {
    return (
      <Link to={`/city/${place.cityId?.slug || place.cityId?._id || place.cityId}`}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default PlaceCard;
