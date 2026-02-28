import { Link } from "react-router-dom";
import { useContext } from "react";
import { Sun, Moon, MapPin, Globe, Utensils, Bus, Home, Compass, Navigation } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

const Footer = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const darkMode = theme === "dark";

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20 border-t border-gray-800">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold text-orange-500 mb-3">BharatYatra</h2>
          <p className="text-sm text-gray-400 leading-relaxed mb-5">
            Explore India state by state — culture, cities, food, transport and language, all in one platform.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Live & Serving India 🇮🇳
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">
            {[
              { label: "Home", to: "/", icon: <Home size={14} /> },
              { label: "Explore States", to: "/explore", icon: <Compass size={14} /> },
              { label: "Explore Culture", to: "/explore-culture", icon: <Globe size={14} /> },
              { label: "Translator", to: "/translator", icon: <Globe size={14} /> },
              { label: "Transportation", to: "/transportation", icon: <Navigation size={14} /> },
            ].map(({ label, to, icon }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors duration-200"
                >
                  <span className="text-orange-500/70">{icon}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Features</h3>
          <ul className="space-y-2.5 text-sm">
            {[
              { label: "State & City Guide", icon: <MapPin size={14} /> },
              { label: "Food & Culture Info", icon: <Utensils size={14} /> },
              { label: "Language Translator", icon: <Globe size={14} /> },
              { label: "Travel Itinerary Planner", icon: <Bus size={14} /> },
              { label: "Smart Recommendations", icon: <Compass size={14} /> },
              { label: "Route & Transport Map", icon: <Navigation size={14} /> },
            ].map(({ label, icon }) => (
              <li key={label} className="flex items-center gap-2 text-gray-400">
                <span className="text-orange-500/70">{icon}</span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">About</h3>
          <div className="text-sm space-y-2.5 text-gray-400">
            <p>© {new Date().getFullYear()} BharatYatra</p>
            <p>All rights reserved.</p>
            <p className="text-orange-400 font-medium">Built & Owned by Vishal</p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-5 text-sm text-gray-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p>Made with ❤️ in India 🇮🇳 &nbsp;·&nbsp; Bharat Yatra</p>

          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-orange-500 transition-all duration-200 group"
          >
            {darkMode ? (
              <Sun className="text-yellow-400 group-hover:text-yellow-300" size={16} />
            ) : (
              <Moon className="text-gray-400 group-hover:text-white" size={16} />
            )}
            <span className="font-medium text-gray-300 group-hover:text-white">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
