import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const StateCard = ({ state }) => {
  return (
    <Link to={`/state/${state.slug}`} className="group block h-full">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-gray-100 transform hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={state.image}
            alt={state.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(
                state.name
              )}`;
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

          {/* State Name Overlay on Image (Mobile/Design Choice) or Standard Card Body? 
              Let's keep it clean: Text in body, maybe a badge on image if needed.
              Let's put the name over the image for a more immersive feel? 
              Actually, let's keep the name in the body for better readability, but put a "Discover" tag on image.
          */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-orange-600 shadow-sm translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
            Explore
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col flex-grow relative">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-2xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
              {state.name}
            </h2>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed flex-grow">
            {state.description}
          </p>

          {state.culturalSummary && (
            <div className="mb-4 p-3 bg-orange-50 rounded-xl border border-orange-100">
              <p className="text-xs text-orange-800 line-clamp-2 italic">
                "{state.culturalSummary}"
              </p>
            </div>
          )}

          <div className="flex items-center text-orange-600 font-semibold text-sm mt-auto group/btn">
            <span className="mr-2">Plan your trip</span>
            <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StateCard;
