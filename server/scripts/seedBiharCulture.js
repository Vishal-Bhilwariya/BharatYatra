require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");
const fs = require('fs');

const seedCulture = async () => {
    try {
        const log = (msg) => fs.appendFileSync('seed_log_internal.txt', msg + '\n');
        fs.writeFileSync('seed_log_internal.txt', 'Starting Seeding...\n');

        await connectDB();

        // 1. Find or Create Bihar State
        const stateName = "BIHAR"; // STRICTLY as requested
        const stateSlug = "bihar";

        // Try to find by slug OR name
        let state = await State.findOne({
            $or: [
                { slug: stateSlug },
                { name: stateName },
                { name: "Bihar" } // Check "Bihar" too just in case
            ]
        });

        if (!state) {
            log(`State '${stateName}' not found. Creating it...`);
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "The land of monasteries, ancient universities, and the birthplace of Buddhism and Jainism.",
                image: "https://placehold.co/600x400?text=Bihar+State",
                isActive: true
            });
        } else {
            log(`Found State by existing entry: ${state.name} (${state.slug})`);
            // Update existing state basic info and ensure Name is capitalized if we want consistency
            state.name = stateName;
            state.slug = stateSlug;
            state.description = "The land of monasteries, ancient universities, and the birthplace of Buddhism and Jainism.";
            state.image = "https://placehold.co/600x400?text=Bihar+State";
            state.isActive = true;
            await state.save();
        }

        log(`Found State: ${state.name} (${state._id})`);

        // 2. Prepare Bihar Data
        const biharData = {
            stateId: state._id,
            stateName: stateName,
            overview: {
                introduction: "Bihar is a land of profound history and spiritual significance, being the birthplace of Buddhism and Jainism and home to the world's first republic, Vaishali. It is known for its ancient learning centers like Nalanda and Vikramshila, and the holy river Ganges flowing through its heart.",
                lifestyle: "The lifestyle in Bihar is simple and deeply traditional. Agriculture is the backbone of the economy. People value family bonds, and the social fabric is woven with festivals and communal gatherings.",
                traditions: "Bihar's traditions are ancient, from the rigorous Chhath Puja dedicated to the Sun God to the vibrant Madhubani art passed down through generations.",
                history: "Bihar was the seat of the powerful Magadha empire, the Mauryan empire under Ashoka, and the Gupta empire. It has been a center of power, learning, and culture for millennia.",
                images: ["https://placehold.co/600x400?text=Bihar+Overview"]
            },
            cuisine: {
                description: "Bihari cuisine is wholesome and rustic, famous for its usage of sattu (roasted gram flour) and mustard oil. It offers a distinct flavor profile that is both spicy and earthy.",
                dishes: [
                    { name: "Litti Chokha", type: "Veg", priceRange: "₹50–₹150", description: "Wheat balls stuffed with spiced sattu, baked over coal, and served with spicy mashed eggplant and potatoes.", image: "https://placehold.co/600x400?text=Litti+Chokha" },
                    { name: "Khaja", type: "Sweet", priceRange: "₹200–₹400/kg", description: "A crispy, layered dessert from Silao or Rajgir, soaked in sugar syrup.", image: "https://placehold.co/600x400?text=Khaja" },
                    { name: "Thekua", type: "Sweet", priceRange: "₹150–₹300/kg", description: "A traditional deep-fried cookie made of wheat flour and jaggery, essential for Chhath Puja.", image: "https://placehold.co/600x400?text=Thekua" }
                ]
            },
            foodShops: [
                { name: "Pramod Laddu Bhandar", location: "Patna", famousDish: "Motichoor Laddu", priceRange: "₹100–₹300", rating: 4.5, timings: "8 AM - 10 PM" },
                { name: "Maurya Lok Food Court", location: "Patna", famousDish: "Litti Chokha", priceRange: "₹50–₹200", rating: 4.2, timings: "11 AM - 10 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Jat-Jatin", type: "Folk", description: "A popular folk dance performed by women, depicting the story of lovers Jat and Jatin, often addressing social issues.", image: "https://placehold.co/600x400?text=Jat+Jatin" },
                    { name: "Jhijhiya", type: "Folk", description: "A ritualistic dance performed during droughts to please the Rain God, featuring women dancing with lanterns on their heads.", image: "https://placehold.co/600x400?text=Jhijhiya" }
                ],
                music: [
                    { name: "Sohar", description: "Traditional songs sung to celebrate the birth of a child." },
                    { name: "Sumangali", description: "Wedding songs sung during auspicious ceremonies." }
                ],
                instruments: [
                    { name: "Dholak", description: "A two-headed hand drum used widely in folk music." },
                    { name: "Bansuri", description: "Bamboo flute, often associated with folk songs." }
                ]
            },
            traditionalAttire: {
                men: { description: "Traditional attire for men is simple and comfortable, suited for the climate.", attire: [{ name: "Dhoti Kurta", description: "White cotton dhoti paired with a kurta." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Women traditionally wear sarees, often in the Seedha Palla style.", attire: [{ name: "Tussar Silk Saree", description: "Bhagalpur is famous for its Tussar silk sarees." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Bhagalpuri Silk", description: "Known as the 'Queen of all fabrics', produced in Bhagalpur." }]
            },
            festivals: [
                { name: "Chhath Puja", celebrationTime: "October/November", significance: "Worship of the Sun God", description: "The most important festival, involving rigorous fasting and standing in water to offer prayers to the setting and rising sun.", images: ["https://placehold.co/600x400?text=Chhath+Puja"] },
                { name: "Sonepur Mela", celebrationTime: "November/December", significance: "Asia's largest cattle fair", description: "Held on the banks of the Gandak river, it attracts traders and tourists from all over.", images: ["https://placehold.co/600x400?text=Sonepur+Mela"] },
                { name: "Makar Sankranti", celebrationTime: "January", significance: "Harvest Festival", description: "Celebrated by eating Dahi-Chura and Tilkut.", images: ["https://placehold.co/600x400?text=Makar+Sankranti"] }
            ],
            artAndHandicrafts: [
                { name: "Madhubani Painting", type: "Painting", description: "Also known as Mithila painting, characterized by eye-catching geometrical patterns and vibrant colors.", famousFor: "Wall hangings and sarees", images: ["https://placehold.co/600x400?text=Madhubani+Painting"] },
                { name: "Manjusha Art", type: "Painting", description: "A folk art form from Anga region (Bhagalpur), known for its snake motifs.", famousFor: "Scroll paintings" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Touching Feet", description: "A common gesture of respect towards elders." }],
                rituals: [{ title: "Chhath Arghya", description: "Offering water and milk to the Sun God." }],
                dailyLife: "Life revolves around agriculture and community. Evenings are often spent in village chaupals.",
                values: "High regard for hospitality and deep-rooted spiritual beliefs."
            },
            culturalPlaces: [
                { name: "Mahabodhi Temple", type: "Religious Site", location: "Bodh Gaya", description: "A UNESCO World Heritage Site where Lord Buddha attained enlightenment.", image: "https://placehold.co/600x400?text=Mahabodhi+Temple" },
                { name: "Nalanda Ruins", type: "Historical Site", location: "Nalanda", description: "Ruins of the ancient Nalanda University, a center of learning in ancient India.", image: "https://placehold.co/600x400?text=Nalanda+Ruins" },
                { name: "Takht Sri Patna Sahib", type: "Religious Site", location: "Patna", description: "Birthplace of Guru Gobind Singh, the tenth Sikh Guru.", image: "https://placehold.co/600x400?text=Patna+Sahib" }
            ],
            extraSections: [
                { title: "Languages", content: "Hindi is the official language. Maithili, Magahi, and Bhojpuri are widely spoken regional languages rich in oral tradition." }
            ],
            culturalExperience: {
                liveEvents: [
                    {
                        name: "Rajgir Mahotsav",
                        location: "Rajgir",
                        date: new Date("2025-10-25T18:00:00"),
                        entryFee: "₹100",
                        image: "https://placehold.co/600x400?text=Rajgir+Mahotsav",
                        audience: ["Tourist", "Family", "Music Lover"]
                    },
                    {
                        name: "Chhath Puja Darshan",
                        location: "Patna Ghats",
                        date: new Date("2025-11-27T05:00:00"),
                        entryFee: "Free",
                        image: "https://placehold.co/600x400?text=Chhath+Ghat",
                        audience: ["Devotee", "Tourist", "Photographer"]
                    }
                ],
                foodTrails: [
                    {
                        name: "Patna Street Food Tour",
                        type: "Food Walk",
                        description: "Taste the best Litti Chokha, Chaat, and Sweets in Patna.",
                        priceRange: "₹500",
                        duration: "2 Hours",
                        audience: ["Foodie", "Tourist"]
                    }
                ],
                workshops: [
                    {
                        name: "Madhubani Painting Workshop",
                        type: "Art",
                        duration: "3 Hours",
                        price: "₹800",
                        skillLevel: "Beginner",
                        audience: ["Student", "Artist", "Family"]
                    }
                ],
                festivalCalendar: [
                    {
                        name: "Chhath Puja",
                        priority: 1,
                        date: new Date("2025-11-26"),
                        significance: "Sun Worship",
                        images: ["https://placehold.co/600x400?text=Chhath+Date"],
                        audience: ["Devotee", "Family"]
                    }
                ]
            }
        };

        // 3. Update or Insert Culture
        const result = await Culture.findOneAndUpdate(
            { stateId: state._id },
            biharData,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        log(`SUCCESS: Culture data for ${stateName} seeded successfully!`);
        log("Culture ID: " + result._id);

        process.exit(0);
    } catch (error) {
        fs.appendFileSync('seed_log_internal.txt', 'ERROR: ' + error.message + '\nStack: ' + error.stack);
        process.exit(1);
    }
};

seedCulture();
