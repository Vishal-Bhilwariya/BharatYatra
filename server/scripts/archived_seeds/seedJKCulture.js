require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Jammu and Kashmir...");

        const stateName = "JAMMU AND KASHMIR";
        const stateSlug = "jammu-and-kashmir";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Jammu and Kashmir" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "Paradise on Earth, known for its mountains, lakes, and saffron.",
                image: "https://placehold.co/600x400?text=Kashmir+Dal+Lake",
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
                introduction: "Jammu and Kashmir is the northernmost region of India. Kashmir valley is famous for its beauty ('Paradise on Earth') while Jammu is the 'City of Temples'.",
                lifestyle: "Kashmiris are known for 'Kashmiriyat' (social harmony). Life moves with the seasons.",
                traditions: "Uses of Kangri (fire pot) in winter, Shikara rides on lakes.",
                history: "Rulers include Hindu mythology (Kashyapa), Mughal emperors who built gardens, and Dogra rulers.",
                images: ["https://placehold.co/600x400?text=Kashmir+Overview"]
            },
            cuisine: {
                description: "Rich, aromatic, and meat-heavy (Wazwan).",
                dishes: [
                    { name: "Rogan Josh", type: "Non-Veg", priceRange: "₹300–₹500", description: "Lamb cooked in red gravy.", image: "https://placehold.co/600x400?text=Rogan+Josh" },
                    { name: "Kahwa", type: "Beverage", priceRange: "₹50–₹100", description: "Saffron tea with almonds.", image: "https://placehold.co/600x400?text=Kahwa" },
                    { name: "Dum Aloo", type: "Veg", priceRange: "₹150–₹250", description: "Potatoes cooked in spicy gravy.", image: "https://placehold.co/600x400?text=Dum+Aloo" }
                ]
            },
            foodShops: [
                { name: "Mughal Darbar", location: "Srinagar", famousDish: "Wazwan", priceRange: "₹800–₹1500", rating: 4.7, timings: "11 AM - 10 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Rouf", type: "Folk", description: "Traditional dance performed by women in colorful robes.", image: "https://placehold.co/600x400?text=Rouf" }
                ],
                music: [
                    { name: "Sufiana Kalam", description: "Classical music of Kashmir." },
                    { name: "Chakri", description: "Folk music." }
                ],
                instruments: [
                    { name: "Santoor", description: "String instrument." },
                    { name: "Rabab", description: "Lute-like instrument." }
                ]
            },
            traditionalAttire: {
                men: { description: "Pheran (Long gown) and Skull cap.", attire: [{ name: "Pheran", description: "Woolen gown for winter." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Pheran with silver jewelry and headscarf.", attire: [{ name: "Pheran with Taranga", description: "Pheran mostly with floral embroidery." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Pashmina", description: "Finest cashmere wool." }]
            },
            festivals: [
                { name: "Tulip Festival", celebrationTime: "April", significance: "Spring", description: "Blooming of Asia's largest tulip garden.", images: ["https://placehold.co/600x400?text=Tulip+Fest"] },
                { name: "Eid-ul-Fitr", celebrationTime: "Varies", significance: "Religious", description: "Marking the end of Ramadan.", images: ["https://placehold.co/600x400?text=Eid"] }
            ],
            artAndHandicrafts: [
                { name: "Papier Mache", type: "Craft", description: "Decorative items made of paper pulp.", famousFor: "Boxes/Vases", images: ["https://placehold.co/600x400?text=Papier+Mache"] },
                { name: "Carpet Weaving", type: "Textile", description: "Hand-knotted silk/wool carpets.", famousFor: "Carpets" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Wazwan", description: "Multi-course meal treated as a ceremony." }],
                rituals: [{ title: "Salt Tea", description: "Drinking Noon Chai (Salt tea) in the morning." }],
                dailyLife: "Agriculture and crafts.",
                values: "Hospitality."
            },
            culturalPlaces: [
                { name: "Dal Lake", type: "Nature", location: "Srinagar", description: "Famous for Houseboats and Shikaras.", image: "https://placehold.co/600x400?text=Dal+Lake" },
                { name: "Vaishno Devi", type: "Religious", location: "Katra", description: "Holy cave shrine.", image: "https://placehold.co/600x400?text=Vaishno+Devi" },
                { name: "Gulmarg", type: "Nature", location: "Baramulla", description: "Skiing destination.", image: "https://placehold.co/600x400?text=Gulmarg" }
            ],
            extraSections: [
                { title: "Languages", content: "Kashmiri, Dogri, Urdu, Hindi, and English." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Tulip Festival", location: "Srinagar", date: new Date("2025-04-10"), entryFee: "₹50", image: "https://placehold.co/600x400?text=Tulip", audience: ["Tourist"] }
                ],
                foodTrails: [
                    { name: "Srinagar Street Food", type: "Food Walk", description: "Try Nadru Monje (Lotus stem fritters).", priceRange: "₹150", duration: "1 Hour", audience: ["Foodie"] }
                ],
                workshops: [
                    { name: "Pashmina Weaving", type: "Craft", duration: "2 Hours", price: "₹500", skillLevel: "Beginner", audience: ["Tourist"] }
                ],
                festivalCalendar: [
                    { name: "Tulip Festival", priority: 1, date: new Date("2025-04-05"), significance: "Nature", images: ["https://placehold.co/600x400?text=Tulip"], audience: ["Global"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: Jammu and Kashmir seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
