const fs = require('fs');
const path = require('path');

const stateData = {
    state: {
        name: "Chhattisgarh",
        slug: "chhattisgarh",
        description: "Chhattisgarh, the 'Rice Bowl of Central India', is known for its dense forests, stunning waterfalls, and rich tribal heritage.",
        culturalSummary: "The state has a distinct tribal culture with unique dance forms like Panthi and Raut Nacha, and is famous for its Dhokra metal craft.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Chitrakot_Waterfall.jpg/800px-Chitrakot_Waterfall.jpg",
        isActive: true
    },
    culture: {
        stateName: "Chhattisgarh",
        overview: {
            introduction: "Carved out of Madhya Pradesh, Chhattisgarh is a land of surprises, with 44% forest cover.",
            lifestyle: "Tribal communities like Gond, Baiga, and Muria lead a nature-centric life.",
            traditions: "Nature worship and community dancing are central to traditions.",
            history: "Anciently known as Dakshin Kosala.",
            images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Chitrakot_Waterfall.jpg/800px-Chitrakot_Waterfall.jpg"]
        },
        cuisine: {
            description: "Rice and rice flour are staples, with a focus on leafy vegetables and light spices.",
            dishes: [
                { name: "Chila", type: "Veg", priceRange: "₹40", description: "Rice flour pancake.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Chila.jpg/800px-Chila.jpg" },
                { name: "Fara", type: "Veg", priceRange: "₹50", description: "Steamed rice dumplings.", image: "" },
                { name: "Muthia", type: "Veg", priceRange: "₹60", description: "Steamed dumplings of rice batter and spices.", image: "" },
                { name: "Chaprah Chutney", type: "Non-Veg", priceRange: "₹50", description: "Red ant chutney (seasonal).", image: "" },
                { name: "Bafauri", type: "Veg", priceRange: "₹50", description: "Steamed chana dal balls.", image: "" }
            ]
        },
        foodShops: [
            { name: "Gadh Kaleva", location: "Raipur", famousFor: "Traditional Thali", priceRange: "₹200", rating: 4.8, timings: "10 AM - 8 PM" }
        ],
        danceAndMusic: {
            dances: [
                { name: "Panthi", type: "Folk", description: "Devotional dance of the Satnami community.", image: "" },
                { name: "Raut Nacha", type: "Folk", description: "Cowherd dance performed during Diwali.", image: "" }
            ],
            music: [{ name: "Pandwani", description: "Musical narration of Mahabharata.", image: "" }],
            instruments: [{ name: "Mandar", description: "Drum.", image: "" }]
        },
        traditionalAttire: {
            men: { description: "Dhoti and Headgear.", attire: [{ name: "Pagri", description: "Turban." }], images: [] },
            women: { description: "Lugda (Saree).", attire: [{ name: "Kosa Silk Saree", description: "Tussar silk." }], images: [] },
            fabrics: [{ name: "Kosa Silk", description: "Wild silk from Korba/Champa." }]
        },
        festivals: [
            { name: "Bastar Dussehra", celebrationTime: "September/October", significance: "Goddess Danteshwari", description: "World's longest festival lasting 75 days.", images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Bastar_Dussehra.jpg/800px-Bastar_Dussehra.jpg"] },
            { name: "Hareli", celebrationTime: "July", significance: "Agriculture", description: "Festival of greenery and farm tools.", images: [] },
            { name: "Madai", celebrationTime: "Winter", significance: "Tribal Goddess", description: "Traveling festival of Gonds.", images: [] }
        ],
        artAndHandicrafts: [
            { name: "Dhokra Art", type: "Metal Craft", description: "Lost-wax casting technique using brass/bronze.", famousFor: "Tribal figures", images: [] },
            { name: "Terracotta", type: "Clay Craft", description: "Pottery and figures.", famousFor: "Bastar", images: [] }
        ],
        heritageAndTraditions: {
            customs: [{ title: "Ghotul", description: "Youth dormitory system in Muria tribe (declining)." }],
            rituals: [{ title: "Nature Worship", description: "Worship of trees and earth." }],
            dailyLife: "Simple agrarian life.",
            values: "Community and harmony with nature."
        },
        culturalPlaces: [
            { name: "Bhoramdeo Temple", type: "Temple", location: "Kawardha", description: "Khajuraho of Chhattisgarh.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Bhoramdeo_Temple.jpg/800px-Bhoramdeo_Temple.jpg" }
        ],
        extraSections: [
            { title: "Minerals", content: "One of the richest mineral producing states (Coal, Iron Ore, Steel)." }
        ],
        culturalExperience: {
            liveEvents: [],
            foodTrails: [],
            workshops: [],
            festivalCalendar: [
                { name: "Bastar Dussehra", priority: 1, date: "2025-10-01", significance: "Tribal Festival", images: [], audience: ["Cultural Tourist"] }
            ]
        },
        isActive: true
    },
    cities: [
        {
            name: "Raipur", slug: "raipur", description: "Capital city and commercial hub.", history: "Founded by Kalchuri King.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Raipur_Atal_Nagar.jpg/800px-Raipur_Atal_Nagar.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Swami Vivekanand Sarovar", category: "nature", description: "Burha Talab.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "City", isActive: true },
                { name: "Marine Drive", category: "nature", description: "Telibandha Talab.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "Telibandha", isActive: true },
                { name: "Mahant Ghasidas Museum", category: "museum", description: "Oldest museum.", images: [], bestTimeToVisit: "Day", entryFee: "₹10", location: "Civil Lines", isActive: true },
                { name: "Nandan Van Zoo", category: "nature", description: "Zoo safari.", images: [], bestTimeToVisit: "Day", entryFee: "₹100", location: "Nava Raipur", isActive: true },
                { name: "Purkhouti Muktangan", category: "culture", description: "Open air museum.", images: [], bestTimeToVisit: "Day", entryFee: "₹50", location: "Nava Raipur", isActive: true },
                { name: "Kevalya Dham", category: "temple", description: "Jain temple.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "Kumhari", isActive: true },
                { name: "Jatmai Ghatarani", category: "nature", description: "Waterfall and temple.", images: [], bestTimeToVisit: "Monsoon", entryFee: "Free", location: "80km away", isActive: true },
                { name: "Mata Kaushalya Temple", category: "temple", description: "Only temple of Ram's mother.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Chandkhuri", isActive: true },
                { name: "Gandhi Udyan", category: "nature", description: "Park.", images: [], bestTimeToVisit: "Morning", entryFee: "Free", location: "City", isActive: true },
                { name: "MM Fun City", category: "other", description: "Water park.", images: [], bestTimeToVisit: "Summer", entryFee: "₹500", location: "Outskirts", isActive: true }
            ],
            foods: [
                { name: "Chila", type: "veg", description: "Rice pancake.", famousFor: "Breakfast", approxPrice: "₹40", image: "", isActive: true },
                { name: "Fara", type: "veg", description: "Steamed snack.", famousFor: "Light meal", approxPrice: "₹50", image: "", isActive: true },
                { name: "Muthia", type: "veg", description: "Dumplings.", famousFor: "Snack", approxPrice: "₹60", image: "", isActive: true },
                { name: "Poha", type: "veg", description: "Flattened rice.", famousFor: "Breakfast", approxPrice: "₹20", image: "", isActive: true },
                { name: "Jalebi", type: "sweet", description: "Sweet.", famousFor: "Dessert", approxPrice: "₹20", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Swami Vivekanand Airport", connectivity: "Major cities", approxCost: "₹3000+", isActive: true },
                { type: "train", description: "Raipur Junction", connectivity: "Hub", approxCost: "₹200+", isActive: true },
                { type: "bus", description: "ISBT", connectivity: "Statewide", approxCost: "₹100+", isActive: true },
                { type: "taxi", description: "Ola/Uber", connectivity: "City wide", approxCost: "₹150+", isActive: true },
                { type: "auto", description: "Autos", connectivity: "Local", approxCost: "₹30+", isActive: true }
            ]
        },
        {
            name: "Jagdalpur", slug: "jagdalpur", description: "Tourism capital of Bastar.", history: "Kakatiya dynasty.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Chitrakot_Waterfall.jpg/800px-Chitrakot_Waterfall.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Chitrakote Falls", category: "nature", description: "Niagara of India.", images: [], isActive: true },
                { name: "Tirathgarh Falls", category: "nature", description: "Step waterfall.", images: [], isActive: true },
                { name: "Kanger Valley National Park", category: "nature", description: "Caves and biodiversity.", images: [], isActive: true },
                { name: "Kotumsar Cave", category: "nature", description: "Limestone cave.", images: [], isActive: true },
                { name: "Danteshwari Temple", category: "temple", description: "Shakti Peeth.", images: [], isActive: true }
            ],
            foods: [
                { name: "Chaprah Chutney", type: "non-veg", description: "Red Ant.", famousFor: "Tribal delicacy", approxPrice: "₹50", image: "", isActive: true },
                { name: "Mahua Drink", type: "beverage", description: "Flower wine.", famousFor: "Local", approxPrice: "₹50", image: "", isActive: true },
                { name: "Landa", type: "beverage", description: "Rice beer.", famousFor: "Tribal", approxPrice: "₹40", image: "", isActive: true },
                { name: "Bamboo Shoot Curry", type: "veg", description: "Kareel.", famousFor: "Seasonal", approxPrice: "₹100", image: "", isActive: true },
                { name: "Dubraj Rice", type: "veg", description: "Aromatic rice.", famousFor: "Staple", approxPrice: "₹50", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Jagdalpur Airport", connectivity: "Regional", approxCost: "₹2000+", isActive: true },
                { type: "train", description: "Jagdalpur Station", connectivity: "Vizag line", approxCost: "₹150", isActive: true }
            ]
        },
        {
            name: "Bilaspur", slug: "bilaspur", description: "Judicial capital.", history: "Rice quality.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Bilaspur_High_Court.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Kanan Pendari", category: "nature", description: "Zoo.", images: [], isActive: true },
                { name: "Achanakmar Tiger Reserve", category: "nature", description: "Wildlife.", images: [], isActive: true },
                { name: "Ratanpur", category: "heritage", description: "Ancient capital.", images: [], isActive: true },
                { name: "Mahamaya Temple", category: "temple", description: "Pilgrimage.", images: [], isActive: true },
                { name: "Khutaghat Dam", category: "nature", description: "Picnic.", images: [], isActive: true }
            ],
            foods: [
                { name: "Doobraj Rice", type: "veg", description: "Fine rice.", famousFor: "Quality", approxPrice: "₹80/kg", image: "", isActive: true },
                { name: "Samosa", type: "veg", description: "Snack.", famousFor: "Local", approxPrice: "₹10", image: "", isActive: true },
                { name: "Bafauri", type: "veg", description: "Steam balls.", famousFor: "Healthy", approxPrice: "₹40", image: "", isActive: true },
                { name: "Thethari", type: "veg", description: "Besan snack.", famousFor: "Crunchy", approxPrice: "₹50/kg", image: "", isActive: true },
                { name: "Khurmi", type: "sweet", description: "Wheet sweet.", famousFor: "Festive", approxPrice: "₹100/kg", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Bilaspur Jn", connectivity: "Zonal HQ", approxCost: "₹200+", isActive: true },
                { type: "flight", description: "Bilasa Devi Airport", connectivity: "Regional", approxCost: "₹2000+", isActive: true }
            ]
        },
        {
            name: "Durg-Bhilai", slug: "durg-bhilai", description: "Twin cities, Steel City.", history: "Industrial.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Bhilai_Steel_Plant.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Maitri Bagh", category: "nature", description: "Zoo and park.", images: [], isActive: true },
                { name: "Civic Center", category: "other", description: "Start.", images: [], isActive: true },
                { name: "Tandula Dam", category: "nature", description: "Picnic.", images: [], isActive: true },
                { name: "Devbaloda", category: "temple", description: "Shiva temple.", images: [], isActive: true },
                { name: "Ganga Maiya", category: "temple", description: "Jhalmala.", images: [], isActive: true }
            ],
            foods: [
                { name: "Street Food", type: "veg", description: "Chaat.", famousFor: "Civic center", approxPrice: "₹30", image: "", isActive: true },
                { name: "South Indian", type: "veg", description: "Dosa.", famousFor: "Community", approxPrice: "₹50", image: "", isActive: true },
                { name: "Bara", type: "veg", description: "Vada.", famousFor: "Snack", approxPrice: "₹20", image: "", isActive: true },
                { name: "Bore Baasi", type: "veg", description: "Fermented rice.", famousFor: "Summer", approxPrice: "₹20", image: "", isActive: true },
                { name: "Tea", type: "beverage", description: "Coffee House.", famousFor: "Intellectual", approxPrice: "₹20", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Durg Jn", connectivity: "Major", approxCost: "₹200+", isActive: true }
            ]
        },
        {
            name: "Korba", slug: "korba", description: "Power capital.", history: "Coal.", image: "https://upload.wikimedia.org/wikipedia/commons/2/22/Korba_Super_Thermal_Power_Plant.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Satrenga", category: "nature", description: "Boating spot.", images: [], isActive: true },
                { name: "Bango Dam", category: "nature", description: "Dam.", images: [], isActive: true },
                { name: "Chaiturgarh", category: "fort", description: "Fort and temple.", images: [], isActive: true },
                { name: "Golden Island", category: "nature", description: "Resort.", images: [], isActive: true },
                { name: "Kosagai Garh", category: "fort", description: "Hill fort.", images: [], isActive: true }
            ],
            foods: [
                { name: "Kosa Bari", type: "veg", description: "Pulse nuggets.", famousFor: "Curry", approxPrice: "₹100/kg", image: "", isActive: true },
                { name: "Fish", type: "non-veg", description: "Dam fish.", famousFor: "Fresh", approxPrice: "₹150", image: "", isActive: true },
                { name: "Rice", type: "veg", description: "Meal.", famousFor: "Staple", approxPrice: "₹50", image: "", isActive: true },
                { name: "Bhaji", type: "veg", description: "Leafy veg.", famousFor: "Healthy", approxPrice: "₹20", image: "", isActive: true },
                { name: "Chicken", type: "non-veg", description: "Curry.", famousFor: "Spicy", approxPrice: "₹200", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Korba Station", connectivity: "Terminus", approxCost: "₹150", isActive: true }
            ]
        },
        {
            name: "Ambikapur", slug: "ambikapur", description: "Cleanest small city.", history: "Surguja.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Mainpat.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Mainpat", category: "nature", description: "Shimla of CG.", images: [], isActive: true },
                { name: "Mahamaya Temple", category: "temple", description: "Shakti Peeth.", images: [], isActive: true },
                { name: "Tiger Point", category: "nature", description: "Waterfall.", images: [], isActive: true },
                { name: "Chendra Falls", category: "nature", description: "Picnic.", images: [], isActive: true },
                { name: "Tattapani", category: "nature", description: "Hot spring.", images: [], isActive: true }
            ],
            foods: [
                { name: "Tibetan Food", type: "non-veg", description: "Mainpat.", famousFor: "Refugees", approxPrice: "₹100", image: "", isActive: true },
                { name: "Moth Dal", type: "veg", description: "Lentil.", famousFor: "Local", approxPrice: "₹60", image: "", isActive: true },
                { name: "Rice", type: "veg", description: "Staple.", famousFor: "Jeeraphool", approxPrice: "₹70/kg", image: "", isActive: true },
                { name: "Samosa", type: "veg", description: "Snack.", famousFor: "Common", approxPrice: "₹10", image: "", isActive: true },
                { name: "Jalebi", type: "sweet", description: "Sweet.", famousFor: "Dessert", approxPrice: "₹20", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Ambikapur Station", connectivity: "Terminus", approxCost: "₹150", isActive: true },
                { type: "flight", description: "Darima Airport", connectivity: "Upcoming", approxCost: "₹0", isActive: true }
            ]
        },
        {
            name: "Raigarh", slug: "raigarh", description: "Cultural capital.", history: "Princely state.", image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Raigarh_Fort.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Ram Jharna", category: "nature", description: "Waterfall.", images: [], isActive: true },
                { name: "Singhanpur Caves", category: "heritage", description: "Rock paintings.", images: [], isActive: true },
                { name: "Gomarda Sanctuary", category: "nature", description: "Wildlife.", images: [], isActive: true },
                { name: "Chakradhar Samaroh", category: "culture", description: "Music venue.", images: [], isActive: true },
                { name: "Kamla Nehru Park", category: "nature", description: "Park.", images: [], isActive: true }
            ],
            foods: [
                { name: "Kosa Silk", type: "other", description: "Not food.", famousFor: "Buying", approxPrice: "₹2000", image: "", isActive: true },
                { name: "Rice", type: "veg", description: "Staple.", famousFor: "Meal", approxPrice: "₹50", image: "", isActive: true },
                { name: "Muthia", type: "veg", description: "Steam.", famousFor: "Snack", approxPrice: "₹40", image: "", isActive: true },
                { name: "Bjaji", type: "veg", description: "Greens.", famousFor: "Side", approxPrice: "₹20", image: "", isActive: true },
                { name: "Chicken", type: "non-veg", description: "Curry.", famousFor: "Spicy", approxPrice: "₹200", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Raigarh Station", connectivity: "Main line", approxCost: "₹200", isActive: true }
            ]
        },
        {
            name: "Rajnandgaon", slug: "rajnandgaon", description: "Sanskaridhani.", history: "Literature.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Dongargarh.jpg/800px-Dongargarh.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Dongargarh", category: "temple", description: "Bambleshwari Temple.", images: [], isActive: true },
                { name: "Kharkhara Dam", category: "nature", description: "Dam.", images: [], isActive: true },
                { name: "Mata Sheetala Devi", category: "temple", description: "Temple.", images: [], isActive: true },
                { name: "Prgyagiri", category: "temple", description: "Buddhist.", images: [], isActive: true },
                { name: "Patal Bhairavi", category: "temple", description: "Temple.", images: [], isActive: true }
            ],
            foods: [
                { name: "Rakhia Badi", type: "veg", description: "Ash gourd nuggets.", famousFor: "Curry", approxPrice: "₹100/kg", image: "", isActive: true },
                { name: "Poha", type: "veg", description: "Snack.", famousFor: "Breakfast", approxPrice: "₹20", image: "", isActive: true },
                { name: "Jalebi", type: "sweet", description: "Sweet.", famousFor: "Pair", approxPrice: "₹20", image: "", isActive: true },
                { name: "Samosa", type: "veg", description: "Snack.", famousFor: "Common", approxPrice: "₹10", image: "", isActive: true },
                { name: "Tea", type: "beverage", description: "Drink.", famousFor: "Break", approxPrice: "₹10", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Rajnandgaon Station", connectivity: "Main line", approxCost: "₹150", isActive: true }
            ]
        },
        {
            name: "Kawardha", slug: "kawardha", description: "Kabirdham.", history: "Gateway to Kanha.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Bhoramdeo_Temple.jpg/800px-Bhoramdeo_Temple.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Bhoramdeo Temple", category: "temple", description: "Erotic sculptures.", images: [], isActive: true },
                { name: "Saroda Dam", category: "nature", description: "Dam.", images: [], isActive: true },
                { name: "Chilpi Ghati", category: "nature", description: "Scenic drive.", images: [], isActive: true },
                { name: "Madwa Mahal", category: "heritage", description: "Wedding hall.", images: [], isActive: true },
                { name: "Cherki Mahal", category: "heritage", description: "Shepherd temple.", images: [], isActive: true }
            ],
            foods: [
                { name: "Gud Bheli", type: "sweet", description: "Jaggery.", famousFor: "Sugarcane", approxPrice: "₹40/kg", image: "", isActive: true },
                { name: "Rice", type: "veg", description: "Staple.", famousFor: "Meal", approxPrice: "₹50", image: "", isActive: true },
                { name: "Dal", type: "veg", description: "Lentil.", famousFor: "Side", approxPrice: "₹40", image: "", isActive: true },
                { name: "Roti", type: "veg", description: "Bread.", famousFor: "Dinner", approxPrice: "₹10", image: "", isActive: true },
                { name: "Sabzi", type: "veg", description: "Mix veg.", famousFor: "Side", approxPrice: "₹50", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "Bus", connectivity: "Road only", approxCost: "₹150", isActive: true }
            ]
        },
        {
            name: "Dhamtari", slug: "dhamtari", description: "Rice and timber.", history: "Mahanadi.", image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Gangrel_Dam.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Gangrel Dam", category: "nature", description: "Largest dam.", images: [], isActive: true },
                { name: "Sihava", category: "heritage", description: "Origin of Mahanadi.", images: [], isActive: true },
                { name: "Angaarmoti Temple", category: "temple", description: "Goddess.", images: [], isActive: true },
                { name: "Madamsilli Dam", category: "nature", description: "Syphon dam.", images: [], isActive: true },
                { name: "Rudri Barrage", category: "nature", description: "Canal.", images: [], isActive: true }
            ],
            foods: [
                { name: "Fish Fry", type: "non-veg", description: "Dam fish.", famousFor: "Fresh", approxPrice: "₹100", image: "", isActive: true },
                { name: "Chila", type: "veg", description: "Pancake.", famousFor: "Local", approxPrice: "₹30", image: "", isActive: true },
                { name: "Fara", type: "veg", description: "Dumpling.", famousFor: "Snack", approxPrice: "₹40", image: "", isActive: true },
                { name: "Rice", type: "veg", description: "Staple.", famousFor: "Quality", approxPrice: "₹50", image: "", isActive: true },
                { name: "Sweets", type: "sweet", description: "Local.", famousFor: "Dessert", approxPrice: "₹100", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Dhamtari Station", connectivity: "Narrow gauge", approxCost: "₹50", isActive: true },
                { type: "bus", description: "Bus", connectivity: "Frequent", approxCost: "₹100", isActive: true }
            ]
        }
    ]
};

const outputPath = path.join(__dirname, '../../data/generated/Chhattisgarh.json');
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(stateData, null, 2));
console.log(`Generated Chhattisgarh data at ${outputPath}`);
