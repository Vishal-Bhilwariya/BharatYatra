require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Culture = require("../models/Culture");
const State = require("../models/State");

const checkData = async () => {
    try {
        await connectDB();

        const stateName = "Arunachal Pradesh";
        const state = await State.findOne({ name: stateName });

        if (!state) {
            console.log(`State ${stateName} NOT FOUND`);
            process.exit(1);
        }

        const culture = await Culture.findOne({ stateId: state._id });

        if (!culture) {
            console.log(`Culture data for ${stateName} NOT FOUND`);
            process.exit(1);
        }

        console.log("--- State Data ---");
        console.log(`Name: ${state.name}`);
        console.log(`Slug: ${state.slug}`);
        console.log(`Description: ${state.description}`);

        console.log("\n--- Culture Data ---");
        console.log(`Overview Intro: ${culture.overview.introduction}`);
        console.log(`Cuisine Items: ${culture.cuisine.dishes.length}`);
        console.log(`Festivals: ${culture.festivals.length}`);
        console.log(`Cultural Places: ${culture.culturalPlaces.length}`);

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

checkData();
