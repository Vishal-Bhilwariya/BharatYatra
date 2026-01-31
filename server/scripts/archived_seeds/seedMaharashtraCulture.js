require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Maharashtra...");

        const stateName = "MAHARASHTRA";
        const stateSlug = "maharashtra";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Maharashtra" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "Land of the Great King (Shivaji), a powerhouse of economy, cinema, and culture.",
                image: "https://placehold.co/600x400?text=Maharashtra+State",
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
                introduction: "Maharashtra is India's economic powerhouse, home to Mumbai (Bollywood) and ancient heritage sites like Ajanta and Ellora. It is the land of Chhatrapati Shivaji Maharaj.",
                lifestyle: "Fast-paced in Mumbai, relaxed in Konkan, and traditional in Pune/Nashik. 'Resilience' is the hallmark of its people.",
                traditions: "Ganesh Chaturthi is the biggest festival. Warkari tradition (pilgrimage to Pandharpur) is significant.",
                history: "Dominated by the Maratha Empire which challenged the Mughals.",
                images: ["https://placehold.co/600x400?text=Maharashtra+Overview"]
            },
            cuisine: {
                description: "Varies from mild Puneri food to spicy Kolhapuri and seafood-rich Konkani food.",
                dishes: [
                    { name: "Vada Pav", type: "Veg", priceRange: "₹15–₹30", description: "The Indian Burger.", image: "https://placehold.co/600x400?text=Vada+Pav" },
                    { name: "Misal Pav", type: "Veg", priceRange: "₹60–₹100", description: "Spicy sprout curry served with bread.", image: "https://placehold.co/600x400?text=Misal" },
                    { name: "Puran Poli", type: "Sweet", priceRange: "₹50–₹100", description: "Sweet flatbread stuffed with lentil and jaggery.", image: "https://placehold.co/600x400?text=Puran+Poli" }
                ]
            },
            foodShops: [
                { name: "Ashok Vada Pav", location: "Mumbai", famousDish: "Vada Pav", priceRange: "₹30", rating: 4.8, timings: "11 AM - 9 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Lavani", type: "Folk", description: "A high-energy dance performed to the beats of Dholki.", image: "https://placehold.co/600x400?text=Lavani" },
                    { name: "Koli Dance", type: "Folk", description: "Dance of the fishermen community.", image: "https://placehold.co/600x400?text=Koli" }
                ],
                music: [
                    { name: "Natya Sangeet", description: "Semi-classical music used in Marathi theatre." }
                ],
                instruments: [
                    { name: "Dholki", description: "Percussion instrument." },
                    { name: "Tutari", description: "Curved trumpet." }
                ]
            },
            traditionalAttire: {
                men: { description: "Dhoti and Kurta with Pheta (Turban).", attire: [{ name: "Pheta", description: "Traditional Turban." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Nauvari (Nine-yard) Saree worn trouser-style.", attire: [{ name: "Paithani", description: "Silk saree with peacock motifs." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Himroo", description: "Fabric from Aurangabad using silk and cotton." }]
            },
            festivals: [
                { name: "Ganesh Chaturthi", celebrationTime: "August/September", significance: "Birth of Ganesha", description: "10-day festival with massive processions.", images: ["https://placehold.co/600x400?text=Ganesh+Chaturthi"] },
                { name: "Gudi Padwa", celebrationTime: "March/April", significance: "Marathi New Year", description: "Celebrated by hoisting a Gudi flag.", images: ["https://placehold.co/600x400?text=Gudi+Padwa"] }
            ],
            artAndHandicrafts: [
                { name: "Warli Painting", type: "Painting", description: "Tribal art using white pigment on mud walls.", famousFor: "Decor", images: ["https://placehold.co/600x400?text=Warli"] },
                { name: "Kolhapuri Chappals", type: "Footwear", description: "Handcrafted leather slippers.", famousFor: "Footwear" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Oti Bharne", description: "Ritual of offering blouse piece and coconut to married women." }],
                rituals: [{ title: "Mangala Gauri", description: "Worship by newly married women." }],
                dailyLife: "Mumbai local trains define the pace of life for millions.",
                values: "Hard work and regional pride."
            },
            culturalPlaces: [
                { name: "Ajanta & Ellora Caves", type: "Site", location: "Aurangabad", description: "Rock-cut caves featuring Buddhist, Hindu, and Jain art.", image: "https://placehold.co/600x400?text=Ajanta" },
                { name: "Gateway of India", type: "Monument", location: "Mumbai", description: "Arch-monument built in the 20th century.", image: "https://placehold.co/600x400?text=Gateway" },
                { name: "Shaniwar Wada", type: "Fort", location: "Pune", description: "Seat of the Peshwas.", image: "https://placehold.co/600x400?text=Shaniwar+Wada" }
            ],
            extraSections: [
                { title: "Languages", content: "Marathi is the official language." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Kala Ghoda Arts Festival", location: "Mumbai", date: new Date("2025-02-01"), entryFee: "Free", image: "https://placehold.co/600x400?text=Kala+Ghoda", audience: ["Artist"] }
                ],
                foodTrails: [
                    { name: "Dadart Street Food", type: "Food Walk", description: "Authentic Maharashtrian snacks.", priceRange: "₹200", duration: "2 Hours", audience: ["Foodie"] }
                ],
                workshops: [
                    { name: "Warli Art Class", type: "Art", duration: "2 Hours", price: "₹500", skillLevel: "Beginner", audience: ["Tourist"] }
                ],
                festivalCalendar: [
                    { name: "Ganesh Chaturthi", priority: 1, date: new Date("2025-08-27"), significance: "Ganesh Festival", images: ["https://placehold.co/600x400?text=Ganesh"], audience: ["Global"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: Maharashtra seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
