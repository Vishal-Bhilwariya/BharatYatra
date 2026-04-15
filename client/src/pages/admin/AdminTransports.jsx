import { useState, useEffect } from "react";
import api from "../../api/api";
import { Plus, Edit, Trash2, Search, X, Bus, Train, Plane, Car, ToggleLeft, ToggleRight, FileSpreadsheet } from "lucide-react";
import AdminNav from "../../components/admin/AdminNav";

const AdminTransports = () => {
  const [transports, setTransports] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTransport, setEditingTransport] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [selectedCityForUpload, setSelectedCityForUpload] = useState("");
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

  const handleToggleActive = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await api.patch(`/admin/transports/${id}/toggle-active`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTransports();
    } catch (error) {
      alert("Error toggling transport status");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!selectedCityForUpload) {
      alert("Please select a city first");
      e.target.value = "";
      return;
    }

    const validTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    if (!validTypes.includes(file.type) && !file.name.endsWith(".csv")) {
      alert("Please upload an Excel (.xlsx, .xls) or CSV file");
      return;
    }

    setUploading(true);
    setUploadResult(null);

    try {
      const token = localStorage.getItem("adminToken");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("cityId", selectedCityForUpload);

      const response = await fetch("http://localhost:5001/api/admin/transports/bulk-upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUploadResult(data.data);
        alert(`File uploaded successfully! ${data.data.created} transports created, ${data.data.skipped} skipped.`);
        fetchTransports();
      } else {
        alert(data.message || "Error uploading file");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
      e.target.value = "";
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 font-medium tracking-wide animate-pulse">Loading Transports...</p>
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
              Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 animate-gradient-x">Connect</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
              Manage the network. <span className="text-cyan-400">Roads</span>, <span className="text-blue-400">Rails</span>, and <span className="text-indigo-400">Skies</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* City Select for Upload */}
            <div className="relative group/select">
              <select
                value={selectedCityForUpload}
                onChange={(e) => setSelectedCityForUpload(e.target.value)}
                className="appearance-none bg-slate-900 border border-slate-700 text-slate-300 rounded-xl px-5 py-3 pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all cursor-pointer hover:bg-slate-800"
              >
                <option value="">Select City for Upload</option>
                {cities.map((city) => (
                  <option key={city._id} value={city._id}>
                    {city.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-slate-400"></div>
              </div>
            </div>

            <label className={`group cursor-pointer relative px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 transition-all duration-300 flex items-center gap-3 ${!selectedCityForUpload ? 'opacity-50 cursor-not-allowed' : 'hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]'}`}>
              <FileSpreadsheet className="text-green-400 group-hover:scale-110 transition-transform" size={20} />
              <span className="font-semibold text-slate-300 group-hover:text-white transition-colors">{uploading ? "Uploading..." : "Bulk Upload"}</span>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                disabled={uploading || !selectedCityForUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
            >
              <Plus size={20} />
              <span>Add Route</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative group max-w-3xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={22} />
          </div>
          <input
            type="text"
            placeholder="Search transports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-lg text-white placeholder-slate-500 focus:bg-slate-900 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all duration-300 shadow-xl"
          />
        </div>

        {/* Upload Results - Dark Mode */}
        {uploadResult && (
          <div className="p-6 bg-slate-900/80 border border-indigo-500/20 rounded-2xl shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-top-4">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">✓</span>
              Upload Status
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ml-11">
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 font-medium">
                Success: {uploadResult.created} Created
              </div>
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-400 font-medium">
                Skipped: {uploadResult.skipped} Existing
              </div>
            </div>
            {uploadResult.errors && uploadResult.errors.length > 0 && (
              <div className="mt-4 ml-11 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm">
                <strong className="text-red-400 block mb-2">Errors:</strong>
                <ul className="list-disc list-inside space-y-1 opacity-80">
                  {uploadResult.errors.slice(0, 5).map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                  {uploadResult.errors.length > 5 && (
                    <li className="italic opacity-60">... and {uploadResult.errors.length - 5} more errors</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Transports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTransports.map((transport) => {
            const Icon = getTransportIcon(transport.type);
            return (
              <div
                key={transport._id}
                className="group relative bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 hover:-translate-y-2 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 bg-slate-800 rounded-2xl group-hover:scale-110 transition-transform duration-500 border border-slate-700 group-hover:border-cyan-500/30">
                    <Icon className="text-cyan-400" size={32} />
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleEdit(transport)}
                      className="p-2 bg-slate-800 text-white rounded-full hover:bg-indigo-600 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(transport._id)}
                      className="p-2 bg-slate-800 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-white capitalize group-hover:text-cyan-400 transition-colors">
                      {transport.type}
                    </h3>
                    <span className="text-xs font-bold text-slate-400 bg-slate-800 py-1 px-2 rounded-lg border border-slate-700">
                      {transport.cityId?.name || "N/A"}
                    </span>
                  </div>

                  <p className="text-slate-400 text-sm line-clamp-2 h-10 leading-relaxed mb-4">
                    {transport.description}
                  </p>

                  <div className="flex flex-col gap-2">
                    {transport.approxCost && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-slate-500">Cost:</span>
                        <span className="text-green-400 font-bold">{transport.approxCost}</span>
                      </div>
                    )}
                    {transport.connectivity && (
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span className="text-slate-500">Connects:</span>
                        <span className="line-clamp-1">{transport.connectivity}</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleToggleActive(transport._id)}
                  className={`w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all border ${transport.isActive !== false
                    ? "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20"
                    : "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"
                    } flex items-center justify-center gap-2`}
                >
                  {transport.isActive !== false ? (
                    <>
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      ACTIVE
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 rounded-full bg-red-400"></div>
                      INACTIVE
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {filteredTransports.length === 0 && (
          <div className="text-center py-24 bg-slate-900/50 border border-dashed border-slate-800 rounded-3xl">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🚌</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Transports Found</h3>
            <p className="text-slate-500">Try searching for something else</p>
          </div>
        )}
      </div>

      {/* Dark Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tight">
                    {editingTransport ? "Edit Transport" : "New Route"}
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">{editingTransport ? "Update transport details" : "Add a new travel option"}</p>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider">City</label>
                    <select
                      required
                      value={formData.cityId}
                      onChange={(e) =>
                        setFormData({ ...formData, cityId: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all placeholder-slate-600 appearance-none"
                    >
                      <option value="" className="text-slate-500">Select City</option>
                      {cities.map((city) => (
                        <option key={city._id} value={city._id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Type</label>
                    <select
                      required
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all placeholder-slate-600 appearance-none capitalize"
                    >
                      {transportTypes.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Description</label>
                  <textarea
                    required
                    rows="3"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all resize-none placeholder-slate-600"
                    placeholder="Describe the route/service..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Connectivity</label>
                  <input
                    type="text"
                    value={formData.connectivity}
                    onChange={(e) =>
                      setFormData({ ...formData, connectivity: e.target.value })
                    }
                    placeholder="Nearby cities, airports, stations"
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all placeholder-slate-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Approximate Cost</label>
                  <input
                    type="text"
                    value={formData.approxCost}
                    onChange={(e) =>
                      setFormData({ ...formData, approxCost: e.target.value })
                    }
                    placeholder="₹200-₹500"
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all placeholder-slate-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="px-6 py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-600/25 hover:from-cyan-500 hover:to-blue-500 transition-all transform hover:-translate-y-1"
                  >
                    {editingTransport ? "Save Changes" : "Create Route"}
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
