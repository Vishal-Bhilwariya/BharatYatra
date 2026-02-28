const FoodCard = ({ food }) => {
  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "veg":
        return "bg-green-100 text-green-800 border-green-300";
      case "non-veg":
        return "bg-red-100 text-red-800 border-red-300";
      case "vegan":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(food.name)}`;
          }}
        />
        {food.type && (
          <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold border ${getTypeColor(food.type)}`}>
            {food.type}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{food.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{food.description}</p>
        {food.famousFor && (
          <p className="text-xs text-orange-600 font-medium mb-2">⭐ {food.famousFor}</p>
        )}
        {food.approxPrice && (
          <p className="text-sm font-semibold text-green-600">💰 {food.approxPrice}</p>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
