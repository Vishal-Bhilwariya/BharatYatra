const TransportCard = ({ transport }) => {
  const getTransportIcon = (type) => {
    const icons = {
      bus: "🚌",
      train: "🚂",
      flight: "✈️",
      taxi: "🚕",
      auto: "🛺",
      metro: "🚇",
    };
    return icons[type] || "🚗";
  };

  return (
    <div className="border rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{getTransportIcon(transport.type)}</span>
        <div>
          <h3 className="text-lg font-semibold capitalize text-gray-800">
            {transport.type}
          </h3>
          {transport.approxCost && (
            <p className="text-sm text-green-600 font-medium">
              {transport.approxCost}
            </p>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-2">{transport.description}</p>
      {transport.connectivity && (
        <p className="text-xs text-gray-500">🔗 {transport.connectivity}</p>
      )}
    </div>
  );
};

export default TransportCard;

