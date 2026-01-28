require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();

        // 1. Find or Create Andhra Pradesh State
        const stateName = "Andhra Pradesh";
        let state = await State.findOne({ name: stateName });

        if (!state) {
            console.log(`State '${stateName}' not found. Creating it...`);
            state = await State.create({
                name: stateName,
                slug: "andhra-pradesh",
                description: "The Rice Bowl of India, known for its spiritual heritage, spicy cuisine, and Kuchipudi dance.",
                image: "https://placehold.co/1200x600?text=Andhra+Pradesh+State",
                isActive: true
            });
        }

        console.log(`Found State: ${state.name} (${state._id})`);

        // 2. Prepare AP Data
        const apData = {
            stateId: state._id,
            stateName: stateName,
            overview: {
                introduction: "Andhra Pradesh, the Koh-i-Noor of India, is a land where history, culture, and nature blend seamlessly. Known for its distinct culture, it is the birthplace of the classical dance form Kuchipudi and home to the world’s richest temple at Tirumala.",
                lifestyle: "Life in Andhra Pradesh is a harmonious blend of agrarian traditions and modern aspirations. The people are deeply spiritual and place high value on family and education. Hospitality is a core trait.",
                traditions: "The state follows rich traditions centered around temples and harvest festivals. Kalamkari art, wooden toys of Kondapalli, and exquisite handlooms are integral parts of its heritage.",
                history: "From the Satavahanas to the Vijayanagara Empire, Andhra Pradesh has a regal history. It has been a significant center of Buddhism and a hub of art and architecture for centuries.",
                images: ["https://placehold.co/800x600?text=Andhra+Culture+Overview"]
            },
            cuisine: {
                description: "Andhra cuisine is renowned for being the spiciest in India. It features a rich variety of pickles (Pachadis), tangy tamarind flavors, and generous use of chili.",
                dishes: [
                    { name: "Pulihora", type: "Veg", priceRange: "₹50–₹150", description: "Tamarind rice flavored with spices, curry leaves, and peanuts, often served as prasadam in temples.", image: "https://placehold.co/600x400?text=Pulihora" },
                    { name: "Gongura Mutton", type: "Non-Veg", priceRange: "₹300–₹600", description: "A spicy mutton curry cooked with sorrel leaves (Gongura), a signature dish of the region.", image: "https://placehold.co/600x400?text=Gongura+Mutton" },
                    { name: "Pootharekulu", type: "Sweet", priceRange: "₹20–₹50/pc", description: "A paper-thin sweet made from rice starch, sugar/jaggery, and ghee, originating from Atreyapuram.", image: "https://placehold.co/600x400?text=Pootharekulu" }
                ]
            },
            foodShops: [
                { name: "Subbayya Gari Hotel", location: "Kakinada", famousDish: "Butta Bhojanam", priceRange: "₹200–₹400", rating: 4.9, timings: "11 AM - 10 PM" },
                { name: "Babai Hotel", location: "Vijayawada", famousDish: "Idli with Ghee", priceRange: "₹50–₹150", rating: 4.7, timings: "6 AM - 10 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Kuchipudi", type: "Classical", description: "A classical dance drama from the village of Kuchipudi, known for its graceful movements and strong narrative.", image: "https://placehold.co/600x400?text=Kuchipudi" },
                    { name: "Dhimsa", type: "Tribal", description: "A tribal dance performed by the Porja caste women in the Araku Valley region.", image: "https://placehold.co/600x400?text=Dhimsa+Dance" }
                ],
                music: [
                    { name: "Carnatic Music", description: "Andhra Pradesh has contributed significantly to Carnatic music, with legends like Tyagaraja and Annamacharya composing immortal kirtanas.", image: "https://placehold.co/600x400?text=Carnatic+Music" }
                ],
                instruments: [
                    { name: "Veena", description: "The Saraswati Veena is a prominent instrument in Carnatic music, widely played and taught in the state.", image: "https://placehold.co/600x400?text=Veena" },
                    { name: "Mridangam", description: "A double-headed drum that provides the rhythmic accompaniment in Carnatic concerts.", image: "https://placehold.co/600x400?text=Mridangam" }
                ]
            },
            traditionalAttire: {
                men: { description: "Traditional attire consists of a Dhoti (Pancha) worn with a Kurta or a shirt, and sometimes a Kanduva (scarf) on the shoulder.", attire: [{ name: "Pancha Kattu", description: "Dhoti draped in a specific traditional style." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Women wear Sarees, with diverse weaving styles from different regions like Dharmavaram and Mangalagiri.", attire: [{ name: "Dharmavaram Saree", description: "Silk sarees known for their broad colored borders and intricate designs." }], images: ["https://placehold.co/600x400?text=Women+Saree"] },
                fabrics: [{ name: "Kalamkari", description: "Hand-painted or block-printed cotton textile produced in Iskapally and Srikalahasti." }]
            },
            festivals: [
                { name: "Sankranti", celebrationTime: "January", significance: "Harvest Festival", description: "A major four-day festival celebrated with rangolis (Muggulu), bonfires (Bhogi), and cockfights.", images: ["https://placehold.co/800x600?text=Sankranti"] },
                { name: "Ugadi", celebrationTime: "March/April", significance: "Telugu New Year", description: "Celebrated with the preparing of Ugadi Pachadi, a dish capable of six varied tastes representing life's experiences.", images: ["https://placehold.co/800x600?text=Ugadi"] },
                { name: "Brahmotsavam", celebrationTime: "September/October", significance: "Tirumala Festival", description: "A grand nine-day festival at the Tirumala Venkateswara Temple.", images: ["https://placehold.co/800x600?text=Brahmotsavam"] }
            ],
            artAndHandicrafts: [
                { name: "Kondapalli Toys", type: "Woodcraft", description: "Lightweight wooden toys made in Kondapalli near Vijayawada.", famousFor: "Dasara Dolls", images: ["https://placehold.co/600x400?text=Kondapalli+Toys"] },
                { name: "Kalamkari", type: "Painting", description: "Ancient style of hand painting on cotton fabric.", famousFor: "Wall hangings and Sarees", images: ["https://placehold.co/600x400?text=Kalamkari+Painting"] }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Intiperu", description: "The usage of family surnames (Intiperu) is a distinct cultural practice among Telugus." }],
                rituals: [{ title: "Aksharabhyasam", description: "Initiation of education for children, typically done at Saraswati temples." }],
                dailyLife: "Mornings often begin with filter coffee and prayer. Rice is the staple food for lunch and dinner.",
                values: "Strong emphasis on art, culture, and preservation of the Telugu language."
            },
            culturalPlaces: [
                { name: "Tirumala Venkateswara Temple", type: "Religious Site", location: "Tirupati", description: "The richest and most visited Hindu temple in the world, dedicated to Lord Venkateswara.", image: "https://placehold.co/800x600?text=Tirumala+Temple" },
                { name: "Undavalli Caves", type: "Monument", location: "Vijayawada", description: "Monolithic rock-cut caves featuring a huge statue of Vishnu in reclining posture.", image: "https://placehold.co/800x600?text=Undavalli+Caves" },
                { name: "Araku Valley", type: "Nature", location: "Visakhapatnam", description: "A hill station famous for its coffee plantations and tribal culture.", image: "https://placehold.co/800x600?text=Araku+Valley" }
            ],
            extraSections: [
                { title: "Languages", content: "Telugu is the official language and is known as the 'Italian of the East'. Urdu is also spoken in some parts." }
            ],
            culturalExperience: {
                liveEvents: [
                    {
                        name: "Kuchipudi Dance Recital",
                        location: "Kalakshetra, Visakhapatnam",
                        date: new Date("2024-12-15T18:00:00"),
                        entryFee: "₹300",
                        image: "https://placehold.co/600x400?text=Kuchipudi+Event",
                        audience: ["Tourist", "Art Lover"]
                    },
                    {
                        name: "Sankranti Fair",
                        location: "Swarna Bharathi Trust, Vijayawada",
                        date: new Date("2025-01-14T10:00:00"),
                        entryFee: "₹50",
                        image: "https://placehold.co/600x400?text=Sankranti+Fair",
                        audience: ["Family", "Tourist"]
                    }
                ],
                foodTrails: [
                    {
                        name: "Kakinada Sweet & Spice Walk",
                        type: "Food Walk",
                        description: "Sample the famous Kaja and Subbayya Hotel meals.",
                        priceRange: "₹600",
                        duration: "2.5 Hours",
                        audience: ["Foodie", "Tourist"]
                    }
                ],
                workshops: [
                    {
                        name: "Kalamkari Art Workshop",
                        type: "Craft",
                        duration: "3 Hours",
                        price: "₹1000",
                        skillLevel: "Beginner",
                        audience: ["Student", "Artist"]
                    }
                ],
                festivalCalendar: [
                    {
                        name: "Sankranti",
                        priority: 1,
                        date: new Date("2025-01-14"),
                        significance: "Grand Harvest Festival",
                        images: ["https://placehold.co/600x400?text=Sankranti+Calendar"],
                        audience: ["Family"]
                    }
                ]
            }
        };

        // 3. Update or Insert Culture
        const result = await Culture.findOneAndUpdate(
            { stateId: state._id },
            apData,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        console.log("SUCCESS: Culture data for Andhra Pradesh seeded successfully!");
        console.log(result);

        process.exit(0);
    } catch (error) {
        console.error("ERROR Seeding Data:", error);
        process.exit(1);
    }
};

seedCulture();
