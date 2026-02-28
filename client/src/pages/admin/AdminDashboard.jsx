import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { useAdmin } from "../../context/AdminContext";
import AdminNav from "../../components/admin/AdminNav";
import {
  MapPin,
  Building2,
  Camera,
  Utensils,
  Bus,
  BookOpen,
  Plus,
  BarChart3,
} from "lucide-react";

const AdminDashboard = () => {
  const { logout } = useAdmin();
  const [stats, setStats] = useState({
    states: 0,
    cities: 0,
    places: 0,
    foods: 0,
    transports: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        console.warn("No admin token found, using public routes");
        // Fallback to public routes if no token
        const [states, cities, places, foods, transports] = await Promise.all([
          api.get("/states").then(res => res.data?.data || res.data || []),
          api.get("/cities").then(res => res.data?.data || res.data || []),
          api.get("/places").then(res => res.data?.data || res.data || []),
          api.get("/foods").then(res => res.data?.data || res.data || []),
          api.get("/transports").then(res => res.data?.data || res.data || []),
        ]);

        setStats({
          states: Array.isArray(states) ? states.length : 0,
          cities: Array.isArray(cities) ? cities.length : 0,
          places: Array.isArray(places) ? places.length : 0,
          foods: Array.isArray(foods) ? foods.length : 0,
          transports: Array.isArray(transports) ? transports.length : 0,
        });
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      // Fetch all stats with error handling
      const fetchWithErrorHandling = async (url, config) => {
        try {
          const res = await api.get(url, config);
          return res.data?.data || [];
        } catch (error) {
          console.error(`Error fetching ${url}:`, error.response?.data || error.message);
          // If admin route fails, try public route
          const publicUrl = url.replace('/admin', '');
          try {
            const publicRes = await api.get(publicUrl);
            return publicRes.data?.data || publicRes.data || [];
          } catch (publicError) {
            console.error(`Public route ${publicUrl} also failed:`, publicError.message);
            return [];
          }
        }
      };

      const [states, cities, places, foods, transports] = await Promise.all([
        fetchWithErrorHandling("/admin/states", config),
        fetchWithErrorHandling("/admin/cities", config),
        fetchWithErrorHandling("/admin/places", config),
        fetchWithErrorHandling("/admin/foods", config),
        fetchWithErrorHandling("/admin/transports", config),
      ]);

      setStats({
        states: Array.isArray(states) ? states.length : 0,
        cities: Array.isArray(cities) ? cities.length : 0,
        places: Array.isArray(places) ? places.length : 0,
        foods: Array.isArray(foods) ? foods.length : 0,
        transports: Array.isArray(transports) ? transports.length : 0,
      });
    } catch (error) {
      console.error("Error fetching stats", error);
      // Set default stats even if API fails
      setStats({
        states: 0,
        cities: 0,
        places: 0,
        foods: 0,
        transports: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    {
      title: "States",
      icon: MapPin,
      link: "/admin/states",
      count: stats.states,
      color: "bg-blue-500",
    },
    {
      title: "Cities",
      icon: Building2,
      link: "/admin/cities",
      count: stats.cities,
      color: "bg-green-500",
    },
    {
      title: "Places",
      icon: Camera,
      link: "/admin/places",
      count: stats.places,
      color: "bg-purple-500",
    },
    {
      title: "Foods",
      icon: Utensils,
      link: "/admin/foods",
      count: stats.foods,
      color: "bg-orange-500",
    },
    {
      title: "Transports",
      icon: Bus,
      link: "/admin/transports",
      count: stats.transports,
      color: "bg-red-500",
    },
    {
      title: "Culture",
      icon: BookOpen,
      link: "/admin/culture",
      count: 0, // Culture stats not yet implemented in main stats object
      color: "bg-indigo-500",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 font-medium tracking-wide animate-pulse">Loading Mission Control...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-indigo-950 to-slate-900 text-gray-100 font-sans selection:bg-indigo-500/30">
      <AdminNav />

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto px-6 md:px-10 py-10 w-full space-y-12">

        {/* Welcome Section */}
        <div className="relative">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tighter">
            Mission <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-x">Control</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            Welcome back, Pilot. Your digital empire is active and running smoothly.
          </p>
          <div className="absolute top-0 right-0 hidden md:block opacity-20 pointer-events-none">
            <div className="w-64 h-64 bg-indigo-600 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          </div>
        </div>

        {/* Management Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="group relative bg-slate-900/50 rounded-3xl p-6 border border-slate-800 hover:border-indigo-500/30 transition-all duration-300 hover:bg-slate-900 hover:shadow-2xl hover:shadow-indigo-500/10 overflow-hidden"
            >
              {/* Background Glow */}
              <div className={`absolute -right-4 -top-4 w-32 h-32 ${item.color.replace('bg-', 'bg-')}/10 rounded-full blur-3xl group-hover:blur-[60px] transition-all duration-700`}></div>

              <div className="relative flex items-center gap-6">
                {/* Icon Box */}
                <div className={`
                    w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-500
                    ${item.color}
                `}>
                  <item.icon className="text-white" size={32} />
                </div>

                {/* Text Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-3xl font-black text-slate-200">{item.count}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {item.count === 1 ? 'Item' : 'Items'}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-500 group-hover:text-white group-hover:border-indigo-500/50 group-hover:bg-indigo-500/20 transition-all">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions Bar */}
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-pink-500/5"></div>

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
                  <BarChart3 size={24} />
                </div>
                Quick Launch
              </h2>
              <p className="text-slate-400 mt-2">Jump straight into action.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
              <Link
                to="/admin/states"
                className="flex items-center gap-3 px-6 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 hover:border-blue-400/30 text-slate-300 hover:text-white transition-all group"
              >
                <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
                  <Plus size={18} />
                </div>
                <span className="font-bold">New State</span>
              </Link>

              <Link
                to="/admin/cities"
                className="flex items-center gap-3 px-6 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 hover:border-green-400/30 text-slate-300 hover:text-white transition-all group"
              >
                <div className="bg-green-500/20 p-2 rounded-lg text-green-400 group-hover:scale-110 transition-transform">
                  <Plus size={18} />
                </div>
                <span className="font-bold">New City</span>
              </Link>

              <Link
                to="/admin/places"
                className="flex items-center gap-3 px-6 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 hover:border-purple-400/30 text-slate-300 hover:text-white transition-all group"
              >
                <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400 group-hover:scale-110 transition-transform">
                  <Plus size={18} />
                </div>
                <span className="font-bold">New Place</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/50 bg-slate-950/30 backdrop-blur-sm py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-500 font-medium">
            © {new Date().getFullYear()} <span className="text-indigo-400">BharatYatra</span> Admin Portal. Engineered by <span className="text-white">Vishal</span>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
