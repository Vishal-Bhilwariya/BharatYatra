import { useState, useEffect } from "react";
import { MapPin, Navigation, Bus, Train, Plane, Car, Loader } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import LocationSearch from "../components/LocationSearch";
import api from "../api/api";

// Fix Leaflet's default icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom Icons
const startIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const destIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Helper component to auto-zoom map to fit markers
const MapBounds = ({ positions }) => {
    const map = useMap();
    useEffect(() => {
        if (positions && positions.length > 0) {
            if (positions.length === 1) {
                map.setView(positions[0], 10);
            } else {
                const bounds = L.latLngBounds(positions);
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        }
    }, [positions, map]);
    return null;
};

const iconMap = {
    bus: <Bus size={24} className="text-orange-500" />,
    train: <Train size={24} className="text-blue-500" />,
    flight: <Plane size={24} className="text-sky-500" />,
    taxi: <Car size={24} className="text-yellow-500" />,
    auto: <Car size={24} className="text-green-500" />,
    metro: <Train size={24} className="text-purple-500" />,
};

const INDIA_CENTER = [20.5937, 78.9629];

// Basic geocoding helper using Nominatim (free OpenStreetMap geocoder)
const geocodeCity = async (cityName) => {
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName + ", India")}`);
        const data = await res.json();
        if (data && data.length > 0) {
            return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        }
        return null;
    } catch (err) {
        console.error("Geocoding error:", err);
        return null;
    }
};

// Haversine distance formula fallback
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
};

const Transportation = () => {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [startState, setStartState] = useState(null);
    const [startCity, setStartCity] = useState(null);
    const [destState, setDestState] = useState(null);
    const [destCity, setDestCity] = useState(null);

    const [startCoords, setStartCoords] = useState(null);
    const [destCoords, setDestCoords] = useState(null);

    const [transports, setTransports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [useCurrentLocation, setUseCurrentLocation] = useState(false);
    const [planning, setPlanning] = useState(false);
    const [routeData, setRouteData] = useState(null); // Stores distance, duration, and path

    // Fetch all states and cities for the dropdowns
    useEffect(() => {
        const fetchStatesCities = async () => {
            try {
                const res = await api.get("/transports/states-cities");
                if (res.data.success) {
                    setStates(res.data.data.states);
                    setCities(res.data.data.cities);
                }
            } catch (err) {
                console.error("Error fetching states/cities", err);
            }
        };
        fetchStatesCities();
    }, []);

    const handleGetCurrentLocation = () => {
        if ("geolocation" in navigator) {
            setUseCurrentLocation(true);
            setStartState(null);
            setStartCity(null);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setStartCoords([position.coords.latitude, position.coords.longitude]);
                },
                (err) => {
                    alert("Could not get current location. Please check your browser permissions.");
                    setUseCurrentLocation(false);
                }
            );
        } else {
            alert("Geolocation is not supported by your browser");
        }
    };

    const handlePlanRoute = async () => {
        setError("");
        setTransports([]);
        setStartCoords(null);
        setDestCoords(null);

        // Validations
        if (!useCurrentLocation && !startCity) {
            setError("Please select a starting city or use current location");
            return;
        }
        if (!destCity) {
            setError("Please select a destination city");
            return;
        }

        setPlanning(true);
        setRouteData(null); // Reset route data

        try {
            // 1. Get Coordinates
            let sCoords = null;
            if (useCurrentLocation && startCoords) {
                sCoords = startCoords;
            } else if (startCity) {
                sCoords = await geocodeCity(startCity.name);
            }

            const dCoords = await geocodeCity(destCity.name);

            if (sCoords) setStartCoords(sCoords);
            if (dCoords) setDestCoords(dCoords);

            // 2. Fetch driving route from OSRM (Open Source Routing Machine)
            if (sCoords && dCoords) {
                try {
                    // OSRM expects Longitude,Latitude (lon is index 1, lat is index 0 from geocodeCity)
                    const sLon = Number(sCoords[1]).toFixed(6);
                    const sLat = Number(sCoords[0]).toFixed(6);
                    const dLon = Number(dCoords[1]).toFixed(6);
                    const dLat = Number(dCoords[0]).toFixed(6);

                    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${sLon},${sLat};${dLon},${dLat}?overview=full&geometries=geojson`;
                    console.log("Fetching OSRM:", osrmUrl);

                    const osrmRes = await fetch(osrmUrl);
                    const osrmData = await osrmRes.json();

                    if (osrmData.code === "Ok" && osrmData.routes && osrmData.routes.length > 0) {
                        const route = osrmData.routes[0];
                        // Leaflet Polyline expects [Lat, Lon], but GeoJSON is [Lon, Lat]
                        const pathCoords = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);

                        setRouteData({
                            distance: (route.distance / 1000).toFixed(1), // km
                            duration: route.duration, // seconds (driving)
                            path: pathCoords
                        });
                    } else {
                        console.warn("OSRM No Route or Error:", osrmData.code);
                        // Fallback straight line distance (Haversine roughly)
                        const straightDist = calculateDistance(sLat, sLon, dLat, dLon);
                        setRouteData({
                            distance: straightDist,
                            duration: (straightDist / 60) * 3600, // rough guess at 60km/h
                            path: null
                        });
                    }
                } catch (osrmErr) {
                    console.error("OSRM Route Fetch Error:", osrmErr);
                    // Non-blocking error. We will just fall back to a straight line.
                    const straightDist = calculateDistance(sCoords[0], sCoords[1], dCoords[0], dCoords[1]);
                    setRouteData({
                        distance: straightDist,
                        duration: (straightDist / 60) * 3600,
                        path: null
                    });
                }
            }

            // 3. Fetch Transports for Destination City
            const res = await api.get(`/transports/city/slug/${destCity.slug}`);
            if (res.data.success) {
                setTransports(res.data.data.transports);
            }
        } catch (err) {
            console.error(err);
            setError("Failed to fetch route details. Please try again.");
        } finally {
            setPlanning(false);
        }
    };

    // Filter cities based on selected state
    const getStartCities = () => {
        if (!startState) return cities;
        return cities.filter((c) => c.stateId && c.stateId._id === startState._id);
    };

    const getDestCities = () => {
        if (!destState) return cities;
        const filtered = cities.filter((c) => c.stateId && c.stateId._id === destState._id);
        console.log("Dest cities for state:", destState.name, filtered.length);
        return filtered;
    };

    const handleGoogleMapsRedirect = () => {
        if (!destCoords) return;

        let url = "https://www.google.com/maps/dir/?api=1";

        if (startCoords) {
            url += `&origin=${startCoords[0]},${startCoords[1]}`;
        }
        url += `&destination=${destCoords[0]},${destCoords[1]}&travelmode=driving`;

        window.open(url, "_blank");
    };

    const mapPositions = [];
    if (startCoords) mapPositions.push(startCoords);
    if (destCoords) mapPositions.push(destCoords);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
            {/* Hero Section */}
            <div className="relative overflow-hidden py-16 md:py-24">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1506461883276-594a12b11ea3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90"
                        alt="Transportation planner"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-950/90 via-orange-900/80 to-amber-900/70 dark:from-gray-950/90 dark:via-gray-900/80 dark:to-orange-950/70"></div>
                </div>
                <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-orange-100 text-sm font-semibold mb-6">
                        <Navigation size={16} /> Any State, Any City
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-xl tracking-tight">
                        Plan Your <span className="text-orange-400">Journey</span>
                    </h1>
                    <p className="text-orange-100 text-lg md:text-xl max-w-2xl mx-auto drop-shadow mb-8 font-light">
                        Discover the best local transport options, from flights to metros.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-700">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Route Planner Inputs */}
                        <div className="lg:col-span-4 space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <MapPin className="text-orange-500" /> Route Planner
                            </h2>

                            {error && (
                                <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm border border-red-200">
                                    {error}
                                </div>
                            )}

                            {/* Start Location */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Start Location</label>
                                    <button
                                        onClick={handleGetCurrentLocation}
                                        className="text-xs text-orange-600 hover:text-orange-700 dark:text-orange-400 font-medium flex items-center gap-1"
                                    >
                                        <Navigation size={12} /> Use current location
                                    </button>
                                </div>

                                {useCurrentLocation ? (
                                    <div className="p-3 bg-orange-50 dark:bg-gray-700 border border-orange-200 dark:border-gray-600 rounded-xl flex justify-between items-center text-orange-800 dark:text-orange-300">
                                        <span className="flex items-center gap-2"><MapPin size={16} /> Current GPS Location</span>
                                        <button onClick={() => setUseCurrentLocation(false)} className="text-xs font-semibold text-gray-500 hover:text-gray-700 dark:text-gray-400">Change</button>
                                    </div>
                                ) : (
                                    <>
                                        <LocationSearch
                                            type="state"
                                            placeholder="Select State (Optional)"
                                            data={states}
                                            selectedValue={startState}
                                            onSelect={(state) => { setStartState(state); setStartCity(null); }}
                                        />
                                        <LocationSearch
                                            type="city"
                                            placeholder="Search Start City"
                                            data={getStartCities()}
                                            selectedValue={startCity}
                                            onSelect={(city) => setStartCity(city)}
                                        />
                                    </>
                                )}
                            </div>

                            {/* Connector line UI */}
                            <div className="relative h-6 flex justify-center items-center">
                                <div className="absolute w-px h-full bg-gray-300 dark:bg-gray-600"></div>
                                <div className="z-10 bg-white dark:bg-gray-800 p-1 rounded-full border border-gray-300 dark:border-gray-600">
                                    <Navigation size={14} className="text-gray-500 dark:text-gray-400 transform rotate-180" />
                                </div>
                            </div>

                            {/* Destination Location */}
                            <div className="space-y-4">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Destination Location</label>
                                <LocationSearch
                                    type="state"
                                    placeholder="Select State (Optional)"
                                    data={states}
                                    selectedValue={destState}
                                    onSelect={(state) => { setDestState(state); setDestCity(null); }}
                                />
                                <LocationSearch
                                    type="city"
                                    placeholder="Search Destination City"
                                    data={getDestCities()}
                                    selectedValue={destCity}
                                    onSelect={(city) => {
                                        console.log("Selected dest city:", city);
                                        setDestCity(city);
                                    }}
                                />
                            </div>

                            <button
                                onClick={handlePlanRoute}
                                disabled={planning || (!useCurrentLocation && !startCity) || !destCity}
                                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {planning ? <><Loader className="animate-spin" size={20} /> Planning Route...</> : "Find Transports"}
                            </button>
                        </div>

                        {/* Map Area */}
                        <div className="lg:col-span-8 bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 h-[500px] lg:h-auto min-h-[500px] relative z-0">
                            <div className="w-full h-full rounded-xl overflow-hidden shadow-inner relative ring-1 ring-gray-200 dark:ring-gray-700">
                                <MapContainer center={INDIA_CENTER} zoom={5} style={{ height: "100%", width: "100%" }}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                                    />
                                    {startCoords && (
                                        <Marker position={startCoords} icon={startIcon}>
                                            <Popup>{useCurrentLocation ? "Your Location" : startCity?.name}</Popup>
                                        </Marker>
                                    )}
                                    {destCoords && (
                                        <Marker position={destCoords} icon={destIcon}>
                                            <Popup>{destCity?.name}</Popup>
                                        </Marker>
                                    )}
                                    {startCoords && destCoords && (
                                        routeData && routeData.path ? (
                                            <>
                                                {/* Glow Outline for premium feel */}
                                                <Polyline positions={routeData.path} color="#60a5fa" weight={8} opacity={0.3} />
                                                {/* Core path */}
                                                <Polyline positions={routeData.path} color="#2563eb" weight={4} opacity={0.9} />
                                            </>
                                        ) : (
                                            <Polyline positions={[startCoords, destCoords]} color="#f97316" weight={3} dashArray="10, 10" />
                                        )
                                    )}
                                    <MapBounds positions={mapPositions} />
                                </MapContainer>
                            </div>

                            {/* Live Navigation Button overlay */}
                            {destCoords && (
                                <div className="absolute bottom-6 right-6 z-[1000] drop-shadow-xl">
                                    <button
                                        onClick={handleGoogleMapsRedirect}
                                        className="bg-white hover:bg-gray-50 text-blue-600 font-bold py-3 px-6 rounded-full shadow-2xl border-2 border-blue-100 dark:border-blue-900 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center gap-2 transition-transform hover:scale-105"
                                    >
                                        <Navigation size={18} className="fill-blue-600" />
                                        Start Live Navigation
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Route Distance & ETA Overview Section */}
                {routeData && destCity && (
                    <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <Navigation className="text-blue-500" /> Route Overview
                        </h3>

                        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                            <div className="text-center p-6 bg-blue-50 dark:bg-gray-700 rounded-full border-4 border-white dark:border-gray-800 shadow-lg w-40 h-40 flex flex-col items-center justify-center">
                                <span className="text-sm font-semibold text-blue-600 dark:text-blue-300 uppercase tracking-widest mb-1">Distance</span>
                                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">{routeData.distance}</span>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">km</span>
                            </div>

                            <div className="flex-1 grid grid-cols-2 lg:grid-cols-5 gap-4 w-full">
                                {/* Walking ETA (avg 5 km/h) */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl flex items-center gap-3">
                                    <div className="p-2 bg-white dark:bg-gray-600 rounded-lg shadow-sm"><span role="img" aria-label="walk" className="text-xl">🚶</span></div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">WALKING</div>
                                        <div className="font-bold text-gray-800 dark:text-gray-200">
                                            {Math.round(routeData.distance / 5)} hrs
                                        </div>
                                    </div>
                                </div>

                                {/* Bike ETA (avg 15 km/h) */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl flex items-center gap-3">
                                    <div className="p-2 bg-white dark:bg-gray-600 rounded-lg shadow-sm"><span role="img" aria-label="bike" className="text-xl">🚲</span></div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">BICYCLE</div>
                                        <div className="font-bold text-gray-800 dark:text-gray-200">
                                            {Math.round(routeData.distance / 15)} hrs
                                        </div>
                                    </div>
                                </div>

                                {/* Car ETA (From OSRM) */}
                                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/50 p-4 rounded-xl flex items-center gap-3 group hover:bg-orange-100 transition-colors">
                                    <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm group-hover:scale-110 transition-transform"><Car size={20} className="text-orange-500" /></div>
                                    <div>
                                        <div className="text-xs text-orange-600 dark:text-orange-400 font-bold tracking-wide">DRIVING</div>
                                        <div className="font-bold text-gray-900 dark:text-white">
                                            {Math.round(routeData.duration / 3600)}h {Math.round((routeData.duration % 3600) / 60)}m
                                        </div>
                                    </div>
                                </div>

                                {/* Train ETA (avg 60 km/h) */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl flex items-center gap-3">
                                    <div className="p-2 bg-white dark:bg-gray-600 rounded-lg shadow-sm"><Train size={20} className="text-blue-500" /></div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">TRAIN</div>
                                        <div className="font-bold text-gray-800 dark:text-gray-200">
                                            {Math.round(routeData.distance / 60)} hrs
                                        </div>
                                    </div>
                                </div>

                                {/* Flight ETA (avg 500 km/h + 2 hrs airport) */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl flex items-center gap-3">
                                    <div className="p-2 bg-white dark:bg-gray-600 rounded-lg shadow-sm"><Plane size={20} className="text-sky-500" /></div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">FLIGHT</div>
                                        <div className="font-bold text-gray-800 dark:text-gray-200">
                                            {Math.round(routeData.distance / 500) + 2} hrs
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Transports Results Section */}
                {destCity && transports.length > 0 && (
                    <div className="mt-12">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Transport in <span className="text-orange-500">{destCity.name}</span>
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            Available modes of transportation to and around the city
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {transports.map((transport) => (
                                <div
                                    key={transport._id}
                                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 dark:bg-gray-700 rounded-bl-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition-transform"></div>

                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                        <div className="p-3 bg-orange-50 dark:bg-gray-700 rounded-xl">
                                            {iconMap[transport.type] || <Bus size={24} className="text-orange-500" />}
                                        </div>
                                        {transport.approxCost && (
                                            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 text-sm font-semibold rounded-full border border-green-200 dark:border-green-800">
                                                {transport.approxCost}
                                            </span>
                                        )}
                                    </div>

                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white capitalize mb-2 relative z-10">
                                        {transport.type}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 relative z-10">
                                        {transport.description}
                                    </p>

                                    {transport.connectivity && (
                                        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 relative z-10">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wider mb-1">
                                                Connectivity
                                            </p>
                                            <p className="text-sm text-gray-800 dark:text-gray-300 font-medium">
                                                {transport.connectivity}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* No transports alert */}
                {destCity && startCoords && destCoords && transports.length === 0 && (
                    <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center border border-gray-100 dark:border-gray-700">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Navigation className="text-gray-400" size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Transport Info Found</h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                            We don't have detailed transport information for {destCity.name} yet. But you can still use the map above to plan your route!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Transportation;
