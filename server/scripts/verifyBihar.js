require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Culture = require("../models/Culture");

const State = require("../models/State");

const verifyOrder = async () => {
    try {
        await connectDB();

        let success = true;

        // Check State
        const state = await State.findOne({ name: "BIHAR" });
        if (state) {
            console.log("VERIFICATION SUCCESS: Found BIHAR State.");
            console.log("State ID:", state._id);
            console.log("Is Active:", state.isActive);
            console.log("Slug:", state.slug);
            if (!state.isActive) {
                console.log("CRITICAL: State exists but is NOT active.");
                success = false;
            }
        } else {
            console.log("VERIFICATION FAILED: BIHAR State NOT found.");
            success = false;
        }

        // Check Culture
        const culture = await Culture.findOne({ stateName: "BIHAR" });
        if (culture) {
            console.log("VERIFICATION SUCCESS: Found BIHAR Culture data.");
        } else {
            console.log("VERIFICATION FAILED: BIHAR Culture data NOT found.");
            success = false;
        }

        if (success) {
            process.exit(0);
        } else {
            process.exit(1);
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

verifyOrder();
