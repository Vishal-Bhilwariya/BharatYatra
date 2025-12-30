const FoodCard = ({ food }) => {
  return (
    <div className="border rounded-lg shadow p-4">
      <img
        src={food.image}
        alt={food.name}
        className="h-40 w-full object-cover rounded"
      />
      <h3 className="text-lg font-semibold mt-2">{food.name}</h3>
      <p className="text-sm text-gray-600">{food.description}</p>
    </div>
  );
};

export default FoodCard;
