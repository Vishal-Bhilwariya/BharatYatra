require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Kerala...");

        const stateName = "KERALA";
        const stateSlug = "kerala";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Kerala" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "God's Own Country, famous for its backwaters, Ayurveda, and high literacy.",
                image: "https://placehold.co/600x400?text=Kerala+State",
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
                introduction: "Kerala, situated on the tropical Malabar Coast, is known as God's Own Country. It boasts palm-lined beaches, intricate backwaters, and a network of canals. It is a leader in social development indices.",
                lifestyle: "The lifestyle is laid-back yet politically active. High literacy leads to a well-informed society. Ayurveda is a way of life.",
                traditions: "Kerala has a matrilineal heritage (Marumakkathayam) in some communities. The culture is a synthesis of Aryan and Dravidian cultures.",
                history: "A major spice trade center for millennia, attracting traders from Babylon, Rome, and China.",
                images: ["https://placehold.co/600x400?text=Kerala+Overview"]
            },
            cuisine: {
                description: "Characterized by the use of coconut, rice, tapioca, and spices like black pepper and cardamom.",
                dishes: [
                    { name: "Puttu and Kadala Curry", type: "Veg", priceRange: "₹50–₹100", description: "Steamed rice cake served with black chickpea curry.", image: "https://placehold.co/600x400?text=Puttu" },
                    { name: "Karimeen Pollichathu", type: "Non-Veg", priceRange: "₹300–₹500", description: "Pearl spot fish marinated in spices and baked in a banana leaf.", image: "https://placehold.co/600x400?text=Karimeen" },
                    { name: "Sadya", type: "Veg", priceRange: "₹200–₹400", description: "A vegetarian feast served on a banana leaf with up to 28 dishes.", image: "https://placehold.co/600x400?text=Sadya" }
                ]
            },
            foodShops: [
                { name: "Paragon Restaurant", location: "Kozhikode", famousDish: "Biryani", priceRange: "₹200–₹400", rating: 4.9, timings: "11 AM - 11 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Kathakali", type: "Classical", description: "A stylized classical dance-drama known for its attractive make-up of characters and elaborate costumes.", image: "https://placehold.co/600x400?text=Kathakali" },
                    { name: "Mohiniyattam", type: "Classical", description: "Dance of the Enchantress, performed by women, known for graceful movements.", image: "https://placehold.co/600x400?text=Mohiniyattam" }
                ],
                music: [
                    { name: "Sopana Sangeetham", description: "Classical music sung by the side of the holy steps leading to the sanctum sanctorum." }
                ],
                instruments: [
                    { name: "Chenda", description: "Cylindrical percussion instrument used in Kathakali and temple festivals." }
                ]
            },
            traditionalAttire: {
                men: { description: "Mundu is the traditional garment, a white cloth worn around the waist.", attire: [{ name: "Mundu", description: "Traditional sarong/dhoti." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Settu Mundu (Mundum Neriyathum) is the traditional clothing.", attire: [{ name: "Kasavu Saree", description: "White saree with golden border." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Balaramapuram Cotton", description: "Famous for its fine weave and gold zari work." }]
            },
            festivals: [
                { name: "Onam", celebrationTime: "August/September", significance: "Harvest Festival", description: "Celebrates the return of King Mahabali. Features the Snake Boat Race (Vallam Kali).", images: ["https://placehold.co/600x400?text=Onam"] },
                { name: "Thrissur Pooram", celebrationTime: "April/May", significance: "Temple Festival", description: "The mother of all festivals, famous for its elephant procession and fireworks.", images: ["https://placehold.co/600x400?text=Thrissur+Pooram"] }
            ],
            artAndHandicrafts: [
                { name: "Mural Painting", type: "Painting", description: "Frescoes depicting mythology found on temple walls.", famousFor: "Temple Art", images: ["https://placehold.co/600x400?text=Mural"] },
                { name: "Coir Products", type: "Handicraft", description: "Mats and crafts made from coconut fiber.", famousFor: "Mats" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Kalaripayattu", description: "One of the oldest fighting systems in existence." }],
                rituals: [{ title: "Theyyam", description: "A ritual form of worship where a man enacts a deity." }],
                dailyLife: "Centered around village gatherings, reading newspapers, and political discussions.",
                values: "Secularism, cleanliness, and education."
            },
            culturalPlaces: [
                { name: "Padmanabhaswamy Temple", type: "Religious Site", location: "Thiruvananthapuram", description: "The richest temple in the world.", image: "https://placehold.co/600x400?text=Padmanabhaswamy" },
                { name: "Alleppey Backwaters", type: "Nature", location: "Alappuzha", description: "Famous for houseboat cruises.", image: "https://placehold.co/600x400?text=Backwaters" },
                { name: "Fort Kochi", type: "History", location: "Kochi", description: "Known for Chinese fishing nets and colonial bungalows.", image: "https://placehold.co/600x400?text=Fort+Kochi" }
            ],
            extraSections: [
                { title: "Languages", content: "Malayalam is the official language." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Kochi-Muziris Biennale", location: "Kochi", date: new Date("2025-12-12"), entryFee: "₹100", image: "https://placehold.co/600x400?text=Biennale", audience: ["Artist"] }
                ],
                foodTrails: [
                    { name: "Kochi Spice Market Tour", type: "Food Walk", description: "Visit the spice markets.", priceRange: "₹500", duration: "2 Hours", audience: ["Tourist"] }
                ],
                workshops: [
                    { name: "Kathakali Makeup Workshop", type: "Art", duration: "4 Hours", price: "₹1000", skillLevel: "Beginner", audience: ["Tourist"] }
                ],
                festivalCalendar: [
                    { name: "Onam", priority: 1, date: new Date("2025-08-27"), significance: "Harvest", images: ["https://placehold.co/600x400?text=Onam"], audience: ["Family"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: Kerala seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
