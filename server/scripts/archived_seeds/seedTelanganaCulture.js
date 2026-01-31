require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Telangana...");

        const stateName = "TELANGANA";
        const stateSlug = "telangana";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Telangana" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "The youngest state of India, a fusion of history and technology.",
                image: "https://placehold.co/600x400?text=Telangana+State",
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
                introduction: "Telangana is a blend of Persian traditions of the Nizams and local Telugu culture. Hyderabad, the capital, is a global IT hub known for its pearls and biryani.",
                lifestyle: "Cosmopolitan in cities, agrarian in districts. 'Ganga-Jamuni Tehzeeb' (fusion culture) is prevalent.",
                traditions: "Bathukamma is the state festival celebrating flowers and womanhood.",
                history: "Ruled by Kakatiyas and Nizams. Became a separate state in 2014.",
                images: ["https://placehold.co/600x400?text=Telangana+Overview"]
            },
            cuisine: {
                description: "Spicy and tangy. Hyderabadi cuisine is a royal legacy.",
                dishes: [
                    { name: "Hyderabadi Biryani", type: "Non-Veg", priceRange: "₹200–₹500", description: "Aromatic rice dish cooked with meat and spices.", image: "https://placehold.co/600x400?text=Biryani" },
                    { name: "Haleem", type: "Non-Veg", priceRange: "₹150–₹300", description: "Stew made of meat, lentils, and wheat, popular during Ramadan.", image: "https://placehold.co/600x400?text=Haleem" },
                    { name: "Sarva Pindi", type: "Veg", priceRange: "₹50–₹100", description: "Spicy pancake made of rice flour.", image: "https://placehold.co/600x400?text=Sarva+Pindi" }
                ]
            },
            foodShops: [
                { name: "Paradise Biryani", location: "Hyderabad", famousDish: "Biryani", priceRange: "₹300–₹600", rating: 4.7, timings: "11 AM - 11 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Perini Sivatandavam", type: "Classical", description: "Dance of Warriors performed in the Kakatiya era.", image: "https://placehold.co/600x400?text=Perini" },
                    { name: "Bonalu Dance", type: "Folk", description: "Performed during the Bonalu festival.", image: "https://placehold.co/600x400?text=Bonalu" }
                ],
                music: [
                    { name: "Oggu Katha", description: "Traditional folk singing style narrating stories of gods." }
                ],
                instruments: [
                    { name: "Kanjira", description: "Percussion instrument." }
                ]
            },
            traditionalAttire: {
                men: { description: "Pancha (Dhoti) and Kurta. Sherwani during weddings.", attire: [{ name: "Sherwani", description: "Long coat-like garment." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Saree. Langa Voni for young girls.", attire: [{ name: "Pochampally Saree", description: "Ikat silk saree." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Pochampally Ikat", description: "Geometric patterns." }]
            },
            festivals: [
                { name: "Bathukamma", celebrationTime: "September/October", significance: "Floral Festival", description: "Women stack flowers in conical shapes and dance around them.", images: ["https://placehold.co/600x400?text=Bathukamma"] },
                { name: "Bonalu", celebrationTime: "July/August", significance: "Thanksgiving", description: "Offering food to Goddess Mahankali.", images: ["https://placehold.co/600x400?text=Bonalu"] }
            ],
            artAndHandicrafts: [
                { name: "Dokra Metal Craft", type: "Metalwork", description: "Lost-wax casting technique.", famousFor: "Figurines", images: ["https://placehold.co/600x400?text=Dokra"] },
                { name: "Bidriware", type: "Metalwork", description: "Silver inlay work on black metal.", famousFor: "Vases" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Peerla Panduga", description: "Muharram procession observed by both Hindus and Muslims." }],
                rituals: [{ title: "Kalyanam", description: "Celestial wedding of gods." }],
                dailyLife: "Hub of IT professionals.",
                values: "Inclusivity."
            },
            culturalPlaces: [
                { name: "Charminar", type: "Monument", location: "Hyderabad", description: "The global icon of Hyderabad.", image: "https://placehold.co/600x400?text=Charminar" },
                { name: "Golconda Fort", type: "History", location: "Hyderabad", description: "Medieval fort known for its acoustics.", image: "https://placehold.co/600x400?text=Golconda" },
                { name: "Ramappa Temple", type: "Heritage", location: "Warangal", description: "UNESCO site known for floating bricks.", image: "https://placehold.co/600x400?text=Ramappa" }
            ],
            extraSections: [
                { title: "Languages", content: "Telugu is the official language. Urdu is the second official language." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Numaish", location: "Hyderabad", date: new Date("2025-01-01"), entryFee: "₹30", image: "https://placehold.co/600x400?text=Numaish", audience: ["Shopper"] }
                ],
                foodTrails: [
                    { name: "Old City Night Walk", type: "Food Walk", description: "Charminar food trail.", priceRange: "₹300", duration: "2 Hours", audience: ["Foodie"] }
                ],
                workshops: [
                    { name: "Bidriware Making", type: "Craft", duration: "2 Hours", price: "₹500", skillLevel: "Beginner", audience: ["Tourist"] }
                ],
                festivalCalendar: [
                    { name: "Bathukamma", priority: 1, date: new Date("2025-10-01"), significance: "Flowers", images: ["https://placehold.co/600x400?text=Bathukamma"], audience: ["Women"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: Telangana seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
