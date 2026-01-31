require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");
const fs = require('fs');

const checkMissing = async () => {
    try {
        const uri = process.env.MONGO_URI;
        const log = (msg) => {
            console.log(msg);
            fs.appendFileSync('missing_culture_report.txt', msg + '\n');
        };
        fs.writeFileSync('missing_culture_report.txt', '--- MISSING CULTURE DATA REPORT ---\n\n');
        log("DEBUG URI: " + (uri ? uri.substring(0, 15) : "UNDEFINED"));

        await mongoose.connect(uri);

        // Master List of Indian States and UTs
        const masterList = [
            "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
            "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
            "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
            "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
            "Uttarakhand", "West Bengal",
            "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
            "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
        ];

        // 1. Fetch all States in DB
        const dbStates = await State.find({});
        const dbStateNames = dbStates.map(s => s.name.toLowerCase());
        const dbStateMap = {}; // name -> _id
        dbStates.forEach(s => dbStateMap[s.name.toLowerCase()] = s);

        log(`Total States in DB: ${dbStates.length}`);
        log(`DEBUG: DB State Names -> ${JSON.stringify(dbStateNames)}`);

        // 2. Fetch all Cultures in DB
        const dbCultures = await Culture.find({}).populate('stateId');
        const cultureStateIds = new Set(dbCultures.map(c => c.stateId ? c.stateId._id.toString() : null));

        log(`Total Cultures in DB: ${dbCultures.length}`);

        // 3. Analyze Missing States (Not in DB at all)
        const missingFromDB = masterList.filter(name => !dbStateNames.includes(name.toLowerCase()));

        // 4. Analyze States without Culture Data (In DB, but no Culture)
        const statesWithoutCulture = dbStates.filter(s => !cultureStateIds.has(s._id.toString()));

        log('\n--- 1. STATES COMPLETELY MISSING FROM DATABASE ---');
        if (missingFromDB.length === 0) {
            log("None. All states exist in the State collection.");
        } else {
            missingFromDB.forEach(name => log(`- ${name}`));
        }

        log('\n--- 2. STATES IN DB BUT MISSING CULTURE DATA ---');
        if (statesWithoutCulture.length === 0) {
            log("None. All existing states have culture data.");
        } else {
            statesWithoutCulture.forEach(s => log(`- ${s.name}`));
        }

        log('\n--- 3. SUMMARY ---');
        log(`Missing from DB: ${missingFromDB.length}`);
        log(`Pending Culture Data creation: ${statesWithoutCulture.length}`);
        log(`Total Missing/Pending: ${missingFromDB.length + statesWithoutCulture.length}`);

        process.exit(0);
    } catch (error) {
        const fs = require('fs');
        fs.appendFileSync('missing_culture_report.txt', 'ERROR: ' + error.message + '\n' + error.stack);
        process.exit(1);
    }
};

checkMissing();
