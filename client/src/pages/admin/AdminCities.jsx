import { useState, useEffect } from "react";
import api from "../../api/api";
import { Plus, Edit, Trash2, Search, X } from "lucide-react";
import AdminNav from "../../components/admin/AdminNav";

const AdminCities = () => {
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCity, setEditingCity] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    stateId: "",
    description: "",
    image: "",
    history: "",
    isPopular: false,
  });

  useEffect(() => {
    fetchCities();
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No admin token found");
        return;
      }
      const res = await api.get("/admin/states", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStates(res.data?.data || res.data || []);
    } catch (error) {
      console.error("Error fetching states", error);
      setStates([]);
    }
  };

  const fetchCities = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No admin token found");
        setLoading(false);
        return;
      }
      const res = await api.get("/admin/cities", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCities(res.data?.data || res.data || []);
    } catch (error) {
      console.error("Error fetching cities", error);
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (editingCity) {
        await api.put(`/admin/cities/${editingCity._id}`, formData, config);
      } else {
        await api.post("/admin/cities", formData, config);
      }

      fetchCities();
      setShowModal(false);
      resetForm();
    } catch (error) {
      alert(error.response?.data?.message || "Error saving city");
    }
  };

  const handleEdit = (city) => {
    setEditingCity(city);
    setFormData({
      name: city.name,
      stateId: city.stateId?._id || city.stateId || "",
      description: city.description,
      image: city.image,
      history: city.history || "",
      isPopular: city.isPopular || false,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this city?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      await api.delete(`/admin/cities/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCities();
    } catch (error) {
      alert("Error deleting city");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      stateId: "",
      description: "",
      image: "",
      history: "",
      isPopular: false,
    });
    setEditingCity(null);
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Cities</h1>
              <p className="text-gray-600 mt-1">Add, edit, or delete cities</p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus size={20} />
              Add City
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Cities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCities.map((city) => (
              <div
                key={city._id}
                className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
              >
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {city.name}
                    </h3>
                    <div className="flex gap-1">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          city.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {city.isActive ? "Active" : "Inactive"}
                      </span>
                      {city.isPopular && (
                        <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">
                          Popular
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    State: {city.stateId?.name || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {city.description}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(city)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(city._id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No cities found</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingCity ? "Edit City" : "Add New City"}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    City Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    State *
                  </label>
                  <select
                    required
                    value={formData.stateId}
                    onChange={(e) =>
                      setFormData({ ...formData, stateId: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state._id} value={state._id}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows="3"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    History
                  </label>
                  <textarea
                    rows="2"
                    value={formData.history}
                    onChange={(e) =>
                      setFormData({ ...formData, history: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPopular"
                    checked={formData.isPopular}
                    onChange={(e) =>
                      setFormData({ ...formData, isPopular: e.target.checked })
                    }
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="isPopular" className="text-sm font-semibold text-gray-700">
                    Mark as Popular
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {editingCity ? "Update" : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCities;

