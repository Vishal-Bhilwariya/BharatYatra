require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const State = require("../models/State");
const Culture = require("../models/Culture");

const seedCulture = async () => {
    try {
        await connectDB();
        console.log("Seeding Sikkim...");

        const stateName = "SIKKIM";
        const stateSlug = "sikkim";

        let state = await State.findOne({
            $or: [{ slug: stateSlug }, { name: stateName }, { name: "Sikkim" }]
        });

        if (!state) {
            state = await State.create({
                name: stateName,
                slug: stateSlug,
                description: "India's First Organic State, home to Kanchenjunga.",
                image: "https://placehold.co/600x400?text=Sikkim+State",
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
                introduction: "Sikkim is a small state in the Himalayas, known for its biodiversity and subtropical, temperate, sub-alpine, and alpine climates. It is home to Kanchenjunga, the highest peak in India.",
                lifestyle: "Peaceful and environmentally conscious. Sikkim is the first fully organic state in the world.",
                traditions: "A harmonious blend of Lepcha, Bhutia, and Nepali cultures.",
                history: "Formerly a Buddhist kingdom ruled by Chogyals, it merged with India in 1975.",
                images: ["https://placehold.co/600x400?text=Sikkim+Overview"]
            },
            cuisine: {
                description: "Noodle-based dishes and fermented foods are common.",
                dishes: [
                    { name: "Momo", type: "Non-Veg", priceRange: "₹50–₹100", description: "Steamed dumplings.", image: "https://placehold.co/600x400?text=Momo" },
                    { name: "Thukpa", type: "Veg", priceRange: "₹80–₹150", description: "Noodle soup.", image: "https://placehold.co/600x400?text=Thukpa" },
                    { name: "Gundruk", type: "Veg", priceRange: "₹50–₹100", description: "Fermented leafy green vegetable.", image: "https://placehold.co/600x400?text=Gundruk" }
                ]
            },
            foodShops: [
                { name: "Roll House", location: "Gangtok", famousDish: "Rolls", priceRange: "₹50–₹100", rating: 4.6, timings: "10 AM - 8 PM" }
            ],
            danceAndMusic: {
                dances: [
                    { name: "Mask Dance (Chaam)", type: "Ritual", description: "Performed by monks during festivals.", image: "https://placehold.co/600x400?text=Mask+Dance" },
                    { name: "Rechungma", type: "Folk", description: "Sikkimese folk dance.", image: "https://placehold.co/600x400?text=Rechungma" }
                ],
                music: [
                    { name: "Buddhist Chants", description: "Religious chanting is a common soundscape." }
                ],
                instruments: [
                    { name: "Dramyin", description: "Himalayan folk lute." }
                ]
            },
            traditionalAttire: {
                men: { description: "Bakhu (Kho).", attire: [{ name: "Bakhu", description: "A cloak-style garment." }], images: ["https://placehold.co/600x400?text=Men+Attire"] },
                women: { description: "Bakhu with Hanju (blouse).", attire: [{ name: "Pangden", description: "Striped apron worn by married women." }], images: ["https://placehold.co/600x400?text=Women+Attire"] },
                fabrics: [{ name: "Lepcha Weave", description: "Colorful handlooms." }]
            },
            festivals: [
                { name: "Losar", celebrationTime: "February", significance: "Tibetan New Year", description: "Marked by Chaam dances.", images: ["https://placehold.co/600x400?text=Losar"] },
                { name: "Saga Dawa", celebrationTime: "June", significance: "Buddha Purnima", description: "Celebrates the birth, enlightenment, and death of Buddha.", images: ["https://placehold.co/600x400?text=Saga+Dawa"] }
            ],
            artAndHandicrafts: [
                { name: "Thangka Painting", type: "Painting", description: "Buddhist religious painting on cotton/silk.", famousFor: "Scrolls", images: ["https://placehold.co/600x400?text=Thangka"] },
                { name: "Carpet Weaving", type: "Craft", description: "Tibetan style woolen carpets.", famousFor: "Rugs" }
            ],
            heritageAndTraditions: {
                customs: [{ title: "Khada", description: "Offering a white silk scarf as a sign of respect." }],
                rituals: [{ title: "Bumchu", description: "Sacred water ceremony." }],
                dailyLife: "Revolves around farming and monasteries.",
                values: "Peace and harmony."
            },
            culturalPlaces: [
                { name: "Rumtek Monastery", type: "Religious", location: "Gangtok", description: "Seat of the Karmapa Lama.", image: "https://placehold.co/600x400?text=Rumtek" },
                { name: "Nathula Pass", type: "Nature", location: "Border", description: "Mountain pass on the Indo-China border.", image: "https://placehold.co/600x400?text=Nathula" },
                { name: "Tsomgo Lake", type: "Nature", location: "Gangtok", description: "Glacial lake.", image: "https://placehold.co/600x400?text=Tsomgo" }
            ],
            extraSections: [
                { title: "Languages", content: "Nepali, Sikkimese, Lepcha, and English." }
            ],
            culturalExperience: {
                liveEvents: [
                    { name: "Red Panda Winter Festival", location: "Gangtok", date: new Date("2026-01-15"), entryFee: "Free", image: "https://placehold.co/600x400?text=Winter+Fest", audience: ["Family"] }
                ],
                foodTrails: [
                    { name: "MG Marg Food Walk", type: "Food Walk", description: "Traffic-free zone with great cafes.", priceRange: "₹300", duration: "2 Hours", audience: ["Tourist"] }
                ],
                workshops: [
                    { name: "Thangka Painting", type: "Art", duration: "4 Hours", price: "₹1000", skillLevel: "Beginner", audience: ["Artist"] }
                ],
                festivalCalendar: [
                    { name: "Losar", priority: 1, date: new Date("2025-02-28"), significance: "New Year", images: ["https://placehold.co/600x400?text=Losar"], audience: ["Global"] }
                ]
            }
        };

        await Culture.findOneAndUpdate({ stateId: state._id }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log("SUCCESS: Sikkim seeded.");
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

seedCulture();
