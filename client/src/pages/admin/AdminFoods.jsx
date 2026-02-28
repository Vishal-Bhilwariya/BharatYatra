import { useState, useEffect } from "react";
import api from "../../api/api";
import { Plus, Edit, Trash2, Search, X, ToggleLeft, ToggleRight, FileSpreadsheet } from "lucide-react";
import AdminNav from "../../components/admin/AdminNav";

const AdminFoods = () => {
  const [foods, setFoods] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [selectedCityForUpload, setSelectedCityForUpload] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    cityId: "",
    type: "veg",
    description: "",
    famousFor: "",
    approxPrice: "",
    image: "",
  });

  useEffect(() => {
    fetchFoods();
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

  const fetchFoods = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No admin token found");
        setLoading(false);
        return;
      }
      const res = await api.get("/admin/foods", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFoods(res.data?.data || res.data || []);
    } catch (error) {
      console.error("Error fetching foods", error);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (editingFood) {
        await api.put(`/admin/foods/${editingFood._id}`, formData, config);
      } else {
        await api.post("/admin/foods", formData, config);
      }

      fetchFoods();
      setShowModal(false);
      resetForm();
    } catch (error) {
      alert(error.response?.data?.message || "Error saving food");
    }
  };

  const handleEdit = (food) => {
    setEditingFood(food);
    setFormData({
      name: food.name,
      cityId: food.cityId?._id || food.cityId || "",
      type: food.type,
      description: food.description,
      famousFor: food.famousFor || "",
      approxPrice: food.approxPrice || "",
      image: food.image,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      await api.delete(`/admin/foods/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFoods();
    } catch (error) {
      alert("Error deleting food");
    }
  };

  const handleToggleActive = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await api.patch(`/admin/foods/${id}/toggle-active`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFoods();
    } catch (error) {
      alert("Error toggling food status");
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

      const response = await fetch("http://localhost:5000/api/admin/foods/bulk-upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUploadResult(data.data);
        alert(`File uploaded successfully! ${data.data.created} foods created, ${data.data.skipped} skipped.`);
        fetchFoods();
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
      name: "",
      cityId: "",
      type: "veg",
      description: "",
      famousFor: "",
      approxPrice: "",
      image: "",
    });
    setEditingFood(null);
  };

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 font-medium tracking-wide animate-pulse">Loading Curries...</p>
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
              Culinary <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-indigo-500 animate-gradient-x">Delights</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
              Manage the flavors of India. From <span className="text-orange-400">Street Food</span> to <span className="text-pink-400">Royal Cuisine</span>.
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
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500 text-white font-bold shadow-lg shadow-pink-600/20 hover:shadow-pink-600/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
            >
              <Plus size={20} />
              <span>Add Dish</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative group max-w-3xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="text-slate-500 group-focus-within:text-orange-400 transition-colors" size={22} />
          </div>
          <input
            type="text"
            placeholder="Search for dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-lg text-white placeholder-slate-500 focus:bg-slate-900 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-300 shadow-xl"
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

        {/* Foods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFoods.map((food) => (
            <div
              key={food._id}
              className="group relative bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="h-56 overflow-hidden relative">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border backdrop-blur-md shadow-lg ${food.type === "veg"
                      ? "bg-green-500/20 text-green-300 border-green-500/30"
                      : food.type === "non-veg"
                        ? "bg-red-500/20 text-red-300 border-red-500/30"
                        : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                    }`}>
                    {food.type}
                  </span>
                </div>

                {/* Float Actions */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  <button
                    onClick={() => handleEdit(food)}
                    className="p-2 bg-slate-900/80 backdrop-blur-md text-white rounded-full hover:bg-indigo-600 transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="p-2 bg-slate-900/80 backdrop-blur-md text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex justify-between items-end mb-1">
                    <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">{food.name}</h3>
                    <span className="text-xs font-bold text-slate-400 bg-slate-800/80 px-2 py-1 rounded-lg backdrop-blur-sm border border-slate-700">
                      {food.cityId?.name || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 pt-2">
                <p className="text-slate-400 text-sm line-clamp-2 mb-4 h-10 leading-relaxed">
                  {food.description}
                </p>

                <div className="flex justify-between items-center mb-6">
                  {food.approxPrice && (
                    <div className="text-sm font-bold text-white flex items-center gap-1">
                      <span className="text-slate-500 font-normal">Price:</span> <span className="text-green-400">{food.approxPrice}</span>
                    </div>
                  )}
                  {food.famousFor && (
                    <span className="text-xs text-orange-400 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20 border-dashed">
                      Star: {food.famousFor}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleToggleActive(food._id)}
                  className={`w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all border ${food.isActive !== false
                      ? "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20"
                      : "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"
                    } flex items-center justify-center gap-2`}
                >
                  {food.isActive !== false ? (
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
            </div>
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <div className="text-center py-24 bg-slate-900/50 border border-dashed border-slate-800 rounded-3xl">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🍛</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Foods Found</h3>
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
                    {editingFood ? "Edit Delicacy" : "New Delicacy"}
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">{editingFood ? "Update food details" : "Add a new dish to the menu"}</p>
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
                <div className="space-y-1">
                  <label className="text-xs font-bold text-orange-400 uppercase tracking-wider">Dish Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder-slate-600"
                    placeholder="Enter dish name..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-orange-400 uppercase tracking-wider">City</label>
                    <select
                      required
                      value={formData.cityId}
                      onChange={(e) =>
                        setFormData({ ...formData, cityId: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder-slate-600 appearance-none"
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
                    <label className="text-xs font-bold text-orange-400 uppercase tracking-wider">Type</label>
                    <select
                      required
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder-slate-600 appearance-none"
                    >
                      <option value="veg">Veg</option>
                      <option value="non-veg">Non-Veg</option>
                      <option value="vegan">Vegan</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-orange-400 uppercase tracking-wider">Description</label>
                  <textarea
                    required
                    rows="3"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none placeholder-slate-600"
                    placeholder="Describe the flavors..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-orange-400 uppercase tracking-wider">Famous For / Main Ingredient</label>
                  <input
                    type="text"
                    value={formData.famousFor}
                    onChange={(e) =>
                      setFormData({ ...formData, famousFor: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder-slate-600"
                    placeholder="e.g. Spicy Gravity"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-orange-400 uppercase tracking-wider">Approximate Price</label>
                    <input
                      type="text"
                      value={formData.approxPrice}
                      onChange={(e) =>
                        setFormData({ ...formData, approxPrice: e.target.value })
                      }
                      placeholder="₹40-₹80"
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder-slate-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-orange-400 uppercase tracking-wider">Image URL</label>
                    <input
                      type="url"
                      required
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder-slate-600"
                    />
                  </div>
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
                    className="px-6 py-4 bg-gradient-to-r from-orange-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-pink-600/25 hover:from-orange-500 hover:to-pink-500 transition-all transform hover:-translate-y-1"
                  >
                    {editingFood ? "Save Changes" : "Create Dish"}
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

export default AdminFoods;

