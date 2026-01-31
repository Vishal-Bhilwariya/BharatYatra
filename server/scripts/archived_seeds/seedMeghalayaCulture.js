require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Meghalaya...");

        const stateName = "MEGHALAYA";
        const stateSlug = "meghalaya";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Meghalaya" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "The Abode of Clouds, known for its rainfall, root bridges, and matrilineal society.",
                image: "https://placehold.co/600x400?text=Meghalaya+State",
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
                introduction: "Meghalaya separates the Assam valley from the plains of Bangladesh. It is one of the wettest places on earth and is home to the Khasi, Jaintia, and Garo tribes.",
                lifestyle: "Famous for its matrilineal system where lineage is traced through the mother. Music is in the air here, with Shillong often called the 'Rock Capital of India'.",
                traditions: "Respect for nature is paramount, visible in their Sacred Groves.",
                history: "Formed as a separate state in 1972, carved out of Assam.",
                images: ["https://placehold.co/600x400?text=Meghalaya+Overview"]
            },
            cuisine: {
                description: "Rice and meat centric. Pork is a staple.",
                dishes: [
                    { name: "Jadoh", type: "Non-Veg", priceRange: "₹100–₹200", description: "Rice cooked with meat stock and pork.", image: "https://placehold.co/600x400?text=Jadoh" },
                    { name: "Doh Khleh", type: "Non-Veg", priceRange: "₹100–₹150", description: "Pork salad garnished with onions and chilies.", image: "https://placehold.co/600x400?text=Doh+Khleh" },
                    { name: "Pumaloi", type: "Veg", priceRange: "₹40–₹80", description: "Steamed rice cakes.", image: "https://placehold.co/600x400?text=Pumaloi" }
                ]
            },
            foodShops: [
                { name: "Trattoria", location: "Shillong", famousDish: "Jadoh", priceRange: "₹200–₹400", rating: 4.7, timings: "12 PM - 9 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Nongkrem Dance", type: "Ritual", description: "Performed by the Khasis to appease the Goddess Ka Blei Synshar.", image: "https://placehold.co/600x400?text=Nongkrem" },
                    { name: "Wangala", type: "Harvest", description: "The 100 Drums Festival of the Garos.", image: "https://placehold.co/600x400?text=Wangala" }
                ],
                music: [
                    { name: "Folk Songs", description: "Praises of nature and ancestors." }
                ],
                instruments: [
                    { name: "Duitara", description: "String instrument." }
                ]
            },
            traditionalAttire: {
                men: { description: "Jymphong (Sleeveless coat).", attire: [{ name: "Jymphong", description: "Traditional coat." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Jainsem (Khasi dress).", attire: [{ name: "Jainsem", description: "Two pieces of cloth pinned at the shoulders." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Eri Silk", description: "Ahimsa Silk (processed without killing the moth)." }]
            },
            festivals: [
                { name: "Wangala Festival", celebrationTime: "November", significance: "Harvest", description: "Thanksgiving to Misi Saljong (Sun God).", images: ["https://placehold.co/600x400?text=Wangala"] },
                { name: "Shad Suk Mynsiem", celebrationTime: "April", significance: "Thanksgiving", description: "Dance of Happy Hearts.", images: ["https://placehold.co/600x400?text=Shad+Suk"] }
            ],
            artAndHandicrafts: [
                { name: "Cane and Bamboo", type: "Craft", description: "Intricate baskets and mats.", famousFor: "Furniture", images: ["https://placehold.co/600x400?text=Bamboo+Craft"] }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Matriliny", description: "The youngest daughter (Khadduh) inherits the property." }],
                rituals: [{ title: "Naming Ceremony", description: "Giving a name is a significant event involving divination." }],
                dailyLife: "Market days (Iewduh) are central to social life.",
                values: "Cleanliness (Mawlynnong is the cleanest village in Asia)."
            },
            culturalPlaces: [
                { name: "Living Root Bridges", type: "Nature", location: "Cherrapunji", description: "Bio-engineering marvels made from Ficus elastica roots.", image: "https://placehold.co/600x400?text=Root+Bridge" },
                { name: "Double Decker Bridge", type: "Nature", location: "Nongriat", description: "A unique two-tier root bridge.", image: "https://placehold.co/600x400?text=Double+Decker" },
                { name: "Mawlynnong", type: "Village", location: "East Khasi Hills", description: "Cleanest village in Asia.", image: "https://placehold.co/600x400?text=Mawlynnong" }
            ],
            extraSections: [
                { title: "Languages", content: "Khasi, Garo, and Pnar are main languages. English is official." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "NH7 Weekender", location: "Shillong", date: new Date("2025-10-25"), entryFee: "₹2000", image: "https://placehold.co/600x400?text=NH7", audience: ["Youth"] }
                ],
                foodTrails: [
                    { name: "Shillong Cafe Hopping", type: "Food Walk", description: "Experience the Dylan's Cafe and others.", priceRange: "₹800", duration: "3 Hours", audience: ["Youth"] }
                ],
                workshops: [
                    { name: "Bamboo Crafting", type: "Craft", duration: "2 Hours", price: "₹400", skillLevel: "Beginner", audience: ["Tourist"] }
                ],
                festivalCalendar: [
                    { name: "Cherry Blossom Festival", priority: 1, date: new Date("2025-11-15"), significance: "Nature", images: ["https://placehold.co/600x400?text=Cherry+Blossom"], audience: ["Tourist"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: Meghalaya seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
