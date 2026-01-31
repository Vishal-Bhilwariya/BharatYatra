require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Himachal Pradesh...");

        const stateName = "HIMACHAL PRADESH";
        const stateSlug = "himachal-pradesh";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Himachal Pradesh" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "Dev Bhoomi (Land of Gods), known for its Himalayan landscapes, hill stations, and ancient temples.",
                image: "https://placehold.co/600x400?text=Himachal+State",
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
                introduction: "Himachal Pradesh is a mountainous state in northern India, renowned for its diverse geography ranging from the foothills of the Himalayas to the high-altitude Trans-Himalayan region. It is a haven for nature lovers and spiritual seekers.",
                lifestyle: "Life is simple and revolves around agriculture, horticulture (especially apples), and tourism. People are warm, hospitable, and deeply religious.",
                traditions: "The culture is a blend of Hindu and Tibetan influences. Every village has its own deity (Devta) who is consulted for major decisions.",
                history: "The region has been inhabited since the Indus Valley Civilization. It was ruled by local chieftains and later came under the British Raj, becoming a summer retreat.",
                images: ["https://placehold.co/600x400?text=Himachal+Overview"]
            },
            cuisine: {
                description: "Himachali cuisine is hearty and spicy, designed to keep one warm. Yogurt and lentils are staples.",
                dishes: [
                    { name: "Dham", type: "Veg", priceRange: "₹300–₹500", description: "A traditional festive meal served on leaf plates, consisting of rice, madra, and various dals.", image: "https://placehold.co/600x400?text=Dham" },
                    { name: "Siddu", type: "Veg", priceRange: "₹50–₹100", description: "Steamed wheat buns stuffed with poppy seeds or walnuts, served with ghee.", image: "https://placehold.co/600x400?text=Siddu" },
                    { name: "Madra", type: "Veg", priceRange: "₹150–₹250", description: "Chickpeas or kidney beans cooked in a thick yogurt-based gravy.", image: "https://placehold.co/600x400?text=Madra" }
                ]
            },
            foodShops: [
                { name: "Sitaram & Sons", location: "Shimla", famousDish: "Chana Bhatura", priceRange: "₹100–₹200", rating: 4.6, timings: "10 AM - 8 PM" },
                { name: "Wake & Bake", location: "Shimla", famousDish: "Waffles and Coffee", priceRange: "₹300–₹600", rating: 4.5, timings: "9 AM - 10 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Nati", type: "Folk", description: "The most famous dance of Himachal, listed in the Guinness Book of World Records for the largest participation.", image: "https://placehold.co/600x400?text=Nati" },
                    { name: "Kayang", type: "Folk", description: "A garland dance performed by the Kinnauris.", image: "https://placehold.co/600x400?text=Kayang" }
                ],
                music: [
                    { name: "Jhoori", description: "A popular form of folk song related to love and romance." },
                    { name: "Ainchali", description: "Religious songs sung during weddings." }
                ],
                instruments: [
                    { name: "Ransingha", description: "A curved trumpet made of copper or brass." },
                    { name: "Karnal", description: "A long straight trumpet used in processions." }
                ]
            },
            traditionalAttire: {
                men: { description: "Men wear a Kurta-Pajama with a waistcoat and the iconic Himachali Cap.", attire: [{ name: "Himachali Cap", description: "Woolen cap with a colorful band, design varies by region (Kinnauri vs Kulluvi)." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Women wear a Salwar-Kameez or a Ghagra-Choli with a headscarf (Dhattu).", attire: [{ name: "Pattu", description: "A traditional woolen shawl draped like a dress." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Kullu Shawl", description: "Famous for its geometric patterns and warm wool." }]
            },
            festivals: [
                { name: "Kullu Dussehra", celebrationTime: "October", significance: "Victory of Good over Evil", description: "Updates the week-long celebration involving the congregation of local deities.", images: ["https://placehold.co/600x400?text=Kullu+Dussehra"] },
                { name: "Mandi Shivaratri", celebrationTime: "February/March", significance: "Worship of Lord Shiva", description: "A grand fair where hundreds of deities are carried in palanquins.", images: ["https://placehold.co/600x400?text=Mandi+Shivaratri"] },
                { name: "Losar", celebrationTime: "February", significance: "Tibetan New Year", description: "Celebrated with gusto in the Lahaul-Spiti and Kinnaur regions.", images: ["https://placehold.co/600x400?text=Losar"] }
            ],
            artAndHandicrafts: [
                { name: "Kangra Painting", type: "Painting", description: "A style of Pahari painting known for its delicate lyrical quality.", famousFor: "Miniature Paintings", images: ["https://placehold.co/600x400?text=Kangra+Painting"] },
                { name: "Chamba Rumal", type: "Embroidery", description: "Double-sided embroidery on a handkerchief, depicting mythological scenes.", famousFor: "Handkerchiefs" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Dham Feasts", description: "Community feasts cooked by specialized chefs called 'Botis'." }],
                rituals: [{ title: "Deity Processions", description: "Taking the village god out for a tour is a common ritual." }],
                dailyLife: "Hardworking life in rugged terrain, with evenings spent around the Bukhari (heater).",
                values: "Deep reverence for nature and gods."
            },
            culturalPlaces: [
                { name: "Hidimba Devi Temple", type: "Religious Site", location: "Manali", description: "An ancient cave temple dedicated to Hidimba Devi, wife of Bhima.", image: "https://placehold.co/600x400?text=Hidimba+Temple" },
                { name: "Tabo Monastery", type: "Religious Site", location: "Spiti Valley", description: "One of the oldest operating Buddhist enclaves in the Himalayas, known as the 'Ajanta of the Himalayas'.", image: "https://placehold.co/600x400?text=Tabo+Monastery" },
                { name: "Kangra Fort", type: "History", location: "Kangra", description: "One of the oldest and largest forts in the Himalayas.", image: "https://placehold.co/600x400?text=Kangra+Fort" }
            ],
            extraSections: [
                { title: "Languages", content: "Hindi and Pahari are widely spoken. English is common in tourist areas." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Summer Festival", location: "Shimla", date: new Date("2025-06-01"), entryFee: "Free", image: "https://placehold.co/600x400?text=Summer+Fest", audience: ["Tourist"] }
                ],
                foodTrails: [
                    { name: "Old Manali Cafe Crawl", type: "Food Walk", description: "Explore the bohemian cafes of Old Manali.", priceRange: "₹800", duration: "3 Hours", audience: ["Youth"] }
                ],
                workshops: [
                    { name: "Kullu Shawl Weaving", type: "Craft", duration: "2 Hours", price: "₹500", skillLevel: "Beginner", audience: ["Tourist"] }
                ],
                festivalCalendar: [
                    { name: "Kullu Dussehra", priority: 1, date: new Date("2025-10-12"), significance: "Grand Assembly of Gods", images: ["https://placehold.co/600x400?text=Dussehra"], audience: ["Tourist", "Devotee"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: Himachal Pradesh seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
