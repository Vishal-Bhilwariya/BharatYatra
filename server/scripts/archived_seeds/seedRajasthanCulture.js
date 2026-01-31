require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Rajasthan...");

        const stateName = "RAJASTHAN";
        const stateSlug = "rajasthan";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Rajasthan" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "The Land of Kings, famous for its forts, palaces, deserts, and vibrant colors.",
                image: "https://placehold.co/600x400?text=Rajasthan+State",
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
                introduction: "Rajasthan is the land of royalty, forts, and tales of valor. It is the largest state in India by area, dominated by the Thar Desert.",
                lifestyle: "Despite the arid climate, the people celebrate life with vibrant colors in their clothes and festivals. Hospitality (Padharo Mhare Des) is legendary.",
                traditions: "Folk music and dance are part of every occasion. The caste system and Rajput codes of chivalry still influence society.",
                history: "Ruled by Rajput clans who built majestic forts. Later integrated into India in 1949.",
                images: ["https://placehold.co/600x400?text=Rajasthan+Overview"]
            },
            cuisine: {
                description: "Spicy and cooked with little water. Use of milk, buttermilk, and ghee is high.",
                dishes: [
                    { name: "Dal Baati Churma", type: "Veg", priceRange: "₹200–₹400", description: "Hard wheat balls served with lentils and crushed sweetened wheat.", image: "https://placehold.co/600x400?text=Dal+Baati" },
                    { name: "Laal Maas", type: "Non-Veg", priceRange: "₹400–₹600", description: "Fiery mutton curry cooked with Mathania chilies.", image: "https://placehold.co/600x400?text=Laal+Maas" },
                    { name: "Ghevar", type: "Sweet", priceRange: "₹100–₹300", description: "Honeycomb-shaped sweet made of flour and syrup.", image: "https://placehold.co/600x400?text=Ghevar" }
                ]
            },
            foodShops: [
                { name: "LMB (Laxmi Misthan Bhandar)", location: "Jaipur", famousDish: "Ghevar", priceRange: "₹300–₹600", rating: 4.7, timings: "8 AM - 10 PM" },
                { name: "Chokhi Dhani", location: "Jaipur", famousDish: "Rajasthani Thali", priceRange: "₹800–₹1200", rating: 4.8, timings: "5 PM - 11 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Ghoomar", type: "Folk", description: "Graceful dance performed by women in swirling robes.", image: "https://placehold.co/600x400?text=Ghoomar" },
                    { name: "Kalbelia", type: "Folk", description: "Snake charmer dance performed by the Kalbelia community.", image: "https://placehold.co/600x400?text=Kalbelia" }
                ],
                music: [
                    { name: "Maand", description: "Folk singing style." }
                ],
                instruments: [
                    { name: "Ravanahatha", description: "Ancient string instrument." },
                    { name: "Khartal", description: "Percussion instrument." }
                ]
            },
            traditionalAttire: {
                men: { description: "Dhoti, Angarkha, and Pagri (Turban).", attire: [{ name: "Bandhgala", description: "Formal suit." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Ghagra Choli and Odhni.", attire: [{ name: "Leheriya", description: "Wave-patterned saree." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Bandhani", description: "Tie and Dye." }, { name: "Block Print", description: "Bagru/Sanganeri prints." }]
            },
            festivals: [
                { name: "Pushkar Camel Fair", celebrationTime: "November", significance: "Trade/Religious", description: "World's largest camel fair featuring livestock trading and pilgrimages.", images: ["https://placehold.co/600x400?text=Pushkar"] },
                { name: "Teej", celebrationTime: "July/August", significance: "Monsoon", description: "Women swing on Jhoolas and pray for husbands.", images: ["https://placehold.co/600x400?text=Teej"] }
            ],
            artAndHandicrafts: [
                { name: "Blue Pottery", type: "Pottery", description: "Pottery using blue glaze and low-fired dough.", famousFor: "Vases", images: ["https://placehold.co/600x400?text=Blue+Pottery"] },
                { name: "Kathputli", type: "Puppetry", description: "String puppets used for storytelling.", famousFor: "Shows" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Opium Ceremony", description: "Traditional welcome in some communities (now banned)." }],
                rituals: [{ title: "Johar", description: "Historical practice of self-immolation (no longer practiced)." }],
                dailyLife: "Deeply entrenched in tradition and tourism.",
                values: "Honor (Aan-Baan-Shan)."
            },
            culturalPlaces: [
                { name: "Amber Fort", type: "Fort", location: "Jaipur", description: "Majestic hilltop fort.", image: "https://placehold.co/600x400?text=Amber+Fort" },
                { name: "City Palace", type: "Palace", location: "Udaipur", description: "Palace complex beside Lake Pichola.", image: "https://placehold.co/600x400?text=City+Palace" },
                { name: "Jaisalmer Fort", type: "Fort", location: "Jaisalmer", description: "Living fort made of yellow sandstone.", image: "https://placehold.co/600x400?text=Jaisalmer" }
            ],
            extraSections: [
                { title: "Languages", content: "Hindi and Rajasthani (Marwari, Mewari)." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Jaipur Literature Festival", location: "Jaipur", date: new Date("2025-01-20"), entryFee: "Free", image: "https://placehold.co/600x400?text=JLF", audience: ["Intellectual"] }
                ],
                foodTrails: [
                    { name: "Jaipur Sweet Trail", type: "Food Walk", description: "Try Ghevar and Mishri Mawa.", priceRange: "₹400", duration: "2 Hours", audience: ["Foodie"] }
                ],
                workshops: [
                    { name: "Block Printing", type: "Art", duration: "3 Hours", price: "₹800", skillLevel: "Beginner", audience: ["Tourist"] }
                ],
                festivalCalendar: [
                    { name: "Pushkar Fair", priority: 1, date: new Date("2025-11-05"), significance: "Culture", images: ["https://placehold.co/600x400?text=Pushkar"], audience: ["Global"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: Rajasthan seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
