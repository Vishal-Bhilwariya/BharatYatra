const PlaceCard = ({ place }) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        {place.images && place.images.length > 0 ? (
          <img
            src={place.images[0]}
            alt={place.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(place.name)}`;
            }}
          />
        ) : (
          <div className="h-48 w-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white text-4xl">🏛️</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{place.name}</h3>
          {place.category && (
            <span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded-full capitalize font-medium flex-shrink-0 ml-2">
              {place.category}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {place.description}
        </p>
        <div className="space-y-1">
          {place.entryFee && (
            <p className="text-sm text-green-600 font-semibold">
              💰 Entry: {place.entryFee}
            </p>
          )}
          {place.location && (
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <span>📍</span>
              <span className="line-clamp-1">{place.location}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
