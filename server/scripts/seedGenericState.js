require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");
const fs = require("fs");
const path = require("path");

const seedGenericState = async () => {
    try {
        const args = process.argv.slice(2);
        const fileIndex = args.indexOf("--file");

        if (fileIndex === -1 || !args[fileIndex + 1]) {
            console.error("Please provide a file path using --file <path>");
            process.exit(1);
        }

        const filePath = args[fileIndex + 1];
        const absolutePath = path.resolve(filePath);

        if (!fs.existsSync(absolutePath)) {
            console.error(`File not found: ${absolutePath}`);
            process.exit(1);
        }

        const rawData = fs.readFileSync(absolutePath);
        const data = JSON.parse(rawData);

        console.log(`Seeding data for state: ${data.name}`);

        await connectDB();

        // 1. Find or Create State
        const stateName = data.name;
        let state = await State.findOne({ name: stateName });

        if (!state) {
            console.log(`State '${stateName}' not found. Creating it...`);
            state = await State.create({
                name: stateName,
                slug: data.slug || stateName.toLowerCase().replace(/ /g, "-"),
                description: data.description,
                image: data.image,
                culturalSummary: data.culturalSummary,
                isActive: true
            });
        } else {
            console.log(`State '${stateName}' found. Updating...`);
            state.description = data.description;
            state.image = data.image;
            state.culturalSummary = data.culturalSummary;
            await state.save();
        }

        console.log(`State ID: ${state._id}`);

        // 2. Prepare Culture Data
        // Ensure stateId is set correctly
        const cultureData = {
            ...data.culture, // Expecting culture data to be nested under 'culture' key or we map it from root?
            // The prompt implies we generate "complete data" which usually includes State info AND Culture info.
            // Let's assume the JSON structure matches the 'dummyData' in seedUPCulture.js but with State info at root level or separate.
            // Looking at seedUPCulture.js, dummyData IS the culture data, but it has 'stateId'.
            // Our generic JSON should probably separate State fields and Culture fields.
            // Let's assume the JSON has: { name, slug, description, image, ...AND... overview, cuisine, etc. }
            // So we extract State fields, and the rest is Culture.
        };

        // Let's construct the culture object carefully.
        const culturePayload = {
            stateId: state._id,
            stateName: stateName,
            overview: data.overview,
            cuisine: data.cuisine,
            foodShops: data.foodShops,
            danceAndMusic: data.danceAndMusic,
            traditionalAttire: data.traditionalAttire,
            festivals: data.festivals,
            artAndHandicrafts: data.artAndHandicrafts,
            heritageAndTraditions: data.heritageAndTraditions,
            culturalPlaces: data.culturalPlaces,
            extraSections: data.extraSections,
            culturalExperience: data.culturalExperience
        };

        // 3. Update or Insert Culture
        const result = await Culture.findOneAndUpdate(
            { stateId: state._id },
            culturePayload,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        console.log(`SUCCESS: Culture data for ${stateName} seeded successfully!`);
        console.log("Culture ID:", result._id);

        process.exit(0);
    } catch (error) {
        console.error("ERROR Seeding Data:", error);
        process.exit(1);
    }
};

seedGenericState();
