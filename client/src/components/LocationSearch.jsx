import { useState, useRef, useEffect } from "react";
import { Search, MapPin } from "lucide-react";

const LocationSearch = ({ placeholder, data, onSelect, selectedValue, type = "city" }) => {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    // Initialize query with selected value if it exists
    useEffect(() => {
        if (selectedValue) {
            setQuery(selectedValue.name);
        } else {
            setQuery("");
        }
    }, [selectedValue]);

    // Handle outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
                // Reset query to selected value if closed without picking
                if (selectedValue) {
                    setQuery(selectedValue.name);
                } else {
                    setQuery("");
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [selectedValue]);

    const safeData = Array.isArray(data) ? data : [];
    const filteredData = safeData.filter((item) =>
        item && item.name && item.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div ref={wrapperRef} className="relative w-full">
            <div className="relative flex items-center">
                <MapPin className="absolute left-3 text-gray-400" size={18} />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                        if (e.target.value === "") {
                            onSelect(null);
                        }
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-800 dark:text-gray-200"
                />
                {/* Dropdown Icon */}
                <div className="absolute right-3 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl max-h-60 overflow-hidden flex flex-col">
                    {filteredData.length > 0 ? (
                        <div className="overflow-y-auto w-full">
                            {filteredData.map((item) => (
                                <div
                                    key={item._id || item.slug}
                                    className="px-4 py-3 cursor-pointer hover:bg-orange-50 dark:hover:bg-gray-700 flex flex-col transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0"
                                    onClick={() => {
                                        onSelect(item);
                                        setQuery(item.name);
                                        setIsOpen(false);
                                    }}
                                >
                                    <span className="font-medium text-gray-800 dark:text-gray-200">{item.name}</span>
                                    {type === "city" && item.stateId && (
                                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                            {item.stateId.name}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                            No results found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LocationSearch;
