require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();

        // 1. Find or Create Assam State
        const stateName = "Assam";
        let state = await State.findOne({ name: stateName });

        if (!state) {
            console.log(`State '${stateName}' not found. Creating it...`);
            state = await State.create({
                name: stateName,
                slug: "assam",
                description: "The Gateway to Northeast India, famous for its tea gardens, the mighty Brahmaputra river, and the one-horned rhinoceros.",
                image: "https://placehold.co/1200x600?text=Assam+State",
                isActive: true
            });
        }

        console.log(`Found State: ${state.name} (${state._id})`);

        // 2. Prepare Assam Data
        const assamData = {
            stateId: state._id,
            stateName: stateName,
            overview: {
                introduction: "Assam, located along the Brahmaputra and Barak river valleys, is vibrant with lush greenery, abundant wildlife, and a rich history. It is known as the land of the Red River and Blue Hills.",
                lifestyle: "The lifestyle is centered around agriculture and tea cultivation. The people are simple, hospitable, and deeply connected to their traditions. The Brahmaputra river plays a vital role in their daily lives.",
                traditions: "Assam's traditions are a blend of Austro-Asiatic, Tibeto-Burman, and Aryan cultures. The practice of Vaishnavism and the celebration of Bihu are central to the cultural identity.",
                history: "Assam was known as Pragjyotisha in the Mahabharata and later as Kamarupa. The Ahom dynasty ruled the region for 600 years, successfully resisting Mughal invasions.",
                images: ["https://placehold.co/800x600?text=Assam+Overview"]
            },
            cuisine: {
                description: "Assamese cuisine is characterized by its use of fermentation and drying as preservation methods. It is less spicy than other Indian cuisines, emphasizing distinct flavors like exotic herbs and fruits.",
                dishes: [
                    { name: "Khar", type: "Veg", priceRange: "₹100–₹200", description: "A unique dish prepared with raw papaya, pulses, and a key ingredient made from banana peel ash.", image: "https://placehold.co/600x400?text=Khar" },
                    { name: "Masor Tenga", type: "Non-Veg", priceRange: "₹200–₹400", description: "A tangy fish curry made with tomatoes, ou tenga (elephant apple), or lemon.", image: "https://placehold.co/600x400?text=Masor+Tenga" },
                    { name: "Pitha", type: "Sweet", priceRange: "₹50–₹100", description: "Rice cakes made during Bihu, available in sweet (til, narikol) and savory varieties.", image: "https://placehold.co/600x400?text=Pitha" }
                ]
            },
            foodShops: [
                { name: "Paradise", location: "Guwahati", famousDish: "Parampara Thali", priceRange: "₹400–₹800", rating: 4.9, timings: "11 AM - 10 PM" },
                { name: "Heritage Khorika", location: "Guwahati", famousDish: "Smoked Pork", priceRange: "₹300–₹600", rating: 4.7, timings: "11 AM - 10:30 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Bihu Dance", type: "Folk", description: "A joyous folk dance characterized by brisk steps and rapid hand movements, performed during the Bihu festivals.", image: "https://placehold.co/600x400?text=Bihu+Dance" },
                    { name: "Sattriya", type: "Classical", description: "One of the eight classical dance forms of India, introduced by Srimanta Sankardeva in the 15th century.", image: "https://placehold.co/600x400?text=Sattriya" }
                ],
                music: [
                    { name: "Borgeet", description: "Devotional songs composed by Srimanta Sankardeva and Madhavdeva.", image: "https://placehold.co/600x400?text=Borgeet" }
                ],
                instruments: [
                    { name: "Pepa", description: "A wind instrument made from the horn of a buffalo.", image: "https://placehold.co/600x400?text=Pepa" },
                    { name: "Dhol", description: "A double-headed drum played during Bihu.", image: "https://placehold.co/600x400?text=Dhol" }
                ]
            },
            traditionalAttire: {
                men: { description: "Men traditionally wear a Dhoti and Kurta, often accessorized with a Gamosa around the neck or waist.", attire: [{ name: "Suria", description: "Traditional dhoti worn by men." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "The traditional dress is the Mekhela Chador, a two-piece garment that looks like a saree.", attire: [{ name: "Mekhela Chador", description: "Made from Pat, Muga, or Eri silk." }], images: ["https://placehold.co/600x400?text=Mekhela+Chador"] },
                fabrics: [{ name: "Muga Silk", description: "The golden silk of Assam, exclusive to the state and known for its durability and sheen." }]
            },
            festivals: [
                { name: "Rongali Bihu", celebrationTime: "April", significance: "Assamese New Year", description: "The most important Bihu, celebrating the onset of spring and the agricultural season.", images: ["https://placehold.co/800x600?text=Rongali+Bihu"] },
                { name: "Ambubachi Mela", celebrationTime: "June", significance: "Fertility Festival", description: "Held at Kamakhya Temple, it celebrates the menstruation course of Goddess Kamakhya.", images: ["https://placehold.co/800x600?text=Ambubachi"] },
                { name: "Bhogali Bihu", celebrationTime: "January", significance: "Harvest Festival", description: "Marked by feasts and bonfires (Meji) to celebrate the end of the harvest season.", images: ["https://placehold.co/800x600?text=Bhogali+Bihu"] }
            ],
            artAndHandicrafts: [
                { name: "Cane and Bamboo", type: "Craft", description: "Widely used to make furniture, baskets (Japi), and musical instruments.", famousFor: "Japi (Traditional Hat)", images: ["https://placehold.co/600x400?text=Japi"] },
                { name: "Mask Making", type: "Craft", description: "Masks made of bamboo and clay used in Bhaonas (traditional plays) in Majuli.", famousFor: "Theatrical Masks", images: ["https://placehold.co/600x400?text=Masks"] }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Gamosa", description: "A white rectangular piece of cloth with a red border, offered as a sign of respect and love." }],
                rituals: [{ title: "Naam Kirtan", description: "Prayer services involving congregational singing of devotional songs." }],
                dailyLife: "Tea drinking is ritualistic. Evenings often involve community gatherings or prayers in the Namghar (Prayer Hall).",
                values: "Hospitality, respect for elders, and tolerance are deeply ingrained."
            },
            culturalPlaces: [
                { name: "Kamakhya Temple", type: "Religious Site", location: "Guwahati", description: "One of the 51 Shakti Peethas, dedicated to the mother goddess Kamakhya.", image: "https://placehold.co/800x600?text=Kamakhya+Temple" },
                { name: "Kaziranga National Park", type: "Nature", location: "Golaghat", description: "A World Heritage Site hosting two-thirds of the world's great one-horned rhinoceroses.", image: "https://placehold.co/800x600?text=Kaziranga" },
                { name: "Majuli", type: "Culture", location: "Jorhat", description: "The world's largest river island and the seat of Neo-Vaishnavite culture.", image: "https://placehold.co/800x600?text=Majuli" }
            ],
            extraSections: [
                { title: "Languages", content: "Assamese (Asamiya) is the official language. Bodo and Bengali are also widely spoken." }
            ],
            culturalExperience: {
                liveEvents: [
                    {
                        name: "Bihu Celebration",
                        location: "Latasil Playground, Guwahati",
                        date: new Date("2025-04-14T09:00:00"),
                        entryFee: "Free",
                        image: "https://placehold.co/600x400?text=Bihu+Event",
                        audience: ["Family", "Tourist"]
                    },
                    {
                        name: "Majuli Ras Mahotsav",
                        location: "Majuli",
                        date: new Date("2024-11-15T16:00:00"),
                        entryFee: "Free",
                        image: "https://placehold.co/600x400?text=Ras+Mahotsav",
                        audience: ["Devotee", "Tourist"]
                    }
                ],
                foodTrails: [
                    {
                        name: "Guwahati Assamese Thali Trail",
                        type: "Food Walk",
                        description: "Taste the best authentic thalis at Paradise and Khorika.",
                        priceRange: "₹1000",
                        duration: "3 Hours",
                        audience: ["Foodie"]
                    }
                ],
                workshops: [
                    {
                        name: "Mask Making Workshop",
                        type: "Craft",
                        duration: "2 Days",
                        price: "₹2000",
                        skillLevel: "Intermediate",
                        audience: ["Artist", "Student"]
                    }
                ],
                festivalCalendar: [
                    {
                        name: "Rongali Bihu",
                        priority: 1,
                        date: new Date("2025-04-14"),
                        significance: "Assamese New Year",
                        images: ["https://placehold.co/600x400?text=Rongali+Bihu"],
                        audience: ["Family", "Tourist"]
                    }
                ]
            }
        };

        // 3. Update or Insert Culture
        const result = await Culture.findOneAndUpdate(
            { stateId: state._id },
            assamData,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        console.log("SUCCESS: Culture data for Assam seeded successfully!");
        console.log(result);

        process.exit(0);
    } catch (error) {
        console.error("ERROR Seeding Data:", error);
        process.exit(1);
    }
};

seedCulture();
