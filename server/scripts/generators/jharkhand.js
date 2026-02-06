const fs = require('fs');
const path = require('path');

const stateData = {
    state: {
        name: "Jharkhand",
        slug: "jharkhand",
        description: "Jharkhand, the 'Land of Forests', is celebrated for its waterfalls, lush greenery, and rich tribal heritage.",
        culturalSummary: "Jharkhand's culture is deeply rooted in nature, with tribal festivals like Sarhul and Karma, and distinct art forms like Sohrai.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Chitrakot_Waterfall.jpg/800px-Chitrakot_Waterfall.jpg", // Using a placeholder waterfall, specific Jharkhand one if available
        isActive: true
    },
    culture: {
        stateName: "Jharkhand",
        overview: {
            introduction: "Carved out of Bihar, Jharkhand is a mineral-rich state home to indigenous communities like Santhals, Mundas, and Oraons.",
            lifestyle: "Tribal lifestyle living in harmony with forests and nature.",
            traditions: "Adoration of nature is central to all festivals and rituals.",
            history: "Legendary freedom fighter Birsa Munda hails from here.",
            images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Chitrakot_Waterfall.jpg/800px-Chitrakot_Waterfall.jpg"]
        },
        cuisine: {
            description: "Rustic and earthy, with limited use of spices and heavy reliance on rice and locally available greens.",
            dishes: [
                { name: "Dhuska", type: "Veg", priceRange: "₹40", description: "Deep-fried rice and lentil pancake.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Litti_Chokha.jpg/800px-Litti_Chokha.jpg" }, // Reuse Litti style image or generic
                { name: "Chilka Roti", type: "Veg", priceRange: "₹30", description: "Rice flour crepe.", image: "" },
                { name: "Bamboo Shoot Curry", type: "Veg", priceRange: "₹80", description: "Curry made from young bamboo shoots.", image: "" },
                { name: "Malpua", type: "Sweet", priceRange: "₹40", description: "Sweet pancake.", image: "" },
                { name: "Thekua", type: "Sweet", priceRange: "₹50", description: "Wheat cookie.", image: "" }
            ]
        },
        foodShops: [
            { name: "Kaveri Restaurant", location: "Ranchi", famousFor: "Thali", priceRange: "₹300", rating: 4.4, timings: "11 AM - 10 PM" }
        ],
        danceAndMusic: {
            dances: [
                { name: "Chhau", type: "Folk", description: "Masked martial dance.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Chhau_Dance.jpg/800px-Chhau_Dance.jpg" },
                { name: "Jhumair", type: "Folk", description: "Community dance.", image: "" },
                { name: "Paika", type: "Folk", description: "War dance.", image: "" }
            ],
            music: [{ name: "Nagpuri", description: "Folk songs.", image: "" }],
            instruments: [{ name: "Mandar", description: "Drum.", image: "" }]
        },
        traditionalAttire: {
            men: { description: "Bhagwan (single piece cloth).", attire: [{ name: "Dhoti", description: "Wrap." }], images: [] },
            women: { description: "Saree.", attire: [{ name: "Paria", description: "Saree draped in tribal style." }], images: [] },
            fabrics: [{ name: "Kuchai Silk", description: "Organic silk." }]
        },
        festivals: [
            { name: "Sarhul", celebrationTime: "Spring", significance: "Nature Worship", description: "Worship of Sal trees.", images: [] },
            { name: "Karma", celebrationTime: "Monsoon", significance: "Bond", description: "Brother-sister festival.", images: [] },
            { name: "Sohrai", celebrationTime: "Winter", significance: "Cattle", description: "Cattle worship and art.", images: [] }
        ],
        artAndHandicrafts: [
            { name: "Sohrai Painting", type: "Painting", description: "Mural art on mud walls.", famousFor: "Hazaribagh", images: [] },
            { name: "Dokra Art", type: "Metal", description: "Lost wax casting.", famousFor: "Brass figurines", images: [] }
        ],
        heritageAndTraditions: {
            customs: [{ title: "Akhra", description: "Village meeting place." }],
            rituals: [{ title: "Pahan", description: "Village priest rituals." }],
            dailyLife: "Mining and agriculture.",
            values: "Community and simplicity."
        },
        culturalPlaces: [
            { name: "Baidyanath Jyotirlinga", type: "Temple", location: "Deoghar", description: "One of the 12 Jyotirlingas.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Baba_Baidyanath_Temple.jpg/800px-Baba_Baidyanath_Temple.jpg" }
        ],
        extraSections: [
            { title: "Waterfalls", content: "Jharkhand is known as the land of waterfalls, with Hundru, Jonha, and Dassam falls being famous." }
        ],
        culturalExperience: {
            liveEvents: [],
            foodTrails: [],
            workshops: [],
            festivalCalendar: [
                { name: "Sarhul", priority: 1, date: "2025-04-04", significance: "Nature", images: [], audience: ["Tribal", "Tourist"] }
            ]
        },
        isActive: true
    },
    cities: [
        {
            name: "Ranchi", slug: "ranchi", description: "City of Waterfalls.", history: "Summer capital of Bihar.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Hundru_Falls_Ranchi.jpg/800px-Hundru_Falls_Ranchi.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Hundru Falls", category: "nature", description: "High waterfall.", images: [], bestTimeToVisit: "Monsoon", entryFee: "₹30", location: "Outskirts", isActive: true },
                { name: "Jonha Falls", category: "nature", description: "Gautamdhara.", images: [], bestTimeToVisit: "Monsoon", entryFee: "₹30", location: "Outskirts", isActive: true },
                { name: "Dassam Falls", category: "nature", description: "River Kanchi.", images: [], bestTimeToVisit: "Monsoon", entryFee: "₹30", location: "Outskirts", isActive: true },
                { name: "Pahari Mandir", category: "temple", description: "Shiva temple on hill.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Ratu Road", isActive: true },
                { name: "Jagannath Temple", category: "temple", description: "Replica of Puri.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Dhurwa", isActive: true },
                { name: "Rock Garden", category: "nature", description: "Park.", images: [], bestTimeToVisit: "Evening", entryFee: "₹20", location: "Kanke Road", isActive: true },
                { name: "Tagore Hill", category: "heritage", description: "Rabindranath Tagore.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "Morabadi", isActive: true },
                { name: "Patratu Valley", category: "nature", description: "Scenic drive.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Patratu", isActive: true },
                { name: "War Memorial", category: "heritage", description: "Army.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Booty More", isActive: true },
                { name: "Nakshatra Van", category: "nature", description: "Zodiac park.", images: [], bestTimeToVisit: "Evening", entryFee: "₹10", location: "Raj Bhavan", isActive: true }
            ],
            foods: [
                { name: "Dhuska", type: "veg", description: "Fried snack.", famousFor: "Breakfast", approxPrice: "₹40", image: "", isActive: true },
                { name: "Litti Chokha", type: "veg", description: "Roasted balls.", famousFor: "Lunch", approxPrice: "₹50", image: "", isActive: true },
                { name: "Mutton Curry", type: "non-veg", description: "Spicy.", famousFor: "Tribal style", approxPrice: "₹300", image: "", isActive: true },
                { name: "Pitha", type: "veg", description: "Rice dumping.", famousFor: "Winter", approxPrice: "₹40", image: "", isActive: true },
                { name: "Handia", type: "beverage", description: "Rice beer.", famousFor: "Tribal", approxPrice: "₹50", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Birsa Munda Airport", connectivity: "Major cities", approxCost: "₹3000+", isActive: true },
                { type: "train", description: "Ranchi Junction", connectivity: "Hub", approxCost: "₹200+", isActive: true },
                { type: "bus", description: "Govt Bus Stand", connectivity: "Statewide", approxCost: "₹50+", isActive: true },
                { type: "auto", description: "Auto", connectivity: "City", approxCost: "₹30+", isActive: true },
                { type: "taxi", description: "Ola/Uber", connectivity: "City", approxCost: "₹150+", isActive: true }
            ]
        },
        {
            name: "Jamshedpur", slug: "jamshedpur", description: "Steel City.", history: "Jamsetji Tata.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Jubilee_Park_Jamshedpur.jpg/800px-Jubilee_Park_Jamshedpur.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Jubilee Park", category: "nature", description: "Mughal gardens.", images: [], isActive: true },
                { name: "Dimna Lake", category: "nature", description: "Reservoir.", images: [], isActive: true },
                { name: "Tata Steel Zoological Park", category: "nature", description: "Zoo.", images: [], isActive: true },
                { name: "Russel Modi Centre", category: "culture", description: "Art.", images: [], isActive: true },
                { name: "Dalma Hills", category: "nature", description: "Wildlife.", images: [], isActive: true }
            ],
            foods: [
                { name: "Masala Cold Drink", type: "beverage", description: "Soda.", famousFor: "Bistupur", approxPrice: "₹30", image: "", isActive: true },
                { name: "Dosa", type: "veg", description: "South Indian.", famousFor: "Madrasi", approxPrice: "₹80", image: "", isActive: true },
                { name: "Egg Roll", type: "non-veg", description: "Roll.", famousFor: "Street", approxPrice: "₹50", image: "", isActive: true },
                { name: "Chicken Chaap", type: "non-veg", description: "Fry.", famousFor: "Spicy", approxPrice: "₹150", image: "", isActive: true },
                { name: "Pani Puri", type: "veg", description: "Snack.", famousFor: "Tangy", approxPrice: "₹20", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Tatanagar Jn", connectivity: "Major Hub", approxCost: "₹200", isActive: true }
            ]
        },
        {
            name: "Dhanbad", slug: "dhanbad", description: "Coal Capital.", history: "Mining.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Dhanbad_Station.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Maithon Dam", category: "nature", description: "Dam.", images: [], isActive: true },
                { name: "Panchet Dam", category: "nature", description: "Dam.", images: [], isActive: true },
                { name: "Bhatinda Falls", category: "nature", description: "Waterfall.", images: [], isActive: true },
                { name: "Shakti Mandir", category: "temple", description: "Temple.", images: [], isActive: true },
                { name: "Topchanchi Lake", category: "nature", description: "Lake.", images: [], isActive: true }
            ],
            foods: [
                { name: "Litti", type: "veg", description: "Stuffed.", famousFor: "Street", approxPrice: "₹30", image: "", isActive: true },
                { name: "Chaat", type: "veg", description: "Mix.", famousFor: "Spicy", approxPrice: "₹40", image: "", isActive: true },
                { name: "Fish Curry", type: "non-veg", description: "Bengali.", famousFor: "Lunch", approxPrice: "₹150", image: "", isActive: true },
                { name: "Samosa", type: "veg", description: "Snack.", famousFor: "Tea", approxPrice: "₹10", image: "", isActive: true },
                { name: "Mitha Khaja", type: "sweet", description: "Pastry.", famousFor: "Crispy", approxPrice: "₹100/kg", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Dhanbad Jn", connectivity: "Rail", approxCost: "₹150", isActive: true }
            ]
        },
        {
            name: "Deoghar", slug: "deoghar", description: "Abode of God.", history: "Pilgrimage.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Baba_Baidyanath_Temple.jpg/800px-Baba_Baidyanath_Temple.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Baidyanath Temple", category: "temple", description: "Jyotirlinga.", images: [], isActive: true },
                { name: "Trikut Pahar", category: "nature", description: "Ropeway.", images: [], isActive: true },
                { name: "Tapovan", category: "nature", description: "Caves.", images: [], isActive: true },
                { name: "Naulakha Mandir", category: "temple", description: "Temple.", images: [], isActive: true },
                { name: "Satsang Ashram", category: "culture", description: "Ashram.", images: [], isActive: true }
            ],
            foods: [
                { name: "Peda", type: "sweet", description: "Milk sweet.", famousFor: "Prasad", approxPrice: "₹250/kg", image: "", isActive: true },
                { name: "Rabri", type: "sweet", description: "Thick milk.", famousFor: "Dessert", approxPrice: "₹50", image: "", isActive: true },
                { name: "Paratha", type: "veg", description: "Meal.", famousFor: "Dhaba", approxPrice: "₹40", image: "", isActive: true },
                { name: "Kachori", type: "veg", description: "Snack.", famousFor: "Morning", approxPrice: "₹20", image: "", isActive: true },
                { name: "Lassi", type: "beverage", description: "Cool.", famousFor: "Summer", approxPrice: "₹40", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Deoghar Airport", connectivity: "Domestic", approxCost: "₹3000", isActive: true },
                { type: "train", description: "Jasidih Jn", connectivity: "Rail", approxCost: "₹150", isActive: true }
            ]
        },
        {
            name: "Bokaro", slug: "bokaro", description: "Steel City.", history: "Planned.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Bokaro_Steel_City.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Jawaharlal Nehru Biological Park", category: "nature", description: "Zoo.", images: [], isActive: true },
                { name: "City Park", category: "nature", description: "Lake.", images: [], isActive: true },
                { name: "Jagannath Temple", category: "temple", description: "Temple.", images: [], isActive: true },
                { name: "Garga Dam", category: "nature", description: "Dam.", images: [], isActive: true },
                { name: "Bokaro Mall", category: "other", description: "Shopping.", images: [], isActive: true }
            ],
            foods: [
                { name: "Litti", type: "veg", description: "Baked.", famousFor: "Snack", approxPrice: "₹20", image: "", isActive: true },
                { name: "Chowmein", type: "veg", description: "Noodles.", famousFor: "Street", approxPrice: "₹50", image: "", isActive: true },
                { name: "Rolls", type: "non-veg", description: "Wrap.", famousFor: "Quick", approxPrice: "₹60", image: "", isActive: true },
                { name: "Idli", type: "veg", description: "South Indian.", famousFor: "Breakfast", approxPrice: "₹40", image: "", isActive: true },
                { name: "Rasgulla", type: "sweet", description: "Sweet.", famousFor: "Dessert", approxPrice: "₹15", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Bokaro Steel City", connectivity: "Rail", approxCost: "₹150", isActive: true }
            ]
        },
        {
            name: "Hazaribagh", slug: "hazaribagh", description: "Thousand Gardens.", history: "Sanatorium.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Hazaribagh_Lake.jpg/800px-Hazaribagh_Lake.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Hazaribagh National Park", category: "nature", description: "Wildlife.", images: [], isActive: true },
                { name: "Hazaribagh Lake", category: "nature", description: "Lake.", images: [], isActive: true },
                { name: "Canary Hill", category: "nature", description: "View.", images: [], isActive: true },
                { name: "Konar Dam", category: "nature", description: "Dam.", images: [], isActive: true },
                { name: "Sanskriti Museum", category: "museum", description: "Art.", images: [], isActive: true }
            ],
            foods: [
                { name: "Kachri", type: "veg", description: "Snack.", famousFor: "Tea", approxPrice: "₹20", image: "", isActive: true },
                { name: "Pua", type: "sweet", description: "Pancake.", famousFor: "Holi", approxPrice: "₹30", image: "", isActive: true },
                { name: "Mutton", type: "non-veg", description: "Curry.", famousFor: "Spicy", approxPrice: "₹300", image: "", isActive: true },
                { name: "Dahi Vada", type: "veg", description: "Yogurt.", famousFor: "Cool", approxPrice: "₹50", image: "", isActive: true },
                { name: "Tea", type: "beverage", description: "Chai.", famousFor: "Dhaba", approxPrice: "₹10", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "Bus", connectivity: "Ranchi/Patna", approxCost: "₹150", isActive: true }
            ]
        },
        {
            name: "Giridih", slug: "giridih", description: "Land of Hills.", history: "Mining.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Parasnath_Hill.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Parasnath Hill", category: "nature", description: "Highest peak.", images: [], isActive: true },
                { name: "Usri Falls", category: "nature", description: "Waterfall.", images: [], isActive: true },
                { name: "Khandoli Park", category: "nature", description: "Dam/Park.", images: [], isActive: true },
                { name: "Madhuban", category: "temple", description: "Jain temple.", images: [], isActive: true },
                { name: "Harihar Dham", category: "temple", description: "Shiva.", images: [], isActive: true }
            ],
            foods: [
                { name: "Tilkut", type: "sweet", description: "Sesame.", famousFor: "Winter", approxPrice: "₹200/kg", image: "", isActive: true },
                { name: "Samosa", type: "veg", description: "Snack.", famousFor: "Crispy", approxPrice: "₹10", image: "", isActive: true },
                { name: "Aloo Chop", type: "veg", description: "Fritter.", famousFor: "Street", approxPrice: "₹10", image: "", isActive: true },
                { name: "Jalebi", type: "sweet", description: "Sweet.", famousFor: "Hot", approxPrice: "₹20", image: "", isActive: true },
                { name: "Rice", type: "veg", description: "Meal.", famousFor: "Staple", approxPrice: "₹50", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Parasnath", connectivity: "Rail", approxCost: "₹100", isActive: true }
            ]
        },
        {
            name: "Ramgarh", slug: "ramgarh", description: "Cantonment.", history: "Military.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Rajrappa_Temple.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Rajrappa Temple", category: "temple", description: "Shakti Peeth.", images: [], isActive: true },
                { name: "Patratu Dam", category: "nature", description: "Scenic.", images: [], isActive: true },
                { name: "Chinnamasta Temple", category: "temple", description: "Tantric.", images: [], isActive: true },
                { name: "Mahatma Gandhi Samadhi", category: "heritage", description: "Memorial.", images: [], isActive: true },
                { name: "Chinese Cemetery", category: "heritage", description: "WWII.", images: [], isActive: true }
            ],
            foods: [
                { name: "Peda", type: "sweet", description: "Sweet.", famousFor: "Rajrappa", approxPrice: "₹300/kg", image: "", isActive: true },
                { name: "Khichdi", type: "veg", description: "Bhog.", famousFor: "Temple", approxPrice: "Free", image: "", isActive: true },
                { name: "Dhaba Food", type: "non-veg", description: "Chicken.", famousFor: "Highway", approxPrice: "₹200", image: "", isActive: true },
                { name: "Pakora", type: "veg", description: "Snack.", famousFor: "Rain", approxPrice: "₹20", image: "", isActive: true },
                { name: "Tea", type: "beverage", description: "Chai.", famousFor: "Break", approxPrice: "₹10", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Ramgarh Cantt", connectivity: "Rail", approxCost: "₹50", isActive: true }
            ]
        },
        {
            name: "Dumka", slug: "dumka", description: "Sub-capital.", history: "Santhal Pargana.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Basukinath_Temple.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Basukinath Temple", category: "temple", description: "Shiva.", images: [], isActive: true },
                { name: "Massanjore Dam", category: "nature", description: "Dam.", images: [], isActive: true },
                { name: "Maluti Temples", category: "heritage", description: "Terracotta.", images: [], isActive: true },
                { name: "Tatloi Hot Spring", category: "nature", description: "Spring.", images: [], isActive: true },
                { name: "Mayurakshi River", category: "nature", description: "River.", images: [], isActive: true }
            ],
            foods: [
                { name: "Peda", type: "sweet", description: "Sweet.", famousFor: "Basukinath", approxPrice: "₹250/kg", image: "", isActive: true },
                { name: "Chura", type: "veg", description: "Flattened rice.", famousFor: "Snack", approxPrice: "₹40", image: "", isActive: true },
                { name: "Ghugni", type: "veg", description: "Chickpea.", famousFor: "Spicy", approxPrice: "₹30", image: "", isActive: true },
                { name: "Mutton", type: "non-veg", description: "Curry.", famousFor: "Special", approxPrice: "₹300", image: "", isActive: true },
                { name: "Sweets", type: "sweet", description: "Bengali style.", famousFor: "Dessert", approxPrice: "₹100", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Dumka", connectivity: "Rail", approxCost: "₹100", isActive: true }
            ]
        },
        {
            name: "Medininagar", slug: "medininagar", description: "Palamu.", history: "Cheros.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Palamu_Fort.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Palamu Fort", category: "fort", description: "Ruins.", images: [], isActive: true },
                { name: "Betla National Park", category: "nature", description: "Tiger reserve.", images: [], isActive: true },
                { name: "Lodh Falls", category: "nature", description: "Highest fall.", images: [], isActive: true },
                { name: "Kechki Sangam", category: "nature", description: "River meet.", images: [], isActive: true },
                { name: "Shahpur Fort", category: "fort", description: "Fort.", images: [], isActive: true }
            ],
            foods: [
                { name: "Litti", type: "veg", description: "Baked.", famousFor: "Staple", approxPrice: "₹20", image: "", isActive: true },
                { name: "Chicken", type: "non-veg", description: "Country.", famousFor: "Dhaba", approxPrice: "₹250", image: "", isActive: true },
                { name: "Rice", type: "veg", description: "Meal.", famousFor: "Daily", approxPrice: "₹50", image: "", isActive: true },
                { name: "Samosa", type: "veg", description: "Snack.", famousFor: "Tea", approxPrice: "₹10", image: "", isActive: true },
                { name: "Mitha", type: "sweet", description: "Sweet.", famousFor: "Local", approxPrice: "₹20", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Daltonganj", connectivity: "Rail", approxCost: "₹150", isActive: true }
            ]
        }
    ]
};

const outputPath = path.join(__dirname, '../../data/generated/Jharkhand.json');
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(stateData, null, 2));
console.log(`Generated Jharkhand data at ${outputPath}`);
