import { useNavigate } from "react-router-dom";

const StateCard = ({ state }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/state/${state._id}`)}
      className="bg-white rounded-xl shadow hover:shadow-xl transition cursor-pointer overflow-hidden"
    >
      <img
        src={state.image}
        alt={state.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">
          {state.name}
        </h2>
      </div>
    </div>
  );
};

export default StateCard;
