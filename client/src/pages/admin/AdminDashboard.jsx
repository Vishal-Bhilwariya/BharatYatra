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
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {menuItems.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{item.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {item.count}
                  </p>
                </div>
                <div className={`${item.color} p-3 rounded-lg`}>
                  <item.icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 border border-gray-200 group"
            >
              <div className="flex items-center gap-4">
                <div className={`${item.color} p-4 rounded-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="text-white" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.count} items
                  </p>
                </div>
                <div className="text-gray-400 group-hover:text-indigo-600 transition-colors">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 size={20} />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/admin/states"
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Plus size={18} />
              Add New State
            </Link>
            <Link
              to="/admin/cities"
              className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Plus size={18} />
              Add New City
            </Link>
            <Link
              to="/admin/places"
              className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <Plus size={18} />
              Add New Place
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

