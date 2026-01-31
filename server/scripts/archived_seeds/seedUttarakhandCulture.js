require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Uttarakhand...");

        const stateName = "UTTARAKHAND";
        const stateSlug = "uttarakhand";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Uttarakhand" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "Devbhoomi (Land of Gods), the Yoga Capital of the World, and home to the Char Dham.",
                image: "https://placehold.co/600x400?text=Uttarakhand+State",
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
                introduction: "Uttarakhand is a Himalayan state divided into two regions: Kumaon and Garhwal. It is a pilgrimage center (Char Dham) and an adventure hub.",
                lifestyle: "Pahari lifestyle is tough but simple. Yoga and meditation are deeply ingrained in places like Rishikesh.",
                traditions: "Every village has a local deity. The people are known for their bravery (Garhwal/Kumaon Regiments).",
                history: "Historically part of ancient kingdoms, later under the British. Became a state in 2000.",
                images: ["https://placehold.co/600x400?text=Uttarakhand+Overview"]
            },
            cuisine: {
                description: "Simple, nutritious, and suited for cold weather. Use of coarse grains and unique herbs.",
                dishes: [
                    { name: "Kafuli", type: "Veg", priceRange: "₹80–₹150", description: "Spinach and fenugreek curry.", image: "https://placehold.co/600x400?text=Kafuli" },
                    { name: "Bhang ki Chutney", type: "Veg", priceRange: "₹20–₹50", description: "Chutney made from hemp seeds (non-intoxicating).", image: "https://placehold.co/600x400?text=Bhang+Chutney" },
                    { name: "Bal Mithai", type: "Sweet", priceRange: "₹100–₹200", description: "Brown chocolate-like fudge covered in sugar balls.", image: "https://placehold.co/600x400?text=Bal+Mithai" }
                ]
            },
            foodShops: [
                { name: "Chotiwala", location: "Rishikesh", famousDish: "Thali", priceRange: "₹200–₹400", rating: 4.5, timings: "8 AM - 10 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Langvir Nritya", type: "Folk", description: "Acrobatic dance performed by men on a pole.", image: "https://placehold.co/600x400?text=Langvir" },
                    { name: "Choliya", type: "Folk", description: "Sword dance of Kumaon performed at weddings.", image: "https://placehold.co/600x400?text=Choliya" }
                ],
                music: [
                    { name: "Jagar", description: "Ritualistic singing to wake up the gods/spirits." }
                ],
                instruments: [
                    { name: "Ransingha", description: "Trumpet." },
                    { name: "Dhol Damau", description: "Drum set." }
                ]
            },
            traditionalAttire: {
                men: { description: "Kurta Pyjama and Topi.", attire: [{ name: "Pahari Topi", description: "Black or White cap." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Ghagra Choli and Pichora.", attire: [{ name: "Rangwali Pichora", description: "Saffron veil worn during ceremonies." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Pashmina", description: "Fine wool." }]
            },
            festivals: [
                { name: "Nanda Devi Raj Jat", celebrationTime: "Every 12 Years", significance: "Pilgrimage", description: "A three-week long barefoot trek worshiping Nanda Devi.", images: ["https://placehold.co/600x400?text=Nanda+Devi"] },
                { name: "Kumbh Mela", celebrationTime: "Every 12 Years", significance: "Religious", description: "Held in Haridwar, the world's largest gathering.", images: ["https://placehold.co/600x400?text=Kumbh"] }
            ],
            artAndHandicrafts: [
                { name: "Aipan Art", type: "Painting", description: "Folk art done on red floor with white paste.", famousFor: "Decor", images: ["https://placehold.co/600x400?text=Aipan"] },
                { name: "Ringal Craft", type: "Handicraft", description: "Bamboo craft.", famousFor: "Baskets" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Chipko Movement", description: "Historically famous for hugging trees to save them." }],
                rituals: [{ title: "Ganga Aarti", description: "Evening prayer to the River Ganges." }],
                dailyLife: "Closely tied to nature and religious tourism.",
                values: "Environment conservation."
            },
            culturalPlaces: [
                { name: "Haridwar & Rishikesh", type: "Religious", location: "Ganges", description: "Twin cities of Yoga and Spirituality.", image: "https://placehold.co/600x400?text=Rishikesh" },
                { name: "Kedarnath Temple", type: "Religious", location: "Rudraprayag", description: "One of the 12 Jyotirlingas.", image: "https://placehold.co/600x400?text=Kedarnath" },
                { name: "Valley of Flowers", type: "Nature", location: "Chamoli", description: "UNESCO Heritage site.", image: "https://placehold.co/600x400?text=Valley+of+Flowers" }
            ],
            extraSections: [
                { title: "Languages", content: "Hindi, Garhwali, and Kumaoni." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "International Yoga Festival", location: "Rishikesh", date: new Date("2025-03-01"), entryFee: "Reg Req", image: "https://placehold.co/600x400?text=Yoga+Fest", audience: ["Global"] }
                ],
                foodTrails: [
                    { name: "Pahari Food Trail", type: "Food Walk", description: "Taste local millet dishes.", priceRange: "₹250", duration: "1 Hour", audience: ["Foodie"] }
                ],
                workshops: [
                    { name: "Aipan Art Workshop", type: "Art", duration: "2 Hours", price: "₹400", skillLevel: "Beginner", audience: ["Tourist"] }
                ],
                festivalCalendar: [
                    { name: "Ganga Dussehra", priority: 1, date: new Date("2025-06-06"), significance: "River", images: ["https://placehold.co/600x400?text=Ganga"], audience: ["Devotee"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: Uttarakhand seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
