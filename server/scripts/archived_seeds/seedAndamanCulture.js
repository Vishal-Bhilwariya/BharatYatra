require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Andaman and Nicobar Islands...");

        const stateName = "ANDAMAN AND NICOBAR ISLANDS";
        const stateSlug = "andaman-and-nicobar-islands";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "Tropical paradise known for its pristine beaches and colonial history.",
                image: "https://placehold.co/600x400?text=Andaman+Islands",
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
                introduction: "The Andaman and Nicobar Islands are a group of 572 islands at the juncture of the Bay of Bengal and the Andaman Sea. They are known for their palm-lined, white-sand beaches, mangroves, and tropical rainforests.",
                lifestyle: "Laid-back island life. A melting pot of Bengali, Tamil, Telugu, and indigenous tribal cultures.",
                traditions: "The indigenous tribes (Jarawa, Sentinelese, Onge) have maintained their primitive lifestyle for thousands of years.",
                history: "Home to the infamous Cellular Jail (Kaala Paani) used by the British to exile freedom fighters.",
                images: ["https://placehold.co/600x400?text=Andaman+Overview"]
            },
            cuisine: {
                description: "Seafood is the staple. Coconut is widely used.",
                dishes: [
                    { name: "Fish Curry", type: "Non-Veg", priceRange: "₹200–₹400", description: "Fresh catch cooked in spicy coconut gravy.", image: "https://placehold.co/600x400?text=Fish+Curry" },
                    { name: "Chilled Coconut Water", type: "Beverage", priceRange: "₹30–₹50", description: "Fresh from the tree.", image: "https://placehold.co/600x400?text=Coconut" },
                    { name: "Lobster Thermidor", type: "Non-Veg", priceRange: "₹800–₹1500", description: "Luxury seafood dish available in resorts.", image: "https://placehold.co/600x400?text=Lobster" }
                ]
            },
            foodShops: [
                { name: "New Lighthouse Restaurant", location: "Port Blair", famousDish: "Grilled Fish", priceRange: "₹400–₹800", rating: 4.4, timings: "11 AM - 10 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Nicobarese Dance", type: "Tribal", description: "Performed by the Nicobarese tribe during the Pig Festival.", image: "https://placehold.co/600x400?text=Nicobar+Dance" }
                ],
                music: [
                    { name: "Tribal Chants", description: "Rhythmic chanting accompanying dances." }
                ],
                instruments: [
                    { name: "Dudnu", description: "Classical drum." }
                ]
            },
            traditionalAttire: {
                men: { description: "Modern casual wear. Tribes wear leaf/bark clothing.", attire: [{ name: "Shorts/Cotton", description: "Due to humid climate." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Sarees or Salwar Kameez.", attire: [{ name: "Cotton Saree", description: "Preferred daily wear." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Shell Craft", description: "Accessories made of sea shells." }]
            },
            festivals: [
                { name: "Island Tourism Festival", celebrationTime: "January", significance: "Culture", description: "10-day festival showcasing dance, drama, and music.", images: ["https://placehold.co/600x400?text=Island+Fest"] },
                { name: "Beach Festival", celebrationTime: "April", significance: "Recreation", description: "Water sports and sand art.", images: ["https://placehold.co/600x400?text=Beach+Fest"] }
            ],
            artAndHandicrafts: [
                { name: "Shell Craft", type: "Handicraft", description: "Jewelry and decor made from sea shells.", famousFor: "Souvenirs", images: ["https://placehold.co/600x400?text=Shells"] },
                { name: "Wood Carving", type: "Craft", description: "Items made from local timber (Padauk).", famousFor: "Decor" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Tribal Isolation", description: "Respecting the 'Eyes Only' policy for indigenous tribes." }],
                rituals: [{ title: "Ossuary Feast", description: "Nicobarese ritual honoring ancestors." }],
                dailyLife: "Revolves around the sea and tourism.",
                values: "Harmony with nature."
            },
            culturalPlaces: [
                { name: "Cellular Jail", type: "History", location: "Port Blair", description: "National Memorial.", image: "https://placehold.co/600x400?text=Cellular+Jail" },
                { name: "Radhanagar Beach", type: "Nature", location: "Havelock", description: "One of Asia's best beaches.", image: "https://placehold.co/600x400?text=Radhanagar" },
                { name: "Ross Island", type: "History", location: "Near Port Blair", description: "Ruins of British administrative headoffice.", image: "https://placehold.co/600x400?text=Ross+Island" }
            ],
            extraSections: [
                { title: "Languages", content: "Bengali, Hindi, Tamil, Telugu, Malayalam, and Nicobarese." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Light and Sound Show", location: "Cellular Jail", date: new Date("2025-01-01"), entryFee: "₹50", image: "https://placehold.co/600x400?text=Light+Show", audience: ["Tourist"] }
                ],
                foodTrails: [
                    { name: "Aberdeen Bazaar Food Walk", type: "Food Walk", description: "Local street eats.", priceRange: "₹200", duration: "1 Hour", audience: ["Foodie"] }
                ],
                workshops: [
                    { name: "Scuba Diving", type: "Adventure", duration: "4 Hours", price: "₹3500", skillLevel: "Beginner", audience: ["Tourist"] }
                ],
                festivalCalendar: [
                    { name: "Island Tourism Festival", priority: 1, date: new Date("2025-01-05"), significance: "Culture", images: ["https://placehold.co/600x400?text=Island+Fest"], audience: ["Global"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: Andaman and Nicobar seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
