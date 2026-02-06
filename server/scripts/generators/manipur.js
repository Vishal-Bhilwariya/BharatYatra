const fs = require('fs');
const path = require('path');

const stateData = {
    state: {
        name: "Manipur",
        slug: "manipur",
        description: "Manipur, the 'Jewel of India', is a stunning mosaic of emerald valleys, blue lakes, and vibrant culture, famous for Loktak Lake and its classical dance.",
        culturalSummary: "Manipuri culture is a unique blend of Sanamahism and Vaishnavism, characterized by Ras Leela, martial arts like Thang-Ta, and handloom traditions.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Loktak_Lake.jpg/800px-Loktak_Lake.jpg",
        isActive: true
    },
    culture: {
        stateName: "Manipur",
        overview: {
            introduction: "Nestled in the Northeast, Manipur is protected by hills on all sides with an oval valley in the center.",
            lifestyle: "Community-oriented with strong sports culture (birthplace of Polo).",
            traditions: "Lai Haraoba is a ritualistic festival pleasing forest deities.",
            history: "Ancient kingdom with a recorded history dating back to 33 AD.",
            images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Loktak_Lake.jpg/800px-Loktak_Lake.jpg"]
        },
        cuisine: {
            description: "Healthy, organic, and steam-cooked, featuring fermented fish (Ngari) and aromatic herbs.",
            dishes: [
                { name: "Eromba", type: "Non-Veg", priceRange: "₹80", description: "Mashed vegetables with fermented fish.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Eromba.jpg/800px-Eromba.jpg" },
                { name: "Kangshoi", type: "Veg", priceRange: "₹60", description: "Vegetable stew.", image: "" },
                { name: "Singju", type: "Veg", priceRange: "₹40", description: "Spicy salad.", image: "" },
                { name: "Chak-Hao Kheer", type: "Sweet", priceRange: "₹100", description: "Black rice pudding.", image: "" },
                { name: "Nga Thongba", type: "Non-Veg", priceRange: "₹150", description: "Fish curry.", image: "" }
            ]
        },
        foodShops: [
            { name: "Luxmi Kitchen", location: "Imphal", famousFor: "Manipuri Thali", priceRange: "₹250", rating: 4.6, timings: "10 AM - 9 PM" }
        ],
        danceAndMusic: {
            dances: [
                { name: "Manipuri Ras Leela", type: "Classical", description: "Devotional dance of Radha-Krishna.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Manipuri_Dance.jpg/800px-Manipuri_Dance.jpg" },
                { name: "Pung Cholom", type: "Folk", description: "Drum dance.", image: "" },
                { name: "Thang-Ta", type: "Martial Art", description: "Sword and spear dance.", image: "" }
            ],
            music: [{ name: "Pena", description: "Ancient bowed instrument.", image: "" }],
            instruments: [{ name: "Pung", description: "Hand drum.", image: "" }]
        },
        traditionalAttire: {
            men: { description: "Dhoti and Jacket.", attire: [{ name: "Pheijom", description: "Dhoti." }], images: [] },
            women: { description: "Phanek and Innaphi.", attire: [{ name: "Phanek", description: "Sarong." }, { name: "Innaphi", description: "Shawl." }], images: [] },
            fabrics: [{ name: "Moirang Phee", description: "Temple border fabric." }]
        },
        festivals: [
            { name: "Yaoshang", celebrationTime: "February/March", significance: "Holi", description: "5-day festival with Thabal Chongba dance.", images: [] },
            { name: "Lai Haraoba", celebrationTime: "May", significance: "Creation", description: "Worship of ancestors.", images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Lai_Haraoba.jpg/800px-Lai_Haraoba.jpg"] },
            { name: "Ningol Chakouba", celebrationTime: "November", significance: "Family", description: "Feast for married daughters.", images: [] }
        ],
        artAndHandicrafts: [
            { name: "Kauna Craft", type: "Craft", description: "Reed mats and cushions.", famousFor: "Eco-friendly", images: [] },
            { name: "Longpi Pottery", type: "Pottery", description: "Black stone pottery.", famousFor: "Cooking", images: [] }
        ],
        heritageAndTraditions: {
            customs: [{ title: "Sanatombi", description: "Princess lore." }],
            rituals: [{ title: "Sanamahi", description: "Household deity worship." }],
            dailyLife: "Ema Keithel market life.",
            values: "Respect for elders and nature."
        },
        culturalPlaces: [
            { name: "Kangla Fort", type: "Heritage", location: "Imphal", description: "Ancient capital.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Kangla_Fort.jpg/800px-Kangla_Fort.jpg" }
        ],
        extraSections: [
            { title: "Mother's Market", content: "Ima Keithel is the world's only all-women run market." }
        ],
        culturalExperience: {
            liveEvents: [],
            foodTrails: [],
            workshops: [],
            festivalCalendar: [
                { name: "Sangai Festival", priority: 1, date: "2025-11-21", significance: "Tourism", images: [], audience: ["Tourists"] }
            ]
        },
        isActive: true
    },
    cities: [
        {
            name: "Imphal", slug: "imphal", description: "Capital City.", history: "Kangla.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Kangla_Fort.jpg/800px-Kangla_Fort.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Kangla Fort", category: "heritage", description: "Seat of power.", images: [], bestTimeToVisit: "Day", entryFee: "₹20", location: "City Center", isActive: true },
                { name: "Ima Keithel", category: "culture", description: "Women's market.", images: [], bestTimeToVisit: "Morning", entryFee: "Free", location: "City Center", isActive: true },
                { name: "Shree Govindajee Temple", category: "temple", description: "Vaishnavite.", images: [], bestTimeToVisit: "Morning", entryFee: "Free", location: "Palace Compound", isActive: true },
                { name: "War Cemetery", category: "heritage", description: "WWII.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Deulahland", isActive: true },
                { name: "Manipur State Museum", category: "museum", description: "Artifacts.", images: [], bestTimeToVisit: "Day", entryFee: "₹10", location: "Near Polo Ground", isActive: true },
                { name: "Loktak Lake", category: "nature", description: "Floating lake.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Moirang (45km)", isActive: true },
                { name: "Keibul Lamjao", category: "nature", description: "Dancing deer.", images: [], bestTimeToVisit: "Morning", entryFee: "₹30", location: "Moirang", isActive: true },
                { name: "Singda Dam", category: "nature", description: "Highest mud dam.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Outskirts", isActive: true },
                { name: "Three Mothers Art Gallery", category: "museum", description: "Wood carving.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Thangmeiband", isActive: true },
                { name: "Matai Garden", category: "nature", description: "Garden.", images: [], bestTimeToVisit: "Evening", entryFee: "₹20", location: "Mata", isActive: true }
            ],
            foods: [
                { name: "Eromba", type: "non-veg", description: "Fermented fish mash.", famousFor: "Luxmi Kitchen", approxPrice: "₹80", image: "", isActive: true },
                { name: "Singju", type: "veg", description: "Spicy salad.", famousFor: "Street", approxPrice: "₹30", image: "", isActive: true },
                { name: "Bora", type: "veg", description: "Fritters.", famousFor: "Evening", approxPrice: "₹20", image: "", isActive: true },
                { name: "Chak-Hao Kheer", type: "sweet", description: "Purple pudding.", famousFor: "Dessert", approxPrice: "₹50", image: "", isActive: true },
                { name: "Momos", type: "non-veg", description: "Dumplings.", famousFor: "Snack", approxPrice: "₹60", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Bir Tikendrajit International Airport", connectivity: "Major Cities", approxCost: "₹4000+", isActive: true },
                { type: "bus", description: "ISBT", connectivity: "Interstate", approxCost: "₹500+", isActive: true },
                { type: "auto", description: "Auto", connectivity: "City", approxCost: "₹30+", isActive: true },
                { type: "taxi", description: "Taxi", connectivity: "City", approxCost: "₹200+", isActive: true }
            ]
        },
        {
            name: "Moirang", slug: "moirang", description: "Historic Town.", history: "INA.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/INA_Museum_Moirang.jpg/800px-INA_Museum_Moirang.jpg", isPopular: true, isActive: true,
            places: [
                { name: "INA Museum", category: "museum", description: "Indian National Army.", images: [], isActive: true },
                { name: "Loktak Lake", category: "nature", description: "Phumdis.", images: [], isActive: true },
                { name: "Sendra Island", category: "nature", description: "Viewpoint.", images: [], isActive: true },
                { name: "Red Hill", category: "heritage", description: "WWII Battle.", images: [], isActive: true },
                { name: "Thangjing Temple", category: "temple", description: "Ancient deity.", images: [], isActive: true }
            ],
            foods: [
                { name: "Fish Curry", type: "non-veg", description: "Fresh from lake.", famousFor: "Local", approxPrice: "₹150", image: "", isActive: true },
                { name: "Thongba", type: "veg", description: "Curry.", famousFor: "Simple", approxPrice: "₹60", image: "", isActive: true },
                { name: "Heikru", type: "veg", description: "Gooseberry.", famousFor: "Snack", approxPrice: "₹10", image: "", isActive: true },
                { name: "Black Rice", type: "veg", description: "Aromatic.", famousFor: "Staple", approxPrice: "₹100", image: "", isActive: true },
                { name: "Tea", type: "beverage", description: "Red tea.", famousFor: "Hot", approxPrice: "₹10", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "Bus from Imphal", connectivity: "Road", approxCost: "₹50", isActive: true }
            ]
        },
        {
            name: "Ukhrul", slug: "ukhrul", description: "Land of Shirui Lily.", history: "Tangkhul.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Shirui_Hills.jpg/800px-Shirui_Hills.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Shirui Kashong Peak", category: "nature", description: "Lily habitat.", images: [], isActive: true },
                { name: "Khayang Peak", category: "nature", description: "Trekking.", images: [], isActive: true },
                { name: "Nillai Tea Estate", category: "nature", description: "Green tea.", images: [], isActive: true },
                { name: "Khangkhui Cave", category: "nature", description: "Limestone.", images: [], isActive: true },
                { name: "Duncan Park", category: "nature", description: "Relax.", images: [], isActive: true }
            ],
            foods: [
                { name: "Pork Curry", type: "non-veg", description: "Smoked.", famousFor: "Tribal", approxPrice: "₹200", image: "", isActive: true },
                { name: "Zat pui", type: "veg", description: "Sticky rice.", famousFor: "Meal", approxPrice: "₹50", image: "", isActive: true },
                { name: "Sikok", type: "veg", description: "Salad.", famousFor: "Fresh", approxPrice: "₹30", image: "", isActive: true },
                { name: "Plum", type: "veg", description: "Fruit.", famousFor: "Local", approxPrice: "₹50/kg", image: "", isActive: true },
                { name: "Rice Beer", type: "beverage", description: "Local brew.", famousFor: "Traditional", approxPrice: "₹50", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "Bus/Sumo", connectivity: "Hilly", approxCost: "₹200", isActive: true }
            ]
        },
        {
            name: "Churachandpur", slug: "churachandpur", description: "Lamka.", history: "Tribal hub.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Khuga_Dam.jpg/800px-Khuga_Dam.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Khuga Dam", category: "nature", description: "Picnic.", images: [], isActive: true },
                { name: "Ngaloi Falls", category: "nature", description: "Waterfall.", images: [], isActive: true },
                { name: "Tipaimukh", category: "nature", description: "Confluence.", images: [], isActive: true },
                { name: "Tonglon Cave", category: "nature", description: "Cave.", images: [], isActive: true },
                { name: "Tribal Museum", category: "museum", description: "Artifacts.", images: [], isActive: true }
            ],
            foods: [
                { name: "Smoked Meat", type: "non-veg", description: "Preserved.", famousFor: "Kitchen", approxPrice: "₹300/kg", image: "", isActive: true },
                { name: "Boiled Veg", type: "veg", description: "Healthy.", famousFor: "Daily", approxPrice: "₹40", image: "", isActive: true },
                { name: "Chilli Chutney", type: "veg", description: "Spicy.", famousFor: "Side", approxPrice: "₹20", image: "", isActive: true },
                { name: "Bamboo Shoot", type: "veg", description: "Fermented.", famousFor: "Curry", approxPrice: "₹50", image: "", isActive: true },
                { name: "Passion Fruit", type: "veg", description: "Juice.", famousFor: "Drink", approxPrice: "₹20", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "Bus", connectivity: "Road", approxCost: "₹150", isActive: true }
            ]
        },
        {
            name: "Senapati", slug: "senapati", description: "Land of Butterflies.", history: "Naga.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Dzukou_Valley.jpg/800px-Dzukou_Valley.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Dzukou Valley", category: "nature", description: "Trekking paradise.", images: [], isActive: true },
                { name: "Sadu Chiru Waterfalls", category: "nature", description: "Cascades.", images: [], isActive: true },
                { name: "Yangkhullen", category: "heritage", description: "Hanging village.", images: [], isActive: true },
                { name: "Mao", category: "nature", description: "Hill station.", images: [], isActive: true },
                { name: "Maram Khullen", category: "heritage", description: "Ancient village.", images: [], isActive: true }
            ],
            foods: [
                { name: "Potato", type: "veg", description: "Farm fresh.", famousFor: "Mao", approxPrice: "₹30/kg", image: "", isActive: true },
                { name: "Naga Curry", type: "non-veg", description: "Simple.", famousFor: "Home", approxPrice: "₹100", image: "", isActive: true },
                { name: "Dried Fish", type: "non-veg", description: "Fry.", famousFor: "Side", approxPrice: "₹50", image: "", isActive: true },
                { name: "Squash", type: "veg", description: "Boiled.", famousFor: "Veg", approxPrice: "₹20", image: "", isActive: true },
                { name: "King Chilli", type: "veg", description: "Hottest.", famousFor: "Spice", approxPrice: "₹10/pc", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "Bus", connectivity: "NH-2", approxCost: "₹100", isActive: true }
            ]
        }
    ]
};

const outputPath = path.join(__dirname, '../../data/generated/Manipur.json');
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(stateData, null, 2));
console.log(`Generated Manipur data at ${outputPath}`);
