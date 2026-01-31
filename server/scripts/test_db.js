require("dotenv").config();
console.log("Starting...");
const mongoose = require("mongoose");
console.log("Mongoose loaded");
const connectDB = require("../config/db");
console.log("ConnectDB loaded, calling...");
connectDB().then(() => {
    console.log("Connected!");
    process.exit(0);
}).catch(err => {
    console.error("Error:", err);
    process.exit(1);
});
