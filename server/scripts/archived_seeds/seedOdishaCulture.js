require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Odisha...");

        const stateName = "ODISHA";
        const stateSlug = "odisha";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Odisha" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "The Soul of Incredible India, known for Jagannath Temple, Odissi dance, and beautiful coastline.",
                image: "https://placehold.co/600x400?text=Odisha+State",
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
                introduction: "Odisha (formerly Orissa) is a state on the eastern coast of India. It is famously known as the land of Lord Jagannath. It has a rich heritage of temple architecture and classical arts.",
                lifestyle: "Life is deeply religious and revolves around the temple traditions. The people are simple and artistic.",
                traditions: "The Jagannath culture (Jagannath Sanskruti) preaches universal brotherhood.",
                history: "Known as Kalinga in ancient times, the site of the war that changed Emperor Ashoka.",
                images: ["https://placehold.co/600x400?text=Odisha+Overview"]
            },
            cuisine: {
                description: "Less oily and less spicy but flavorful. Mustard oil is commonly used.",
                dishes: [
                    { name: "Pakhala Bhata", type: "Veg", priceRange: "₹50–₹100", description: "Fermented rice served with fried vegetables and fish.", image: "https://placehold.co/600x400?text=Pakhala" },
                    { name: "Dalma", type: "Veg", priceRange: "₹60–₹120", description: "Lentils cooked with vegetables.", image: "https://placehold.co/600x400?text=Dalma" },
                    { name: "Chhena Poda", type: "Sweet", priceRange: "₹100–₹200", description: "Roasted cheese cake, a unique dessert.", image: "https://placehold.co/600x400?text=Chhena+Poda" }
                ]
            },
            foodShops: [
                { name: "Dalma", location: "Bhubaneswar", famousDish: "Dalma", priceRange: "₹200–₹400", rating: 4.6, timings: "11 AM - 10 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Odissi", type: "Classical", description: "One of the oldest surviving dance forms of India, known for its Tribhangi posture.", image: "https://placehold.co/600x400?text=Odissi" },
                    { name: "Gotipua", type: "Folk", description: "Precursor to Odissi, performed by young boys dressed as women.", image: "https://placehold.co/600x400?text=Gotipua" }
                ],
                music: [
                    { name: "Odissi Music", description: "A distinct system of Indian classical music." }
                ],
                instruments: [
                    { name: "Mardala", description: "Percussion instrument used in Odissi." }
                ]
            },
            traditionalAttire: {
                men: { description: "Dhoti and Kurta/Gamucha.", attire: [{ name: "Sambalpuri Kurta", description: "Kurta with Ikat print." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Sarees with distinct weaves.", attire: [{ name: "Sambalpuri Saree", description: "Famous for Ikat (Tie and Dye)." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Kotpad", description: "Vegetable dyed fabric from Koraput." }]
            },
            festivals: [
                { name: "Rath Yatra", celebrationTime: "June/July", significance: "Chariot Festival", description: "The annual journey of Lord Jagannath, Balabhadra, and Subhadra to their aunt's temple.", images: ["https://placehold.co/600x400?text=Rath+Yatra"] },
                { name: "Raja Parba", celebrationTime: "June", significance: "Womanhood", description: "Festival celebrating menstruation and womanhood.", images: ["https://placehold.co/600x400?text=Raja"] }
            ],
            artAndHandicrafts: [
                { name: "Pattachitra", type: "Painting", description: "Cloth-based scroll painting.", famousFor: "Paintings", images: ["https://placehold.co/600x400?text=Pattachitra"] },
                { name: "Silver Filigree", type: "Jewelry", description: "Fine silver wire work from Cuttack.", famousFor: "Jewelry" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Mahaprasad", description: "The holy food offered to Lord Jagannath." }],
                rituals: [{ title: "Boita Bandana", description: "Boat festival remembering maritime history." }],
                dailyLife: "Arts and spirituality are intertwined.",
                values: "Simplicity and devotion."
            },
            culturalPlaces: [
                { name: "Jagannath Temple", type: "Religious", location: "Puri", description: "One of the Char Dhams.", image: "https://placehold.co/600x400?text=Jagannath+Temple" },
                { name: "Konark Sun Temple", type: "Heritage", location: "Konark", description: "Architectural marvel shaped like a chariot.", image: "https://placehold.co/600x400?text=Konark" },
                { name: "Chillika Lake", type: "Nature", location: "Chillika", description: "Largest coastal lagoon in India.", image: "https://placehold.co/600x400?text=Chillika" }
            ],
            extraSections: [
                { title: "Languages", content: "Odia is the official language." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Konark Dance Festival", location: "Konark", date: new Date("2025-12-01"), entryFee: "₹500", image: "https://placehold.co/600x400?text=Dance+Fest", audience: ["Art Lover"] }
                ],
                foodTrails: [
                    { name: "Puri Street Food", type: "Food Walk", description: "Try Khaja and Abadha.", priceRange: "₹200", duration: "1 Hour", audience: ["Foodie"] }
                ],
                workshops: [
                    { name: "Pattachitra Painting", type: "Art", duration: "3 Hours", price: "₹600", skillLevel: "Beginner", audience: ["Tourist"] }
                ],
                festivalCalendar: [
                    { name: "Rath Yatra", priority: 1, date: new Date("2025-06-27"), significance: "Chariot", images: ["https://placehold.co/600x400?text=Rath+Yatra"], audience: ["Global"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: Odisha seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
