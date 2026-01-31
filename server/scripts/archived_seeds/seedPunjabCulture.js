require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Punjab...");

        const stateName = "PUNJAB";
        const stateSlug = "punjab";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Punjab" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "The Land of Five Rivers, known for its vibrant culture, agriculture, and hospitality.",
                image: "https://placehold.co/600x400?text=Punjab+State",
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
                introduction: "Punjab, the land of five rivers, is known for its brave, hardworking, and fun-loving people. It is the granary of India and the heart of Sikhism.",
                lifestyle: "Larger than life. 'Khatha Peetha Lahey Da, Baaki Ahmed Shahey Da' (What you eat and drink is yours, the rest belongs to Ahmed Shah - invader).",
                traditions: "Langar (Community Kitchen) is a defining tradition of equality.",
                history: "Home to the Indus Valley Civilization, the Vedas, and the Sikh Empire under Maharaja Ranjit Singh.",
                images: ["https://placehold.co/600x400?text=Punjab+Overview"]
            },
            cuisine: {
                description: "Rich, buttery, and hearty. Tandoori cooking originated here.",
                dishes: [
                    { name: "Makki di Roti with Sarson ka Saag", type: "Veg", priceRange: "₹150–₹250", description: "Corn flour bread with mustard greens.", image: "https://placehold.co/600x400?text=Saag" },
                    { name: "Butter Chicken", type: "Non-Veg", priceRange: "₹300–₹500", description: "Chicken cooked in a tomato-butter gravy.", image: "https://placehold.co/600x400?text=Butter+Chicken" },
                    { name: "Lassi", type: "Beverage", priceRange: "₹50–₹100", description: "Thick yogurt drink topped with malai.", image: "https://placehold.co/600x400?text=Lassi" }
                ]
            },
            foodShops: [
                { name: "Kesar Da Dhaba", location: "Amritsar", famousDish: "Dal Makhani", priceRange: "₹200–₹400", rating: 4.8, timings: "11 AM - 11 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Bhangra", type: "Folk", description: "Energetic harvest dance performed by men.", image: "https://placehold.co/600x400?text=Bhangra" },
                    { name: "Giddha", type: "Folk", description: "Dance performed by women with clapping and Bolis.", image: "https://placehold.co/600x400?text=Giddha" }
                ],
                music: [
                    { name: "Punjabi Folk", description: "Songs about daily life, love, and war, accompanied by Tumbi and Dhol." }
                ],
                instruments: [
                    { name: "Dhol", description: "Double-sided drum." },
                    { name: "Tumbi", description: "One-string instrument." }
                ]
            },
            traditionalAttire: {
                men: { description: "Kurta Pajama and Turban (Pugg).", attire: [{ name: "Tehmat/Tamba", description: "Lung-style garment." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Salwar Kameez with Phulkari Dupatta.", attire: [{ name: "Patiala Salwar", description: "Pleated trousers." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Phulkari", description: "Flower embroidery work." }]
            },
            festivals: [
                { name: "Baisakhi", celebrationTime: "April", significance: "Harvest/Sikh New Year", description: "Marks the harvest of Rabi crops and the formation of Khalsa Panth.", images: ["https://placehold.co/600x400?text=Baisakhi"] },
                { name: "Lohri", celebrationTime: "January", significance: "Winter Solstice", description: "Bonfire festival marking the end of winter.", images: ["https://placehold.co/600x400?text=Lohri"] }
            ],
            artAndHandicrafts: [
                { name: "Jutti", type: "Footwear", description: "Leather footwear with embroidery.", famousFor: "Shoes", images: ["https://placehold.co/600x400?text=Jutti"] },
                { name: "Paranda", type: "Fashion", description: "Colorful hair accessory.", famousFor: "Hair" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Langar", description: "Serving free food to everyone regardless of religion." }],
                rituals: [{ title: "Anand Karaj", description: "Sikh marriage ceremony." }],
                dailyLife: "Agriculture and military service are honored professions.",
                values: "Chardi Kala (Eternal Optimism)."
            },
            culturalPlaces: [
                { name: "Golden Temple (Harmandir Sahib)", type: "Religious", location: "Amritsar", description: "Holiest shrine of Sikhism.", image: "https://placehold.co/600x400?text=Golden+Temple" },
                { name: "Jallianwala Bagh", type: "History", location: "Amritsar", description: "Memorial of the massacre.", image: "https://placehold.co/600x400?text=Jallianwala" },
                { name: "Wagah Border", type: "History", location: "Amritsar", description: "Ceremonial border closing.", image: "https://placehold.co/600x400?text=Wagah" }
            ],
            extraSections: [
                { title: "Languages", content: "Punjabi is the official language." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Hola Mohalla", location: "Anandpur Sahib", date: new Date("2025-03-15"), entryFee: "Free", image: "https://placehold.co/600x400?text=Hola", audience: ["Devotee"] }
                ],
                foodTrails: [
                    { name: "Amritsari Kulcha Trail", type: "Food Walk", description: "Taste the best Kulchas.", priceRange: "₹200", duration: "2 Hours", audience: ["Foodie"] }
                ],
                workshops: [
                    { name: "Bhangra Workshop", type: "Dance", duration: "1 Hour", price: "₹200", skillLevel: "Beginner", audience: ["Fun"] }
                ],
                festivalCalendar: [
                    { name: "Baisakhi", priority: 1, date: new Date("2025-04-13"), significance: "Harvest", images: ["https://placehold.co/600x400?text=Baisakhi"], audience: ["Global"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: Punjab seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
