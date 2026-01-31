require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Dadra and Nagar Haveli and Daman and Diu...");

        const stateName = "DADRA AND NAGAR HAVELI AND DAMAN AND DIU";
        const stateSlug = "dadra-and-nagar-haveli-and-daman-and-diu";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Dadra and Nagar Haveli and Daman and Diu" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "A blend of Portuguese heritage, tribal culture, and serene beaches.",
                image: "https://placehold.co/600x400?text=Daman+And+Diu",
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
                introduction: "This Union Territory is a merger of two former UTs. It offers a unique mix of the sunny beaches of Daman & Diu and the lush green forests of Dadra & Nagar Haveli.",
                lifestyle: "Laid back coastal life in Daman/Diu, tribal and industrial in Dadra/Nagar Haveli.",
                traditions: "Strong Portuguese influence in architecture and food in Daman/Diu. Warli culture in Dadra.",
                history: "Former Portuguese colonies until 1961 (Daman/Diu) and 1954 (Dadra).",
                images: ["https://placehold.co/600x400?text=Daman+Overview"]
            },
            cuisine: {
                description: "Seafood with Portuguese flavors. Gujarati influence is also strong.",
                dishes: [
                    { name: "Chicken Bullet", type: "Non-Veg", priceRange: "₹200–₹300", description: "Spicy chicken appetizer.", image: "https://placehold.co/600x400?text=Chicken+Bullet" },
                    { name: "Cozy Rice", type: "Non-Veg", priceRange: "₹250–₹400", description: "Portuguese style rice.", image: "https://placehold.co/600x400?text=Cozy+Rice" },
                    { name: "Dhansak", type: "Non-Veg", priceRange: "₹200–₹350", description: "Parsi lentil and meat dish.", image: "https://placehold.co/600x400?text=Dhansak" }
                ]
            },
            foodShops: [
                { name: "Cidade de Daman", location: "Daman", famousDish: "Sea Food", priceRange: "₹500–₹1000", rating: 4.5, timings: "12 PM - 11 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Mando Dance", type: "Folk", description: "Portuguese-Goan style dance.", image: "https://placehold.co/600x400?text=Mando" },
                    { name: "Tarpa Dance", type: "Tribal", description: "Performed by Warli tribes.", image: "https://placehold.co/600x400?text=Tarpa" }
                ],
                music: [
                    { name: "Portuguese Folk", description: "Folk songs from the colonial era." }
                ],
                instruments: [
                    { name: "Tarpa", description: "Wind instrument made of gourd." }
                ]
            },
            traditionalAttire: {
                men: { description: "Shirts and Trousers. Tribes wear loincloths.", attire: [{ name: "Casual Wear", description: "Common." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Sarees (Parsi/Gujarati style).", attire: [{ name: "Lugden", description: "Traditional tribal wear." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Cotton", description: "Light fabrics." }]
            },
            festivals: [
                { name: "Nariyal Poornima", celebrationTime: "August", significance: "Sea God", description: "Coconut Day marking the start of fishing season.", images: ["https://placehold.co/600x400?text=Nariyal"] },
                { name: "Diwal", celebrationTime: "October/November", significance: "Lights", description: "Deepavali is celebrated with tribal touch.", images: ["https://placehold.co/600x400?text=Diwali"] }
            ],
            artAndHandicrafts: [
                { name: "Warli Painting", type: "Painting", description: "Tribal art using geometric shapes.", famousFor: "Art", images: ["https://placehold.co/600x400?text=Warli"] },
                { name: "Mat Weaving", type: "Craft", description: "Mats made from palm leaves.", famousFor: "Mats" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Siesta", description: "Afternoon nap tradition from Portuguese times." }],
                rituals: [{ title: "Gangaji Puja", description: "Worship of the river/sea." }],
                dailyLife: "Industrial work and fishing.",
                values: "Relaxed and hospitable."
            },
            culturalPlaces: [
                { name: "Diu Fort", type: "Fort", location: "Diu", description: "Massive Portuguese fort.", image: "https://placehold.co/600x400?text=Diu+Fort" },
                { name: "Nagoa Beach", type: "Nature", location: "Diu", description: "Horse-shoe shaped beach.", image: "https://placehold.co/600x400?text=Nagoa" },
                { name: "Silvassa Vasona Lion Safari", type: "Nature", location: "Silvassa", description: "Wildlife park.", image: "https://placehold.co/600x400?text=Lion+Safari" }
            ],
            extraSections: [
                { title: "Languages", content: "Gujarati, Hindi, Marathi, and English." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Festa De Diu", location: "Diu", date: new Date("2025-12-01"), entryFee: "Free", image: "https://placehold.co/600x400?text=Festa", audience: ["Tourist"] }
                ],
                foodTrails: [
                    { name: "Daman Sea Food Trail", type: "Food Walk", description: "Fresh catch near the jetty.", priceRange: "₹400", duration: "2 Hours", audience: ["Foodie"] }
                ],
                workshops: [
                    { name: "Warli Painting", type: "Art", duration: "2 Hours", price: "₹200", skillLevel: "Beginner", audience: ["Tourist"] }
                ],
                festivalCalendar: [
                    { name: "Nariyal Poornima", priority: 1, date: new Date("2025-08-09"), significance: "Sea", images: ["https://placehold.co/600x400?text=Nariyal"], audience: ["Local"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: DNHDD seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
