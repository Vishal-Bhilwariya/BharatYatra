import { useState, useEffect } from "react";
import api from "../../api/api";
import { Plus, Edit, Trash2, Search, X, Bus, Train, Plane, Car } from "lucide-react";
import AdminNav from "../../components/admin/AdminNav";

const AdminTransports = () => {
  const [transports, setTransports] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTransport, setEditingTransport] = useState(null);
  const [formData, setFormData] = useState({
    cityId: "",
    type: "bus",
    description: "",
    connectivity: "",
    approxCost: "",
  });

  const transportTypes = [
    { value: "bus", label: "Bus", icon: Bus },
    { value: "train", label: "Train", icon: Train },
    { value: "flight", label: "Flight", icon: Plane },
    { value: "taxi", label: "Taxi", icon: Car },
    { value: "auto", label: "Auto", icon: Car },
    { value: "metro", label: "Metro", icon: Train },
  ];

  useEffect(() => {
    fetchTransports();
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No admin token found");
        return;
      }
      const res = await api.get("/admin/cities", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCities(res.data?.data || res.data || []);
    } catch (error) {
      console.error("Error fetching cities", error);
      setCities([]);
    }
  };

  const fetchTransports = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No admin token found");
        setLoading(false);
        return;
      }
      const res = await api.get("/admin/transports", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransports(res.data?.data || res.data || []);
    } catch (error) {
      console.error("Error fetching transports", error);
      setTransports([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (editingTransport) {
        await api.put(
          `/admin/transports/${editingTransport._id}`,
          formData,
          config
        );
      } else {
        await api.post("/admin/transports", formData, config);
      }

      fetchTransports();
      setShowModal(false);
      resetForm();
    } catch (error) {
      alert(error.response?.data?.message || "Error saving transport");
    }
  };

  const handleEdit = (transport) => {
    setEditingTransport(transport);
    setFormData({
      cityId: transport.cityId?._id || transport.cityId || "",
      type: transport.type,
      description: transport.description,
      connectivity: transport.connectivity || "",
      approxCost: transport.approxCost || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transport?"))
      return;

    try {
      const token = localStorage.getItem("adminToken");
      await api.delete(`/admin/transports/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTransports();
    } catch (error) {
      alert("Error deleting transport");
    }
  };

  const resetForm = () => {
    setFormData({
      cityId: "",
      type: "bus",
      description: "",
      connectivity: "",
      approxCost: "",
    });
    setEditingTransport(null);
  };

  const getTransportIcon = (type) => {
    const transport = transportTypes.find((t) => t.value === type);
    return transport ? transport.icon : Bus;
  };

  const filteredTransports = transports.filter((transport) =>
    transport.cityId?.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    transport.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading transports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Manage Transports
              </h1>
              <p className="text-gray-600 mt-1">Add, edit, or delete transports</p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus size={20} />
              Add Transport
            </button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search transports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTransports.map((transport) => {
              const Icon = getTransportIcon(transport.type);
              return (
                <div
                  key={transport._id}
                  className="bg-white rounded-lg shadow border border-gray-200 p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-indigo-100 rounded-lg">
                      <Icon className="text-indigo-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">
                        {transport.type}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {transport.cityId?.name || "N/A"}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    {transport.description}
                  </p>
                  {transport.approxCost && (
                    <p className="text-sm text-green-600 font-medium mb-2">
                      Cost: {transport.approxCost}
                    </p>
                  )}
                  {transport.connectivity && (
                    <p className="text-xs text-gray-500 mb-4">
                      {transport.connectivity}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(transport)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(transport._id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTransports.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No transports found</p>
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
                  {editingTransport ? "Edit Transport" : "Add New Transport"}
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      City *
                    </label>
                    <select
                      required
                      value={formData.cityId}
                      onChange={(e) =>
                        setFormData({ ...formData, cityId: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city._id} value={city._id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Transport Type *
                    </label>
                    <select
                      required
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    >
                      {transportTypes.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
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
                    Connectivity
                  </label>
                  <input
                    type="text"
                    value={formData.connectivity}
                    onChange={(e) =>
                      setFormData({ ...formData, connectivity: e.target.value })
                    }
                    placeholder="Nearby cities, airports, stations"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Approximate Cost
                  </label>
                  <input
                    type="text"
                    value={formData.approxCost}
                    onChange={(e) =>
                      setFormData({ ...formData, approxCost: e.target.value })
                    }
                    placeholder="₹200-₹500"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {editingTransport ? "Update" : "Create"}
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

export default AdminTransports;

