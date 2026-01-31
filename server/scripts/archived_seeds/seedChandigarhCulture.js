require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Chandigarh...");

        const stateName = "CHANDIGARH";
        const stateSlug = "chandigarh";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Chandigarh" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "The City Beautiful, a union territory that serves as the capital of Punjab and Haryana.",
                image: "https://placehold.co/600x400?text=Chandigarh+City",
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
                introduction: "Chandigarh is India's first planned city, designed by the Swiss-French architect Le Corbusier. It is known for its urban design, architecture, and high quality of life.",
                lifestyle: "Modern, organized, and affluent. The city has a strong culture of morning walks and sports.",
                traditions: "A cosmopolitan blend of Punjabi and Haryanvi traditions.",
                history: "Built post-independence to replace Lahore as the capital of Punjab.",
                images: ["https://placehold.co/600x400?text=Chandigarh+Overview"]
            },
            cuisine: {
                description: "North Indian cuisine dominates. Known for its Dhabas and fine dining.",
                dishes: [
                    { name: "Butter Chicken", type: "Non-Veg", priceRange: "₹300–₹500", description: "Creamy chicken curry.", image: "https://placehold.co/600x400?text=Butter+Chicken" },
                    { name: "Amritsari Kulcha", type: "Veg", priceRange: "₹150–₹250", description: "Stuffed bread.", image: "https://placehold.co/600x400?text=Kulcha" },
                    { name: "Lassi", type: "Beverage", priceRange: "₹60–₹120", description: "Yogurt drink.", image: "https://placehold.co/600x400?text=Lassi" }
                ]
            },
            foodShops: [
                { name: "Pal Dhaba", location: "Sector 28", famousDish: "Chicken Curry", priceRange: "₹400–₹800", rating: 4.6, timings: "11 AM - 11 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Bhangra", type: "Folk", description: "High energy Punjabi dance.", image: "https://placehold.co/600x400?text=Bhangra" },
                    { name: "Giddha", type: "Folk", description: "Women's folk dance.", image: "https://placehold.co/600x400?text=Giddha" }
                ],
                music: [
                    { name: "Punjabi Pop", description: "The city is a hub for the Punjabi music industry." }
                ],
                instruments: [
                    { name: "Dhol", description: "Drum." }
                ]
            },
            traditionalAttire: {
                men: { description: "Western wear is common. Kurta Pajama on festivals.", attire: [{ name: "Kurta Pajama", description: "Traditional wear." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Salwar Kameez and Western wear.", attire: [{ name: "Patiala Suit", description: "Popular regional attire." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Phulkari", description: "Embroidery from Punjab." }]
            },
            festivals: [
                { name: "Rose Festival", celebrationTime: "February", significance: "Nature", description: "Celebrated at the Zakir Hussain Rose Garden.", images: ["https://placehold.co/600x400?text=Rose+Fest"] },
                { name: "Baisakhi", celebrationTime: "April", significance: "Harvest", description: "Celebrated with great fervor.", images: ["https://placehold.co/600x400?text=Baisakhi"] }
            ],
            artAndHandicrafts: [
                { name: "Rock Garden Art", type: "Sculpture", description: "Art made from industrial and home waste.", famousFor: "Recycled Art", images: ["https://placehold.co/600x400?text=Rock+Garden"] }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Geri Route", description: "A unique youth culture of driving through specific sectors." }],
                rituals: [{ title: "Lohri", description: "Bonfire festival." }],
                dailyLife: "Highly urbanized.",
                values: "Cleanliness and Order."
            },
            culturalPlaces: [
                { name: "Rock Garden", type: "Art", location: "Sector 1", description: "Sculpture garden by Nek Chand.", image: "https://placehold.co/600x400?text=Rock+Garden" },
                { name: "Sukhna Lake", type: "Nature", location: "Sector 1", description: "Man-made reservoir.", image: "https://placehold.co/600x400?text=Sukhna+Lake" },
                { name: "Capitol Complex", type: "Heritage", location: "Sector 1", description: "UNESCO World Heritage Site.", image: "https://placehold.co/600x400?text=Capitol" }
            ],
            extraSections: [
                { title: "Languages", content: "Hindi, Punjabi, and English." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Rose Festival", location: "Rose Garden", date: new Date("2025-02-20"), entryFee: "Free", image: "https://placehold.co/600x400?text=Rose+Fest", audience: ["Family"] }
                ],
                foodTrails: [
                    { name: "Sector 17 Food Walk", type: "Food Walk", description: "Street food and cafes.", priceRange: "₹300", duration: "2 Hours", audience: ["Foodie"] }
                ],
                workshops: [
                    { name: "Architecture Tour", type: "Educational", duration: "3 Hours", price: "₹500", skillLevel: "All", audience: ["Student"] }
                ],
                festivalCalendar: [
                    { name: "Rose Festival", priority: 1, date: new Date("2025-02-22"), significance: "Nature", images: ["https://placehold.co/600x400?text=Rose+Fest"], audience: ["Tourist"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: Chandigarh seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
