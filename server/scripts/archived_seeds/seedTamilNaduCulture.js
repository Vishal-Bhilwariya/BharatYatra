require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Tamil Nadu...");

        const stateName = "TAMIL NADU";
        const stateSlug = "tamil-nadu";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Tamil Nadu" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "Land of Temples, Classical Culture, and Dravidian Heritage.",
                image: "https://placehold.co/600x400?text=Tamil+Nadu+State",
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
                introduction: "Tamil Nadu is the custodian of the Dravidian culture. It is famous for its towering temples, classical music, dance, and literature which dates back over 2000 years.",
                lifestyle: "Deeply rooted in tradition yet modern. Education and technology are highly valued.",
                traditions: "Kolam (rangoli) at doorsteps, filter coffee, and silk sarees are daily essentials.",
                history: "Ruled by the Cholas, Pandyas, and Pallavas who were great patrons of art and architecture.",
                images: ["https://placehold.co/600x400?text=Tamil+Nadu+Overview"]
            },
            cuisine: {
                description: "Rice-based, spicy, and tangy. Chettinad cuisine is world-famous.",
                dishes: [
                    { name: "Idli Sambar", type: "Veg", priceRange: "₹30–₹60", description: "Steamed rice cakes with lentil stew.", image: "https://placehold.co/600x400?text=Idli" },
                    { name: "Dosa", type: "Veg", priceRange: "₹50–₹100", description: "Crispy savory crepe.", image: "https://placehold.co/600x400?text=Dosa" },
                    { name: "Chettinad Chicken", type: "Non-Veg", priceRange: "₹250–₹400", description: "Spicy chicken curry with roasted spices.", image: "https://placehold.co/600x400?text=Chettinad+Chicken" }
                ]
            },
            foodShops: [
                { name: "Murugan Idli Shop", location: "Madurai/Chennai", famousDish: "Idli", priceRange: "₹100–₹200", rating: 4.8, timings: "7 AM - 11 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Bharatanatyam", type: "Classical", description: "Major classical dance form known for fixed upper torso, bent legs, and spectacular footwork.", image: "https://placehold.co/600x400?text=Bharatanatyam" },
                    { name: "Karakattam", type: "Folk", description: "Pot dance.", image: "https://placehold.co/600x400?text=Karakattam" }
                ],
                music: [
                    { name: "Carnatic Music", description: "One of two main subgenres of Indian classical music that evolved here." }
                ],
                instruments: [
                    { name: "Nadaswaram", description: "Wind instrument played at weddings." },
                    { name: "Mridangam", description: "Percussion instrument." }
                ]
            },
            traditionalAttire: {
                men: { description: "Vesti (Dhoti) and Angavastram.", attire: [{ name: "Pattu Vesti", description: "Silk Dhoti." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Kanjeevaram Silk Saree.", attire: [{ name: "Kanjeevaram", description: "Heavy silk saree with zari." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Kanchipuram Silk", description: "Queen of Silks." }]
            },
            festivals: [
                { name: "Pongal", celebrationTime: "January", significance: "Harvest", description: "A four-day harvest festival giving thanks to nature.", images: ["https://placehold.co/600x400?text=Pongal"] },
                { name: "Karthigai Deepam", celebrationTime: "November/December", significance: "Lights", description: "Festival of lights.", images: ["https://placehold.co/600x400?text=Deepam"] }
            ],
            artAndHandicrafts: [
                { name: "Tanjore Painting", type: "Painting", description: "Classical painting style with gold foil.", famousFor: "Religious Art", images: ["https://placehold.co/600x400?text=Tanjore"] },
                { name: "Bronze Casting", type: "Sculpture", description: "Chola bronze statues.", famousFor: "Statues" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Kolam", description: "Geometric drawing with rice flour at the entrance of homes." }],
                rituals: [{ title: "Arangetram", description: "Debut stage performance of a classical dancer." }],
                dailyLife: "Early risers, temple visits, and filter coffee."
            },
            culturalPlaces: [
                { name: "Meenakshi Temple", type: "Religious", location: "Madurai", description: "Historic Hindu temple.", image: "https://placehold.co/600x400?text=Meenakshi" },
                { name: "Brihadeeswarar Temple", type: "Heritage", location: "Thanjavur", description: "UNESCO site built by Cholas.", image: "https://placehold.co/600x400?text=Big+Temple" },
                { name: "Mahabalipuram", type: "Heritage", location: "Mamallapuram", description: "Group of monuments.", image: "https://placehold.co/600x400?text=Mahabalipuram" }
            ],
            extraSections: [
                { title: "Languages", content: "Tamil is the official language, one of the oldest classical languages." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Chennai Music Season", location: "Chennai", date: new Date("2025-12-15"), entryFee: "Varies", image: "https://placehold.co/600x400?text=Music+Season", audience: ["Music Lover"] }
                ],
                foodTrails: [
                    { name: "Mylapore Food Walk", type: "Food Walk", description: "Traditional mess food.", priceRange: "₹300", duration: "2 Hours", audience: ["Foodie"] }
                ],
                workshops: [
                    { name: "Kolam Workshop", type: "Art", duration: "2 Hours", price: "₹300", skillLevel: "Beginner", audience: ["Tourist"] }
                ],
                festivalCalendar: [
                    { name: "Pongal", priority: 1, date: new Date("2025-01-14"), significance: "Harvest", images: ["https://placehold.co/600x400?text=Pongal"], audience: ["Family"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: Tamil Nadu seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
