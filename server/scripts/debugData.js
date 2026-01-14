require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const checkData = async () => {
    try {
        await connectDB();
        const state = await State.findOne({ name: "Uttar Pradesh" });
        if (!state) {
            console.log("State 'Uttar Pradesh' NOT FOUND");
            return;
        }
        console.log("State found:", state._id);

        const culture = await Culture.findOne({ stateId: state._id });
        if (!culture) {
            console.log("Culture NOT FOUND for this state");
            return;
        }

        console.log("Culture found ID:", culture._id);
        console.log("Has culturalExperience?", !!culture.culturalExperience);
        if (culture.culturalExperience) {
            console.log("Live Events:", culture.culturalExperience.liveEvents?.length);
            console.log("Food Trails:", culture.culturalExperience.foodTrails?.length);
            console.log("Workshops:", culture.culturalExperience.workshops?.length);
            console.log("Festivals:", culture.culturalExperience.festivalCalendar?.length);
            console.log("Sample Event:", JSON.stringify(culture.culturalExperience.liveEvents?.[0], null, 2));
        }

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

checkData();
