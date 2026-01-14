require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();

        // 1. Find Uttar Pradesh State
        const stateName = "Uttar Pradesh";
        let state = await State.findOne({ name: stateName });

        if (!state) {
            console.log(`State '${stateName}' not found. Creating it...`);
            state = await State.create({
                name: stateName,
                slug: "uttar-pradesh-dummy", // ensuring slug is unique for this run if needed
                description: "The heartland of India, known for the Taj Mahal, Varanasi, and rich history.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/1200px-Taj_Mahal_%28Edited%29.jpeg",
                isActive: true
            });
        }

        console.log(`Found State: ${state.name} (${state._id})`);

        // 2. Prepare Dummy Data
        const dummyData = {
            stateId: state._id,
            overview: {
                introduction: "Uttar Pradesh is the rainbow land where the multi-hued Indian Culture has blossomed from times immemorial. Blessed with a variety of geographical land and many cultural biodiversities, UP has been the area of activity of historical heroes like Rama, Krishna, Buddha, Taj Mahal and the British Raj.",
                lifestyle: "The lifestyle is deeply rooted in tradition, with a blend of rural simplicity and urban modernization. Family values are paramount, and hospitality (Mehman-nawazi) is a way of life.",
                traditions: "From the Ganga Aarti in Varanasi to the Tehzeeb (etiquette) of Lucknow, UP is a melting pot of Hindu and Mughal traditions.",
                history: "Uttar Pradesh has been the cradle of Indian civilization, witnessing the rise and fall of empires like the Mauryas, Guptas, and Mughals.",
                images: ["https://www.holidify.com/images/bgImages/UTTAR-PRADESH.jpg"]
            },
            cuisine: {
                description: "Awadhi and Mughlai cuisines are the jewels of UP. The state offers a royal feast of kebabs, biryanis, and rich vegetarian dishes.",
                dishes: [
                    { name: "Galouti Kebab", type: "Non-Veg", priceRange: "₹250–₹500", description: "Melt-in-the-mouth minced meat kebabs, originally made for a toothless Nawab.", image: "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Shaheen_Ali/Galouti_Kebab__Minced_Meat_Kebab.jpg" },
                    { name: "Peda", type: "Sweet", priceRange: "₹200–₹400/kg", description: "A famous sweet from Mathura made of khoya and cardamom.", image: "https://www.cookwithmanali.com/wp-content/uploads/2016/10/Kesar-Peda-Recipe-500x500.jpg" },
                    { name: "Tehri", type: "Veg", priceRange: "₹100–₹200", description: "A yellow rice dish cooked with potatoes and vegetables, a staple in every household.", image: "https://www.secondrecipe.com/wp-content/uploads/2017/08/tehri-recipe.jpg" }
                ]
            },
            foodShops: [
                { name: "Tunday Kababi", location: "Lucknow", famousDish: "Galouti Kebab", priceRange: "₹150–₹300", rating: 5, timings: "11 AM - 11 PM" },
                { name: "Kashi Chat Bhandar", location: "Varanasi", famousDish: "Tamatar Chaat", priceRange: "₹50–₹150", rating: 4.8, timings: "12 PM - 10 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Kathak", type: "Classical", description: "One of the eight major forms of Indian classical dance, originating from the bards of ancient northern India.", image: "https://upload.wikimedia.org/wikipedia/commons/8/87/Kathak_Dance.jpg" },
                    { name: "Charkula", type: "Folk", description: "A dance performed in the Braj region where women balance oil lamps on their heads.", image: "https://i.pinimg.com/736x/8d/f3/0f/8df30f8983637e72b435211993206412.jpg" }
                ],
                music: [
                    { name: "Thumri", description: "A semi-classical music form that originated in UP, often revolving around the love of Radha and Krishna." }
                ],
                instruments: [
                    { name: "Tabla", description: "A membranophone percussion instrument associated with Kathak and Hindustani classical music." },
                    { name: "Shehnai", description: "Made famous by Ustad Bismillah Khan of Varanasi, played during weddings and auspicious occasions." }
                ]
            },
            traditionalAttire: {
                men: { description: "Traditional dress includes Kurta-Pajama or Dhoti-Kurta, often accompanied by a Gamcha or Topi.", attire: [{ name: "Kurta Pajama", description: "Loose comfortable cotton wear." }] },
                women: { description: "Sarees are the most common, especially the Banarasi Silk Saree which is world-famous.", attire: [{ name: "Banarasi Saree", description: "Opulent silk sarees with gold and silver brocade." }] },
                fabrics: [{ name: "Chikankari", description: "Delicate and shadow work embroidery from Lucknow." }]
            },
            festivals: [
                { name: "Kumbh Mela", celebrationTime: "Every 12 years", significance: "Largest peaceful gathering in the world.", description: "Millions of devotees gather to bathe in the sacred rivers.", images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Kumbh_Mela_Allahabad_2013.jpg/1200px-Kumbh_Mela_Allahabad_2013.jpg"] },
                { name: "Holi in Braj", celebrationTime: "March", significance: "Festival of Colors", description: "Lathmar Holi in Barsana is particularly famous.", images: ["https://static.toiimg.com/photo/63080277.cms"] },
                { name: "Diwali in Ayodhya", celebrationTime: "October/November", significance: "Return of Lord Rama", description: "The city is lit up with millions of diyas (lamps).", images: ["https://i.ytimg.com/vi/Wk9L2j2Xf9Q/maxresdefault.jpg"] }
            ],
            artAndHandicrafts: [
                { name: "Chikankari", type: "Embroidery", description: "A traditional embroidery style from Lucknow.", famousFor: "Kurtas and Sarees", images: ["https://textilevaluechain.in/wp-content/uploads/2021/08/Chikankari-Embroidery.jpg"] },
                { name: "Brassware", type: "Metal Work", description: "Moradabad is known as the 'Brass City' for its famous brass handicrafts.", famousFor: "Vases and artifacts" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Ganga Aarti", description: "Performed daily at dusk at the Dashashwamedh Ghat in Varanasi." }],
                rituals: [{ title: "Mundan", description: "First haircut ceremony for children, often performed at river banks." }],
                dailyLife: "Many people start their day with visits to temples. In cities, the culture is a mix of modern hustle and traditional values.",
                values: "Respect for elders and communal harmony (Ganga-Jamuni Tehzeeb) are core values."
            },
            culturalPlaces: [
                { name: "Taj Mahal", type: "Monument", location: "Agra", description: "An immense mausoleum of white marble, built in Agra between 1631 and 1648.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/1200px-Taj_Mahal_%28Edited%29.jpeg" },
                { name: "Varanasi Ghats", type: "Religious Site", location: "Varanasi", description: "Riverfront steps leading to the banks of the River Ganges.", image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Varanasi_Ghats.jpg" },
                { name: "Bara Imambara", type: "Monument", location: "Lucknow", description: "A large complex built by Asaf-ud-Daula, Nawab of Awadh, in 1784.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Bara_Imambara_Lucknow.jpg" }
            ],
            extraSections: [
                { title: "Languages", content: "Hindi and Urdu are the official and most widely spoken languages using the Devanagari and Perso-Arabic scripts respectively. Awadhi, Braj, and Bhojpuri are popular dialects." }
            ],
            culturalExperience: {
                liveEvents: [
                    {
                        name: "Kathak Dance Performance",
                        location: "Bhatkhande Music Institute, Lucknow",
                        date: new Date("2024-11-20T18:00:00"),
                        entryFee: "₹500",
                        image: "https://upload.wikimedia.org/wikipedia/commons/8/87/Kathak_Dance.jpg",
                        audience: ["Tourist", "Family", "Music Lover"]
                    },
                    {
                        name: "Ganga Aarti Live",
                        location: "Dashashwamedh Ghat, Varanasi",
                        date: new Date("2024-11-21T18:30:00"),
                        entryFee: "Free",
                        image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Varanasi_Ghats.jpg",
                        audience: ["Tourist", "Family", "Photographer"]
                    }
                ],
                foodTrails: [
                    {
                        name: "Lucknow Street Food Walk",
                        type: "Food Walk",
                        description: "Explore the best Tunday Kababs and Chaat in Aminabad.",
                        priceRange: "₹800",
                        duration: "3 Hours",
                        audience: ["Tourist", "Foodie"]
                    }
                ],
                workshops: [
                    {
                        name: "Pottery Making Workshop",
                        type: "Craft",
                        duration: "2 Hours",
                        price: "₹1200",
                        skillLevel: "Beginner",
                        audience: ["Student", "Family"]
                    }
                ],
                festivalCalendar: [
                    {
                        name: "Kumbh Mela",
                        priority: 1,
                        date: new Date("2025-01-14"),
                        significance: "Largest human gathering",
                        images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Kumbh_Mela_Allahabad_2013.jpg/1200px-Kumbh_Mela_Allahabad_2013.jpg"],
                        audience: ["Tourist", "Researcher"]
                    }
                ]
            }
        };

        // 3. Update or Insert Culture
        const result = await Culture.findOneAndUpdate(
            { stateId: state._id },
            dummyData,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        console.log("SUCCESS: Culture data for Uttar Pradesh seeded successfully!");
        console.log(result);

        process.exit(0);
    } catch (error) {
        console.error("ERROR Seeding Data:", error);
        process.exit(1);
    }
};

seedCulture();
