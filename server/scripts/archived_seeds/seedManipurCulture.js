require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const fs = require('fs');
const log = (msg) => {
    console.log(msg);
    try { fs.appendFileSync('debug_manipur.txt', msg + '\\n'); } catch (e) { }
};

const seedCulture = async () => {
    try {
        await connectDB();
        log("Seeding Manipur...");

        const stateName = "MANIPUR";
        const stateSlug = "manipur";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Manipur" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "The Jewel of India, known for its classical dance and Loktak Lake.",
                image: "https://placehold.co/600x400?text=Manipur+State",
                isActive: true
            });
        } else {
            state.name = stateName;
            state.slug = stateSlug;
            state.isActive = true;
            await state.save();
        }

        // ... (rest of data object remains same, I won't replace it all to save tokens, just the end)
        // Wait, I need to be careful with replace_file_content for large blocks. 
        // I will just replace the end block.


        const data = {
            stateId: state._id,
            stateName: stateName,
            overview: {
                introduction: "Manipur, literally meaning 'A jeweled land', is nestled in the blue hills of the North East. It is famous for its rich culture, martial arts, and the only floating national park in the world.",
                lifestyle: "The society is known for its egalitarian values and strong community bonding. Sports like Polo (Sagol Kangjei) originated here.",
                traditions: "The Meitei community follows Vaishnavism, which deeply influences their art and culture.",
                history: "An ancient kingdom with a recorded history (Cheitharol Kumbaba) going back to 33 AD.",
                images: ["https://placehold.co/600x400?text=Manipur+Overview"]
            },
            cuisine: {
                description: "Healthy and organic, focusing on fish, bamboo shoots, and aromatic herbs. Very little oil is used.",
                dishes: [
                    { name: "Eromba", type: "Non-Veg", priceRange: "₹100–₹200", description: "Mash of boiled vegetables and fermented fish (Ngari).", image: "https://placehold.co/600x400?text=Eromba" },
                    { name: "Kangshoi", type: "Veg", priceRange: "₹80–₹150", description: "Vegetable stew.", image: "https://placehold.co/600x400?text=Kangshoi" },
                    { name: "Chak-Hao Kheer", type: "Sweet", priceRange: "₹100–₹200", description: "Pudding made from black rice.", image: "https://placehold.co/600x400?text=Black+Rice" }
                ]
            },
            foodShops: [
                { name: "Luxmi Kitchen", location: "Imphal", famousDish: "Manipuri Thali", priceRange: "₹250–₹400", rating: 4.5, timings: "10 AM - 9 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Manipuri Ras Leela", type: "Classical", description: "One of the major Indian classical dance forms, depicting the love of Radha and Krishna.", image: "https://placehold.co/600x400?text=Ras+Leela" },
                    { name: "Thang-Ta", type: "Martial Art", description: "The Art of Sword and Spear.", image: "https://placehold.co/600x400?text=Thang+Ta" }
                ],
                music: [
                    { name: "Khongjom Parva", description: "Musical narration of the Battle of Khongjom." }
                ],
                instruments: [
                    { name: "Pung", description: "Manipuri drum." },
                    { name: "Pena", description: "String instrument." }
                ]
            },
            traditionalAttire: {
                men: { description: "Dhoti and Jacket.", attire: [{ name: "Khamen Chatpa", description: "Ritual dhoti." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Phanek (Sarong) and Innaphi (Shawl).", attire: [{ name: "Phanek", description: "Handwoven sarong with stripes." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Moirang Phee", description: "Traditional fabric with temple borders." }]
            },
            festivals: [
                { name: "Yaoshang", celebrationTime: "February/March", significance: "Holi", description: "Celebrated for 5 days with the Thabal Chongba folk dance.", images: ["https://placehold.co/600x400?text=Yaoshang"] },
                { name: "Lai Haraoba", celebrationTime: "May", significance: "Worship of Deities", description: "Ritualistic festival to please the Umang Lais (Forest Deities).", images: ["https://placehold.co/600x400?text=Lai+Haraoba"] }
            ],
            artAndHandicrafts: [
                { name: "Kauna Craft", type: "Handicraft", description: "Items made from Kauna reed (water reed).", famousFor: "Mats and Cushions", images: ["https://placehold.co/600x400?text=Kauna"] },
                { name: "Black Pottery", type: "Pottery", description: "Longpi pottery made without a potter's wheel.", famousFor: "Cookware" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Sanamahism", description: "Indigenous religion worshipping Lainingthou Sanamahi." }],
                rituals: [{ title: "Nahutpa", description: "Ear piercing ceremony." }],
                dailyLife: "Centres around the Ima Keithel (Mother's Market) run exclusively by women.",
                values: "Respect for elders and women."
            },
            culturalPlaces: [
                { name: "Loktak Lake", type: "Nature", location: "Moirang", description: "Largest freshwater lake in NE India, famous for Phumdis (floating islands).", image: "https://placehold.co/600x400?text=Loktak" },
                { name: "Kangla Fort", type: "History", location: "Imphal", description: "The ancient seat of Manipuri rulers.", image: "https://placehold.co/600x400?text=Kangla" },
                { name: "Ima Keithel", type: "Market", location: "Imphal", description: "World's only all-women run market.", image: "https://placehold.co/600x400?text=Ima+Keithel" }
            ],
            extraSections: [
                { title: "Languages", content: "Meiteilon (Manipuri) is the official language." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Sangai Festival", location: "Imphal", date: new Date("2025-11-21"), entryFee: "₹50", image: "https://placehold.co/600x400?text=Sangai", audience: ["Tourist"] }
                ],
                foodTrails: [
                    { name: "Imphal Street Food", type: "Food Walk", description: "Try Bora and Singju.", priceRange: "₹150", duration: "1 Hour", audience: ["Foodie"] }
                ],
                workshops: [
                    { name: "Pottery Making", type: "Craft", duration: "3 Hours", price: "₹600", skillLevel: "Beginner", audience: ["Tourist"] }
                ],
                festivalCalendar: [
                    { name: "Yaoshang", priority: 1, date: new Date("2025-03-14"), significance: "Spring Festival", images: ["https://placehold.co/600x400?text=Yaoshang"], audience: ["Youth"] }
                ]
            }
        };

        const res = await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        log("Seeding Result ID: " + res._id);

        const verify = await Culture.findOne({ stateId: state._id });
        if (verify) {
            log("VERIFICATION SUCCESS: Found culture in DB: " + verify._id);
        } else {
            log("VERIFICATION FAILED: Could not find culture in DB.");
        }

        log("SUCCESS: Manipur seeded.");
        process.exit(0);
    } catch (error) {
        log("ERROR: " + error);
        process.exit(1);
    }
};

seedCulture();
