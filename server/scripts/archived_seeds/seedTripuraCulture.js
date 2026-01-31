require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Tripura...");

        const stateName = "TRIPURA";
        const stateSlug = "tripura";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Tripura" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "A land of diverse tribal culture and royal history, famous for Unakoti.",
                image: "https://placehold.co/600x400?text=Tripura+State",
                isActive: true
            });
        } else {
            state.name = stateName;
            state.slug = stateSlug;
            state.isActive = true;
            await state.save();
        }

        const data = {
            stateId: state._id,
            stateName: stateName,
            overview: {
                introduction: "Tripura is a state in North East India, known for its diverse tribal culture and religious sites. It was a princely state ruled by the Manikya dynasty.",
                lifestyle: "A synthesis of Bengali and Tribal (Kokborok speaking) lifestyles. Agriculture and handloom weaving are main livelihoods.",
                traditions: "Bamboo plays a vital role in every aspect of life, from houses to food.",
                history: "Home to the Ujjayanta Palace and Neermahal, reflecting a royal past.",
                images: ["https://placehold.co/600x400?text=Tripura+Overview"]
            },
            cuisine: {
                description: "Non-vegetarian, spicy, and oil-free. Fermented fish is a staple.",
                dishes: [
                    { name: "Mui Borok", type: "Non-Veg", priceRange: "₹100–₹200", description: "Traditional Tripuri thali with Berma (fermented fish).", image: "https://placehold.co/600x400?text=Mui+Borok" },
                    { name: "Kosoi Bwtwi", type: "Veg", priceRange: "₹50–₹100", description: "Beans cooked with garlic and fermented fish.", image: "https://placehold.co/600x400?text=Kosoi" },
                    { name: "Mosdeng Serma", type: "Non-Veg", priceRange: "₹80–₹150", description: "Spicy chutney made of fish, chilies, and herbs.", image: "https://placehold.co/600x400?text=Mosdeng" }
                ]
            },
            foodShops: [
                { name: "Restaurant Kurry Klub", location: "Agartala", famousDish: "Bamboo Shoot Curry", priceRange: "₹300–₹500", rating: 4.5, timings: "11 AM - 10 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Hojagiri", type: "Folk", description: "Balance dance performed by Reang women on earthen pitchers.", image: "https://placehold.co/600x400?text=Hojagiri" },
                    { name: "Garia Dance", type: "Harvest", description: "Performed during Garia Puja.", image: "https://placehold.co/600x400?text=Garia" }
                ],
                music: [
                    { name: "Folk Songs", description: "Accompanied by bamboo instruments." }
                ],
                instruments: [
                    { name: "Sumui", description: "Bamboo flute." },
                    { name: "Chongpreng", description: "String instrument." }
                ]
            },
            traditionalAttire: {
                men: { description: "Rikutu (Loincloth) and Kamchwlwi Borok (Shirt).", attire: [{ name: "Rikutu", description: "Simplified Dhoti." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Rignai (Wrap-around skirt) and Risa (Chest wrap).", attire: [{ name: "Risa", description: "Handwoven upper garment." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Tripura Silk", description: "Sericulture products." }]
            },
            festivals: [
                { name: "Kharchi Puja", celebrationTime: "July", significance: "Worship of 14 Gods", description: "Week-long royal festival at Chaturdash Devata Temple.", images: ["https://placehold.co/600x400?text=Kharchi"] },
                { name: "Garia Puja", celebrationTime: "April", significance: "Harvest", description: "Worship of Baba Garia.", images: ["https://placehold.co/600x400?text=Garia"] }
            ],
            artAndHandicrafts: [
                { name: "Cane and Bamboo", type: "Craft", description: "Furniture and decor.", famousFor: "Furniture", images: ["https://placehold.co/600x400?text=Bamboo"] },
                { name: "Handloom", type: "Textile", description: "Distinct tribal weaves.", famousFor: "Shawls" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Manikya Dynasty", description: "The royal lineage that ruled for centuries." }],
                rituals: [{ title: "Ker Puja", description: "Strict ritual where the area is sealed off." }],
                dailyLife: "Simple and nature-oriented.",
                values: "Unity in diversity."
            },
            culturalPlaces: [
                { name: "Unakoti", type: "Heritage", location: "Kailashahar", description: "Massive rock-cut reliefs of Shiva.", image: "https://placehold.co/600x400?text=Unakoti" },
                { name: "Ujjayanta Palace", type: "Museum", location: "Agartala", description: "Former royal palace now a museum.", image: "https://placehold.co/600x400?text=Ujjayanta" },
                { name: "Neermahal", type: "Palace", location: "Melaghar", description: "Water palace in Rudrasagar Lake.", image: "https://placehold.co/600x400?text=Neermahal" }
            ],
            extraSections: [
                { title: "Languages", content: "Kokborok and Bengali are official languages." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Neermahal Water Festival", location: "Melaghar", date: new Date("2025-08-01"), entryFee: "Free", image: "https://placehold.co/600x400?text=Water+Fest", audience: ["Tourist"] }
                ],
                foodTrails: [
                    { name: "Agartala Street Food", type: "Food Walk", description: "Try Momos and Pork Bharta.", priceRange: "₹150", duration: "1 Hour", audience: ["Foodie"] }
                ],
                workshops: [
                    { name: "Bamboo Carving", type: "Craft", duration: "2 Hours", price: "₹300", skillLevel: "Beginner", audience: ["Tourist"] }
                ],
                festivalCalendar: [
                    { name: "Kharchi Puja", priority: 1, date: new Date("2025-07-10"), significance: "Royal", images: ["https://placehold.co/600x400?text=Kharchi"], audience: ["Devotee"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: Tripura seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
