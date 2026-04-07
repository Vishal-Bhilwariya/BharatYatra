require("dotenv").config();
const mongoose = require("mongoose");
const crypto = require("crypto");
const Admin = require("../models/Admin");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Read credentials from env vars or CLI args — never hardcoded
    const username = process.env.ADMIN_USERNAME || process.argv[2];
    const password = process.env.ADMIN_PASSWORD || process.argv[3];

    if (!username || !password) {
      console.error("❌ Usage: node createAdmin.js <username> <password>");
      console.error("   Or set ADMIN_USERNAME and ADMIN_PASSWORD in .env");
      process.exit(1);
    }

    if (password.length < 8) {
      console.error("❌ Password must be at least 8 characters.");
      process.exit(1);
    }

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log("⚠️  Admin account already exists for username:", username);
      process.exit(0);
    }

    await Admin.create({ username, password, isActive: true });

    console.log("✅ Admin account created successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📋 Username:", username);
    console.log("⚠️  Keep your password safe. It is not shown again.");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🔗 Login URL: http://localhost:5173/admin/login");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
