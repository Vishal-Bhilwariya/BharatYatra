import { useState, useEffect } from "react";
import api from "../../api/api";
import { Search, BookOpen, AlertCircle } from "lucide-react";
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
      const res = await api.get("/admin/states", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStates(res.data?.data || res.data || []);
    } catch (error) {
      console.error("Error fetching states", error);
    }
  };

  const fetchCultures = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await api.get("/cultures", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCultures(res.data?.data || res.data || []);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cultures...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Manage Culture</h1>
            <p className="text-gray-600 mt-1">View culture information for each state</p>
          </div>

          {/* Info Message */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-blue-600 mt-0.5" size={20} />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Culture Management</h3>
                <p className="text-sm text-blue-800">
                  Culture data has a complex nested structure (festivals, traditions, rituals, lifestyle, etc.) 
                  and currently requires manual entry through the database or API. 
                  Bulk upload for culture is not available at this time.
                </p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by state name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Cultures List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCultures.map((culture) => (
              <div
                key={culture._id}
                className="bg-white rounded-lg shadow border border-gray-200 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <BookOpen className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {culture.stateId?.name || "Unknown State"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {culture.stateId?.slug || ""}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Festivals:</span>
                    <span className="font-medium text-gray-900">
                      {culture.hinduCulture?.festivals?.length || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Traditions:</span>
                    <span className="font-medium text-gray-900">
                      {culture.hinduCulture?.traditions?.length || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rituals:</span>
                    <span className="font-medium text-gray-900">
                      {culture.hinduCulture?.rituals?.length || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        culture.isActive !== false
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {culture.isActive !== false ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <a
                    href={`/explore-culture/${culture.stateId?.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    View Culture Details
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredCultures.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 text-lg mb-2">No culture data found</p>
              <p className="text-gray-500 text-sm">
                Culture information needs to be added manually through the database or API.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCulture;

