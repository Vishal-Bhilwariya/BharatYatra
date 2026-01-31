require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Madhya Pradesh...");

        const stateName = "MADHYA PRADESH";
        const stateSlug = "madhya-pradesh";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Madhya Pradesh" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "The Heart of Incredible India, known for Khajuraho, Sanchi, and wildlife reserves.",
                image: "https://placehold.co/600x400?text=MP+State",
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
                introduction: "Madhya Pradesh (MP) is the heart of India. It offers a timeline of Indian history from the prehistoric caves of Bhimbetka to the erotic temples of Khajuraho and the stupas of Sanchi.",
                lifestyle: "Relaxed and traditional. The concept of 'Bhopali Paan' and leisurely talks is famous.",
                traditions: "Home to many tribes like Gonds and Bhils, each with unique traditions.",
                history: "Ruled by the Mauryas, Guptas, and later the Marathas and British.",
                images: ["https://placehold.co/600x400?text=MP+Overview"]
            },
            cuisine: {
                description: "A mix of Rajasthani (Dal Bafla) and Gujarati influences, with distinct meat dishes in Bhopal.",
                dishes: [
                    { name: "Poha Jalebi", type: "Veg", priceRange: "₹20–₹50", description: "The iconic breakfast of MP.", image: "https://placehold.co/600x400?text=Poha+Jalebi" },
                    { name: "Dal Bafla", type: "Veg", priceRange: "₹150–₹250", description: "Wheat balls dipped in ghee and served with dal.", image: "https://placehold.co/600x400?text=Bafla" },
                    { name: "Bhopali Gosht Korma", type: "Non-Veg", priceRange: "₹300–₹500", description: "Spicy mutton curry from the Nawabi era.", image: "https://placehold.co/600x400?text=Korma" }
                ]
            },
            foodShops: [
                { name: "Chappan Dukan", location: "Indore", famousDish: "Street Food", priceRange: "₹100–₹300", rating: 4.8, timings: "6 AM - 12 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Gaur Dance", type: "Tribal", description: "Performed by the Bison Horn Marias.", image: "https://placehold.co/600x400?text=Gaur+Dance" },
                    { name: "Matki", type: "Folk", description: "Solo dance by women balancing earthen pots.", image: "https://placehold.co/600x400?text=Matki" }
                ],
                music: [
                    { name: "Dhrupad", description: "Gwalior is the center of this ancient classical music form." }
                ],
                instruments: [
                    { name: "Ektara", description: "one-stringed instrument." }
                ]
            },
            traditionalAttire: {
                men: { description: "Dhoti and Bandi (Jacket) with a Safa (Turban).", attire: [{ name: "Bandi", description: "Sleeveless jacket." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Lehenga Choli in villages, Sarees in cities.", attire: [{ name: "Chanderi Saree", description: "Lightweight silk-cotton saree." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Maheshwari", description: "Fine cotton and silk fabric designated by Queen Ahilyabai Holkar." }]
            },
            festivals: [
                { name: "Khajuraho Dance Festival", celebrationTime: "February", significance: "Cultural", description: "Classical dances performed against the backdrop of Khajuraho temples.", images: ["https://placehold.co/600x400?text=Khajuraho+Fest"] },
                { name: "Simhastha Kumbh", celebrationTime: "Every 12 Years", significance: "Religious", description: "Held at Ujjain on the banks of Kshipra.", images: ["https://placehold.co/600x400?text=Kumbh"] }
            ],
            artAndHandicrafts: [
                { name: "Gond Art", type: "Painting", description: "Tribal art featuring dots and lines.", famousFor: "Paintings", images: ["https://placehold.co/600x400?text=Gond+Art"] },
                { name: "Bagh Print", type: "Textile", description: "Natural dye block printing.", famousFor: "Sarees" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Bhagoria", description: "Tribal festival of love and matchmaking." }],
                rituals: [{ title: "Narmada Aarti", description: "Worship of the holy river Narmada." }],
                dailyLife: "Slow-paced and culturally rich.",
                values: "Artistic expression and religious harmony."
            },
            culturalPlaces: [
                { name: "Khajuraho Group of Monuments", type: "Heritage", location: "Chhatarpur", description: "Famous for Nagara-style architecture and erotic sculptures.", image: "https://placehold.co/600x400?text=Khajuraho" },
                { name: "Sanchi Stupa", type: "Religious Site", location: "Sanchi", description: "Oldest stone structure in India.", image: "https://placehold.co/600x400?text=Sanchi" },
                { name: "Kanha Tiger Reserve", type: "Wildlife", location: "Mandla", description: "The inspiration for The Jungle Book.", image: "https://placehold.co/600x400?text=Kanha" }
            ],
            extraSections: [
                { title: "Languages", content: "Hindi is the main language. Malvi, Bundeli, and Bagheli are dialects." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Tansen Samaroh", location: "Gwalior", date: new Date("2025-12-15"), entryFee: "Free", image: "https://placehold.co/600x400?text=Tansen", audience: ["Music Lover"] }
                ],
                foodTrails: [
                    { name: "Sarafa Bazaar Night Walk", type: "Food Walk", description: "Indore's famous jewelry market turned food street.", priceRange: "₹300", duration: "3 Hours", audience: ["Foodie"] }
                ],
                workshops: [
                    { name: "Gond Art Workshop", type: "Art", duration: "3 Hours", price: "₹600", skillLevel: "Beginner", audience: ["Tourist"] }
                ],
                festivalCalendar: [
                    { name: "Khajuraho Dance Fest", priority: 1, date: new Date("2025-02-20"), significance: "Culture", images: ["https://placehold.co/600x400?text=Dance"], audience: ["Tourist"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: Madhya Pradesh seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
