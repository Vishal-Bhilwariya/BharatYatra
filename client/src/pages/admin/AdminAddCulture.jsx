import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import AdminNav from "../../components/admin/AdminNav";
import { Save, ArrowLeft, Plus, Trash2, ChevronDown } from "lucide-react";

const AdminAddCulture = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [states, setStates] = useState([]);

    // Section toggle state
    const [expandedSections, setExpandedSections] = useState({
        overview: true,
        cuisine: false,
        foodShops: false,
        danceMusic: false,
        attire: false,
        festivals: false,
        art: false,
        heritage: false,
        places: false,
        extras: false
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const initialFormState = {
        stateId: "",
        overview: {
            introduction: "",
            lifestyle: "",
            traditions: "",
            history: "",
            images: [],
        },
        cuisine: {
            description: "",
            dishes: [], // { name, type, priceRange, description, image }
        },
        foodShops: [], // { name, location, famousDish, priceRange, rating, timings }
        danceAndMusic: {
            dances: [], // { name, type, description, image, video }
            music: [], // { name, description, image }
            instruments: [], // { name, description, image }
        },
        traditionalAttire: {
            men: { description: "", attire: [], images: [] }, // attire: [{ name, description }]
            women: { description: "", attire: [], images: [] },
            fabrics: [], // { name, description }
        },
        festivals: [], // { name, celebrationTime, significance, description, images }
        artAndHandicrafts: [], // { name, type, description, famousFor, images }
        heritageAndTraditions: {
            customs: [], // { title, description }
            rituals: [], // { title, description }
            dailyLife: "",
            values: "",
        },
        culturalPlaces: [], // { name, type, location, description, image }
        extraSections: [], // { title, content }
        isActive: true,
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
            const res = await api.get("/states");
            setStates(res.data?.data || res.data || []);
        } catch (error) {
            console.error("Error fetching states", error);
        }
    };

    const fetchCultureData = async () => {
        setDataLoading(true);
        try {
            const token = localStorage.getItem("adminToken");
            const res = await api.get(`/admin/culture/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data?.data) {
                const fetchedData = res.data.data;
                const mergedData = {
                    ...initialFormState,
                    ...fetchedData,
                    overview: { ...initialFormState.overview, ...fetchedData.overview },
                    cuisine: { ...initialFormState.cuisine, ...fetchedData.cuisine },
                    danceAndMusic: { ...initialFormState.danceAndMusic, ...fetchedData.danceAndMusic },
                    traditionalAttire: { ...initialFormState.traditionalAttire, ...fetchedData.traditionalAttire },
                    heritageAndTraditions: { ...initialFormState.heritageAndTraditions, ...fetchedData.heritageAndTraditions },
                };

                if (typeof mergedData.stateId === "object" && mergedData.stateId) {
                    mergedData.stateId = mergedData.stateId._id;
                }
                setFormData(mergedData);
            }
        } catch (error) {
            console.error("Error fetching culture data", error);
            if (error.response && error.response.status === 401) {
                alert("Session expired. Please log in again.");
                localStorage.removeItem("adminToken");
                navigate("/admin/login");
            } else {
                alert(`Error loading culture data: ${error.response?.data?.message || error.message}`);
            }
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

    // --- Helper Functions for State Updates ---

    const updateNestedState = (path, value) => {
        setFormData((prev) => {
            const newState = structuredClone(prev);
            let current = newState;
            const keys = path.split(".");
            const lastKey = keys.pop();
            for (const key of keys) {
                if (!current[key]) current[key] = {};
                current = current[key];
            }
            current[lastKey] = value;
            return newState;
        });
    };

    const addArrayItem = (path, itemTemplate) => {
        const keys = path.split(".");
        let current = formData;
        for (const key of keys) current = current[key];
        updateNestedState(path, [...(current || []), itemTemplate]);
    };

    const removeArrayItem = (path, index) => {
        const keys = path.split(".");
        let current = formData;
        for (const key of keys) current = current[key];
        const newArray = [...current];
        newArray.splice(index, 1);
        updateNestedState(path, newArray);
    };

    const updateArrayItem = (path, index, field, value) => {
        const keys = path.split(".");
        let current = formData;
        for (const key of keys) current = current[key];
        const newArray = [...current];
        newArray[index] = { ...newArray[index], [field]: value };
        updateNestedState(path, newArray);
    };

    const updateArrayItemNestedArray = (path, index, field, value) => {
        updateArrayItem(path, index, field, value);
    };

    if (dataLoading) return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400 font-medium tracking-wide animate-pulse">Loading Cultural Data...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-indigo-950 to-slate-900 text-gray-100 font-sans selection:bg-indigo-500/30">
            <AdminNav />

            <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-800/60 w-full">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate("/admin/culture")}
                            className="p-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800 text-slate-400 hover:text-white transition-all duration-300 group"
                        >
                            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div>
                            <h1 className="text-4xl font-black text-white tracking-tight">
                                {isEditing ? "Edit" : "New"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Culture</span>
                            </h1>
                            <p className="text-slate-400 text-sm mt-1">Preserve the heritage accurately.</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/culture")}
                            className="px-6 py-3 bg-slate-900/50 text-slate-400 hover:text-white border border-slate-800 rounded-xl font-bold transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={20} />}
                            {loading ? "Saving..." : "Save Culture"}
                        </button>
                    </div>
                </div>

                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>

                    {/* State Selection Card */}
                    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 shadow-xl">
                        <label className="block text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Select State</label>
                        <select
                            required
                            className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none text-lg"
                            value={formData.stateId}
                            onChange={(e) => updateNestedState("stateId", e.target.value)}
                            disabled={isEditing}
                        >
                            <option value="" className="text-slate-500">-- Select State Region --</option>
                            {states.map((s) => (
                                <option key={s._id} value={s._id}>{s.name}</option>
                            ))}
                        </select>
                        <p className="text-slate-500 text-sm mt-2 flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs">i</span>
                            This will link the cultural data to the selected state page.
                        </p>
                    </div>

                    {/* 1. Overview */}
                    <SectionCard title="1. Cultural Summary" icon="📖" isOpen={expandedSections.overview} onToggle={() => toggleSection("overview")}>
                        <div className="space-y-6">
                            <div>
                                <label className="label">Introduction (The essence)</label>
                                <textarea
                                    className="input-field h-32 leading-relaxed"
                                    value={formData.overview.introduction}
                                    onChange={e => updateNestedState("overview.introduction", e.target.value)}
                                    placeholder="Brief introduction to the state's culture..."
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div><label className="label">Lifestyle</label><textarea className="input-field h-24" value={formData.overview.lifestyle} onChange={e => updateNestedState("overview.lifestyle", e.target.value)} /></div>
                                <div><label className="label">Traditions</label><textarea className="input-field h-24" value={formData.overview.traditions} onChange={e => updateNestedState("overview.traditions", e.target.value)} /></div>
                                <div><label className="label">History</label><textarea className="input-field h-24" value={formData.overview.history} onChange={e => updateNestedState("overview.history", e.target.value)} /></div>
                            </div>
                            <div>
                                <label className="label">Gallery Images (URLs)</label>
                                <div className="relative">
                                    <input
                                        className="input-field pl-10"
                                        value={formData.overview.images.join(', ')}
                                        onChange={e => updateNestedState("overview.images", e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                                        placeholder="https://..., https://..."
                                    />
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔗</span>
                                </div>
                            </div>
                        </div>
                    </SectionCard>

                    {/* 2. Famous Food */}
                    <SectionCard title="2. Famous Cuisine" icon="🍛" isOpen={expandedSections.cuisine} onToggle={() => toggleSection("cuisine")}>
                        <div className="space-y-6">
                            <div>
                                <label className="label">Cuisine Overview</label>
                                <textarea className="input-field" value={formData.cuisine.description} onChange={e => updateNestedState("cuisine.description", e.target.value)} placeholder="Describe the flavors of this region..." />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <span className="w-1 h-6 bg-orange-500 rounded-full"></span> Dishes
                                </h3>
                                {formData.cuisine.dishes.map((dish, idx) => (
                                    <div key={idx} className="nested-item-card group">
                                        <button type="button" onClick={() => removeArrayItem("cuisine.dishes", idx)} className="delete-btn"><Trash2 size={16} /></button>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input placeholder="Dish Name" className="input-field font-bold text-orange-200" value={dish.name} onChange={e => updateArrayItem("cuisine.dishes", idx, "name", e.target.value)} />
                                            <select className="input-field bg-slate-950" value={dish.type} onChange={e => updateArrayItem("cuisine.dishes", idx, "type", e.target.value)}>
                                                <option value="Veg">Veg</option><option value="Non-Veg">Non-Veg</option><option value="Vegan">Vegan</option><option value="Sweet">Sweet</option>
                                            </select>
                                            <input placeholder="Price (₹100-200)" className="input-field" value={dish.priceRange} onChange={e => updateArrayItem("cuisine.dishes", idx, "priceRange", e.target.value)} />
                                            <input placeholder="Image URL" className="input-field" value={dish.image} onChange={e => updateArrayItem("cuisine.dishes", idx, "image", e.target.value)} />
                                            <textarea placeholder="Description" className="input-field col-span-1 md:col-span-2" value={dish.description} onChange={e => updateArrayItem("cuisine.dishes", idx, "description", e.target.value)} />
                                        </div>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addArrayItem("cuisine.dishes", { name: "", type: "Veg", priceRange: "", description: "", image: "" })} className="add-btn">
                                    <Plus size={18} /> Add New Dish
                                </button>
                            </div>
                        </div>
                    </SectionCard>

                    {/* 3. Food Shops */}
                    <SectionCard title="3. Legendary Food Spots" icon="🏪" isOpen={expandedSections.foodShops} onToggle={() => toggleSection("foodShops")}>
                        <div className="space-y-4">
                            {formData.foodShops.map((shop, idx) => (
                                <div key={idx} className="nested-item-card">
                                    <button type="button" onClick={() => removeArrayItem("foodShops", idx)} className="delete-btn"><Trash2 size={16} /></button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input placeholder="Shop Name" className="input-field font-bold text-orange-200" value={shop.name} onChange={e => updateArrayItem("foodShops", idx, "name", e.target.value)} />
                                        <input placeholder="Location" className="input-field" value={shop.location} onChange={e => updateArrayItem("foodShops", idx, "location", e.target.value)} />
                                        <input placeholder="Must Try Dish" className="input-field" value={shop.famousDish} onChange={e => updateArrayItem("foodShops", idx, "famousDish", e.target.value)} />
                                        <div className="grid grid-cols-2 gap-2">
                                            <input placeholder="Price Range" className="input-field" value={shop.priceRange} onChange={e => updateArrayItem("foodShops", idx, "priceRange", e.target.value)} />
                                            <input placeholder="Rating (0-5)" type="number" className="input-field" value={shop.rating} onChange={e => updateArrayItem("foodShops", idx, "rating", e.target.value)} />
                                        </div>
                                        <input placeholder="Timings (e.g. 10 AM - 10 PM)" className="input-field col-span-1 md:col-span-2" value={shop.timings} onChange={e => updateArrayItem("foodShops", idx, "timings", e.target.value)} />
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={() => addArrayItem("foodShops", { name: "", location: "", famousDish: "", priceRange: "", rating: 0, timings: "" })} className="add-btn">
                                <Plus size={18} /> Add Food Shop
                            </button>
                        </div>
                    </SectionCard>

                    {/* 4. Dance & Music */}
                    <SectionCard title="4. Dance, Music & Arts" icon="🎭" isOpen={expandedSections.danceMusic} onToggle={() => toggleSection("danceMusic")}>
                        <div className="space-y-8">
                            {/* Dances */}
                            <div className="space-y-4">
                                <h4 className="text-lg font-bold text-pink-400 border-b border-pink-500/20 pb-2">Traditional Dances</h4>
                                {formData.danceAndMusic.dances.map((dance, idx) => (
                                    <div key={idx} className="nested-item-card border-l-4 border-l-pink-500">
                                        <button type="button" onClick={() => removeArrayItem("danceAndMusic.dances", idx)} className="delete-btn"><Trash2 size={16} /></button>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input placeholder="Dance Name" className="input-field font-bold text-pink-200" value={dance.name} onChange={e => updateArrayItem("danceAndMusic.dances", idx, "name", e.target.value)} />
                                            <select className="input-field bg-slate-950" value={dance.type} onChange={e => updateArrayItem("danceAndMusic.dances", idx, "type", e.target.value)}>
                                                <option value="Folk">Folk</option><option value="Classical">Classical</option><option value="Tribal">Tribal</option>
                                            </select>
                                            <textarea placeholder="Description and context..." className="input-field col-span-1 md:col-span-2" value={dance.description} onChange={e => updateArrayItem("danceAndMusic.dances", idx, "description", e.target.value)} />
                                            <input placeholder="Image URL" className="input-field col-span-1 md:col-span-2" value={dance.image} onChange={e => updateArrayItem("danceAndMusic.dances", idx, "image", e.target.value)} />
                                        </div>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addArrayItem("danceAndMusic.dances", { name: "", type: "Folk", description: "", image: "" })} className="add-btn text-pink-400 bg-pink-500/10 hover:bg-pink-500/20">
                                    <Plus size={18} /> Add Dance Form
                                </button>
                            </div>
                        </div>
                    </SectionCard>

                    {/* 5. Traditional Attire */}
                    <SectionCard title="5. Traditional Attire" icon="👘" isOpen={expandedSections.attire} onToggle={() => toggleSection("attire")}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="nested-item-card border border-blue-500/30">
                                <h4 className="font-bold text-blue-300 mb-4 flex items-center gap-2">🚹 Men's Attire</h4>
                                <textarea placeholder="Describe traditional men's clothing..." className="input-field h-32" value={formData.traditionalAttire.men.description} onChange={e => updateNestedState("traditionalAttire.men.description", e.target.value)} />
                            </div>
                            <div className="nested-item-card border border-pink-500/30">
                                <h4 className="font-bold text-pink-300 mb-4 flex items-center gap-2">🚺 Women's Attire</h4>
                                <textarea placeholder="Describe traditional women's clothing..." className="input-field h-32" value={formData.traditionalAttire.women.description} onChange={e => updateNestedState("traditionalAttire.women.description", e.target.value)} />
                            </div>
                        </div>
                    </SectionCard>

                    {/* 6. Festivals */}
                    <SectionCard title="6. Festivals & Celebrations" icon="🎉" isOpen={expandedSections.festivals} onToggle={() => toggleSection("festivals")}>
                        <div className="space-y-6">
                            {formData.festivals.map((fest, idx) => (
                                <div key={idx} className="nested-item-card border-l-4 border-l-amber-500">
                                    <button type="button" onClick={() => removeArrayItem("festivals", idx)} className="delete-btn"><Trash2 size={16} /></button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input placeholder="Festival Name" className="input-field font-bold text-amber-200 text-lg" value={fest.name} onChange={e => updateArrayItem("festivals", idx, "name", e.target.value)} />
                                        <input placeholder="Celebration Time (e.g. Oct-Nov)" className="input-field" value={fest.celebrationTime} onChange={e => updateArrayItem("festivals", idx, "celebrationTime", e.target.value)} />
                                        <textarea placeholder="Significance (Why is it celebrated?)" className="input-field col-span-1 md:col-span-2 h-20" value={fest.significance} onChange={e => updateArrayItem("festivals", idx, "significance", e.target.value)} />
                                        <textarea placeholder="Description (How is it celebrated?)" className="input-field col-span-1 md:col-span-2 h-24" value={fest.description} onChange={e => updateArrayItem("festivals", idx, "description", e.target.value)} />
                                        <input placeholder="Image URLs (comma separated)" className="input-field col-span-1 md:col-span-2" value={fest.images.join(', ')} onChange={e => updateArrayItemNestedArray("festivals", idx, "images", e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={() => addArrayItem("festivals", { name: "", celebrationTime: "", significance: "", description: "", images: [] })} className="add-btn text-amber-400 bg-amber-500/10 hover:bg-amber-500/20">
                                <Plus size={18} /> Add Festival
                            </button>
                        </div>
                    </SectionCard>

                    {/* 7. Art & Handicrafts */}
                    <SectionCard title="7. Art & Handicrafts" icon="🎨" isOpen={expandedSections.art} onToggle={() => toggleSection("art")}>
                        <div className="space-y-4">
                            {formData.artAndHandicrafts.map((item, idx) => (
                                <div key={idx} className="nested-item-card">
                                    <button type="button" onClick={() => removeArrayItem("artAndHandicrafts", idx)} className="delete-btn"><Trash2 size={16} /></button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input placeholder="Art Name" className="input-field text-purple-200 font-bold" value={item.name} onChange={e => updateArrayItem("artAndHandicrafts", idx, "name", e.target.value)} />
                                        <input placeholder="Type (Painting, Textile, etc)" className="input-field" value={item.type} onChange={e => updateArrayItem("artAndHandicrafts", idx, "type", e.target.value)} />
                                        <textarea placeholder="Description" className="input-field col-span-1 md:col-span-2" value={item.description} onChange={e => updateArrayItem("artAndHandicrafts", idx, "description", e.target.value)} />
                                        <input placeholder="Image URLs" className="input-field col-span-1 md:col-span-2" value={item.images.join(', ')} onChange={e => updateArrayItemNestedArray("artAndHandicrafts", idx, "images", e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={() => addArrayItem("artAndHandicrafts", { name: "", type: "", description: "", images: [] })} className="add-btn text-purple-400 bg-purple-500/10 hover:bg-purple-500/20">
                                <Plus size={18} /> Add Art Form
                            </button>
                        </div>
                    </SectionCard>

                    {/* 8. Heritage */}
                    <SectionCard title="8. Heritage & Rituals" icon="🕯️" isOpen={expandedSections.heritage} onToggle={() => toggleSection("heritage")}>
                        <h4 className="font-bold text-slate-300 mb-3">Unique Customs</h4>
                        <div className="space-y-3 mb-6">
                            {formData.heritageAndTraditions.customs.map((c, idx) => (
                                <div key={idx} className="flex gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                                        <input placeholder="Custom Title" className="input-field sm:col-span-1" value={c.title} onChange={e => {
                                            const newCustoms = [...formData.heritageAndTraditions.customs];
                                            newCustoms[idx].title = e.target.value;
                                            updateNestedState("heritageAndTraditions.customs", newCustoms);
                                        }} />
                                        <input placeholder="Description" className="input-field sm:col-span-2" value={c.description} onChange={e => {
                                            const newCustoms = [...formData.heritageAndTraditions.customs];
                                            newCustoms[idx].description = e.target.value;
                                            updateNestedState("heritageAndTraditions.customs", newCustoms);
                                        }} />
                                    </div>
                                    <button type="button" onClick={() => removeArrayItem("heritageAndTraditions.customs", idx)} className="text-red-400 hover:text-red-300 self-center"><Trash2 size={18} /></button>
                                </div>
                            ))}
                            <button type="button" onClick={() => addArrayItem("heritageAndTraditions.customs", { title: "", description: "" })} className="add-btn">Add Custom</button>
                        </div>
                    </SectionCard>

                    {/* 9. Cultural Places */}
                    <SectionCard title="9. Cultural Landmarks" icon="🏛️" isOpen={expandedSections.places} onToggle={() => toggleSection("places")}>
                        <div className="space-y-4">
                            {formData.culturalPlaces.map((place, idx) => (
                                <div key={idx} className="nested-item-card">
                                    <button type="button" onClick={() => removeArrayItem("culturalPlaces", idx)} className="delete-btn"><Trash2 size={16} /></button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input placeholder="Place Name" className="input-field text-teal-200 font-bold" value={place.name} onChange={e => updateArrayItem("culturalPlaces", idx, "name", e.target.value)} />
                                        <input placeholder="Type (Museum, Temple)" className="input-field" value={place.type} onChange={e => updateArrayItem("culturalPlaces", idx, "type", e.target.value)} />
                                        <input placeholder="Location" className="input-field" value={place.location} onChange={e => updateArrayItem("culturalPlaces", idx, "location", e.target.value)} />
                                        <input placeholder="Image URL" className="input-field" value={place.image} onChange={e => updateArrayItem("culturalPlaces", idx, "image", e.target.value)} />
                                        <textarea placeholder="Description" className="input-field col-span-1 md:col-span-2" value={place.description} onChange={e => updateArrayItem("culturalPlaces", idx, "description", e.target.value)} />
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={() => addArrayItem("culturalPlaces", { name: "", type: "", location: "", description: "", image: "" })} className="add-btn text-teal-400 bg-teal-500/10 hover:bg-teal-500/20">
                                <Plus size={18} /> Add Landmark
                            </button>
                        </div>
                    </SectionCard>

                    {/* 10. Extras */}
                    <SectionCard title="10. Extra Sections" icon="➕" isOpen={expandedSections.extras} onToggle={() => toggleSection("extras")}>
                        <div className="space-y-4">
                            {formData.extraSections.map((sec, idx) => (
                                <div key={idx} className="nested-item-card">
                                    <button type="button" onClick={() => removeArrayItem("extraSections", idx)} className="delete-btn"><Trash2 size={16} /></button>
                                    <input placeholder="Section Title" className="input-field font-bold mb-3" value={sec.title} onChange={e => updateArrayItem("extraSections", idx, "title", e.target.value)} />
                                    <textarea placeholder="Section Content (Markdown)" className="input-field h-32 font-mono text-sm" value={sec.content} onChange={e => updateArrayItem("extraSections", idx, "content", e.target.value)} />
                                </div>
                            ))}
                            <button type="button" onClick={() => addArrayItem("extraSections", { title: "", content: "" })} className="add-btn">
                                <Plus size={18} /> Add Custom Section
                            </button>
                        </div>
                    </SectionCard>

                </form>
            </div>

            <style>{`
                .label { display: block; font-size: 0.75rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
                .input-field { width: 100%; background-color: #020617; border: 1px solid #1e293b; color: #e2e8f0; border-radius: 0.75rem; padding: 0.75rem 1rem; transition: all 0.2s; outline: none; }
                .input-field:focus { border-color: #6366f1; box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2); }
                .nested-item-card { background-color: rgba(30, 41, 59, 0.4); backdrop-filter: blur(4px); padding: 1.5rem; border-radius: 1rem; border: 1px solid rgba(255,255,255,0.05); position: relative; transition: all 0.3s; }
                .nested-item-card:hover { border-color: rgba(255,255,255,0.1); background-color: rgba(30, 41, 59, 0.6); }
                .delete-btn { position: absolute; top: 1rem; right: 1rem; color: #ef4444; opacity: 0.7; padding: 0.25rem; border-radius: 0.375rem; transition: all 0.2s; }
                .delete-btn:hover { opacity: 1; background-color: rgba(239, 68, 68, 0.1); }
                .add-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.5rem; background-color: rgba(99, 102, 241, 0.1); color: #818cf8; padding: 1rem; border-radius: 0.75rem; font-weight: 600; border: 1px dashed rgba(99, 102, 241, 0.3); transition: all 0.2s; }
                .add-btn:hover { background-color: rgba(99, 102, 241, 0.2); border-color: #818cf8; transform: translateY(-1px); }
            `}</style>
        </div>
    );
};

// Helper Component for Collapsible Sections
const SectionCard = ({ title, icon, isOpen, onToggle, children }) => (
    <div className={`bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-3xl overflow-hidden transition-all duration-500 ${isOpen ? 'shadow-2xl shadow-indigo-500/10 border-indigo-500/30' : 'hover:border-slate-700'}`}>
        <button
            type="button"
            className={`w-full flex justify-between items-center p-6 md:p-8 cursor-pointer transition-colors ${isOpen ? 'bg-slate-800/50' : 'hover:bg-slate-800/30'}`}
            onClick={onToggle}
        >
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-4">
                <span className="text-2xl">{icon}</span> {title}
            </h2>
            <div className={`p-2 rounded-full bg-slate-800 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-indigo-500/20 text-indigo-400' : ''}`}>
                <ChevronDown size={24} />
            </div>
        </button>

        <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="p-6 md:p-8 border-t border-slate-800/50">
                {children}
            </div>
        </div>
    </div>
);

export default AdminAddCulture;
