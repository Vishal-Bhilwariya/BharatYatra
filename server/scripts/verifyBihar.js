require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Culture = require("../models/Culture");
const State = require("../models/State");
const fs = require('fs');

const verifyOrder = async () => {
    try {
        await connectDB();

        const log = (msg) => fs.appendFileSync('verification_result.txt', msg + '\n');

        // Clear previous log
        fs.writeFileSync('verification_result.txt', 'Starting Verification...\n');

        let success = true;

        // Check State
        const state = await State.findOne({ name: "BIHAR" });
        if (state) {
            log("VERIFICATION SUCCESS: Found BIHAR State.");
            log("State ID: " + state._id);
            log("Is Active: " + state.isActive);
            log("Slug: " + state.slug);
            if (!state.isActive) {
                log("CRITICAL: State exists but is NOT active.");
                success = false;
            }
        } else {
            log("VERIFICATION FAILED: BIHAR State NOT found.");
            success = false;
        }

        // Check Culture
        const culture = await Culture.findOne({ stateName: "BIHAR" });
        if (culture) {
            log("VERIFICATION SUCCESS: Found BIHAR Culture data.");
        } else {
            log("VERIFICATION FAILED: BIHAR Culture data NOT found.");
            success = false;
        }

        if (success) {
            log("OVERALL SUCCESS");
            process.exit(0);
        } else {
            log("OVERALL FAILURE");
            process.exit(1);
        }
    } catch (error) {
        fs.appendFileSync('verification_result.txt', 'ERROR: ' + error.message + '\n' + error.stack);
        process.exit(1);
    }
};

verifyOrder();
