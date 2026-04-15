import { useState, useEffect } from "react";
import api from "../../api/api";
import { Plus, Edit, Trash2, Search, X, ToggleLeft, ToggleRight, Upload, FileSpreadsheet } from "lucide-react";
import AdminNav from "../../components/admin/AdminNav";

const AdminStates = () => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingState, setEditingState] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    culturalSummary: "",
  });

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await api.get("/admin/states", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStates(res.data.data);
    } catch (error) {
      console.error("Error fetching states", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (editingState) {
        await api.put(`/admin/states/${editingState._id}`, formData, config);
      } else {
        await api.post("/admin/states", formData, config);
      }

      fetchStates();
      setShowModal(false);
      resetForm();
    } catch (error) {
      alert(error.response?.data?.message || "Error saving state");
    }
  };

  const handleEdit = (state) => {
    setEditingState(state);
    setFormData({
      name: state.name,
      description: state.description,
      image: state.image,
      culturalSummary: state.culturalSummary || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this state?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      await api.delete(`/admin/states/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStates();
    } catch (error) {
      alert("Error deleting state");
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("adminToken");
      await api.patch(`/admin/states/${id}/toggle-active`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStates();
    } catch (error) {
      alert("Error toggling state status");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

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

      const response = await fetch("http://localhost:5001/api/admin/states/bulk-upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Server returned non-JSON response:", text);
        throw new Error(`Server error (${response.status}): Expected JSON but got ${contentType || 'unknown'}`);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Server error: ${response.status}`);
      }

      if (data.success) {
        setUploadResult(data.data);
        alert(`File uploaded successfully! ${data.data.created} states created, ${data.data.skipped} skipped.`);
        fetchStates();
      } else {
        alert(data.message || "Error uploading file");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(`Error uploading file: ${error.message || "Please try again."}`);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", image: "", culturalSummary: "" });
    setEditingState(null);
  };

  const filteredStates = states.filter((state) =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 font-medium tracking-wide animate-pulse">Loading Experience...</p>
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
              Manage <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-x">States</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
              Curate the cultural destinations. <span className="text-indigo-400">Add</span>, <span className="text-purple-400">Edit</span>, and <span className="text-pink-400">Manage</span> your data.
            </p>
          </div>

          <div className="flex gap-4">
            <label className="group cursor-pointer relative px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-300 flex items-center gap-3">
              <FileSpreadsheet className="text-green-400 group-hover:scale-110 transition-transform" size={20} />
              <span className="font-semibold text-slate-300 group-hover:text-white transition-colors">{uploading ? "Uploading..." : "Bulk Upload"}</span>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>

            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
            >
              <Plus size={20} />
              <span>Add State</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative group max-w-3xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={22} />
          </div>
          <input
            type="text"
            placeholder="Search states..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-lg text-white placeholder-slate-500 focus:bg-slate-900 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 shadow-xl"
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
                    <li className="italic opacity-60">... and {uploadResult.errors.length - 5} more</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* States Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStates.map((state) => (
            <div
              key={state._id}
              className="group relative bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="h-60 overflow-hidden relative">
                <img
                  src={state.image}
                  alt={state.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                {/* Float Actions */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  <button
                    onClick={() => handleEdit(state)}
                    className="p-2 bg-slate-900/80 backdrop-blur-md text-white rounded-full hover:bg-indigo-600 transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(state._id)}
                    className="p-2 bg-slate-900/80 backdrop-blur-md text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-4 left-6">
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{state.name}</h3>
                  <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 rounded-full"></div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 pt-2">
                <p className="text-slate-400 text-sm line-clamp-2 mb-6 h-10 leading-relaxed">
                  {state.description}
                </p>

                <button
                  onClick={() => handleToggleActive(state._id, state.isActive)}
                  className={`w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all border ${state.isActive
                    ? "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20"
                    : "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"
                    } flex items-center justify-center gap-2`}
                >
                  {state.isActive ? (
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

        {filteredStates.length === 0 && (
          <div className="text-center py-24 bg-slate-900/50 border border-dashed border-slate-800 rounded-3xl">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-slate-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No States Found</h3>
            <p className="text-slate-500">Try searching for something else</p>
          </div>
        )}
      </div>

      {/* Dark Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tight">
                    {editingState ? "Edit State" : "New Journey"}
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">{editingState ? "Update cultural details" : "Add a new destination to the list"}</p>
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
                  <label className="text-xs font-bold text-indigo-400 uppercase tracking-wider">State Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-slate-600"
                    placeholder="Enter state name..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Description</label>
                  <textarea
                    required
                    rows="3"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none placeholder-slate-600"
                    placeholder="Brief description of the state..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Cover Image URL</label>
                  <div className="flex gap-4">
                    <input
                      type="url"
                      required
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      className="flex-1 bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-slate-600"
                      placeholder="https://..."
                    />
                    {formData.image && (
                      <div className="w-16 h-12 rounded-lg bg-slate-800 border border-slate-700 overflow-hidden flex-shrink-0">
                        <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                      </div>
                    )}
                  </div>

                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Cultural Summary</label>
                  <textarea
                    rows="2"
                    value={formData.culturalSummary}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        culturalSummary: e.target.value,
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none placeholder-slate-600"
                    placeholder="Optional cultural details..."
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
                    className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-600/25 hover:from-indigo-500 hover:to-purple-500 transition-all transform hover:-translate-y-1"
                  >
                    {editingState ? "Save Changes" : "Create State"}
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

export default AdminStates;

