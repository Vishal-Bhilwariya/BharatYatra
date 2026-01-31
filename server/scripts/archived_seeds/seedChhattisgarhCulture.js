require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();

        console.log("Starting Seeding for Chhattisgarh...");

        // 1. Find or Create Chhattisgarh State
        const stateName = "CHHATTISGARH";
        const stateSlug = "chhattisgarh";

        // Try to find by slug OR name
        let state = await State.findOne({
            $or: [
                { slug: stateSlug },
                { name: stateName },
                { name: "Chhattisgarh" }
            ]
        });

        if (!state) {
            console.log(`State '${stateName}' not found. Creating it...`);
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "The Rice Bowl of India, known for its rich tribal heritage, ancient temples, and stunning waterfalls.",
                image: "https://placehold.co/600x400?text=Chhattisgarh+State",
                isActive: true
            });
        } else {
            console.log(`Found State by existing entry: ${state.name} (${state.slug})`);
            // Update existing state basic info
            state.name = stateName;
            state.slug = stateSlug;
            state.description = "The Rice Bowl of India, known for its rich tribal heritage, ancient temples, and stunning waterfalls.";
            state.image = "https://placehold.co/600x400?text=Chhattisgarh+State";
            state.isActive = true;
            await state.save();
        }

        console.log(`Found State: ${state.name} (${state._id})`);

        // 2. Prepare Chhattisgarh Data
        const chhattisgarhData = {
            stateId: state._id,
            stateName: stateName,
            overview: {
                introduction: "Chhattisgarh, carved out of Madhya Pradesh, is a land of surprises. Known as the 'Rice Bowl of India', it boasts a rich cultural heritage heavily influenced by its tribal population. The state is home to the majestic Chitrakote Waterfalls, often called the Niagara of India, and profound historical significance.",
                lifestyle: "The lifestyle is a beautiful blend of tribal traditions and modern simplicity. Agriculture is the primary occupation. The tribal communities like Gonds and Baigas preserve their unique customs, living in harmony with the dense forests.",
                traditions: "The state is famous for its vibrant tribal traditions, unique marriage customs, and community living. Hospitality is central to the culture, with guests treated with great respect.",
                history: "Historically known as Dakshin Kosala, the region finds mention in the Ramayana. It has been ruled by various dynasties including the Kalachuris and Marathas, leaving behind a legacy of temples and forts.",
                images: ["https://placehold.co/600x400?text=Chhattisgarh+Overview"]
            },
            cuisine: {
                description: "The cuisine of Chhattisgarh is distinct and uses rice, red ant chutney, and green vegetables extensively. It is simple yet flavorful.",
                dishes: [
                    { name: "Muthia", type: "Veg", priceRange: "₹50–₹100", description: "Steamed dumplings made from rice batter and seasoned with spices.", image: "https://placehold.co/600x400?text=Muthia" },
                    { name: "Chila", type: "Veg", priceRange: "₹40–₹80", description: "A flatbread made with rice batter, often enjoyed as a breakfast item.", image: "https://placehold.co/600x400?text=Chila" },
                    { name: "Chaprah (Red Ant Chutney)", type: "Non-Veg", priceRange: "₹100–₹200", description: "A unique tribal delicacy made from red ants and their eggs, known for its sharp, tangy taste.", image: "https://placehold.co/600x400?text=Red+Ant+Chutney" }
                ]
            },
            foodShops: [
                { name: "Gadh Kaleva", location: "Raipur", famousDish: "Chila and Fara", priceRange: "₹100–₹300", rating: 4.7, timings: "10 AM - 9 PM" },
                { name: "Manju Mamta Restaurant", location: "Raipur", famousDish: "Thali", priceRange: "₹200–₹500", rating: 4.3, timings: "11 AM - 11 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Panthi", type: "Folk", description: "A high-energy dance performed by the Satnami community, characterized by rapid movements and acrobatics.", image: "https://placehold.co/600x400?text=Panthi+Dance" },
                    { name: "Raut Nacha", type: "Folk", description: "Performed by the Yadav community during Diwali, resembling the Raas Leela of Lord Krishna.", image: "https://placehold.co/600x400?text=Raut+Nacha" }
                ],
                music: [
                    { name: "Pandwani", description: "A lyrical folk ballad form that narrates the story of the Mahabharata. Teejan Bai is a world-renowned exponent." },
                    { name: "Karma", description: "Tribal music and dance performed during the Karma festival to please the Karma deity." }
                ],
                instruments: [
                    { name: "Mandar", description: "A cylindrical drum used in tribal dances." },
                    { name: "Tambura", description: "A string instrument used to accompany Pandwani singing." }
                ]
            },
            traditionalAttire: {
                men: { description: "Men in tribal areas often wear a short Dhoti and a headgear (Pagri). In urban areas, Kurta-Pajama is common.", attire: [{ name: "Dhoti", description: "Short cotton wrap for the lower body." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Women prefer knee-length sarees, often worn in the 'Kachhora' style. Tribal women love colorful jewelry.", attire: [{ name: "Lugda", description: "Traditional saree worn by local women." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Kosa Silk", description: "A variety of Tussar silk produced in the Korba and Champa districts, known for its texture and durability." }]
            },
            festivals: [
                { name: "Bastar Dussehra", celebrationTime: "October", significance: "75-day long festival", description: "Unique because it doesn't celebrate the killing of Ravana but pays homage to Goddess Danteshwari.", images: ["https://placehold.co/600x400?text=Bastar+Dussehra"] },
                { name: "Hareli", celebrationTime: "August", significance: "Agricultural Festival", description: "Marks the beginning of the sowing season. Farmers worship their equipment and cows.", images: ["https://placehold.co/600x400?text=Hareli"] },
                { name: "Madai Festival", celebrationTime: "December to March", significance: "Tribal gathering", description: "A traveling festival dedicated to the local goddess Kesharpal Kesharpalin Devi.", images: ["https://placehold.co/600x400?text=Madai+Festival"] }
            ],
            artAndHandicrafts: [
                { name: "Dhokra Art", type: "Metal Casting", description: "Ancient Lost-wax casing technique used to create artifacts from bell metal (brass and bronze).", famousFor: "Figurines and jewelry", images: ["https://placehold.co/600x400?text=Dhokra+Art"] },
                { name: "Terracotta", type: "Pottery", description: "Clay pottery and sculptures, often depicting tribal life and animals.", famousFor: "Decorative items" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Ghotul", description: "A traditional dormitory system among the Muria tribe for youth socialization and education." }],
                rituals: [{ title: "Karma Puja", description: "Worship of the Karma tree for prosperity." }],
                dailyLife: "Tribal life is closely linked to nature. Collection of forest produce like Tendu patta is common.",
                values: "Simplicity, community living, and reverence for nature."
            },
            culturalPlaces: [
                { name: "Chitrakote Falls", type: "Natural Wonder", location: "Bastar", description: "The widest waterfall in India, located on the Indravati River, known for its horseshoe shape.", image: "https://placehold.co/600x400?text=Chitrakote+Falls" },
                { name: "Bhoramdeo Temple", type: "Religious Site", location: "Kabirdham", description: "Often called the Khajuraho of Chhattisgarh due to its erotic sculptures and architectural style.", image: "https://placehold.co/600x400?text=Bhoramdeo+Temple" },
                { name: "Barnawapara Wildlife Sanctuary", type: "Wildlife", location: "Mahasamund", description: "Home to diverse wildlife including leopards, sloth bears, and gaur.", image: "https://placehold.co/600x400?text=Barnawapara" }
            ],
            extraSections: [
                { title: "Languages", content: "Chhattisgarhi is the most widely spoken language. Hindi is the official language. Tribal dialects like Gondi and Halbi are also prevalent." }
            ],
            culturalExperience: {
                liveEvents: [
                    {
                        name: "Chakradhar Samaroh",
                        location: "Raigarh",
                        date: new Date("2025-09-10T18:00:00"),
                        entryFee: "₹200",
                        image: "https://placehold.co/600x400?text=Chakradhar+Samaroh",
                        audience: ["Music Lover", "Tourist"]
                    },
                    {
                        name: "Bastar Dussehra Procession",
                        location: "Jagdalpur",
                        date: new Date("2025-10-12T16:00:00"),
                        entryFee: "Free",
                        image: "https://placehold.co/600x400?text=Dussehra+Procession",
                        audience: ["Tourist", "Photographer"]
                    }
                ],
                foodTrails: [
                    {
                        name: "Raipur Street Food Walk",
                        type: "Food Walk",
                        description: "Experience the taste of Chila, Fara, and Samosas.",
                        priceRange: "₹400",
                        duration: "3 Hours",
                        audience: ["Foodie", "Tourist"]
                    }
                ],
                workshops: [
                    {
                        name: "Dokra Art Workshop",
                        type: "Craft",
                        duration: "4 Hours",
                        price: "₹1500",
                        skillLevel: "Beginner",
                        audience: ["Artist", "Student"]
                    }
                ],
                festivalCalendar: [
                    {
                        name: "Hareli",
                        priority: 2,
                        date: new Date("2025-08-04"),
                        significance: "First Festival of Chhattisgarh",
                        images: ["https://placehold.co/600x400?text=Hareli"],
                        audience: ["Farmer", "Family"]
                    }
                ]
            }
        };

        // 3. Update or Insert Culture
        const result = await Culture.findOneAndUpdate(
            { stateId: state._id },
            chhattisgarhData,
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
