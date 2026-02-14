import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Sun, Moon, Search, Home, Globe, MapPin, Languages, Calendar, Menu, User, UserPlus, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import logo from "../assets/logo/logo.jpeg";

const Header = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, isAuthenticated, logout } = useAuth();
  const darkMode = theme === "dark";

  const [language, setLanguage] = useState("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 🔍 Search states
  const [query, setQuery] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [places, setPlaces] = useState([]);
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  // 🌙 Theme toggle logic is now handled by ThemeContext

  // 📡 Fetch all searchable data
  useEffect(() => {
    api
      .get("/states")
      .then((res) => setStates(res.data.data || res.data))
      .catch((err) => console.error("Error fetching states:", err));
    api
      .get("/cities")
      .then((res) => setCities(res.data.data || res.data))
      .catch((err) => console.error("Error fetching cities:", err));
    api
      .get("/places")
      .then((res) => setPlaces(res.data.data || res.data))
      .catch((err) => console.error("Error fetching places:", err));
  }, []);

  // 🔎 Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setActiveIndex(-1);
      return;
    }

    const q = query.toLowerCase();

    const stateResults = states
      .filter((s) => s.name.toLowerCase().includes(q))
      .map((s) => ({ ...s, type: "state" }));

    const cityResults = cities
      .filter((c) => c.name.toLowerCase().includes(q))
      .map((c) => ({ ...c, type: "city" }));

    const placeResults = places
      .filter((p) => p.name.toLowerCase().includes(q))
      .map((p) => ({ ...p, type: "place" }));

    setResults([...stateResults, ...cityResults, ...placeResults]);
    setActiveIndex(-1);
  }, [query, states, cities, places]);

  // ⌨️ Keyboard navigation
  const handleKeyDown = (e) => {
    if (!results.length) return;

    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    }

    if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      handleSelect(results[activeIndex]);
    }
  };

  // 👉 Navigate on select
  const handleSelect = (item) => {
    setQuery("");
    setResults([]);
    setActiveIndex(-1);

    navigate(
      item.type === "state"
        ? `/state/${item.slug}`
        : item.type === "city"
          ? `/city/${item.slug}`
          : `/place/${item.slug}`
    );
  };

  // 🖱️ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setResults([]);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✨ Highlight matched text
  const highlightText = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="text-orange-600 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500">
            <img
              src={logo}
              alt="BharatYatra Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-2xl font-bold text-orange-500 hidden sm:block">BharatYatra</span>
        </Link>

        {/* Search Bar */}
        <div
          ref={searchRef}
          className="relative flex items-center bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 flex-1 max-w-3xl hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
        >
          <Search className="text-gray-500 dark:text-gray-400 mr-3" size={20} />

          <input
            type="text"
            placeholder="Search state, city, place, food etc"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none w-full text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 text-sm"
          />

          {/* Results */}
          {query && (
            <div className="absolute top-14 left-0 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-h-80 overflow-y-auto">
              {results.length === 0 ? (
                <div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">
                  No results found
                </div>
              ) : (
                results.map((item, index) => (
                  <div
                    key={item._id}
                    onClick={() => handleSelect(item)}
                    className={`px-4 py-3 cursor-pointer border-b border-gray-700 last:border-b-0 ${index === activeIndex
                      ? "bg-orange-500/10 border-orange-500/20"
                      : "hover:bg-gray-700"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-gray-200">
                        {highlightText(item.name, query)}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-400 capitalize">
                        {item.type}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden xl:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/explore-culture"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            Explore Culture
          </Link>
          <Link
            to="/recommendations"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            Recommendations
          </Link>
          <Link
            to="/translator"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            Translator
          </Link>
          <Link
            to="/itinerary"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            Itinerary
          </Link>
        </nav>

        {/* Navigation Icons - Tablet */}
        <nav className="hidden md:flex xl:hidden items-center gap-4">
          <Link to="/" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Home">
            <Home size={18} className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400" />
          </Link>
          <Link to="/explore-culture" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Explore Culture">
            <Globe size={18} className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400" />
          </Link>
          <Link to="/recommendations" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Recommendations">
            <MapPin size={18} className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400" />
          </Link>
          <Link to="/translator" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Translator">
            <Languages size={18} className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400" />
          </Link>
          <Link to="/itinerary" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Itinerary">
            <Calendar size={18} className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400" />
          </Link>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-4 flex-shrink-0 ml-auto">
          {/* Language Selector - Desktop */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="hidden md:block px-3 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors focus:outline-none focus:border-orange-500"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="ta">தமிழ்</option>
            <option value="bn">বাংলা</option>
          </select>

          {/* Language Icon - Mobile */}
          <button className="md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-orange-500 transition-colors" title="Language">
            <Languages size={16} className="text-gray-400" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
          >
            {darkMode ? (
              <Sun className="text-yellow-400" size={18} />
            ) : (
              <Moon className="text-gray-600 dark:text-gray-400" size={18} />
            )}
          </button>

          {/* User Profile - Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg border border-orange-200 dark:border-orange-500/20">
              <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200 max-w-[100px] truncate">{user?.name}</span>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:border-red-500/30 dark:hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* User Profile - Tablet */}
          <div className="hidden md:flex lg:hidden items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold" title={user?.name}>
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <button onClick={logout} className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-red-50 hover:border-red-300 dark:hover:bg-red-500/10 dark:hover:border-red-500/30 transition-colors" title="Logout">
              <LogOut size={16} className="text-gray-500 dark:text-gray-400 hover:text-red-500" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-orange-500 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={18} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <nav className="px-6 py-4 space-y-3">
            <Link to="/" className="block text-gray-300 hover:text-orange-400 transition-colors">
              Home
            </Link>
            <Link to="/explore-culture" className="block text-gray-300 hover:text-orange-400 transition-colors">
              Explore Culture
            </Link>
            <Link to="/recommendations" className="block text-gray-300 hover:text-orange-400 transition-colors">
              Recommendations
            </Link>
            <Link to="/translator" className="block text-gray-300 hover:text-orange-400 transition-colors">
              Translator
            </Link>
            <Link to="/itinerary" className="block text-gray-300 hover:text-orange-400 transition-colors">
              Itinerary
            </Link>
            <div className="pt-3 border-t border-gray-700 space-y-2">
              <div className="flex items-center gap-2 px-3 py-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-200">{user?.name}</span>
              </div>
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors"
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
