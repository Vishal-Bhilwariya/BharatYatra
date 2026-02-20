// Fetches all states from running server and shows slug + current image status
// Run: node scripts/checkSlugs.js
const http = require("http");
const fs = require("fs");
const path = require("path");

const options = {
    hostname: "localhost",
    port: 5000,
    path: "/api/states",
    method: "GET",
};

const req = http.request(options, (res) => {
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => {
        try {
            const json = JSON.parse(data);
            const states = json.data || json;
            const result = states.map((s) => ({
                name: s.name,
                slug: s.slug,
                hasUnsplash: s.image && s.image.includes("unsplash.com"),
                image: s.image ? s.image.substring(0, 60) + "..." : "NO IMAGE",
            }));

            const noImage = result.filter((s) => !s.hasUnsplash);
            const withImage = result.filter((s) => s.hasUnsplash);

            const output = {
                total: states.length,
                withUnsplash: withImage.length,
                withoutUnsplash: noImage.length,
                missingStates: noImage.map((s) => ({ name: s.name, slug: s.slug })),
                allSlugs: result.map((s) => s.slug),
            };

            fs.writeFileSync(
                path.join(__dirname, "slugs_check.json"),
                JSON.stringify(output, null, 2)
            );
        } catch (e) {
            fs.writeFileSync(
                path.join(__dirname, "slugs_check.json"),
                JSON.stringify({ parseError: e.message, raw: data.substring(0, 500) })
            );
        }
    });
});

req.on("error", (e) => {
    fs.writeFileSync(
        path.join(__dirname, "slugs_check.json"),
        JSON.stringify({ connectionError: e.message })
    );
});

req.end();
