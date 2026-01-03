import { useEffect, useRef, useState } from "react";
import { Sun, Moon, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import logo from "../assets/logo/logo.jpeg";

const Header = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");

  // 🔍 Search states
  const [query, setQuery] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [places, setPlaces] = useState([]);
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  // 🌙 Theme toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

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
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-gray-300 shadow-md px-6 py-3 flex items-center justify-between">
      {/* 🔵 Logo */}
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
          <img
            src={logo}
            alt="BharatYatra Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-xl font-bold text-orange-400">BharatYatra</span>
      </Link>

      {/* 🔍 Search Bar */}
      <div
        ref={searchRef}
        className="relative hidden md:flex items-center bg-gray-800 rounded-full px-4 py-2 w-[35%]"
      >
        <Search className="text-gray-400 mr-2" size={18} />

        <input
          type="text"
          placeholder="Search states, cities, places..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent outline-none w-full text-gray-200 placeholder-gray-400"
        />

        {/* Results */}
        {query && (
          <div className="absolute top-12 left-0 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
            {results.length === 0 ? (
              <div className="px-4 py-3 text-gray-500">
                ❌ No state, city or place available
              </div>
            ) : (
              results.map((item, index) => (
                <div
                  key={item._id}
                  onClick={() => handleSelect(item)}
                  className={`px-4 py-2 cursor-pointer ${
                    index === activeIndex
                      ? "bg-orange-100 dark:bg-slate-700"
                      : "hover:bg-gray-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className="font-medium">
                    {highlightText(item.name, query)}
                  </span>

                  <span className="ml-2 text-xs px-2 py-0.5 rounded bg-gray-200 dark:bg-slate-700 text-gray-600">
                    {item.type}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-4">
        <Link
          to="/"
          className="px-3 py-1.5 text-gray-700 dark:text-gray-200 hover:text-orange-600 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/explore-culture"
          className="px-3 py-1.5 text-gray-700 dark:text-gray-200 hover:text-orange-600 transition-colors"
        >
          Explore Culture
        </Link>
        <Link
          to="/recommendations"
          className="px-3 py-1.5 text-gray-300 hover:text-orange-400
 transition-colors"
        >
          Recommendations
        </Link>
        <Link
          to="/translator"
          className="px-3 py-1.5 text-gray-300 hover:text-orange-400 transition-colors"
        >
          Translator
        </Link>
        <Link
          to="/itinerary"
          className="px-3 py-1.5 text-gray-700 dark:text-gray-200 hover:text-orange-600 transition-colors"
        >
          Itinerary
        </Link>
      </div>

      {/* ⚙️ Right Controls */}
      <div className="flex items-center gap-4">
        {/* Language */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 border border-gray-700"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="ta">தமிழ்</option>
          <option value="bn">বাংলা</option>
        </select>

        {/* Theme */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
        >
          {darkMode ? (
            <Sun className="text-yellow-400" size={18} />
          ) : (
            <Moon className="text-gray-700" size={18} />
          )}
        </button>

        {/* Auth */}
        <button className="px-4 py-1.5 border border-orange-400 text-orange-400 rounded-md hover:bg-orange-400 hover:text-gray-900 transition">
          Login
        </button>

        <button className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition">
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Header;
