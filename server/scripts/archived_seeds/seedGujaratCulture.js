require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();

        console.log("Starting Seeding for Gujarat...");

        // 1. Find or Create Gujarat State
        const stateName = "GUJARAT";
        const stateSlug = "gujarat";

        // Try to find by slug OR name
        let state = await State.findOne({
            $or: [
                { slug: stateSlug },
                { name: stateName },
                { name: "Gujarat" }
            ]
        });

        if (!state) {
            console.log(`State '${stateName}' not found. Creating it...`);
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "The Jewel of Western India, known for its Asiatic Lions, Rann of Kutch, and vibrant Navratri festival.",
                image: "https://placehold.co/600x400?text=Gujarat+State",
                isActive: true
            });
        } else {
            console.log(`Found State by existing entry: ${state.name} (${state.slug})`);
            // Update existing state basic info
            state.name = stateName;
            state.slug = stateSlug;
            state.description = "The Jewel of Western India, known for its Asiatic Lions, Rann of Kutch, and vibrant Navratri festival.";
            state.image = "https://placehold.co/600x400?text=Gujarat+State";
            state.isActive = true;
            await state.save();
        }

        console.log(`Found State: ${state.name} (${state._id})`);

        // 2. Prepare Gujarat Data
        const gujaratData = {
            stateId: state._id,
            stateName: stateName,
            overview: {
                introduction: "Gujarat is a vibrant tapestry of culture, commerce, and coastline. Home to the Mahatma (Gandhi) and the Sardar (Patel), it is a land where ancient stepwells coexist with modern industries, and the white desert meets the Arabian Sea.",
                lifestyle: "Gujaratis are known for their entrepreneurial spirit and hospitality. The lifestyle is often business-oriented but deeply rooted in tradition and family values. 'Atithi Devo Bhava' is taken very seriously.",
                traditions: "The state is famous for its colorful fairs and festivals. The tradition of Garba during Navratri is a global phenomenon. Vegetarianism is widely practiced due to Jain and Vaishnav influences.",
                history: "Gujarat has a rich maritime history dating back to the Indus Valley Civilization (Lothal). It has been a melting pot of cultures, influenced by the Mughals, Marathas, and the British.",
                images: ["https://placehold.co/600x400?text=Gujarat+Overview"]
            },
            cuisine: {
                description: "Gujarati cuisine is primarily vegetarian, known for its subtle use of sugar or jaggery in savory dishes (Khui-Meethi flavor). Thalis are grand and elaborate.",
                dishes: [
                    { name: "Dhokla", type: "Veg", priceRange: "₹50–₹100", description: "A steamed fermented rice and chickpea batter cake, light and fluffy.", image: "https://placehold.co/600x400?text=Dhokla" },
                    { name: "Undhiyu", type: "Veg", priceRange: "₹200–₹400", description: "A mixed vegetable delicacy cooked underground in earthen pots, typically in winter.", image: "https://placehold.co/600x400?text=Undhiyu" },
                    { name: "Thepla", type: "Veg", priceRange: "₹30–₹60", description: "Spiced paratha made from wheat flour and fenugreek leaves (methi), a travel staple.", image: "https://placehold.co/600x400?text=Thepla" }
                ]
            },
            foodShops: [
                { name: "Das Khaman", location: "Ahmedabad", famousDish: "Khaman Dhokla", priceRange: "₹100–₹200", rating: 4.8, timings: "8 AM - 9 PM" },
                { name: "Swati Snacks", location: "Ahmedabad", famousDish: "Panki", priceRange: "₹300–₹600", rating: 4.7, timings: "11 AM - 10:30 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Garba", type: "Folk", description: "A circular dance performed around a clay lantern (Garbha Deep) during Navratri, honoring Goddess Durga.", image: "https://placehold.co/600x400?text=Garba" },
                    { name: "Dandiya Raas", type: "Folk", description: "The stick dance, playful and energetic, symbolizing the mock fight between Durga and Mahishasura.", image: "https://placehold.co/600x400?text=Dandiya" }
                ],
                music: [
                    { name: "Sugam Sangeet", description: "A form of light classical vocal music based on poetry." },
                    { name: "Dayro", description: "A gathering where folk singers and storytellers perform through the night." }
                ],
                instruments: [
                    { name: "Dhol", description: "A large barrel drum essential for Garba and Bhangra." },
                    { name: "Manjira", description: "Small hand cymbals used in bhajans and folk music." }
                ]
            },
            traditionalAttire: {
                men: { description: "Traditional attire includes Kediyu (a frilled frock-like upper garment) and Chorno (tight-bottom trousers), often heavily embroidered.", attire: [{ name: "Kediyu", description: "Colorful, embroidered upper jacket." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Women wear Chaniya Choli (skirt and blouse) heavily adorned with mirrors and embroidery, especially during festivals.", attire: [{ name: "Chaniya Choli", description: "Embroidered skirt and blouse set." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Patola Silk", description: "Double ikat woven sari, usually made from silk in Patan." }]
            },
            festivals: [
                { name: "Navratri", celebrationTime: "September/October", significance: "Nine Nights of Dance", description: "The world's longest dance festival, where the entire state dances to the rhythm of Garba.", images: ["https://placehold.co/600x400?text=Navratri"] },
                { name: "Rann Utsav", celebrationTime: "November to February", significance: "Desert Carnival", description: "A cultural extravaganza held in the White Rann of Kutch under the full moon.", images: ["https://placehold.co/600x400?text=Rann+Utsav"] },
                { name: "Uttarayan", celebrationTime: "January 14", significance: "International Kite Festival", description: "The sky fills with millions of colorful kites; the battle of kites is a serious sport.", images: ["https://placehold.co/600x400?text=Uttarayan"] }
            ],
            artAndHandicrafts: [
                { name: "Bandhani", type: "Textile", description: "Tie-dye textile art, known for its intricate dots and patterns.", famousFor: "Sarees and Dupattas", images: ["https://placehold.co/600x400?text=Bandhani"] },
                { name: "Roghan Painting", type: "Fabric Art", description: "An ancient skill of painting on fabric using castor oil and natural colors, preserved by a few families in Kutch.", famousFor: "Wall hangings" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Chaash", description: "Drinking buttermilk after meals is a common custom for digestion." }],
                rituals: [{ title: "Simant", description: "Baby shower ceremony performed during the seventh month of pregnancy." }],
                dailyLife: "Starts with tea and 'Nasta' (snacks). Business and trade are central topics of conversation.",
                values: "Enterprise, non-violence (Ahimsa), and community service."
            },
            culturalPlaces: [
                { name: "Statue of Unity", type: "Monument", location: "Kevadia", description: "The world's tallest statue, dedicated to Sardar Vallabhbhai Patel.", image: "https://placehold.co/600x400?text=Statue+of+Unity" },
                { name: "Rani Ki Vav", type: "Historical Site", location: "Patan", description: "An intricate stepwell and UNESCO World Heritage site.", image: "https://placehold.co/600x400?text=Rani+Ki+Vav" },
                { name: "Somnath Temple", type: "Religious Site", location: "Somnath", description: "The first among the twelve Jyotirlinga shrines of Shiva.", image: "https://placehold.co/600x400?text=Somnath" }
            ],
            extraSections: [
                { title: "Languages", content: "Gujarati is the official language. Hindi and English are widely understood. Kutchi is spoken in the Kutch region." }
            ],
            culturalExperience: {
                liveEvents: [
                    {
                        name: "Navratri Garba Night",
                        location: "GMDC Ground, Ahmedabad",
                        date: new Date("2025-10-01T20:00:00"),
                        entryFee: "₹500",
                        image: "https://placehold.co/600x400?text=Garba+Night",
                        audience: ["Youth", "Family", "Tourist"]
                    },
                    {
                        name: "Rann Utsav Full Moon",
                        location: "Dhordo, Kutch",
                        date: new Date("2025-12-05T18:00:00"),
                        entryFee: "Package",
                        image: "https://placehold.co/600x400?text=Rann+Full+Moon",
                        audience: ["Tourist", "Photographer"]
                    }
                ],
                foodTrails: [
                    {
                        name: "Manek Chowk Night Market",
                        type: "Food Walk",
                        description: "Experience the transformation of a jewelry market into a food haven at night.",
                        priceRange: "₹400",
                        duration: "2 Hours",
                        audience: ["Foodie", "Night Owl"]
                    }
                ],
                workshops: [
                    {
                        name: "Bandhani Tie-Dye Workshop",
                        type: "Craft",
                        duration: "4 Hours",
                        price: "₹1800",
                        skillLevel: "Beginner",
                        audience: ["Artist", "Tourist"]
                    }
                ],
                festivalCalendar: [
                    {
                        name: "Uttarayan",
                        priority: 1,
                        date: new Date("2025-01-14"),
                        significance: "Kite Flying",
                        images: ["https://placehold.co/600x400?text=Kite+Festival"],
                        audience: ["Family", "Tourist"]
                    }
                ]
            }
        };

        // 3. Update or Insert Culture
        const result = await Culture.findOneAndUpdate(
            { stateId: state._id },
            gujaratData,
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
