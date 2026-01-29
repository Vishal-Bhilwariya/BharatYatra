require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();

        // 1. Find or Create Arunachal Pradesh State
        const stateName = "Arunachal Pradesh";
        let state = await State.findOne({ name: stateName });

        if (!state) {
            console.log(`State '${stateName}' not found. Creating it...`);
            state = await State.create({
                name: stateName,
                slug: "arunachal-pradesh",
                description: "The Land of Dawn-Lit Mountains, known for its pristine beauty, rich tribal heritage, and the Tawang Monastery.",
                image: "https://placehold.co/1200x600?text=Arunachal+Pradesh",
                isActive: true
            });
        }

        console.log(`Found State: ${state.name} (${state._id})`);

        // 2. Prepare Arunachal Data
        const arunachalData = {
            stateId: state._id,
            stateName: stateName,
            overview: {
                introduction: "Arunachal Pradesh, the 'Land of Dawn-Lit Mountains', is India's remotest state and the first to greet the rising sun. It is a treasure trove of culture, home to 26 major tribes and over 100 sub-tribes, each with unique traditions and dialects.",
                lifestyle: "The lifestyle is predominantly tribal and deeply connected to nature. People live in bamboo houses raised on stilts. Community bonding is strong, and agriculture (Jhum cultivation) is the main occupation.",
                traditions: "Traditions vary from the Buddhist practices of the Monpas to the Donyi-Polo (Sun-Moon) worship of the Tani tribes. Weaving and bamboo crafting are essential skills passed down through generations.",
                history: "Historically known as the North-East Frontier Agency (NEFA), the region has references in the Kalika Purana and Mahabharata. It has witnessed the rule of Chutia kings and relations with the Ahom kingdom.",
                images: ["https://placehold.co/800x600?text=Arunachal+Overview"]
            },
            cuisine: {
                description: "Arunachal cuisine is mild, organic, and flavorful, often using fermented bamboo shoots, fresh herbs, and meat. Rice is the staple food.",
                dishes: [
                    { name: "Thukpa", type: "Non-Veg", priceRange: "₹100–₹250", description: "A hot noodle soup made with minced meat and vegetables, popular in the Tawang region.", image: "https://placehold.co/600x400?text=Thukpa" },
                    { name: "Bamboo Shoot Fry", type: "Veg", priceRange: "₹150–₹300", description: "Tender bamboo shoots stir-fried with local spices and herbs.", image: "https://placehold.co/600x400?text=Bamboo+Shoot+Fry" },
                    { name: "Pika Pila", type: "Veg", priceRange: "₹50–₹100", description: "A traditional pickle made from bamboo shoots and pork fat (optional), a favorite of the Apatani tribe.", image: "https://placehold.co/600x400?text=Pika+Pila" }
                ]
            },
            foodShops: [
                { name: "Dragon Restaurant", location: "Tawang", famousDish: "Momos & Thukpa", priceRange: "₹200–₹500", rating: 4.8, timings: "10 AM - 9 PM" },
                { name: "A B C Restaurant", location: "Itanagar", famousDish: "Local Thali", priceRange: "₹150–₹350", rating: 4.5, timings: "11 AM - 10 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Aji Lhamu", type: "Classical", description: "A folk dance of the Monpa tribe depicting the Tibetan version of the Ramayana.", image: "https://placehold.co/600x400?text=Aji+Lhamu" },
                    { name: "Lion and Peacock Dance", type: "Folk", description: "A colorful dance performed by the Monpas during festivals to ward off evil spirits.", image: "https://placehold.co/600x400?text=Lion+Peacock+Dance" }
                ],
                music: [
                    { name: "Ja-Jin-Ja", description: "A folk song sung during marriages and social gatherings by the tribes of Arunachal.", image: "https://placehold.co/600x400?text=Folk+Music" }
                ],
                instruments: [
                    { name: "Urom", description: "A traditional drum used by the Adi tribe during festivals.", image: "https://placehold.co/600x400?text=Urom" },
                    { name: "Guga", description: "A bamboo wind instrument played by the Monpas.", image: "https://placehold.co/600x400?text=Guga" }
                ]
            },
            traditionalAttire: {
                men: { description: "Men wears sleeveless silk shirts with edges meant to be distinctive. The tribes are often identified by their unique cane hats/helmets decorated with hornbill beaks or feathers.", attire: [{ name: "Monpa Chuba", description: "A warm woolen coat worn by the Monpas." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Women wear wrap-around skirts and long-sleeved jackets. They adorn themselves with heavy bead necklaces, silver earrings, and bamboo accessories.", attire: [{ name: "Gale", description: "A traditional woven wrap-around skirt worn by Adi women." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Eri Silk", description: "A peaceful silk produced without killing the silkworm, used in traditional weaving." }]
            },
            festivals: [
                { name: "Losar", celebrationTime: "February/March", significance: "Tibetan New Year", description: "Celebrated by the Monpa tribe with prayers, hoisting of religious flags, and lighting butter lamps.", images: ["https://placehold.co/800x600?text=Losar"] },
                { name: "Solung", celebrationTime: "September", significance: "Harvest Festival", description: "A major festival of the Adi tribe seeking prosperity and a good harvest.", images: ["https://placehold.co/800x600?text=Solung"] },
                { name: "Ziro Festival of Music", celebrationTime: "September", significance: "Music & Culture", description: "An outdoor music festival held in the Ziro Valley, showcasing independent music and local culture.", images: ["https://placehold.co/800x600?text=Ziro+Festival"] }
            ],
            artAndHandicrafts: [
                { name: "Thangka Painting", type: "Painting", description: "Buddhist religious scroll paintings depicting deities and scenes from the life of Buddha.", famousFor: "Spiritual Decor", images: ["https://placehold.co/600x400?text=Thangka"] },
                { name: "Cane and Bamboo Crafts", type: "Craft", description: "Exquisite items like baskets, hats, and furniture made from the abundant bamboo in the state.", famousFor: "Utility and Decor", images: ["https://placehold.co/600x400?text=Bamboo+Craft"] }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Mithun Sacrifice", description: "Mithun (Gayal) is considered a sacred animal and is sacrificed during major festivals and marriages as a sign of prosperity." }],
                rituals: [{ title: "Animism", description: "Many tribes follow Donyi-Polo, worshipping the Sun and Moon as supreme deities." }],
                dailyLife: "Life revolves around the forests and hills. Evenings are often spent around a central fire place in the house.",
                values: "Deep respect for nature (forests and rivers) and strong community solidarity."
            },
            culturalPlaces: [
                { name: "Tawang Monastery", type: "Religious Site", location: "Tawang", description: "The largest monastery in India and the second largest in the world, perched at 10,000 feet.", image: "https://placehold.co/800x600?text=Tawang+Monastery" },
                { name: "Ziro Valley", type: "Nature & Culture", location: "Ziro", description: "A World Heritage Site candidate known for the Apatani tribe's unique paddy-cum-fish cultivation.", image: "https://placehold.co/800x600?text=Ziro+Valley" },
                { name: "Namdapha National Park", type: "Nature", location: "Changlang", description: "A biodiversity hotspot and home to the Hoolock Gibbon.", image: "https://placehold.co/800x600?text=Namdapha" }
            ],
            extraSections: [
                { title: "Languages", content: "Arunachal is a linguistically diverse state. Major languages include Nyishi, Adi, Monpa, and Apatani. Hindi is widely used as a lingua franca." }
            ],
            culturalExperience: {
                liveEvents: [
                    {
                        name: "Ziro Music Festival",
                        location: "Ziro Valley",
                        date: new Date("2025-09-25T10:00:00"),
                        entryFee: "₹2500",
                        image: "https://placehold.co/600x400?text=Ziro+Music+Fest",
                        audience: ["Youth", "Tourist", "Music Lover"]
                    },
                    {
                        name: "Torgya Festival",
                        location: "Tawang Monastery",
                        date: new Date("2025-01-20T09:00:00"),
                        entryFee: "Free",
                        image: "https://placehold.co/600x400?text=Torgya+Festival",
                        audience: ["Tourist", "Pilgrim"]
                    }
                ],
                foodTrails: [
                    {
                        name: "Tawang Food Walk",
                        type: "Food Walk",
                        description: "Experience authentic Monpa cuisine including Churpi and Khura.",
                        priceRange: "₹800",
                        duration: "2 Hours",
                        audience: ["Foodie", "Tourist"]
                    }
                ],
                workshops: [
                    {
                        name: "Bamboo Crafting Workshop",
                        type: "Craft",
                        duration: "3 Hours",
                        price: "₹500",
                        skillLevel: "Beginner",
                        audience: ["Student", "Family"]
                    }
                ],
                festivalCalendar: [
                    {
                        name: "Losar",
                        priority: 1,
                        date: new Date("2025-02-28"),
                        significance: "Monpa New Year",
                        images: ["https://placehold.co/600x400?text=Losar+Calendar"],
                        audience: ["Family", "Tourist"]
                    }
                ]
            }
        };

        // 3. Update or Insert Culture
        const result = await Culture.findOneAndUpdate(
            { stateId: state._id },
            arunachalData,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        console.log("SUCCESS: Culture data for Arunachal Pradesh seeded successfully!");
        console.log(result);

        process.exit(0);
    } catch (error) {
        console.error("ERROR Seeding Data:", error);
        process.exit(1);
    }
};

seedCulture();
