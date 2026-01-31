require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Jharkhand...");

        const stateName = "JHARKHAND";
        const stateSlug = "jharkhand";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Jharkhand" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "The Land of Forests, rich in mineral resources and tribal culture.",
                image: "https://placehold.co/600x400?text=Jharkhand+State",
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
                introduction: "Jharkhand, meaning 'The Land of Forests', is a state in eastern India carved out of Bihar. It is known for its waterfalls, lush green forests, and rich tribal heritage.",
                lifestyle: "The lifestyle is simple and close to nature. Detailed tribal art and dance are integral parts of life.",
                traditions: "Tribal festivals like Sarhul and Karma define the cultural calendar. Nature worship is central to the belief system.",
                history: "The region has a history of tribal resistance against British rule, led by heroes like Birsa Munda.",
                images: ["https://placehold.co/600x400?text=Jharkhand+Overview"]
            },
            cuisine: {
                description: "The cuisine uses rice, legumes, and locally available vegetables. It is light on spices but high on nutritional value.",
                dishes: [
                    { name: "Dhuska", type: "Veg", priceRange: "₹40–₹80", description: "Deep-fried snack made of rice and lentil batter.", image: "https://placehold.co/600x400?text=Dhuska" },
                    { name: "Litti Chokha", type: "Veg", priceRange: "₹50–₹100", description: "Identify to Bihar but widely popular here.", image: "https://placehold.co/600x400?text=Litti" },
                    { name: "Rugra", type: "Veg", priceRange: "Seasonal", description: "A type of mushroom that grows during monsoons, considered a delicacy.", image: "https://placehold.co/600x400?text=Rugra" }
                ]
            },
            foodShops: [
                { name: "Kaveri Restaurant", location: "Ranchi", famousDish: "Thali", priceRange: "₹300–₹500", rating: 4.4, timings: "11 AM - 10 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Chhau", type: "folk", description: "A semi-classical dance with martial arts elements, performed with masks.", image: "https://placehold.co/600x400?text=Chhau" },
                    { name: "Jhumair", type: "Folk", description: "A popular folk dance performed during harvest and festivals.", image: "https://placehold.co/600x400?text=Jhumair" }
                ],
                music: [
                    { name: "Domkach", description: "Folk music performed during weddings." }
                ],
                instruments: [
                    { name: "Mander", description: "A huge drum used in tribal dances." },
                    { name: "Bansuri", description: "Bamboo flute." }
                ]
            },
            traditionalAttire: {
                men: { description: "Men wear simple Dhoti and Kurta or Gamcha.", attire: [{ name: "Bhagwan", description: "A one-piece cloth draped by tribes." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Women wear Sarees, often with tribal prints.", attire: [{ name: "Parthan", description: "Upper garment worn by tribal women." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Tussar Silk", description: "Jharkhand is a leading producer of Tussar silk (Kuchai Silk)." }]
            },
            festivals: [
                { name: "Sarhul", celebrationTime: "Spring", significance: "Worship of Sal Tree", description: "The most important tribal festival celebrating nature.", images: ["https://placehold.co/600x400?text=Sarhul"] },
                { name: "Karma", celebrationTime: "August/September", significance: "Worship of Karma Tree", description: "Celebrated for good harvest and prosperity.", images: ["https://placehold.co/600x400?text=Karma"] }
            ],
            artAndHandicrafts: [
                { name: "Sohrai and Khovar", type: "Painting", description: "Traditional mural arts painted on mud walls during harvest and weddings.", famousFor: "Wall Art", images: ["https://placehold.co/600x400?text=Sohrai"] },
                { name: "Bamboo Craft", type: "Handicraft", description: "Baskets and decorative items made from bamboo.", famousFor: "Baskets" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Sarnaism", description: "An indigenous religion worshiping nature (Groves called Sarna)." }],
                rituals: [{ title: "Pahan", description: "The village priest performs rituals for the community's well-being." }],
                dailyLife: "Agrarian lifestyle with strong community bonding.",
                values: "Respect for nature and ancestors."
            },
            culturalPlaces: [
                { name: "Baidyanath Jyotirlinga", type: "Religious Site", location: "Deoghar", description: "One of the 12 Jyotirlingas of Shiva.", image: "https://placehold.co/600x400?text=Baidyanath" },
                { name: "Hundru Falls", type: "Nature", location: "Ranchi", description: "A spectacular waterfall and picnic spot.", image: "https://placehold.co/600x400?text=Hundru" },
                { name: "Betla National Park", type: "Wildlife", location: "Latehar", description: "One of the first national parks in India to come under Project Tiger.", image: "https://placehold.co/600x400?text=Betla" }
            ],
            extraSections: [
                { title: "Languages", content: "Hindi is official. Tribal languages like Santhali, Mundari, and Ho are widely spoken." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Shravani Mela", location: "Deoghar", date: new Date("2025-07-20"), entryFee: "Free", image: "https://placehold.co/600x400?text=Mela", audience: ["Devotee"] }
                ],
                foodTrails: [
                    { name: "Ranchi Street Food", type: "Food Walk", description: "Try Dhuska and other local snacks.", priceRange: "₹200", duration: "1 Hour", audience: ["Foodie"] }
                ],
                workshops: [
                    { name: "Tribal Art Workshop", type: "Art", duration: "2 Hours", price: "₹400", skillLevel: "Beginner", audience: ["Student"] }
                ],
                festivalCalendar: [
                    { name: "Sarhul", priority: 1, date: new Date("2025-04-10"), significance: "Nature Worship", images: ["https://placehold.co/600x400?text=Sarhul"], audience: ["Local"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: Jharkhand seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
