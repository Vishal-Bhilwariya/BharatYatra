require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const placeRoutes = require("./routes/placeRoutes");
const foodRoutes = require("./routes/foodRoutes");
const translatorRoutes = require("./routes/translatorRoutes");

const app = express();

// Connect to database
connectDB();

app.use(express.json());
const cityRoutes = require("./routes/cityRoutes");
// Routes
app.use("/api/cities", cityRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/translate", translatorRoutes);

// Middlewares
app.use(cors());

app.get("/", (req, res) => {
  res.send("BharatYatra backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
