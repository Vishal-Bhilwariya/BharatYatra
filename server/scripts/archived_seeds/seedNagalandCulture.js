require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Nagaland...");

        const stateName = "NAGALAND";
        const stateSlug = "nagaland";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Nagaland" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "Land of Festivals, famous for the Hornbill Festival and distinct tribal culture.",
                image: "https://placehold.co/600x400?text=Nagaland+State",
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
                introduction: "Nagaland is a state of distinct tribes, each with its own dialect, costumes, and traditions. It is famous as the 'Land of Festivals'.",
                lifestyle: "Tribal life is centered around the Morung (dormitory) system. Agriculture (Jhum) is the main occupation.",
                traditions: "Feathers, cane, and bamboo are integral. Headhunting was a historical practice but is now a thing of the past.",
                history: "Witnessed the Battle of Kohima during WWII, a turning point against Japanese invasion.",
                images: ["https://placehold.co/600x400?text=Nagaland+Overview"]
            },
            cuisine: {
                description: "Smoked meat and fermented products are central. Axone (fermented soy) provides a distinct flavor.",
                dishes: [
                    { name: "Smoked Pork with Axone", type: "Non-Veg", priceRange: "₹200–₹400", description: "Signature dish of Nagaland.", image: "https://placehold.co/600x400?text=Smoked+Pork" },
                    { name: "Bamboo Shoot Curry", type: "Veg", priceRange: "₹100–₹200", description: "Vegetables cooked with bamboo shoots.", image: "https://placehold.co/600x400?text=Bamboo+Shoot" },
                    { name: "Galho", type: "Veg", priceRange: "₹80–₹150", description: "Rice soup mixed with vegetables (Nagaland's Khichdi).", image: "https://placehold.co/600x400?text=Galho" }
                ]
            },
            foodShops: [
                { name: "Ethnic Table", location: "Dimapur", famousDish: "Pork Ribs", priceRange: "₹400", rating: 4.6, timings: "11 AM - 9 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "War Dance", type: "Folk", description: "Performed by men with spears and shields, displaying valor.", image: "https://placehold.co/600x400?text=War+Dance" },
                    { name: "Zeliang Dance", type: "Folk", description: "Rhythmic dance of the Zeliang tribe.", image: "https://placehold.co/600x400?text=Zeliang" }
                ],
                music: [
                    { name: "Folk Ballads", description: "Songs narrating stories of bravery and love." }
                ],
                instruments: [
                    { name: "Tati", description: "Single string instrument." },
                    { name: "Log Drum", description: "Massive drum carved from a single tree trunk." }
                ]
            },
            traditionalAttire: {
                men: { description: "Shawls (Tsula) indicate social status. Headgear with hornbill feathers.", attire: [{ name: "Naga Shawl", description: "Red and black shawls typically." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Skirts (Mekhela) and bead necklaces.", attire: [{ name: "Neikhro", description: "Skirt with unique patterns." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Naga Cotton", description: "Thick handwoven cotton." }]
            },
            festivals: [
                { name: "Hornbill Festival", celebrationTime: "December 1-10", significance: "Festival of Festivals", description: "A showcase of all Naga tribes in one place at Kisama Heritage Village.", images: ["https://placehold.co/600x400?text=Hornbill"] },
                { name: "Sekrenyi", celebrationTime: "February", significance: "Purification", description: "Angami tribe festival.", images: ["https://placehold.co/600x400?text=Sekrenyi"] }
            ],
            artAndHandicrafts: [
                { name: "Naga Beads", type: "Jewelry", description: "Glass bead necklaces.", famousFor: "Necklaces", images: ["https://placehold.co/600x400?text=Beads"] },
                { name: "Wood Carving", type: "Craft", description: "Carving on the log drums and house pillars.", famousFor: "Decor" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Feast of Merit", description: "A rich person hosts a feast for the village to gain status." }],
                rituals: [{ title: "Genna", description: "Taboo days where no work is done." }],
                dailyLife: "Village council plays a major role.",
                values: "Honesty and bravery."
            },
            culturalPlaces: [
                { name: "Kisama Heritage Village", type: "Culture", location: "Kohima", description: "Venue of the Hornbill Festival.", image: "https://placehold.co/600x400?text=Kisama" },
                { name: "Kohima War Cemetery", type: "History", location: "Kohima", description: "Memorial for soldiers of WWII.", image: "https://placehold.co/600x400?text=War+Cemetery" },
                { name: "Dzukou Valley", type: "Nature", location: "Border", description: "Valley of Flowers.", image: "https://placehold.co/600x400?text=Dzukou" }
            ],
            extraSections: [
                { title: "Languages", content: "English is official. Nagamese is the creole language." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Hornbill Festival", location: "Kisama", date: new Date("2025-12-01"), entryFee: "₹50", image: "https://placehold.co/600x400?text=Hornbill", audience: ["Global"] }
                ],
                foodTrails: [
                    { name: "Naga Kitchen Trail", type: "Food Walk", description: "Taste authentic smoked pork.", priceRange: "₹500", duration: "2 Hours", audience: ["Foodie"] }
                ],
                workshops: [
                    { name: "Bead Stringing", type: "Craft", duration: "1 Hour", price: "₹200", skillLevel: "Beginner", audience: ["Tourist"] }
                ],
                festivalCalendar: [
                    { name: "Hornbill Festival", priority: 1, date: new Date("2025-12-01"), significance: "Unity", images: ["https://placehold.co/600x400?text=Hornbill"], audience: ["Global"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: Nagaland seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
