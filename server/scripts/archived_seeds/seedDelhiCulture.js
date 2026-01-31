require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const fs = require('fs');
const log = (msg) => {
    console.log(msg);
    try { fs.appendFileSync('debug_delhi.txt', msg + '\\n'); } catch (e) { }
};

const seedCulture = async () => {
    try {
        await connectDB();
        log("Seeding Delhi...");

        const currentStates = await State.find({});
        log("Current States in DB: " + currentStates.map(s => s.name).join(", "));

        const stateName = "DELHI";
        const stateSlug = "delhi";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Delhi" }, { name: "New Delhi" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "The National Capital, a melting pot of history, culture, and power.",
                image: "https://placehold.co/600x400?text=Delhi+India+Gate",
                isActive: true
            });
        } else {
            state.name = stateName;
            state.slug = stateSlug;
            state.isActive = true;
            await state.save();
        }
        log("Using State ID: " + state._id);

        const data = {
            stateId: state._id,
            stateName: stateName,
            overview: {
                introduction: "Delhi is the heart of India, a city where the ancient and modern coexist. From the narrow lanes of Old Delhi to the colonial architecture of New Delhi, it offers a rich tapestry of experiences.",
                lifestyle: "Fast-paced, political, and historical. It is a true cosmopolitan city absorbing people from all over India.",
                traditions: "A mix of Hindu, Muslim, Sikh, and Christian traditions. 'Dilli Dil Walon Ki' (Delhi belongs to the large-hearted).",
                history: "Seat of many empires including the Pandavas (Indraprastha), Delhi Sultanate, Mughals, and British.",
                images: ["https://placehold.co/600x400?text=Delhi+Overview"]
            },
            cuisine: {
                description: "Mughlai, North Indian, and Street Food capital of India.",
                dishes: [
                    { name: "Butter Chicken", type: "Non-Veg", priceRange: "₹300–₹600", description: "Invented in Delhi at Moti Mahal.", image: "https://placehold.co/600x400?text=Butter+Chicken" },
                    { name: "Chole Bhature", type: "Veg", priceRange: "₹100–₹200", description: "Spicy chickpeas with fried bread.", image: "https://placehold.co/600x400?text=Chole+Bhature" },
                    { name: "Chaat", type: "Veg", priceRange: "₹50–₹150", description: "Papdi Chaat, Golgappa, Aloo Tikki.", image: "https://placehold.co/600x400?text=Chaat" }
                ]
            },
            foodShops: [
                { name: "Karim's", location: "Jama Masjid", famousDish: "Mutton Korma", priceRange: "₹400–₹800", rating: 4.8, timings: "9 AM - 11 PM" },
                { name: "Paranthe Wali Gali", location: "Chandni Chowk", famousDish: "Parathas", priceRange: "₹100–₹200", rating: 4.5, timings: "9 AM - 11 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Kathak", type: "Classical", description: "North Indian classical dance, flourished in Mughal courts.", image: "https://placehold.co/600x400?text=Kathak" }
                ],
                music: [
                    { name: "Qawwali", description: "Sufi devotional music performed at Nizamuddin Dargah." },
                    { name: "Hindustani Classical", description: "Delhi Gharana is a prominent style." }
                ],
                instruments: [
                    { name: "Tabla", description: "Percussion instrument." }
                ]
            },
            traditionalAttire: {
                men: { description: "Modern wear. Sherwani/Kurta on occasions.", attire: [{ name: "Sherwani", description: "Formal outfit." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Sarees, Salwar Kameez, and Western wear.", attire: [{ name: "Designer Wear", description: "Delhi is a fashion hub." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Khadi", description: "Handspun cotton." }]
            },
            festivals: [
                { name: "Diwali", celebrationTime: "October/November", significance: "Lights", description: "Celebrated with grand decorations and sweets.", images: ["https://placehold.co/600x400?text=Diwali"] },
                { name: "Republic Day", celebrationTime: "January 26", significance: "National", description: "Grand parade at Kartavya Path.", images: ["https://placehold.co/600x400?text=Republic+Day"] }
            ],
            artAndHandicrafts: [
                { name: "Zardozi", type: "Embroidery", description: "Gold metal embroidery.", famousFor: "Bridal Wear", images: ["https://placehold.co/600x400?text=Zardozi"] },
                { name: "Blue Pottery", type: "Craft", description: "Influence from nearby Rajasthan.", famousFor: "Decor" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Mehman Nawazi", description: "Mughal era etiquette of hospitality." }],
                rituals: [{ title: "Ramleela", description: "Dramatic enactment of Ramayana." }],
                dailyLife: "Fast metro life mixed with old city charm.",
                values: "Resilience."
            },
            culturalPlaces: [
                { name: "Red Fort", type: "Heritage", location: "Old Delhi", description: "Mughal fortress.", image: "https://placehold.co/600x400?text=Red+Fort" },
                { name: "Qutub Minar", type: "Heritage", location: "Mehrauli", description: "Tallest brick minaret.", image: "https://placehold.co/600x400?text=Qutub+Minar" },
                { name: "India Gate", type: "Monument", location: "New Delhi", description: "War memorial.", image: "https://placehold.co/600x400?text=India+Gate" }
            ],
            extraSections: [
                { title: "Languages", content: "Hindi is official. English, Punjabi, and Urdu are widely spoken." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Qutub Festival", location: "Qutub Minar", date: new Date("2025-11-15"), entryFee: "Free", image: "https://placehold.co/600x400?text=Qutub+Fest", audience: ["Music Lover"] }
                ],
                foodTrails: [
                    { name: "Old Delhi Food Walk", type: "Food Walk", description: "Kebabs and Parathas.", priceRange: "₹500", duration: "3 Hours", audience: ["Foodie"] }
                ],
                workshops: [
                    { name: "Pottery Workshop", type: "Craft", duration: "2 Hours", price: "₹600", skillLevel: "Beginner", audience: ["Tourist"] }
                ],
                festivalCalendar: [
                    { name: "Diwali", priority: 1, date: new Date("2025-10-20"), significance: "Lights", images: ["https://placehold.co/600x400?text=Diwali"], audience: ["Global"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        log("SUCCESS: Delhi seeded.");
        process.exit(0);
    } catch (error) {
        log("ERROR: " + error);
        process.exit(1);
    }
};

seedCulture();
