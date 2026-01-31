require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Karnataka...");

        const stateName = "KARNATAKA";
        const stateSlug = "karnataka";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Karnataka" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "One State, Many Worlds. A hub of technology, heritage, and biodiversity.",
                image: "https://placehold.co/600x400?text=Karnataka+State",
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
                introduction: "Karnataka is a state in southwest India with Arabian Sea coastlines. It plays a pivotal role in India's IT sector while holding on to its rich history of the Vijayanagara Empire and Wodeyar dynasty.",
                lifestyle: "Bangalore (Bengaluru) offers a cosmopolitan lifestyle, while the rural areas maintain traditional agrarian values. Coffee culture is strong in Kodagu and Chikmagalur.",
                traditions: "The state is a melting pot of languages and cultures. 'Atithi Devo Bhava' is practiced. Classical arts like Carnatic music and Bharatanatyam are deeply rooted.",
                history: "Home to powerful empires like the Chalukyas, Hoysalas, and Vijayanagara, leaving behind magnificent architecture at Hampi, Belur, and Halebidu.",
                images: ["https://placehold.co/600x400?text=Karnataka+Overview"]
            },
            cuisine: {
                description: "Varies from Udupi vegetarian cuisine to the spicy non-veg dishes of the coast and Kodagu. Coconut, rice, and curry leaves are staples.",
                dishes: [
                    { name: "Bisi Bele Bath", type: "Veg", priceRange: "₹60–₹120", description: "Spicy rice and lentil dish with vegetables.", image: "https://placehold.co/600x400?text=Bisi+Bele" },
                    { name: "Mysore Masala Dosa", type: "Veg", priceRange: "₹80–₹150", description: "Crispy crepe smeared with red chutney and stuffed with potato filling.", image: "https://placehold.co/600x400?text=Masala+Dosa" },
                    { name: "Pandime Curry", type: "Non-Veg", priceRange: "₹300–₹500", description: "Iconic Coorgi pork curry made with Kachampuli (local vinegar).", image: "https://placehold.co/600x400?text=Pork+Curry" }
                ]
            },
            foodShops: [
                { name: "MTR (Mavalli Tiffin Room)", location: "Bangalore", famousDish: "Rava Idli", priceRange: "₹200–₹400", rating: 4.8, timings: "6:30 AM - 9:30 PM" },
                { name: "Vidyarthi Bhavan", location: "Bangalore", famousDish: "Benne Masala Dosa", priceRange: "₹100–₹200", rating: 4.7, timings: "6:30 AM - 11:30 AM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Yakshagana", type: "Folk/Theatre", description: "A traditional theatre form combining dance, music, dialogue, costume, make-up, and stage techniques.", image: "https://placehold.co/600x400?text=Yakshagana" },
                    { name: "Dollu Kunitha", type: "Folk", description: "A vigorous drum dance performed by the shepherd community.", image: "https://placehold.co/600x400?text=Dollu+Kunitha" }
                ],
                music: [
                    { name: "Carnatic Music", description: "Karnataka is one of the main pillars of Carnatic classical music." }
                ],
                instruments: [
                    { name: "Veena", description: "A plucked string instrument, central to Carnatic music." }
                ]
            },
            traditionalAttire: {
                men: { description: "Men wear a Dhoti (Panche) and a Shirt/Kurta with a Angavastram (stole).", attire: [{ name: "Mysore Peta", description: "Traditional silk turban worn by royalty and statesmen." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Sarees are the norm. Silk sarees are preferred for occasions.", attire: [{ name: "Mysore Silk Saree", description: "Famous for its purity, smooth texture, and gold zari." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Ilkal Saree", description: "Traditional saree with a distinct tope teni seragu (pallu)." }]
            },
            festivals: [
                { name: "Mysore Dasara", celebrationTime: "October", significance: "Royal Festival", description: "A 10-day extravaganza featuring a grand procession of the royal elephant carrying the idol of Goddess Chamundeshwari.", images: ["https://placehold.co/600x400?text=Mysore+Dasara"] },
                { name: "Ugadi", celebrationTime: "March/April", significance: "New Year", description: "Celebrated with 'Bevu-Bella' (neem and jaggery) signifying the mix of bitter and sweet experiences of life.", images: ["https://placehold.co/600x400?text=Ugadi"] },
                { name: "Hampi Utsav", celebrationTime: "November", significance: "Cultural Fest", description: "Held against the backdrop of Hampi ruins, celebrating the Vijayanagara legacy.", images: ["https://placehold.co/600x400?text=Hampi+Utsav"] }
            ],
            artAndHandicrafts: [
                { name: "Mysore Painting", type: "Painting", description: "Classical South Indian painting style known for elegance and attention to detail.", famousFor: "Gesso Work", images: ["https://placehold.co/600x400?text=Mysore+Painting"] },
                { name: "Channapatna Toys", type: "Handicraft", description: "Wooden toys coated with natural vegetable dyes.", famousFor: "Safe Toys" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Kambala", description: "Annual buffalo race held in the slushy paddy fields of coastal Karnataka." }],
                rituals: [{ title: "Bhuta Kola", description: "Spirit worship ritual performed in Tulu Nadu." }],
                dailyLife: "Blend of high-tech corporate life and slow-paced heritage living.",
                values: "Intellectualism and conservation of art."
            },
            culturalPlaces: [
                { name: "Hampi", type: "Historical Site", location: "Hampi", description: "UNESCO World Heritage site with ruins of the Vijayanagara Empire.", image: "https://placehold.co/600x400?text=Hampi" },
                { name: "Mysore Palace", type: "Palace", location: "Mysore", description: "A historical palace and a royal residence of the Wadiyar dynasty.", image: "https://placehold.co/600x400?text=Mysore+Palace" },
                { name: "Coorg", type: "Nature", location: "Kodagu", description: "Known as the Scotland of India, famous for coffee and culture.", image: "https://placehold.co/600x400?text=Coorg" }
            ],
            extraSections: [
                { title: "Languages", content: "Kannada is the official language. Tulu, Konkani, and Kodava are spoken in specific regions." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Bangalore Literature Festival", location: "Bangalore", date: new Date("2025-12-10"), entryFee: "Free", image: "https://placehold.co/600x400?text=Lit+Fest", audience: ["Intellectual"] }
                ],
                foodTrails: [
                    { name: "VV Puram Food Street", type: "Food Walk", description: "Famous food street in Bangalore.", priceRange: "₹300", duration: "2 Hours", audience: ["Foodie"] }
                ],
                workshops: [
                    { name: "Channapatna Toy Making", type: "Craft", duration: "3 Hours", price: "₹800", skillLevel: "Beginner", audience: ["Tourist"] }
                ],
                festivalCalendar: [
                    { name: "Mysore Dasara", priority: 1, date: new Date("2025-10-12"), significance: "Victory Procession", images: ["https://placehold.co/600x400?text=Dasara"], audience: ["Global"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: Karnataka seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
