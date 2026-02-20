// Run from d:\BharatYatra\server:  node scripts/updateStateImages.js
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const mongoose = require("mongoose");
const fs = require("fs");

const State = require("../models/State");

const LOG_FILE = path.join(__dirname, "update_result.json");

const STATE_IMAGES = [
    { slug: "andhra-pradesh", img: "https://images.unsplash.com/photo-1600431521340-491eca880813?auto=format&fit=crop&w=1200&q=85" },
    { slug: "arunachal-pradesh", img: "https://images.unsplash.com/photo-1626615340125-d9fb47e62601?auto=format&fit=crop&w=1200&q=85" },
    { slug: "assam", img: "https://images.unsplash.com/photo-1603994843756-e7fa8e5c8ec8?auto=format&fit=crop&w=1200&q=85" },
    { slug: "bihar", img: "https://images.unsplash.com/photo-1672756342695-c1267a9cfa2e?auto=format&fit=crop&w=1200&q=85" },
    { slug: "chhattisgarh", img: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=1200&q=85" },
    { slug: "goa", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85" },
    { slug: "gujarat", img: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=85" },
    { slug: "haryana", img: "https://images.unsplash.com/photo-1680178979830-5ce12d73e23f?auto=format&fit=crop&w=1200&q=85" },
    { slug: "himachal-pradesh", img: "https://images.unsplash.com/photo-1626015365107-338a46ae648a?auto=format&fit=crop&w=1200&q=85" },
    { slug: "jharkhand", img: "https://images.unsplash.com/photo-1549887534-1541e9326b83?auto=format&fit=crop&w=1200&q=85" },
    { slug: "karnataka", img: "https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?auto=format&fit=crop&w=1200&q=85" },
    { slug: "kerala", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85" },
    { slug: "madhya-pradesh", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85" },
    { slug: "maharashtra", img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=1200&q=85" },
    { slug: "manipur", img: "https://images.unsplash.com/photo-1598425165413-da9cfa18dc5b?auto=format&fit=crop&w=1200&q=85" },
    { slug: "meghalaya", img: "https://images.unsplash.com/photo-1622390455932-0c1a4be3ed46?auto=format&fit=crop&w=1200&q=85" },
    { slug: "mizoram", img: "https://images.unsplash.com/photo-1467377791767-c929b5dc9a23?auto=format&fit=crop&w=1200&q=85" },
    { slug: "nagaland", img: "https://images.unsplash.com/photo-1598425165177-c09800d4c1fb?auto=format&fit=crop&w=1200&q=85" },
    { slug: "odisha", img: "https://images.unsplash.com/photo-1590158786923-6e4b39f1e30e?auto=format&fit=crop&w=1200&q=85" },
    { slug: "punjab", img: "https://images.unsplash.com/photo-1612810806563-4cb8265c7f52?auto=format&fit=crop&w=1200&q=85" },
    { slug: "rajasthan", img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85" },
    { slug: "sikkim", img: "https://images.unsplash.com/photo-1558888401-3cc1de77652d?auto=format&fit=crop&w=1200&q=85" },
    { slug: "tamil-nadu", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85" },
    { slug: "telangana", img: "https://images.unsplash.com/photo-1543489822-c49534f3271f?auto=format&fit=crop&w=1200&q=85" },
    { slug: "tripura", img: "https://images.unsplash.com/photo-1467377791767-c929b5dc9a23?auto=format&fit=crop&w=1200&q=85" },
    { slug: "uttar-pradesh", img: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=85" },
    { slug: "uttarakhand", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=85" },
    { slug: "west-bengal", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85" },
    // Union Territories
    { slug: "andaman-and-nicobar-islands", img: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=85" },
    { slug: "chandigarh", img: "https://images.unsplash.com/photo-1593436978194-c574c0d7e3b5?auto=format&fit=crop&w=1200&q=85" },
    { slug: "dadra-and-nagar-haveli-and-daman-and-diu", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85" },
    { slug: "delhi", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=85" },
    { slug: "jammu-and-kashmir", img: "https://images.unsplash.com/photo-1597149541696-1c6d86c56abb?auto=format&fit=crop&w=1200&q=85" },
    { slug: "ladakh", img: "https://images.unsplash.com/photo-1567148275226-f4e3d1dd1c51?auto=format&fit=crop&w=1200&q=85" },
    { slug: "lakshadweep", img: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=85" },
    { slug: "puducherry", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85" },
];

const results = { updated: [], notFound: [], error: null };

mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
        for (const { slug, img } of STATE_IMAGES) {
            const res = await State.updateOne({ slug }, { $set: { image: img } });
            if (res.matchedCount > 0) {
                results.updated.push(slug);
            } else {
                results.notFound.push(slug);
            }
        }
    })
    .catch((e) => {
        results.error = e.message;
    })
    .finally(() => {
        fs.writeFileSync(LOG_FILE, JSON.stringify(results, null, 2));
        mongoose.disconnect();
    });
