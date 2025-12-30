require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: "admin" });
    if (existingAdmin) {
      console.log("⚠️  Admin account already exists!");
      console.log("Username: admin");
      console.log("Password: (your existing password)");
      process.exit(0);
    }

    // Create admin account
    const admin = await Admin.create({
      username: "admin",
      password: "admin123", // Change this to your secure password
      isActive: true,
    });

    console.log("✅ Admin account created successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📋 Login Credentials:");
    console.log("Username: admin");
    console.log("Password: admin123");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("⚠️  IMPORTANT: Change the password after first login!");
    console.log("🔗 Login URL: http://localhost:5173/admin/login");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();

