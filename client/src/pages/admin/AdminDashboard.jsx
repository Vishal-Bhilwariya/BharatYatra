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
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      // Fetch all stats with error handling
      const fetchWithErrorHandling = async (url, config) => {
        try {
          const res = await api.get(url, config);
          return res.data?.data || [];
        } catch (error) {
          console.error(`Error fetching ${url}:`, error);
          return [];
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
      count: 0,
      color: "bg-indigo-500",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <AdminNav />
      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Manage your content and explore the statistics</p>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 group transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className={`${item.color} p-4 rounded-xl group-hover:scale-110 transition-transform shadow-lg`}>
                  <item.icon className="text-white" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.count} {item.count === 1 ? 'item' : 'items'}
                  </p>
                </div>
                <div className="text-gray-400 group-hover:text-indigo-600 transition-colors text-2xl">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 size={20} className="text-indigo-600" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/admin/states"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium shadow-sm hover:shadow-md"
            >
              <Plus size={18} />
              Add New State
            </Link>
            <Link
              to="/admin/cities"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium shadow-sm hover:shadow-md"
            >
              <Plus size={18} />
              Add New City
            </Link>
            <Link
              to="/admin/places"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors font-medium shadow-sm hover:shadow-md"
            >
              <Plus size={18} />
              Add New Place
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} BharatYatra. All rights reserved to Vishal.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;

