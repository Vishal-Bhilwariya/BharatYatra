const State = require("../models/State");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// ✅ CREATE STATE (ADMIN ONLY)
exports.createState = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    if (!name) {
      return errorResponse(res, "State name is required", 400);
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const existing = await State.findOne({ slug });
    if (existing) {
      return errorResponse(res, "State already exists", 409);
    }

    const state = await State.create({
      name,
      slug,
      description,
      image,
      createdBy: req.adminId,
    });

    return successResponse(res, "State created successfully", state, 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ UPDATE STATE
exports.updateState = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedState = await State.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedState) {
      return errorResponse(res, "State not found", 404);
    }

    return successResponse(res, "State updated successfully", updatedState);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ GET ALL STATES (ADMIN - INCLUDES INACTIVE)
exports.getAllStates = async (req, res) => {
  try {
    const states = await State.find().sort({ name: 1 });
    return successResponse(res, "States fetched successfully", states);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ GET SINGLE STATE (ADMIN)
exports.getStateById = async (req, res) => {
  try {
    const { id } = req.params;
    const state = await State.findById(id);
    if (!state) {
      return errorResponse(res, "State not found", 404);
    }
    return successResponse(res, "State fetched successfully", state);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ SOFT DELETE STATE
exports.deleteState = async (req, res) => {
  try {
    const { id } = req.params;

    const state = await State.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!state) {
      return errorResponse(res, "State not found", 404);
    }

    return successResponse(res, "State deleted successfully", state);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ TOGGLE STATE ACTIVE STATUS
exports.toggleStateActive = async (req, res) => {
  try {
    const { id } = req.params;

    const state = await State.findById(id);
    if (!state) {
      return errorResponse(res, "State not found", 404);
    }

    state.isActive = !state.isActive;
    await state.save();

    return successResponse(res, `State ${state.isActive ? "activated" : "deactivated"} successfully`, state);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ✅ BULK UPDATE STATE IMAGES WITH HD UNSPLASH URLS (One-time use)
exports.bulkUpdateStateImages = async (req, res) => {
  const HD_IMAGES = [
    { slug: "andaman-and-nicobar-islands", img: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=85" },
    { slug: "andhra-pradesh", img: "https://images.unsplash.com/photo-1600431521340-491eca880813?auto=format&fit=crop&w=1200&q=85" },
    { slug: "arunachal-pradesh", img: "https://images.unsplash.com/photo-1626615340125-d9fb47e62601?auto=format&fit=crop&w=1200&q=85" },
    { slug: "assam", img: "https://images.unsplash.com/photo-1603994843756-e7fa8e5c8ec8?auto=format&fit=crop&w=1200&q=85" },
    { slug: "bihar", img: "https://images.unsplash.com/photo-1672756342695-c1267a9cfa2e?auto=format&fit=crop&w=1200&q=85" },
    { slug: "chandigarh", img: "https://images.unsplash.com/photo-1593436978194-c574c0d7e3b5?auto=format&fit=crop&w=1200&q=85" },
    { slug: "chhattisgarh", img: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=1200&q=85" },
    { slug: "dadra-and-nagar-haveli-and-daman-and-diu", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85" },
    { slug: "delhi", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=85" },
    { slug: "goa", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85" },
    { slug: "gujarat", img: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=85" },
    { slug: "haryana", img: "https://images.unsplash.com/photo-1680178979830-5ce12d73e23f?auto=format&fit=crop&w=1200&q=85" },
    { slug: "himachal-pradesh", img: "https://images.unsplash.com/photo-1626015365107-338a46ae648a?auto=format&fit=crop&w=1200&q=85" },
    { slug: "jammu-and-kashmir", img: "https://images.unsplash.com/photo-1597149541696-1c6d86c56abb?auto=format&fit=crop&w=1200&q=85" },
    { slug: "jharkhand", img: "https://images.unsplash.com/photo-1549887534-1541e9326b83?auto=format&fit=crop&w=1200&q=85" },
    { slug: "karnataka", img: "https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?auto=format&fit=crop&w=1200&q=85" },
    { slug: "kerala", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85" },
    { slug: "ladakh", img: "https://images.unsplash.com/photo-1567148275226-f4e3d1dd1c51?auto=format&fit=crop&w=1200&q=85" },
    { slug: "lakshadweep", img: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=85" },
    { slug: "madhya-pradesh", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85" },
    { slug: "maharashtra", img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=1200&q=85" },
    { slug: "manipur", img: "https://images.unsplash.com/photo-1598425165413-da9cfa18dc5b?auto=format&fit=crop&w=1200&q=85" },
    { slug: "meghalaya", img: "https://images.unsplash.com/photo-1622390455932-0c1a4be3ed46?auto=format&fit=crop&w=1200&q=85" },
    { slug: "mizoram", img: "https://images.unsplash.com/photo-1467377791767-c929b5dc9a23?auto=format&fit=crop&w=1200&q=85" },
    { slug: "nagaland", img: "https://images.unsplash.com/photo-1598425165177-c09800d4c1fb?auto=format&fit=crop&w=1200&q=85" },
    { slug: "odisha", img: "https://images.unsplash.com/photo-1590158786923-6e4b39f1e30e?auto=format&fit=crop&w=1200&q=85" },
    { slug: "puducherry", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85" },
    { slug: "punjab", img: "https://images.unsplash.com/photo-1612810806563-4cb8265c7f52?auto=format&fit=crop&w=1200&q=85" },
    { slug: "rajasthan", img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85" },
    { slug: "sikkim", img: "https://images.unsplash.com/photo-1558888401-3cc1de77652d?auto=format&fit=crop&w=1200&q=85" },
    { slug: "tamil-nadu", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85" },
    { slug: "telangana", img: "https://images.unsplash.com/photo-1543489822-c49534f3271f?auto=format&fit=crop&w=1200&q=85" },
    { slug: "tripura", img: "https://images.unsplash.com/photo-1467377791767-c929b5dc9a23?auto=format&fit=crop&w=1200&q=85" },
    { slug: "uttar-pradesh", img: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=85" },
    { slug: "uttarakhand", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=85" },
    { slug: "west-bengal", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85" },
  ];

  try {
    let updated = 0, notFound = [];
    for (const { slug, img } of HD_IMAGES) {
      const result = await State.updateOne({ slug }, { $set: { image: img } });
      if (result.matchedCount > 0) updated++;
      else notFound.push(slug);
    }
    return successResponse(res, `Updated ${updated} states. Not found: ${notFound.length}`, { updated, notFound });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};