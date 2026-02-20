// Call the bulk update endpoint and save result
const http = require("http");
const fs = require("fs");
const path = require("path");

const body = JSON.stringify({});
const options = {
    hostname: "localhost",
    port: 5000,
    path: "/api/admin/bulk-update-all-images",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
    },
};

const req = http.request(options, (res) => {
    let data = "";
    res.on("data", (c) => (data += c));
    res.on("end", () => {
        fs.writeFileSync(path.join(__dirname, "bulk_update_result.json"), data);
    });
});

req.on("error", (e) => {
    fs.writeFileSync(
        path.join(__dirname, "bulk_update_result.json"),
        JSON.stringify({ error: e.message })
    );
});

req.write(body);
req.end();
