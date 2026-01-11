import { Link } from "react-router-dom";
import { useContext } from "react";
import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

const Footer = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const darkMode = theme === "dark";

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500">
            BharatYatra
          </h2>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Explore India state by state — culture, cities, food,
            transport and language, all in one platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                Explore States
              </Link>
            </li>
            <li>
              <Link to="/translator" className="text-gray-300 hover:text-orange-400 transition-colors">
                Translator
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-300 hover:text-orange-400 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Features
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                State & City Guide
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                Tourist Places
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                Food & Transport Info
              </Link>
            </li>
            <li>
              <Link to="/translator" className="text-gray-300 hover:text-orange-400 transition-colors">
                Language Translator
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Legal
          </h3>
          <div className="text-sm space-y-2">
            <p className="text-gray-400">
              © {new Date().getFullYear()} BharatYatra
            </p>
            <p className="text-gray-400">
              All rights reserved to Vishal.
            </p>
            <p className="text-orange-400 font-medium">
              Built & Owned by Vishal
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-6 text-sm text-gray-400">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>Made with ❤️ in India 🇮🇳</p>

          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-orange-500 transition-colors group"
          >
            {darkMode ? (
              <Sun className="text-yellow-400 group-hover:text-yellow-300 transition-colors" size={18} />
            ) : (
              <Moon className="text-gray-400 group-hover:text-white transition-colors" size={18} />
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
