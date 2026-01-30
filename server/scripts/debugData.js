require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");

const debugStates = async () => {
    try {
        await connectDB();
        const states = await State.find({});
        console.log("Total States Found:", states.length);
        states.forEach(state => {
            console.log(`- ${state.name} (Slug: ${state.slug}, Active: ${state.isActive}, ID: ${state._id})`);
        });
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

debugStates();
