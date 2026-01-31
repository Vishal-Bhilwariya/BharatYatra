require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Lakshadweep...");

        const stateName = "LAKSHADWEEP";
        const stateSlug = "lakshadweep";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Lakshadweep" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "A tropical archipelago of coral atolls, known for its sun-kissed beaches.",
                image: "https://placehold.co/600x400?text=Lakshadweep+Islands",
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
                introduction: "Lakshadweep, meaning 'One Hundred Thousand Islands', is India's smallest Union Territory. It is famous for its coral reefs and pristine blue waters.",
                lifestyle: "Simple, island-based life. Fishing and coconut cultivation are main occupations.",
                traditions: "Matrilineal society similar to Kerala's Marumakkathayam system. Islamic traditions are followed.",
                history: "Ruled by local chieftains (Arakkal), then Tipu Sultan, and later the British.",
                images: ["https://placehold.co/600x400?text=Lakshadweep+Overview"]
            },
            cuisine: {
                description: "Spicy and coconut-rich. Tuna fish is the staple.",
                dishes: [
                    { name: "Mus Kavaab", type: "Non-Veg", priceRange: "₹200–₹400", description: "Spicy tuna curry.", image: "https://placehold.co/600x400?text=Mus+Kavaab" },
                    { name: "Rayereha", type: "Non-Veg", priceRange: "₹150–₹300", description: "Red tuna curry.", image: "https://placehold.co/600x400?text=Rayereha" },
                    { name: "Sannath", type: "Non-Veg", priceRange: "₹100–₹200", description: "White coconut-based tuna curry.", image: "https://placehold.co/600x400?text=Sannath" }
                ]
            },
            foodShops: [
                { name: "Agatti Island Resort", location: "Agatti", famousDish: "Seafood Platter", priceRange: "₹500–₹1000", rating: 4.5, timings: "12 PM - 10 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Lava Dance", type: "Folk", description: "Energetic dance performed by men of Minicoy.", image: "https://placehold.co/600x400?text=Lava+Dance" },
                    { name: "Kolkali", type: "Folk", description: "Stick dance common in Kerala and Lakshadweep.", image: "https://placehold.co/600x400?text=Kolkali" }
                ],
                music: [
                    { name: "Folk Songs", description: "Songs about the sea and love." }
                ],
                instruments: [
                    { name: "Duff", description: "Percussion instrument." }
                ]
            },
            traditionalAttire: {
                men: { description: "Lungi and Shirt.", attire: [{ name: "Mundu", description: "White dhoti/lungi." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Kachi (Lungi) and Thattam (Headscarf).", attire: [{ name: "Libus", description: "Long gown worn in Minicoy." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Cotton", description: "Imported from mainland." }]
            },
            festivals: [
                { name: "Eid-ul-Fitr", celebrationTime: "Varies", significance: "Religious", description: "Grand feasts and prayers.", images: ["https://placehold.co/600x400?text=Eid"] },
                { name: "Milad-ul-Nabi", celebrationTime: "Varies", significance: "Religious", description: "Prophet's Birthday.", images: ["https://placehold.co/600x400?text=Milad"] }
            ],
            artAndHandicrafts: [
                { name: "Coral Craft", type: "Craft", description: "Jewelry made from coral (restricted now).", famousFor: "Jewelry", images: ["https://placehold.co/600x400?text=Coral"] },
                { name: "Coir Making", type: "Industry", description: "Ropes and mats from coconut fiber.", famousFor: "Ropes" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Boat Building", description: "Traditional art of making Odams (boats)." }],
                rituals: [{ title: "Ratheeb", description: "Religious ritual with singing." }],
                dailyLife: "Island tranquility.",
                values: "Community brotherhood."
            },
            culturalPlaces: [
                { name: "Minicoy Lighthouse", type: "Heritage", location: "Minicoy", description: "British era lighthouse.", image: "https://placehold.co/600x400?text=Lighthouse" },
                { name: "Marine Museum", type: "Museum", location: "Kavaratti", description: "Showcasing marine life.", image: "https://placehold.co/600x400?text=Museum" },
                { name: "Bangaram Island", type: "Nature", location: "Bangaram", description: "Tourist resort island.", image: "https://placehold.co/600x400?text=Bangaram" }
            ],
            extraSections: [
                { title: "Languages", content: "Malayalam is official. Mahl is spoken in Minicoy." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "National Mini Marathon", location: "Agatti", date: new Date("2025-01-26"), entryFee: "Free", image: "https://placehold.co/600x400?text=Marathon", audience: ["Local"] }
                ],
                foodTrails: [
                    { name: "Kavaratti Seafood Trail", type: "Food Walk", description: "Fresh Tuna dishes.", priceRange: "₹300", duration: "1 Hour", audience: ["Foodie"] }
                ],
                workshops: [
                    { name: "Coir Twisting", type: "Craft", duration: "1 Hour", price: "₹100", skillLevel: "Beginner", audience: ["Tourist"] }
                ],
                festivalCalendar: [
                    { name: "Eid", priority: 1, date: new Date("2025-03-31"), significance: "Religious", images: ["https://placehold.co/600x400?text=Eid"], audience: ["Local"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: Lakshadweep seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
