require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Ladakh...");

        const stateName = "LADAKH";
        const stateSlug = "ladakh";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Ladakh" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "The Land of High Passes, a cold desert with Buddhist heritage.",
                image: "https://placehold.co/600x400?text=Ladakh+Mountains",
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
                introduction: "Ladakh is a high-altitude desert in the Himalayas, known for its breathtaking landscapes, crystal clear lakes, and Buddhist monasteries.",
                lifestyle: "Adapted to harsh winters. Life is simple and spiritual.",
                traditions: "Tibetan Buddhism influences every aspect of life. Prayer flags and wheels are common.",
                history: "Former Buddhist kingdom, an important trade route on the Silk Road.",
                images: ["https://placehold.co/600x400?text=Ladakh+Overview"]
            },
            cuisine: {
                description: "Tibetan influence. Thukpa and Momos are staples.",
                dishes: [
                    { name: "Thukpa", type: "Veg/Non-Veg", priceRange: "₹80–₹150", description: "Noodle soup.", image: "https://placehold.co/600x400?text=Thukpa" },
                    { name: "Skyu", type: "Veg", priceRange: "₹100–₹150", description: "Stew with thumb-sized dough balls.", image: "https://placehold.co/600x400?text=Skyu" },
                    { name: "Butter Tea", type: "Beverage", priceRange: "₹30–₹50", description: "Salty tea with yak butter.", image: "https://placehold.co/600x400?text=Butter+Tea" }
                ]
            },
            foodShops: [
                { name: "The Tibetan Kitchen", location: "Leh", famousDish: "Gyako", priceRange: "₹400–₹800", rating: 4.6, timings: "11 AM - 10 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Chhams", type: "Ritual", description: "Masked dance performed by monks.", image: "https://placehold.co/600x400?text=Chhams" },
                    { name: "Jabro", type: "Folk", description: "Community dance performed during festivals.", image: "https://placehold.co/600x400?text=Jabro" }
                ],
                music: [
                    { name: "Monastic Chants", description: "Deep horn instruments and chanting." }
                ],
                instruments: [
                    { name: "Dungchen", description: "Long horn." },
                    { name: "Damanyu", description: "Lute." }
                ]
            },
            traditionalAttire: {
                men: { description: "Goncha (Robe).", attire: [{ name: "Goncha", description: "Thick woolen robe." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Goncha with Perak (Headgear).", attire: [{ name: "Perak", description: "Turquoise-studded headgear." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Pashmina", description: "Wool." }]
            },
            festivals: [
                { name: "Hemis Festival", celebrationTime: "June/July", significance: "Birth of Guru Padmasambhava", description: "Famous for Chhams dance.", images: ["https://placehold.co/600x400?text=Hemis"] },
                { name: "Losar", celebrationTime: "December/January", significance: "New Year", description: "Ladakhi New Year.", images: ["https://placehold.co/600x400?text=Losar"] }
            ],
            artAndHandicrafts: [
                { name: "Thangka Painting", type: "Painting", description: "Religious scrolls.", famousFor: "Art", images: ["https://placehold.co/600x400?text=Thangka"] }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Cooperative Farming", description: "Villagers help each other during short harvest season." }],
                rituals: [{ title: "Sky Burial", description: "Ancient funeral practice (rare now)." }],
                dailyLife: "Spinning wool and prayer.",
                values: "Compassion."
            },
            culturalPlaces: [
                { name: "Pangong Tso", type: "Nature", location: "Border", description: "Color changing lake.", image: "https://placehold.co/600x400?text=Pangong" },
                { name: "Thiksey Monastery", type: "Religious", location: "Leh", description: "Resembles Potala Palace.", image: "https://placehold.co/600x400?text=Thiksey" },
                { name: "Leh Palace", type: "Heritage", location: "Leh", description: "Former royal palace.", image: "https://placehold.co/600x400?text=Leh+Palace" }
            ],
            extraSections: [
                { title: "Languages", content: "Ladakhi (Bhoti), Hindi, and English." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Ladakh Festival", location: "Leh", date: new Date("2025-09-01"), entryFee: "Free", image: "https://placehold.co/600x400?text=Ladakh+Fest", audience: ["Tourist"] }
                ],
                foodTrails: [
                    { name: "Leh Market Food Walk", type: "Food Walk", description: "Try Apricot Jam and Khambir bread.", priceRange: "₹200", duration: "1 Hour", audience: ["Foodie"] }
                ],
                workshops: [
                    { name: "Thangka Workshop", type: "Art", duration: "3 Hours", price: "₹800", skillLevel: "Beginner", audience: ["Artist"] }
                ],
                festivalCalendar: [
                    { name: "Hemis Festival", priority: 1, date: new Date("2025-07-06"), significance: "Religious", images: ["https://placehold.co/600x400?text=Hemis"], audience: ["Global"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: Ladakh seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
