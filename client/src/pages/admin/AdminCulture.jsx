import { useState, useEffect } from "react";
import api from "../../api/api";
import { Search, BookOpen, AlertCircle, Plus } from "lucide-react";
import AdminNav from "../../components/admin/AdminNav";

const AdminCulture = () => {
  const [cultures, setCultures] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCultures();
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        console.warn("No admin token found, using public route for states");
        const res = await api.get("/states");
        setStates(res.data?.data || res.data || []);
        return;
      }

      try {
        const res = await api.get("/admin/states", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStates(res.data?.data || res.data || []);
      } catch (error) {
        console.error("Admin states route failed, trying public route:", error.response?.data || error.message);
        // Fallback to public route
        const res = await api.get("/states");
        setStates(res.data?.data || res.data || []);
      }
    } catch (error) {
      console.error("Error fetching states", error);
      setStates([]);
    }
  };

  const fetchCultures = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      // Try public route first since cultures might not need admin auth
      try {
        const res = await api.get("/cultures");
        setCultures(res.data?.data || res.data || []);
      } catch (error) {
        console.error("Public cultures route failed:", error.response?.data || error.message);

        // If public fails and we have token, try admin route
        if (token) {
          try {
            const res = await api.get("/admin/cultures", {
              headers: { Authorization: `Bearer ${token}` },
            });
            setCultures(res.data?.data || res.data || []);
          } catch (adminError) {
            console.error("Admin cultures route also failed:", adminError.response?.data || adminError.message);
            setCultures([]);
          }
        } else {
          setCultures([]);
        }
      }
    } catch (error) {
      console.error("Error fetching cultures", error);
      setCultures([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCultures = cultures.filter((culture) => {
    const stateName = culture.stateId?.name || "";
    return stateName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 font-medium tracking-wide animate-pulse">Loading Heritage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-indigo-950 to-slate-900 text-gray-100 font-sans selection:bg-indigo-500/30">
      <AdminNav />

      <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800/60">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
              Indian <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 animate-gradient-x">Heritage</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
              Preserve the traditions. <span className="text-amber-400">Festivals</span>, <span className="text-orange-400">Rituals</span>, and <span className="text-red-400">History</span>.
            </p>
          </div>

          <a
            href="/admin/culture/new"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={20} />
            <span>Document New Culture</span>
          </a>
        </div>

        {/* Info Message - Dark Mode */}
        <div className="p-6 bg-slate-900/80 border border-indigo-500/20 rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-amber-500"></div>
          <div className="flex items-start gap-4 ml-2">
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
              <AlertCircle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Complexity Warning</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Culture data involves nested structures (Festivals, Customs, Rituals).
                Bulk upload is currently disabled to ensure data integrity. Please add entries manually.
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative group max-w-3xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="text-slate-500 group-focus-within:text-amber-400 transition-colors" size={22} />
          </div>
          <input
            type="text"
            placeholder="Search by state name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-lg text-white placeholder-slate-500 focus:bg-slate-900 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all duration-300 shadow-xl"
          />
        </div>

        {/* Cultures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCultures.map((culture) => (
            <div
              key={culture._id}
              className="group relative bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
            >
              {/* Header Gradient */}
              <div className="h-2 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 opacity-70 group-hover:opacity-100 transition-opacity"></div>

              <div className="p-6 md:p-8 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 group-hover:border-amber-500/30 group-hover:scale-110 transition-transform duration-500">
                    <BookOpen className="text-amber-400" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {culture.stateId?.name || "Unknown State"}
                    </h3>
                    <p className="text-sm font-mono text-slate-500 uppercase tracking-widest">
                      {culture.stateId?.code || "IN-XX"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 flex-grow mb-8">
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-800 group-hover:border-slate-700 transition-colors">
                    <span className="text-slate-400 text-sm font-medium">Festivals</span>
                    <span className="text-white font-bold bg-slate-700 px-3 py-1 rounded-lg">
                      {culture.festivals?.length || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-800 group-hover:border-slate-700 transition-colors">
                    <span className="text-slate-400 text-sm font-medium">Traditions</span>
                    <span className="text-white font-bold bg-slate-700 px-3 py-1 rounded-lg">
                      {culture.heritageAndTraditions?.customs?.length || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-800 group-hover:border-slate-700 transition-colors">
                    <span className="text-slate-400 text-sm font-medium">Rituals</span>
                    <span className="text-white font-bold bg-slate-700 px-3 py-1 rounded-lg">
                      {culture.heritageAndTraditions?.rituals?.length || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-800 group-hover:border-slate-700 transition-colors">
                    <span className="text-slate-400 text-sm font-medium">Status</span>
                    <span className={`px-2 py-1 text-xs font-bold uppercase tracking-wider rounded-lg ${culture.isActive !== false
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}>
                      {culture.isActive !== false ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <a
                    href={`/admin/culture/edit/${culture._id}`}
                    className="flex items-center justify-center px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-indigo-600/20"
                  >
                    Edit
                  </a>
                  <a
                    href={`/explore-culture/${culture.stateId?.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold rounded-xl transition-colors border border-slate-700"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCultures.length === 0 && (
          <div className="text-center py-24 bg-slate-900/50 border border-dashed border-slate-800 rounded-3xl">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="text-slate-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Culture Data Found</h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              Start documenting the rich heritage of India by adding a new culture entry.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCulture;
