const mongoose = require("mongoose");
const dns = require("dns");

// Force Google & Cloudflare DNS to bypass ISP DNS blocking
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env file");
    }
    await mongoose.connect(process.env.MONGO_URI, {
      directConnection: false,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
