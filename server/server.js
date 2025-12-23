// Load environment variables
require("dotenv").config();

// Import Express framework
const express = require("express");

// Import CORS to allow frontend requests
const cors = require("cors");

// Create an Express application
const app = express();

// ---------- MIDDLEWARES ----------

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// ---------- ROUTES ----------

// Test route to check if server is running
app.get("/", (req, res) => {
  res.send("BharatYatra backend is running");
});

// ---------- SERVER ----------

// Define port number
const PORT = 5000;

// Start the server and listen on the port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
