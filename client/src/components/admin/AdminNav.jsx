import { Link, useLocation } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import { LogOut, LayoutDashboard, MapPin, Building2, Camera, Utensils, Bus, BookOpen } from "lucide-react";

const AdminNav = () => {
  const { logout } = useAdmin();
  const location = useLocation();

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/states", label: "States", icon: MapPin },
    { path: "/admin/cities", label: "Cities", icon: Building2 },
    { path: "/admin/places", label: "Places", icon: Camera },
    { path: "/admin/foods", label: "Foods", icon: Utensils },
    { path: "/admin/transports", label: "Transports", icon: Bus },
    { path: "/admin/culture", label: "Culture", icon: BookOpen },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link
              to="/admin/dashboard"
              className="text-xl font-bold text-indigo-600"
            >
              Admin Panel
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;

