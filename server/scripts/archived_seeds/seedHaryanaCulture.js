require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();

        console.log("Starting Seeding for Haryana...");

        // 1. Find or Create Haryana State
        const stateName = "HARYANA";
        const stateSlug = "haryana";

        // Try to find by slug OR name
        let state = await State.findOne({
            $or: [
                { slug: stateSlug },
                { name: stateName },
                { name: "Haryana" }
            ]
        });

        if (!state) {
            console.log(`State '${stateName}' not found. Creating it...`);
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "The Abode of God, known for its historic battlefield of Kurukshetra and rapid industrialization.",
                image: "https://placehold.co/600x400?text=Haryana+State",
                isActive: true
            });
        } else {
            console.log(`Found State by existing entry: ${state.name} (${state.slug})`);

            // Update existing state basic info
            state.name = stateName;
            state.slug = stateSlug;
            state.description = "The Abode of God, known for its historic battlefield of Kurukshetra and rapid industrialization.";
            state.image = "https://placehold.co/600x400?text=Haryana+State";
            state.isActive = true;
            await state.save();
        }

        console.log(`Found State: ${state.name} (${state._id})`);

        // 2. Prepare Haryana Data
        const haryanaData = {
            stateId: state._id,
            stateName: stateName,
            overview: {
                introduction: "Haryana, the land of the Bhagavad Gita, is a state where antiquity and modernity blend seamlessly. It is famous for its agricultural prosperity, contribution to sports (especially wrestling), and the historic city of Kurukshetra.",
                lifestyle: "The lifestyle remains largely rural and agricultural, characterized by hard work and a robust diet. The dialect is earthy and direct. In contrast, cities like Gurgaon represent the modern face of India with high-tech industries.",
                traditions: "Haryana has a rich tradition of folk tales and community living ('Khap'). Respect for elders and physical fitness are deeply ingrained values.",
                history: "This land was the site of the epic Battle of Mahabharata. It has been the gateway to North India, witnessing numerous battles that shaped India's destiny.",
                images: ["https://placehold.co/600x400?text=Haryana+Overview"]
            },
            cuisine: {
                description: "Haryanvi cuisine is simple, earthy, and inextricably linked to the land. 'Desi Ghee', milk, and yogurt are essential ingredients. The food is wholesome and prepared without much fuss.",
                dishes: [
                    { name: "Bajra Khichdi", type: "Veg", priceRange: "₹80–₹150", description: "A porridge made of millet and lentils, usually served with pure ghee and lassi.", image: "https://placehold.co/600x400?text=Bajra+Khichdi" },
                    { name: "Singri ki Sabzi", type: "Veg", priceRange: "₹100–₹200", description: "A unique dish made from dried desert beans, spicy and tangy.", image: "https://placehold.co/600x400?text=Singri+Sabzi" },
                    { name: "Churma", type: "Sweet", priceRange: "₹150–₹300", description: "Crushed roti mixed with ghee and sugar/jaggery, a high-energy sweet dish.", image: "https://placehold.co/600x400?text=Churma" }
                ]
            },
            foodShops: [
                { name: "Murthal Dhabas (Amrik Sukhdev)", location: "Sonipat", famousDish: "Aloo Paratha", priceRange: "₹200–₹500", rating: 4.8, timings: "24 Hours" },
                { name: "Puran Singh Ka Dhaba", location: "Ambala", famousDish: "Mutton Curry", priceRange: "₹300–₹600", rating: 4.5, timings: "12 PM - 11 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Phag Dance", type: "Folk", description: "Performed by farmers in the month of Phalguna (Feb-March) to celebrate the harvest.", image: "https://placehold.co/600x400?text=Phag+Dance" },
                    { name: "Ghoomar (Haryana Style)", type: "Folk", description: "A variation of the Rajasthani Ghoomar, performed by women on festivals like Holi and Gangaur.", image: "https://placehold.co/600x400?text=Ghoomar" }
                ],
                music: [
                    { name: "Ragini", description: "A popular form of folk theatre and music that narrates stories of bravery and romance." },
                    { name: "Saang", description: "An open-air folk theatre style rooted in mythology." }
                ],
                instruments: [
                    { name: "Been", description: "Wind instrument played by snake charmers, central to folk dances." },
                    { name: "Nagada", description: "A large drum played with sticks, used in Raas Leela and folk plays." }
                ]
            },
            traditionalAttire: {
                men: { description: "Men traditionally wear a Dhoti, Kurta, and a Pagri (Turban). The Pagri is a symbol of honor.", attire: [{ name: "Khandwa (Pagri)", description: "Headgear that signifies social status." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Women wear a 'Daaman' (a very flared ankle-length skirt) with a 'Kurti' and 'Chunder' (scarf).", attire: [{ name: "Daaman", description: "Heavy, colorful skirt often with 52 pleats (Baavan Gaj Ka Daman)." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Khaddar", description: "Handspun and handwoven cotton fabric, durable and comfortable." }]
            },
            festivals: [
                { name: "Surajkund Crafts Mela", celebrationTime: "February", significance: "International Crafts Fair", description: "A massive fair showcasing the finest handlooms and handicrafts from India and the world.", images: ["https://placehold.co/600x400?text=Surajkund+Mela"] },
                { name: "Gita Mahotsav", celebrationTime: "November/December", significance: "Birth of Srimad Bhagavad Gita", description: "Held at Kurukshetra, featuring cultural performances, seminars, and a craft bazaar.", images: ["https://placehold.co/600x400?text=Gita+Mahotsav"] },
                { name: "Teej", celebrationTime: "July/August", significance: "Monsoon Festival", description: "Women dress up, apply henna, and swing on jhoolas to welcome the rains.", images: ["https://placehold.co/600x400?text=Teej"] }
            ],
            artAndHandicrafts: [
                { name: "Phulkari", type: "Embroidery", description: "While native to Punjab, it is deeply embedded in Haryanvi culture too, featuring flower motifs.", famousFor: "Dupattas and Shawls", images: ["https://placehold.co/600x400?text=Phulkari"] },
                { name: "Pottery", type: "Craft", description: "Haryana is known for its simple yet artistic clay pottery, especially hookahs and earthen pots.", famousFor: "Earthenware" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Hookah", description: "Sharing a hookah in the village Chaupal is a symbol of community brotherhood." }],
                rituals: [{ title: "Kuan Pujan", description: "Worship of the well after the birth of a male child (now evolving to include girls)." }],
                dailyLife: "Centers around agriculture and cattle rearing.",
                values: "Hard work, community brotherhood, and protection of honor."
            },
            culturalPlaces: [
                { name: "Brahma Sarovar", type: "Religious Site", location: "Kurukshetra", description: "A vast water tank believed to be the cradle of civilization, sacred for holy dips.", image: "https://placehold.co/600x400?text=Brahma+Sarovar" },
                { name: "Sultanpur Bird Sanctuary", type: "Wildlife", location: "Gurgaon", description: "A paradise for bird watchers, hosting migratory birds from Siberia.", image: "https://placehold.co/600x400?text=Sultanpur" },
                { name: "Pinjore Gardens", type: "Heritage Site", location: "Pinjore", description: "A beautiful Mughal garden built in the 17th century.", image: "https://placehold.co/600x400?text=Pinjore+Gardens" }
            ],
            extraSections: [
                { title: "Languages", content: "Haryanvi (a dialect of Hindi) is the mother tongue. Hindi is the official language. English is common in urban hubs." }
            ],
            culturalExperience: {
                liveEvents: [
                    {
                        name: "International Gita Mahotsav",
                        location: "Kurukshetra",
                        date: new Date("2025-11-28T10:00:00"),
                        entryFee: "Free",
                        image: "https://placehold.co/600x400?text=Gita+Jayanti",
                        audience: ["Devotee", "Tourist"]
                    },
                    {
                        name: "Surajkund Mela Cultural Night",
                        location: "Faridabad",
                        date: new Date("2025-02-05T18:00:00"),
                        entryFee: "₹120",
                        image: "https://placehold.co/600x400?text=Surajkund+Night",
                        audience: ["Family", "Art Lover"]
                    }
                ],
                foodTrails: [
                    {
                        name: "Murthal Paratha Trail",
                        type: "Food Walk",
                        description: "Drive down the highway and feast on buttery parathas.",
                        priceRange: "₹300",
                        duration: "2 Hours",
                        audience: ["Foodie", "Traveler"]
                    }
                ],
                workshops: [
                    {
                        name: "Pottery Making",
                        type: "Craft",
                        duration: "3 Hours",
                        price: "₹500",
                        skillLevel: "Beginner",
                        audience: ["Student", "Family"]
                    }
                ],
                festivalCalendar: [
                    {
                        name: "Teej",
                        priority: 1,
                        date: new Date("2025-07-28"),
                        significance: "Welcome Monsoon",
                        images: ["https://placehold.co/600x400?text=Teej"],
                        audience: ["Women", "Family"]
                    }
                ]
            }
        };

        // 3. Update or Insert Culture
        const result = await Culture.findOneAndUpdate(
            { stateId: state._id },
            haryanaData,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        console.log(`SUCCESS: Culture data for ${stateName} seeded successfully!`);
        console.log("Culture ID:", result._id);

        process.exit(0);
    } catch (error) {
        console.error("ERROR Seeding Data:", error);
        process.exit(1);
    }
};

seedCulture();
