require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Puducherry...");

        const stateName = "PUDUCHERRY";
        const stateSlug = "puducherry";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Puducherry" }, { name: "Pondicherry" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "The French Riviera of the East, known for its colonial architecture and spirituality.",
                image: "https://placehold.co/600x400?text=Pondicherry+Beach",
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
                introduction: "Puducherry (formerly Pondicherry) is a Union Territory with a unique French legacy. It includes four districts: Puducherry, Karaikal (Tamil Nadu), Mahe (Kerala), and Yanam (Andhra Pradesh).",
                lifestyle: "Relaxed, artistic, and spiritual. The White Town retains a distinct French atmosphere.",
                traditions: "A harmonious blend of French and Tamil cultures.",
                history: "A French colony until 1954. Home to Sri Aurobindo and The Mother.",
                images: ["https://placehold.co/600x400?text=Puducherry+Overview"]
            },
            cuisine: {
                description: "French-Tamil fusion (Creole cuisine) is unique here.",
                dishes: [
                    { name: "Pondicherry Fish Curry", type: "Non-Veg", priceRange: "₹300–₹500", description: "Fish cooked in coconut milk with French mildness.", image: "https://placehold.co/600x400?text=Fish+Curry" },
                    { name: "Ratatouille", type: "Veg", priceRange: "₹250–₹400", description: "French vegetable stew.", image: "https://placehold.co/600x400?text=Ratatouille" },
                    { name: "Croissant", type: "Sweet", priceRange: "₹100–₹200", description: "Buttery French pastry.", image: "https://placehold.co/600x400?text=Croissant" }
                ]
            },
            foodShops: [
                { name: "Baker Street", location: "Bussy Street", famousDish: "Baguette", priceRange: "₹200–₹500", rating: 4.8, timings: "8 AM - 10 PM" },
                { name: "Carte Blanche", location: "White Town", famousDish: "Creole Curry", priceRange: "₹800–₹1500", rating: 4.6, timings: "12 PM - 11 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Bharatanatyam", type: "Classical", description: "Widely practiced.", image: "https://placehold.co/600x400?text=Bharatanatyam" }
                ],
                music: [
                    { name: "Fusion Music", description: "Experimental music scene in Auroville." }
                ],
                instruments: [
                    { name: "Veena", description: "String instrument." }
                ]
            },
            traditionalAttire: {
                men: { description: "Western wear and Traditional Tamil wear.", attire: [{ name: "Linen Shirts", description: "Popular in White Town." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Sarees and Western dresses.", attire: [{ name: "Franco-Pondicherrian Dress", description: "Vintage fusion style." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Cotton", description: "Organic cotton from Auroville." }]
            },
            festivals: [
                { name: "Bastille Day", celebrationTime: "July 14", significance: "French National Day", description: "Parade and fireworks.", images: ["https://placehold.co/600x400?text=Bastille+Day"] },
                { name: "Pongal", celebrationTime: "January", significance: "Harvest", description: "Tamil harvest festival.", images: ["https://placehold.co/600x400?text=Pongal"] }
            ],
            artAndHandicrafts: [
                { name: "Auroville Paper", type: "Craft", description: "Handmade paper products.", famousFor: "Stationery", images: ["https://placehold.co/600x400?text=Paper"] },
                { name: "Pottery", type: "Craft", description: "Glazed pottery known as Golden Bridge Pottery.", famousFor: "Ceramics" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Sunday Market", description: "Weekly flea market on MG Road." }],
                rituals: [{ title: "Meditation", description: "Group meditation at Matrimandir." }],
                dailyLife: "Cycling is a popular mode of transport.",
                values: "Peace and Integral Yoga."
            },
            culturalPlaces: [
                { name: "Auroville", type: "Community", location: "Villupuram", description: "Universal township.", image: "https://placehold.co/600x400?text=Auroville" },
                { name: "Sri Aurobindo Ashram", type: "Religious", location: "White Town", description: "Spiritual community.", image: "https://placehold.co/600x400?text=Ashram" },
                { name: "Promenade Beach", type: "Nature", location: "White Town", description: "Rock beach.", image: "https://placehold.co/600x400?text=Promenade" }
            ],
            extraSections: [
                { title: "Languages", content: "Tamil, French, English, Telugu, and Malayalam." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Pondicherry Heritage Festival", location: "White Town", date: new Date("2025-02-01"), entryFee: "Free", image: "https://placehold.co/600x400?text=Heritage+Fest", audience: ["Tourist"] }
                ],
                foodTrails: [
                    { name: "French Bakery Trail", type: "Food Walk", description: "Crossiants and Quiches.", priceRange: "₹400", duration: "2 Hours", audience: ["Foodie"] }
                ],
                workshops: [
                    { name: "Pottery Workshop", type: "Art", duration: "3 Hours", price: "₹1200", skillLevel: "Beginner", audience: ["Artist"] }
                ],
                festivalCalendar: [
                    { name: "Bastille Day", priority: 1, date: new Date("2025-07-14"), significance: "French History", images: ["https://placehold.co/600x400?text=Bastille"], audience: ["Global"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: Puducherry seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
