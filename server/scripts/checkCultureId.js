require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Culture = require("../models/Culture");

const checkId = async () => {
    try {
        await connectDB();
        const id = "6978e60535fef3a65e0e89c2";
        const culture = await Culture.findById(id);
        if (culture) {
            console.log("Culture FOUND:", culture._id, culture.stateName);
        } else {
            console.log("Culture NOT FOUND with ID:", id);
            const all = await Culture.find({});
            console.log("Available Cultures:", all.map(c => ({ id: c._id, state: c.stateName })));
        }
    } catch (err) {
        console.error("Error:", err);
    } finally {
        process.exit();
    }
};

checkId();
