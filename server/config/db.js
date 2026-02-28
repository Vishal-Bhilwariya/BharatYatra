const mongoose = require("mongoose");
const dns = require("dns");

// Force Google & Cloudflare DNS to bypass ISP DNS blocking
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      directConnection: false,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.log("\n⚠️  Server will continue running but database operations will fail");
    console.log("\nTroubleshooting:");
    console.log("1. Check MongoDB Atlas cluster status (might be paused)");
    console.log("2. Add 0.0.0.0/0 to Network Access in MongoDB Atlas");
    console.log("3. Verify credentials in .env file");
    console.log("4. Change Windows DNS to 8.8.8.8\n");
  }
};

module.exports = connectDB;
