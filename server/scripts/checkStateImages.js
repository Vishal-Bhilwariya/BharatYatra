// Quick verify script
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const { MongoClient } = require("mongodb");
const fs = require("fs");

async function run() {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db();
    const states = await db.collection("states").find({}, { projection: { name: 1, slug: 1, image: 1 } }).sort({ name: 1 }).toArray();
    fs.writeFileSync(path.join(__dirname, "states_check.json"), JSON.stringify(states, null, 2));
    await client.close();
}
run().catch(e => fs.writeFileSync(path.join(__dirname, "states_error.json"), JSON.stringify({ error: e.message })));
