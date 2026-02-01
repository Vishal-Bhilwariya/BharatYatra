import { Link, useLocation } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import { LogOut, LayoutDashboard, MapPin, Building2, Camera, Utensils, Bus, BookOpen } from "lucide-react";
import logo from "../../assets/logo/logo.jpeg";

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
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-indigo-500/10 shadow-2xl shadow-indigo-500/5 supports-[backdrop-filter]:bg-slate-950/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link
              to="/admin/dashboard"
              className="group flex items-center gap-3 hover:opacity-100 transition-all transform hover:scale-105"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                <img
                  src={logo}
                  alt="BharatYatra Logo"
                  className="relative h-11 w-11 object-cover rounded-lg border border-slate-700 shadow-xl"
                />
              </div>
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400 tracking-tight">
                Bharat<span className="text-indigo-500">Yatra</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-900/50 p-1.5 rounded-2xl border border-white/5 mx-6">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 overflow-hidden group ${isActive
                        ? "text-white shadow-lg shadow-indigo-500/25"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-100"></div>
                    )}
                    <item.icon size={18} className={`relative z-10 ${isActive ? "text-white" : "group-hover:text-indigo-400 transition-colors"}`} />
                    <span className="relative z-10 tracking-wide">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px]">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-white">
                  A
                </div>
              </div>
              <div className="text-sm">
                <p className="text-white font-bold leading-none">Admin</p>
                <p className="text-xs text-indigo-400 font-medium">Super User</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 text-red-400 font-bold rounded-xl hover:bg-red-500 hover:text-white border border-red-500/20 hover:border-red-500/50 transition-all duration-300 group"
            >
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;

