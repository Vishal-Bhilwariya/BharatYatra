require("dotenv").config();
const cors = require("cors");

const express = require("express");
const connectDB = require("./config/db");
const placeRoutes = require("./routes/placeRoutes");
const foodRoutes = require("./routes/foodRoutes");
const translatorRoutes = require("./routes/translatorRoutes");
const stateRoutes = require("./routes/stateRoutes");
const cityRoutes = require("./routes/cityRoutes");
const transportRoutes = require("./routes/transportRoutes")
const adminRoutes = require("./routes/adminRoutes");
const adminStateRoutes = require("./routes/adminStateRoutes");
const cultureRoutes = require("./routes/cultureRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const itineraryRoutes = require("./routes/itineraryRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();

// Connect to database
connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
// Don't use express.json() for file upload routes - multer handles multipart/form-data
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use("/api/states", stateRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/transports", transportRoutes);
app.use("/api/translate", translatorRoutes);
app.use("/api/cultures", cultureRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/itineraries", itineraryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/states", adminStateRoutes);
app.use("/api/admin/cities", require("./routes/adminCityRoutes"));
app.use("/api/admin/places", require("./routes/adminPlaceRoutes"));
app.use("/api/admin/foods", require("./routes/adminFoodRoutes"));
app.use("/api/admin/transports", require("./routes/adminTransportRoutes"));
app.use("/api/admin/culture", require("./routes/adminCultureRoutes"));

app.get("/", (req, res) => {
  res.send("BharatYatra backend is running");
});

app.get("/api/health", (req, res) => {
  res.json({ 
    success: true, 
    message: "Server is running",
    mongodb: require('mongoose').connection.readyState === 1 ? "Connected" : "Disconnected"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
