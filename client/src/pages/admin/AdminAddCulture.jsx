import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import AdminNav from "../../components/admin/AdminNav";
import { Save, ArrowLeft, Plus, Trash2, Image as ImageIcon, Video } from "lucide-react";

const AdminAddCulture = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [states, setStates] = useState([]);

    // Initial empty state matching the schema
    const initialFormState = {
        stateId: "",
        hinduCulture: {
            festivals: [], // { name, description, significance, celebrationPeriod, images: [], videos: [] }
            traditions: [], // { name, description, practice, images: [], videos: [] }
            rituals: [], // { name, description, whenPerformed, importance, images: [], videos: [] }
            lifestyle: {
                description: "",
                dailyPractices: [],
                familyStructure: "",
                socialCustoms: [],
                images: [],
                videos: []
            },
            culturalHistory: {
                description: "",
                historicalEvents: [], // { event, year, significance }
                ancientPractices: [],
                images: [],
                videos: []
            }
        },
        generalCulture: {
            languages: [],
            artForms: [], // { name, description, images: [] }
            music: { description: "", instruments: [], videos: [] },
            dance: { description: "", forms: [], videos: [] },
            cuisine: { description: "", specialties: [] },
            clothing: { description: "", traditionalAttire: [], images: [] }
        },
        isActive: true
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchStates();
        if (isEditing) {
            fetchCultureData();
        }
    }, [id]);

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
                    headers: { Authorization: `Bearer ${token}` }
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
            // Even if everything fails, ensure we have an empty array to prevent map errors
            setStates([]);
        }
    };

    const fetchCultureData = async () => {
        setDataLoading(true);
        try {
            const token = localStorage.getItem("adminToken");
            const res = await api.get(`/admin/culture/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data?.data) {
                // Merge with initial state to ensure all fields exist
                const mergedData = { ...initialFormState, ...res.data.data };
                // Ensure stateId is just the ID string if it defaults to object
                if (typeof mergedData.stateId === 'object') {
                    mergedData.stateId = mergedData.stateId._id;
                }
                setFormData(mergedData);
            }
        } catch (error) {
            console.error("Error fetching culture data", error);
            alert("Error loading culture data");
        } finally {
            setDataLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem("adminToken");
            const config = { headers: { Authorization: `Bearer ${token}` } };

            if (isEditing) {
                await api.put(`/admin/culture/${id}`, formData, config);
                alert("Culture updated successfully!");
            } else {
                await api.post("/admin/culture", formData, config);
                alert("Culture added successfully!");
            }
            navigate("/admin/culture");
        } catch (error) {
            console.error("Error saving culture", error);
            alert(error.response?.data?.message || "Error saving culture");
        } finally {
            setLoading(false);
        }
    };

    // Helper to handle nested state updates
    const updateNestedState = (path, value) => {
        setFormData(prev => {
            const newState = structuredClone(prev);
            let current = newState;
            const keys = path.split('.');
            const lastKey = keys.pop();

            for (const key of keys) {
                if (!current[key]) current[key] = {};
                current = current[key];
            }

            current[lastKey] = value;
            return newState;
        });
    };

    // Generic array item handlers
    const addArrayItem = (path, itemTemplate) => {
        const keys = path.split('.');
        let current = formData;
        for (const key of keys) current = current[key];

        updateNestedState(path, [...current, itemTemplate]);
    };

    const removeArrayItem = (path, index) => {
        const keys = path.split('.');
        let current = formData;
        for (const key of keys) current = current[key];

        const newArray = [...current];
        newArray.splice(index, 1);
        updateNestedState(path, newArray);
    };

    const updateArrayItem = (path, index, field, value) => {
        const keys = path.split('.');
        let current = formData;
        for (const key of keys) current = current[key];

        const newArray = [...current];
        if (typeof newArray[index] === 'object') {
            newArray[index] = { ...newArray[index], [field]: value };
        } else {
            newArray[index] = value; // For simple string arrays
        }
        updateNestedState(path, newArray);
    };

    // Simple string array handlers (for things like languages, specialties)
    const addSimpleArrayItem = (path) => addArrayItem(path, "");
    const updateSimpleArrayItem = (path, index, value) => {
        const keys = path.split('.');
        let current = formData;
        for (const key of keys) current = current[key];
        const newArray = [...current];
        newArray[index] = value;
        updateNestedState(path, newArray);
    };


    if (dataLoading) {
        return <div className="p-8 text-center text-gray-500">Loading data...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <AdminNav />
            <div className="max-w-5xl mx-auto p-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate("/admin/culture")} className="p-2 hover:bg-gray-200 rounded-full">
                            <ArrowLeft size={24} />
                        </button>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {isEditing ? "Edit Culture" : "Add Culture"}
                        </h1>
                    </div>

                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Info */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h2 className="text-xl font-semibold mb-4 text-indigo-800">Basic Info</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Select State</label>
                                <select
                                    required
                                    className="w-full border rounded-lg p-2"
                                    value={formData.stateId}
                                    onChange={(e) => setFormData({ ...formData, stateId: e.target.value })}
                                    disabled={isEditing}
                                >
                                    <option value="">-- Select State --</option>
                                    {states.map(s => (
                                        <option key={s._id} value={s._id}>{s.name}</option>
                                    ))}
                                </select>
                                {!loading && states.length === 0 && (
                                    <p className="text-sm text-red-500 mt-2">
                                        No states found. <a href="/admin/states" className="underline">Add a state first</a>.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Hindu Culture - Festivals */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-orange-800">Festivals</h2>
                            <button type="button" onClick={() => addArrayItem("hinduCulture.festivals", { name: "", description: "", significance: "", celebrationPeriod: "", images: [], videos: [] })}
                                className="flex items-center gap-1 text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded hover:bg-orange-200">
                                <Plus size={16} /> Add Festival
                            </button>
                        </div>
                        {formData.hinduCulture.festivals.map((festival, idx) => (
                            <div key={idx} className="mb-6 p-4 border border-orange-100 rounded-lg bg-orange-50 relative">
                                <button type="button" onClick={() => removeArrayItem("hinduCulture.festivals", idx)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                                    <Trash2 size={18} />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input placeholder="Name" className="border p-2 rounded" value={festival.name} onChange={e => updateArrayItem(`hinduCulture.festivals`, idx, "name", e.target.value)} />
                                    <input placeholder="Period (e.g. Oct-Nov)" className="border p-2 rounded" value={festival.celebrationPeriod} onChange={e => updateArrayItem(`hinduCulture.festivals`, idx, "celebrationPeriod", e.target.value)} />
                                    <textarea placeholder="Description" className="border p-2 rounded col-span-2" value={festival.description} onChange={e => updateArrayItem(`hinduCulture.festivals`, idx, "description", e.target.value)} />
                                    <textarea placeholder="Significance" className="border p-2 rounded col-span-2" value={festival.significance} onChange={e => updateArrayItem(`hinduCulture.festivals`, idx, "significance", e.target.value)} />

                                    {/* Simple Image URL input for demo purposes - could be expanded to real array handler */}
                                    <div className="col-span-2">
                                        <label className="text-xs text-gray-500 block mb-1">Image URLs (comma separated)</label>
                                        <input
                                            className="border p-2 rounded w-full"
                                            /* Handle splitting/joining for UI simplicity, though state stores array */
                                            value={festival.images.join(', ')}
                                            onChange={e => updateArrayItem(`hinduCulture.festivals`, idx, "images", e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Hindu Culture - Traditions */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-orange-800">Traditions</h2>
                            <button type="button" onClick={() => addArrayItem("hinduCulture.traditions", { name: "", description: "", practice: "", images: [] })}
                                className="flex items-center gap-1 text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded hover:bg-orange-200">
                                <Plus size={16} /> Add Tradition
                            </button>
                        </div>
                        {formData.hinduCulture.traditions.map((item, idx) => (
                            <div key={idx} className="mb-6 p-4 border border-orange-100 rounded-lg bg-orange-50 relative">
                                <button type="button" onClick={() => removeArrayItem("hinduCulture.traditions", idx)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                                    <Trash2 size={18} />
                                </button>
                                <div className="grid grid-cols-1 gap-4">
                                    <input placeholder="Name" className="border p-2 rounded" value={item.name} onChange={e => updateArrayItem(`hinduCulture.traditions`, idx, "name", e.target.value)} />
                                    <textarea placeholder="Description" className="border p-2 rounded" value={item.description} onChange={e => updateArrayItem(`hinduCulture.traditions`, idx, "description", e.target.value)} />
                                    <textarea placeholder="Practice" className="border p-2 rounded" value={item.practice} onChange={e => updateArrayItem(`hinduCulture.traditions`, idx, "practice", e.target.value)} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Hindu Culture - Rituals */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-orange-800">Rituals</h2>
                            <button type="button" onClick={() => addArrayItem("hinduCulture.rituals", { name: "", description: "", whenPerformed: "", importance: "" })}
                                className="flex items-center gap-1 text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded hover:bg-orange-200">
                                <Plus size={16} /> Add Ritual
                            </button>
                        </div>
                        {formData.hinduCulture.rituals.map((item, idx) => (
                            <div key={idx} className="mb-6 p-4 border border-orange-100 rounded-lg bg-orange-50 relative">
                                <button type="button" onClick={() => removeArrayItem("hinduCulture.rituals", idx)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                                    <Trash2 size={18} />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input placeholder="Name" className="border p-2 rounded" value={item.name} onChange={e => updateArrayItem(`hinduCulture.rituals`, idx, "name", e.target.value)} />
                                    <input placeholder="When Performed" className="border p-2 rounded" value={item.whenPerformed} onChange={e => updateArrayItem(`hinduCulture.rituals`, idx, "whenPerformed", e.target.value)} />
                                    <textarea placeholder="Description" className="border p-2 rounded col-span-2" value={item.description} onChange={e => updateArrayItem(`hinduCulture.rituals`, idx, "description", e.target.value)} />
                                    <textarea placeholder="Importance" className="border p-2 rounded col-span-2" value={item.importance} onChange={e => updateArrayItem(`hinduCulture.rituals`, idx, "importance", e.target.value)} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* General Culture - Languages, Cuisine, etc. */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h2 className="text-xl font-semibold mb-4 text-indigo-800">General Culture</h2>

                        {/* Languages */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Languages (comma separated)</label>
                            <input
                                className="w-full border rounded-lg p-2"
                                value={formData.generalCulture.languages.join(', ')}
                                onChange={(e) => updateNestedState("generalCulture.languages", e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                            />
                        </div>

                        {/* Cuisine */}
                        <div className="mb-6 border-t pt-4">
                            <h3 className="font-medium text-lg mb-2">Cuisine</h3>
                            <textarea
                                className="w-full border rounded-lg p-2 mb-2"
                                placeholder="Description"
                                value={formData.generalCulture.cuisine.description}
                                onChange={(e) => updateNestedState("generalCulture.cuisine.description", e.target.value)}
                            />
                            <label className="block text-sm font-medium text-gray-700 mb-1">Specialties (comma separated)</label>
                            <input
                                className="w-full border rounded-lg p-2"
                                value={formData.generalCulture.cuisine.specialties.join(', ')}
                                onChange={(e) => updateNestedState("generalCulture.cuisine.specialties", e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/culture")}
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium disabled:opacity-50"
                        >
                            <Save size={20} />
                            {loading ? "Saving..." : "Save Culture"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminAddCulture;
