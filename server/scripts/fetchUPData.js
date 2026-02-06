const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const State = require("../models/State");
const City = require("../models/City");
const Place = require("../models/Place");
const Food = require("../models/Food");
const Transport = require("../models/Transport");
const Culture = require("../models/Culture");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const fetchUPData = async () => {
    try {
        await connectDB();

        console.log("Fetching Uttar Pradesh data...");

        // 1. Fetch State
        const state = await State.findOne({ name: "Uttar Pradesh" }).lean();
        if (!state) {
            console.error("State 'Uttar Pradesh' not found!");
            process.exit(1);
        }

        // 2. Fetch Culture
        const culture = await Culture.findOne({ stateId: state._id }).lean();

        // 3. Fetch Cities
        const cities = await City.find({ stateId: state._id }).lean();

        // 4. Fetch Details for each City
        const citiesWithDetails = await Promise.all(
            cities.map(async (city) => {
                const places = await Place.find({ cityId: city._id }).lean();
                const foods = await Food.find({ cityId: city._id }).lean();
                const transports = await Transport.find({ cityId: city._id }).lean();

                // Remove DB specific fields like _id, createdAt, updatedAt, __v for cleaner blueprint
                // BUT keep them if we want to reference them? No, for generation we want pure structure.
                // Actually, let's keep it simple and just structure it hierarchically.

                return {
                    ...city,
                    places,
                    foods,
                    transports,
                };
            })
        );

        const fullData = {
            state: state,
            culture: culture,
            cities: citiesWithDetails,
        };

        const outputPath = path.join(__dirname, "../data/uttar_pradesh_blueprint.json");

        // Ensure directory exists
        const dir = path.dirname(outputPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(outputPath, JSON.stringify(fullData, null, 2));
        console.log(`Successfully saved blueprint to ${outputPath}`);

        process.exit(0);
    } catch (error) {
        console.error("Error fetching data:", error);
        process.exit(1);
    }
};

fetchUPData();
