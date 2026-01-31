require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();

        console.log("Starting Seeding for Goa...");

        // 1. Find or Create Goa State
        const stateName = "GOA";
        const stateSlug = "goa";

        // Try to find by slug OR name
        let state = await State.findOne({
            $or: [
                { slug: stateSlug },
                { name: stateName },
                { name: "Goa" }
            ]
        });

        if (!state) {
            console.log(`State '${stateName}' not found. Creating it...`);
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "Pearl of the Orient, known for its sun-kissed beaches, Portuguese heritage, and vibrant nightlife.",
                image: "https://placehold.co/600x400?text=Goa+State",
                isActive: true
            });
        } else {
            console.log(`Found State by existing entry: ${state.name} (${state.slug})`);
            // Update existing state basic info
            state.name = stateName;
            state.slug = stateSlug;
            state.description = "Pearl of the Orient, known for its sun-kissed beaches, Portuguese heritage, and vibrant nightlife.";
            state.image = "https://placehold.co/600x400?text=Goa+State";
            state.isActive = true;
            await state.save();
        }

        console.log(`Found State: ${state.name} (${state._id})`);

        // 2. Prepare Goa Data
        const goaData = {
            stateId: state._id,
            stateName: stateName,
            overview: {
                introduction: "Goa is a kaleidoscope of Indian and Portuguese cultures, sweetened with sun, sea, sand, seafood, and spirituality. Famous for its beaches, it also boasts world-heritage architecture and a unique 'Susegad' (laid-back) way of life.",
                lifestyle: "The Goan lifestyle is synonymous with 'Susegad'—a relaxed, contented attitude. It's a blend of Konkani roots and Portuguese influence, visible in their siestas, music, and love for football.",
                traditions: "Goan traditions are a harmonious mix of Hindu and Catholic customs. The common thread is the love for music, dance, and community feasts.",
                history: "Ruled by the Portuguese for over 450 years, Goa has a distinct history compared to the rest of India. It became part of India in 1961. The colonial influence is evident in its churches, forts, and old quarters.",
                images: ["https://placehold.co/600x400?text=Goa+Overview"]
            },
            cuisine: {
                description: "Goan cuisine is famous for its rich variety of fish dishes cooked with elaborate recipes. Coconut and coconut oil, along with chili peppers, spices, and vinegar, are widely used.",
                dishes: [
                    { name: "Goan Fish Curry", type: "Non-Veg", priceRange: "₹200–₹400", description: "The staple dish, a tangy and spicy curry usually made with Kingfish or Pomfret and coconut milk.", image: "https://placehold.co/600x400?text=Fish+Curry" },
                    { name: "Pork Vindaloo", type: "Non-Veg", priceRange: "₹300–₹500", description: "A spicy, tangy curry inspired by Portuguese cuisine, made with pork, garlic, and vinegar.", image: "https://placehold.co/600x400?text=Vindaloo" },
                    { name: "Bebinca", type: "Sweet", priceRange: "₹250–₹500", description: "The 'Queen of Goan Desserts', a multi-layered cake made from flour, sugar, ghee, and coconut milk.", image: "https://placehold.co/600x400?text=Bebinca" }
                ]
            },
            foodShops: [
                { name: "Mum's Kitchen", location: "Panaji", famousDish: "Pork Vindaloo", priceRange: "₹500–₹1000", rating: 4.6, timings: "11 AM - 11 PM" },
                { name: "Fisherman's Wharf", location: "Salcette", famousDish: "Goan Prawn Curry", priceRange: "₹800–₹1500", rating: 4.5, timings: "12 PM - 11 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Fugdi", type: "Folk", description: "A spirited folk dance performed by women during Hindu festivals like Ganesh Chaturthi.", image: "https://placehold.co/600x400?text=Fugdi" },
                    { name: "Dekhni", type: "Folk", description: "A semi-classical dance form that combines Indian melody with Western rhythm.", image: "https://placehold.co/600x400?text=Dekhni" }
                ],
                music: [
                    { name: "Mando", description: "A musical form that evolved during the 19th and 20th century, representing the meeting point of Indian and Western traditions." },
                    { name: "Fado", description: "A melancholic style of Portuguese singing often performed in restaurants and cultural events." }
                ],
                instruments: [
                    { name: "Ghumat", description: "An earthen drum covered with monitor lizard skin (now goat skin), the state instrument of Goa." },
                    { name: "Violin", description: "Widely used in Goan Catholic music and Mando performances." }
                ]
            },
            traditionalAttire: {
                men: { description: "Historically, men wore a loincloth or dhoti. The Portuguese influence introduced Western clothing early on. Fishermen often wear bright shirts and shorts.", attire: [{ name: "Western Wear", description: "Shirts and Trousers are standard." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "The traditional attire for Hindu women is the nine-yard saree (Nauvari). Catholic women often wore Western dresses or a distinct dress called 'Pano Bhaju'.", attire: [{ name: "Kunbi Saree", description: "A simple, checkered cotton saree worn by the tribal Kunbi women." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Kunbi Cotton", description: "Sturdy, checkered cotton dyed in red and white." }]
            },
            festivals: [
                { name: "Goa Carnival", celebrationTime: "February", significance: "Pre-Lenten festival", description: "A vibrant parade of floats, music, and dancing, led by King Momo, celebrating eating, drinking, and merrymaking.", images: ["https://placehold.co/600x400?text=Carnival"] },
                { name: "Shigmo", celebrationTime: "March", significance: "Spring Festival", description: "The Goan version of Holi, featuring traditional folk dances and mythology-inspired floats.", images: ["https://placehold.co/600x400?text=Shigmo"] },
                { name: "Sao Joao", celebrationTime: "June", significance: "Feast of St. John the Baptist", description: "Celebrated by leaping into wells and rivers to retrieve gifts thrown in.", images: ["https://placehold.co/600x400?text=Sao+Joao"] }
            ],
            artAndHandicrafts: [
                { name: "Azulejos", type: "Painting", description: "The art of painted tin-glazed ceramic tilework, a legacy of the Portuguese.", famousFor: "Decorative structure tiles", images: ["https://placehold.co/600x400?text=Azulejos"] },
                { name: "Coconut Craft", type: "Handicraft", description: "Various items like spoons, bowls, and masks made from coconut shells.", famousFor: "Souvenirs" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Siesta", description: "The tradition of taking an afternoon nap shops often close between 1 PM and 4 PM." }],
                rituals: [{ title: "Ladainha", description: "A litany sung in Latin or Konkani during Christian religious gatherings." }],
                dailyLife: "Revolves around tourism, fishing, and community gatherings.",
                values: "Hospitality, tolerance, and 'Susegad' (contentment)."
            },
            culturalPlaces: [
                { name: "Basilica of Bom Jesus", type: "Religious Site", location: "Old Goa", description: "A UNESCO World Heritage Site containing the mortal remains of St. Francis Xavier.", image: "https://placehold.co/600x400?text=Basilica" },
                { name: "Fort Aguada", type: "Historical Site", location: "Candolim", description: "A 17th-century Portuguese fort and lighthouse standing on Sinquerim Beach.", image: "https://placehold.co/600x400?text=Fort+Aguada" },
                { name: "Latin Quarter (Fontainhas)", type: "Heritage Site", location: "Panaji", description: "Known for its narrow streets and colorful Portuguese-style villas.", image: "https://placehold.co/600x400?text=Fontainhas" }
            ],
            extraSections: [
                { title: "Languages", content: "Konkani is the official language. Marathi, Hindi, and English are also widely spoken. Portuguese is spoken by older generations." }
            ],
            culturalExperience: {
                liveEvents: [
                    {
                        name: "Sunburn Festival",
                        location: "Vagator",
                        date: new Date("2025-12-27T16:00:00"),
                        entryFee: "₹2500",
                        image: "https://placehold.co/600x400?text=Sunburn",
                        audience: ["Music Lover", "Youth"]
                    },
                    {
                        name: "IFFI (Film Festival)",
                        location: "Panaji",
                        date: new Date("2025-11-20T10:00:00"),
                        entryFee: "Registration Req.",
                        image: "https://placehold.co/600x400?text=IFFI",
                        audience: ["Cinephile", "Artist"]
                    }
                ],
                foodTrails: [
                    {
                        name: "Panjim Heritage & Food Walk",
                        type: "Food Walk",
                        description: "Explore old bakeries and taverns in Fontainhas.",
                        priceRange: "₹1200",
                        duration: "2 Hours",
                        audience: ["Foodie", "Tourist"]
                    }
                ],
                workshops: [
                    {
                        name: "Feni Tasting & Distillation Tour",
                        type: "Culinary",
                        duration: "3 Hours",
                        price: "₹1500",
                        skillLevel: "Beginner",
                        audience: ["Tourist", "Adult"]
                    }
                ],
                festivalCalendar: [
                    {
                        name: "Goa Carnival",
                        priority: 1,
                        date: new Date("2025-02-10"),
                        significance: "Cultural Parade",
                        images: ["https://placehold.co/600x400?text=Carnival+Date"],
                        audience: ["Tourist", "Family"]
                    }
                ]
            }
        };

        // 3. Update or Insert Culture
        const result = await Culture.findOneAndUpdate(
            { stateId: state._id },
            goaData,
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
