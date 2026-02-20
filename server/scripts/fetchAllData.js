// Fetches all cities, foods, places from running server
// Run: node scripts/fetchAllData.js
const http = require("http");
const fs = require("fs");
const path = require("path");

function fetchJson(apiPath) {
    return new Promise((resolve, reject) => {
        const req = http.request({ hostname: "localhost", port: 5000, path: apiPath, method: "GET" }, (res) => {
            let data = "";
            res.on("data", (c) => (data += c));
            res.on("end", () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json.data || json);
                } catch (e) {
                    reject(new Error("Parse error: " + e.message + " | raw: " + data.slice(0, 200)));
                }
            });
        });
        req.on("error", reject);
        req.end();
    });
}

async function main() {
    try {
        const [cities, foods, places] = await Promise.all([
            fetchJson("/api/cities"),
            fetchJson("/api/foods"),
            fetchJson("/api/places"),
        ]);

        const summary = {
            cities: cities.map((c) => ({ name: c.name, slug: c.slug, hasUnsplash: !!(c.image && c.image.includes("unsplash.com")) })),
            foods: foods.map((f) => ({ name: f.name, slug: f.slug, hasUnsplash: !!(f.image && f.image.includes("unsplash.com")) })),
            places: places.map((p) => ({ name: p.name, slug: p.slug, hasUnsplash: !!(p.images && p.images.length > 0 && p.images[0].includes("unsplash.com")) })),
        };

        fs.writeFileSync(path.join(__dirname, "all_data.json"), JSON.stringify(summary, null, 2));
    } catch (e) {
        fs.writeFileSync(path.join(__dirname, "all_data.json"), JSON.stringify({ error: e.message }));
    }
}

main();
