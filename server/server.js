require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect to database
connectDB();

const cityRoutes = require("./routes/cityRoutes");
// Routes
app.use("/api/cities", cityRoutes);
// Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BharatYatra backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
