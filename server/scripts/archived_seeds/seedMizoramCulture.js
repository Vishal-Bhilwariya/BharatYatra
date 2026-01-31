require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Mizoram...");

        const stateName = "MIZORAM";
        const stateSlug = "mizoram";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Mizoram" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "Land of the Hill People, known for its dramatic landscape and pleasant climate.",
                image: "https://placehold.co/600x400?text=Mizoram+State",
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
                introduction: "Mizoram is a mountainous state boasting high literacy rates and spectacular scenery. 'Mizo' means highlander.",
                lifestyle: "Very casteless and classless society. Tlawmngaihna (an untranslatable code of conduct meaning altruism) is the guiding principle.",
                traditions: "Mizos are a close-knit society with no class distinction and no discrimination on grounds of sex.",
                history: "Became the 23rd state of India in 1987.",
                images: ["https://placehold.co/600x400?text=Mizoram+Overview"]
            },
            cuisine: {
                description: "Non-vegetarian, served on banana leaves. Generally boiled or steamed.",
                dishes: [
                    { name: "Bai", type: "Veg", priceRange: "₹50–₹100", description: "Vegetable stew with pork sauce and bamboo shoots.", image: "https://placehold.co/600x400?text=Bai" },
                    { name: "Vawksa Rep", type: "Non-Veg", priceRange: "₹150–₹250", description: "Smoked pork.", image: "https://placehold.co/600x400?text=Vawksa+Rep" },
                    { name: "Koat Pitha", type: "Sweet", priceRange: "₹20–₹40", description: "Banana fritters.", image: "https://placehold.co/600x400?text=Koat+Pitha" }
                ]
            },
            foodShops: [
                { name: "Red Pepper", location: "Aizawl", famousDish: "Mizo Thali", priceRange: "₹300", rating: 4.5, timings: "11 AM - 8 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Cheraw", type: "Folk", description: "The famous Bamboo Dance where men move bamboos and women dance in between.", image: "https://placehold.co/600x400?text=Cheraw" },
                    { name: "Khuallam", type: "Guest Dance", description: "Dance of the Guests.", image: "https://placehold.co/600x400?text=Khuallam" }
                ],
                music: [
                    { name: "Gospel Music", description: "Church choirs are integral to Mizo music because of high Christianity." }
                ],
                instruments: [
                    { name: "Dar", description: "Brass gong." }
                ]
            },
            traditionalAttire: {
                men: { description: "Simple cloth draped.", attire: [{ name: "Puan", description: "Wrap around cloth." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Puan with distinct designs.", attire: [{ name: "Puanchei", description: "Spectacularly colorful costume." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Mizo Puan", description: "Intricate handwoven designs." }]
            },
            festivals: [
                { name: "Chapchar Kut", celebrationTime: "March", significance: "Spring Festival", description: "Celebrating the clearing of forests for Jhum cultivation.", images: ["https://placehold.co/600x400?text=Chapchar+Kut"] },
                { name: "Mim Kut", celebrationTime: "August/September", significance: "Maize Harvest", description: "Festival dedicated to the departed souls.", images: ["https://placehold.co/600x400?text=Mim+Kut"] }
            ],
            artAndHandicrafts: [
                { name: "Bamboo Craft", type: "Craft", description: "Hats and baskets.", famousFor: "Khumbeu (Hat)", images: ["https://placehold.co/600x400?text=Bamboo+Hat"] }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Tlawmngaihna", description: "The code of ethics: always put others before self." }],
                rituals: [{ title: "Death Rites", description: "Community gathering to support the bereaved family." }],
                dailyLife: "Community service is voluntary and common.",
                values: "Altruism and honesty."
            },
            culturalPlaces: [
                { name: "Phawngpui Peak", type: "Nature", location: "Blue Mountain", description: "Highest peak in Mizoram.", image: "https://placehold.co/600x400?text=Phawngpui" },
                { name: "Reiek", type: "Village", location: "Aizawl", description: "Heritage village.", image: "https://placehold.co/600x400?text=Reiek" },
                { name: "Solomon's Temple", type: "Religious", location: "Aizawl", description: "A magnificent church.", image: "https://placehold.co/600x400?text=Solomons+Temple" }
            ],
            extraSections: [
                { title: "Languages", content: "Mizo and English." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Chapchar Kut Festival", location: "Aizawl", date: new Date("2025-03-01"), entryFee: "Free", image: "https://placehold.co/600x400?text=Kut", audience: ["Tourist"] }
                ],
                foodTrails: [
                    { name: "Aizawl Market Walk", type: "Food Walk", description: "Explore fresh produce.", priceRange: "₹100", duration: "1 Hour", audience: ["Explore"] }
                ],
                workshops: [
                    { name: "Bamboo Dance Lesson", type: "Dance", duration: "2 Hours", price: "₹300", skillLevel: "Beginner", audience: ["Fun"] }
                ],
                festivalCalendar: [
                    { name: "Chapchar Kut", priority: 1, date: new Date("2025-03-05"), significance: "Spring", images: ["https://placehold.co/600x400?text=Chapchar"], audience: ["All"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: Mizoram seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
