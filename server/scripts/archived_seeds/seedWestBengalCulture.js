require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding West Bengal...");

        const stateName = "WEST BENGAL";
        const stateSlug = "west-bengal";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "West Bengal" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "The Cultural Capital of India, known for Durga Puja, Literature, and Sweets.",
                image: "https://placehold.co/600x400?text=Bengal+State",
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
                introduction: "West Bengal is a land of arts, literature, and revolution. From the Himalayas in Darjeeling to the Sundarbans mangroves, it is diverse. Kolkata (Calcutta) was the former capital of British India.",
                lifestyle: "adda (intellectual chat) over tea is a way of life. Football and cricket are passions.",
                traditions: "Famous for its literary heritage (Rabindranath Tagore).",
                history: "Seat of the Bengal Renaissance and freedom struggle.",
                images: ["https://placehold.co/600x400?text=Bengal+Overview"]
            },
            cuisine: {
                description: "Famous for Maach (Fish), Bhaat (Rice), and Mishti (Sweets). Mustard oil and Panch Phoron spice mix are key.",
                dishes: [
                    { name: "Ilish Bhapa", type: "Non-Veg", priceRange: "₹300–₹600", description: "Steamed Hilsa fish in mustard sauce.", image: "https://placehold.co/600x400?text=Ilish" },
                    { name: "Rosogolla", type: "Sweet", priceRange: "₹10–₹20", description: "Spongy cottage cheese balls in sugar syrup.", image: "https://placehold.co/600x400?text=Rosogolla" },
                    { name: "Mishti Doi", type: "Sweet", priceRange: "₹20–₹50", description: "Fermented sweet yogurt.", image: "https://placehold.co/600x400?text=Mishti+Doi" }
                ]
            },
            foodShops: [
                { name: "K.C. Das", location: "Kolkata", famousDish: "Rosogolla", priceRange: "₹100–₹200", rating: 4.8, timings: "8 AM - 8 PM" },
                { name: "6 Ballygunge Place", location: "Kolkata", famousDish: "Thali", priceRange: "₹600–₹1000", rating: 4.7, timings: "12 PM - 10 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Chhau (Purulia)", type: "Folk", description: "Masked martial dance.", image: "https://placehold.co/600x400?text=Chhau" },
                    { name: "Gaudiya Nritya", type: "Classical", description: "Classical dance form of Bengal.", image: "https://placehold.co/600x400?text=Gaudiya" }
                ],
                music: [
                    { name: "Rabindra Sangeet", description: "Songs written by Rabindranath Tagore." },
                    { name: "Baul", description: "Mystic folk songs." }
                ],
                instruments: [
                    { name: "Ektara", description: "Drone instrument used by Bauls." },
                    { name: "Dotara", description: "String instrument." }
                ]
            },
            traditionalAttire: {
                men: { description: "Panjabi (Kurta) and Dhoti.", attire: [{ name: "Dhoti", description: "White cotton dhoti." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Saree draped in Bengali style (Athpourey).", attire: [{ name: "Tant Saree", description: "Crisp cotton saree." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Baluchari", description: "Silk saree with mythological scenes." }]
            },
            festivals: [
                { name: "Durga Puja", celebrationTime: "October", significance: "Victory of Good", description: "World's biggest street festival, UNESCO Intangible Heritage.", images: ["https://placehold.co/600x400?text=Durga+Puja"] },
                { name: "Pohela Boishakh", celebrationTime: "April", significance: "New Year", description: "Bengali New Year celebration.", images: ["https://placehold.co/600x400?text=New+Year"] }
            ],
            artAndHandicrafts: [
                { name: "Kalighat Painting", type: "Painting", description: "Bold watercolours originating from Kalighat temple.", famousFor: "Art", images: ["https://placehold.co/600x400?text=Kalighat"] },
                { name: "Dokra", type: "Metalwork", description: "Tribal metal craft.", famousFor: "Showpieces" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Annaprasana", description: "First rice feeding ceremony for babies." }],
                rituals: [{ title: "Sindoor Khela", description: "Women smear vermilion on each other on the last day of Durga Puja." }],
                dailyLife: "Revolves around markets and culture.",
                values: "Intellectualism."
            },
            culturalPlaces: [
                { name: "Victoria Memorial", type: "Monument", location: "Kolkata", description: "Grand marble building from British era.", image: "https://placehold.co/600x400?text=Victoria" },
                { name: "Sundarbans", type: "Nature", location: "Delta", description: "Largest mangrove forest and Tiger Reserve.", image: "https://placehold.co/600x400?text=Sundarbans" },
                { name: "Darjeeling", type: "Hill Station", location: "Himalayas", description: "Famous for Tea and Toy Train.", image: "https://placehold.co/600x400?text=Darjeeling" }
            ],
            extraSections: [
                { title: "Languages", content: "Bengali is the official language." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Kolkata Book Fair", location: "Kolkata", date: new Date("2026-01-30"), entryFee: "Free", image: "https://placehold.co/600x400?text=Book+Fair", audience: ["Reader"] }
                ],
                foodTrails: [
                    { name: "Park Street Food Walk", type: "Food Walk", description: "Colonial era restaurants.", priceRange: "₹800", duration: "2 Hours", audience: ["Foodie"] }
                ],
                workshops: [
                    { name: "Sholapith Craft", type: "Craft", duration: "2 Hours", price: "₹300", skillLevel: "Beginner", audience: ["Tourist"] }
                ],
                festivalCalendar: [
                    { name: "Durga Puja", priority: 1, date: new Date("2025-10-01"), significance: "Grandest Fest", images: ["https://placehold.co/600x400?text=Durga+Puja"], audience: ["Global"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: West Bengal seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
