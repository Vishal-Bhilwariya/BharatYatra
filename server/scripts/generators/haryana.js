const fs = require('fs');
const path = require('path');

const stateData = {
    state: {
        name: "Haryana",
        slug: "haryana",
        description: "Haryana, the 'Abode of God', is a state where antiquity blends with modernity, known for its historic battlefields and rapid industrialization.",
        culturalSummary: "Haryanvi culture is characterized by its robust dialect, folk music (Raagini), and a strong tradition of wrestling and agriculture.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Sultanpur_Bird_Sanctuary_Gurgaon.jpg/800px-Sultanpur_Bird_Sanctuary_Gurgaon.jpg",
        isActive: true
    },
    culture: {
        stateName: "Haryana",
        overview: {
            introduction: "Haryana is the setting of the epic Mahabharata and the birthplace of the Bhagavad Gita.",
            lifestyle: "Traditionally agrarian, now rapidly urbanizing with hubs like Gurugram.",
            traditions: "Famous for its hookahs, khaats (cots), and community panchayats.",
            history: "Site of the three Battles of Panipat and the Mahabharata war at Kurukshetra.",
            images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Sultanpur_Bird_Sanctuary_Gurgaon.jpg/800px-Sultanpur_Bird_Sanctuary_Gurgaon.jpg"]
        },
        cuisine: {
            description: "Simple, wholesome, and dairy-rich, reflecting the agrarian lifestyle.",
            dishes: [
                { name: "Bajra Khichdi", type: "Veg", priceRange: "₹50", description: "Millet porridge.", image: "" },
                { name: "Kadhi Pakora", type: "Veg", priceRange: "₹80", description: "Gram flour curry with fritters.", image: "" },
                { name: "Singri ki Sabzi", type: "Veg", priceRange: "₹100", description: "Dried desert bean curry.", image: "" },
                { name: "Churma", type: "Sweet", priceRange: "₹120", description: "Crushed roti with ghee and sugar.", image: "" },
                { name: "Lassi", type: "Beverage", priceRange: "₹40", description: "Large glass of buttermilk.", image: "" }
            ]
        },
        foodShops: [
            { name: "Murthal Dhabas", location: "Sonipat", famousFor: "Parathas", priceRange: "₹200", rating: 4.8, timings: "24x7" }
        ],
        danceAndMusic: {
            dances: [
                { name: "Phag", type: "Folk", description: "Performed during Holi.", image: "" },
                { name: "Loor", type: "Folk", description: "Performed by girls during Holi.", image: "" },
                { name: "Ghoomar", type: "Folk", description: "Spinning dance.", image: "" }
            ],
            music: [{ name: "Raagini", description: "Folk theatrical singing.", image: "" }],
            instruments: [{ name: "Been", description: "Wind instrument used by snake charmers.", image: "" }]
        },
        traditionalAttire: {
            men: { description: "Dhoti, Kurta, and Pagri (turban).", attire: [{ name: "Pagri", description: "Symbol of honor." }], images: [] },
            women: { description: "Daanman, Kurti, and Chunder.", attire: [{ name: "Daanman", description: "Flared skirt." }], images: [] },
            fabrics: [{ name: "Khaddar", description: "Handspun cotton." }]
        },
        festivals: [
            { name: "Surajkund Crafts Mela", celebrationTime: "February", significance: "Art & Craft", description: "International crafts fair.", images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Surajkund_Mela.jpg/800px-Surajkund_Mela.jpg"] },
            { name: "Gita Jayanti", celebrationTime: "December", significance: "Religious", description: "Celebrating the Bhagavad Gita.", images: [] },
            { name: "Teej", celebrationTime: "August", significance: "Monsoon", description: "Swings and singing.", images: [] }
        ],
        artAndHandicrafts: [
            { name: "Phulkari", type: "Embroidery", description: "Flower work embroidery.", famousFor: "Shawls", images: [] },
            { name: "Pottery", type: "Craft", description: "Earthenware.", famousFor: "Jhajjar", images: [] }
        ],
        heritageAndTraditions: {
            customs: [{ title: "Hookah", description: "Social smoking in groups." }],
            rituals: [{ title: "Kuanda", description: "Well worship." }],
            dailyLife: "Milk and yogurt are staples.",
            values: "Physical strength and brotherhood."
        },
        culturalPlaces: [
            { name: "Brahma Sarovar", type: "Lake", location: "Kurukshetra", description: "Sacred tank.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Brahma_Sarovar_Kurukshetra.jpg/800px-Brahma_Sarovar_Kurukshetra.jpg" }
        ],
        extraSections: [
            { title: "Sports Powerhouse", content: "Haryana produces a significant number of India's wrestlers and boxers." }
        ],
        culturalExperience: {
            liveEvents: [],
            foodTrails: [],
            workshops: [],
            festivalCalendar: [
                { name: "Surajkund Mela", priority: 1, date: "2025-02-01", significance: "Crafts", images: [], audience: ["Tourist", "Family"] }
            ]
        },
        isActive: true
    },
    cities: [
        {
            name: "Gurugram", slug: "gurugram", description: "Millennium City.", history: "Guru Dronacharya's village.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Sultanpur_Bird_Sanctuary_Gurgaon.jpg/800px-Sultanpur_Bird_Sanctuary_Gurgaon.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Kingdom of Dreams", category: "culture", description: "Entertainment hub.", images: [], bestTimeToVisit: "Evening", entryFee: "₹1000+", location: "Sector 29", isActive: true },
                { name: "Sultanpur Bird Sanctuary", category: "nature", description: "Migratory birds.", images: [], bestTimeToVisit: "Winter", entryFee: "₹50", location: "Jhajjar Road", isActive: true },
                { name: "Cyber Hub", category: "other", description: "Food and nightlife.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "Cyber City", isActive: true },
                { name: "Ambience Mall", category: "other", description: "Shopping.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "NH8", isActive: true },
                { name: "Sheetla Mata Mandir", category: "temple", description: "Famous shrine.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Old Gurgaon", isActive: true },
                { name: "Leisure Valley Park", category: "nature", description: "Park.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "Sector 29", isActive: true },
                { name: "Aravalli Biodiversity Park", category: "nature", description: "Forest.", images: [], bestTimeToVisit: "Morning", entryFee: "Free", location: "MG Road", isActive: true },
                { name: "Museum of Folk and Tribal Art", category: "museum", description: "Art.", images: [], bestTimeToVisit: "Day", entryFee: "₹50", location: "Sector 4", isActive: true },
                { name: "NeverEnuf Garden Railway", category: "other", description: "Miniature train.", images: [], bestTimeToVisit: "Day", entryFee: "₹500", location: "Manesar", isActive: true },
                { name: "Damdama Lake", category: "nature", description: "Adventure.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Sohna", isActive: true }
            ],
            foods: [
                { name: "Chole Bhature", type: "veg", description: "Spicy chickpeas.", famousFor: "Lunch", approxPrice: "₹150", image: "", isActive: true },
                { name: "Rajma Chawal", type: "veg", description: "Kidney beans.", famousFor: "Comfort", approxPrice: "₹100", image: "", isActive: true },
                { name: "Aloo Tikki", type: "veg", description: "Potato patty.", famousFor: "Snack", approxPrice: "₹50", image: "", isActive: true },
                { name: "Butter Chicken", type: "non-veg", description: "Creamy curry.", famousFor: "Dinner", approxPrice: "₹300", image: "", isActive: true },
                { name: "Beer", type: "beverage", description: "Brewery.", famousFor: "Fresh", approxPrice: "₹250", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "IGI Airport (Delhi)", connectivity: "Nearby", approxCost: "₹0", isActive: true },
                { type: "metro", description: "Rapid Metro", connectivity: "City", approxCost: "₹20+", isActive: true },
                { type: "taxi", description: "Uber/Ola", connectivity: "City", approxCost: "₹100+", isActive: true },
                { type: "auto", description: "Auto", connectivity: "Local", approxCost: "₹50", isActive: true },
                { type: "bus", description: "City Bus", connectivity: "Local", approxCost: "₹10", isActive: true }
            ]
        },
        {
            name: "Kurukshetra", slug: "kurukshetra", description: "Land of Dharma.", history: "Mahabharata.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Brahma_Sarovar_Kurukshetra.jpg/800px-Brahma_Sarovar_Kurukshetra.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Brahma Sarovar", category: "nature", description: "Largest man-made tank.", images: [], isActive: true },
                { name: "Jyotisar", category: "heritage", description: "Birthplace of Gita.", images: [], isActive: true },
                { name: "Sheikh Chilli Tomb", category: "heritage", description: "Taj of Haryana.", images: [], isActive: true },
                { name: "Krishna Museum", category: "museum", description: "Lord Krishna artifacts.", images: [], isActive: true },
                { name: "Kalpana Chawla Planetarium", category: "museum", description: "Science.", images: [], isActive: true }
            ],
            foods: [
                { name: "Lassi", type: "beverage", description: "Thick yogurt.", famousFor: "Chilled", approxPrice: "₹40", image: "", isActive: true },
                { name: "Aloo Paratha", type: "veg", description: "Stuffed bread.", famousFor: "Breakfast", approxPrice: "₹50", image: "", isActive: true },
                { name: "Kheer", type: "sweet", description: "Rice pudding.", famousFor: "Dessert", approxPrice: "₹40", image: "", isActive: true },
                { name: "Pakoras", type: "veg", description: "Fritters.", famousFor: "Snack", approxPrice: "₹30", image: "", isActive: true },
                { name: "Malpua", type: "sweet", description: "Pancake.", famousFor: "Sweet", approxPrice: "₹30", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Kurukshetra Jn", connectivity: "Rail", approxCost: "₹100+", isActive: true }
            ]
        },
        {
            name: "Panipat", slug: "panipat", description: "City of Weavers.", history: "Historic battles.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Kabuli_Bagh_Mosque.jpg/800px-Kabuli_Bagh_Mosque.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Panipat Museum", category: "museum", description: "Battle history.", images: [], isActive: true },
                { name: "Kabuli Bagh Mosque", category: "heritage", description: "Babur built.", images: [], isActive: true },
                { name: "Ibrahim Lodi Tomb", category: "heritage", description: "Tomb.", images: [], isActive: true },
                { name: "Kala Amb", category: "nature", description: "War memorial.", images: [], isActive: true },
                { name: "Devi Temple", category: "temple", description: "Goddess.", images: [], isActive: true }
            ],
            foods: [
                { name: "Pachranga Achar", type: "veg", description: "Pickle.", famousFor: "Famous", approxPrice: "₹200/kg", image: "", isActive: true },
                { name: "Ghevar", type: "sweet", description: "Disc sweet.", famousFor: "Teej", approxPrice: "₹300/kg", image: "", isActive: true },
                { name: "Bedmi Puri", type: "veg", description: "Breakfast.", famousFor: "Spicy", approxPrice: "₹60", image: "", isActive: true },
                { name: "Naan", type: "veg", description: "Bread.", famousFor: "Tandoor", approxPrice: "₹20", image: "", isActive: true },
                { name: "Chaat", type: "veg", description: "Street food.", famousFor: "Spicy", approxPrice: "₹30", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Panipat Jn", connectivity: "Rail", approxCost: "₹100", isActive: true }
            ]
        },
        {
            name: "Chandigarh", slug: "chandigarh", description: "The Beautiful City (Capital).", history: "Planned by Le Corbusier.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rock_Garden_Chandigarh_1.jpg/800px-Rock_Garden_Chandigarh_1.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Rock Garden", category: "culture", description: "Waste art.", images: [], isActive: true },
                { name: "Sukhna Lake", category: "nature", description: "Boating.", images: [], isActive: true },
                { name: "Rose Garden", category: "nature", description: "Flowers.", images: [], isActive: true },
                { name: "Elante Mall", category: "other", description: "Shopping.", images: [], isActive: true },
                { name: "Capitol Complex", category: "heritage", description: "UNESCO.", images: [], isActive: true }
            ],
            foods: [
                { name: "Butter Chicken", type: "non-veg", description: "Classic.", famousFor: "Creamy", approxPrice: "₹350", image: "", isActive: true },
                { name: "Amritsari Kulcha", type: "veg", description: "Stuffed bread.", famousFor: "Crispy", approxPrice: "₹100", image: "", isActive: true },
                { name: "Dahi Bhalla", type: "veg", description: "Yogurt snack.", famousFor: "Cool", approxPrice: "₹60", image: "", isActive: true },
                { name: "Gajerela", type: "sweet", description: "Carrot pudding.", famousFor: "Winter", approxPrice: "₹100", image: "", isActive: true },
                { name: "Lassi", type: "beverage", description: "Drink.", famousFor: "Rich", approxPrice: "₹50", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Shaheed Bhagat Singh Airport", connectivity: "Hub", approxCost: "₹3000", isActive: true },
                { type: "train", description: "Chandigarh Station", connectivity: "Major", approxCost: "₹200", isActive: true }
            ]
        },
        {
            name: "Faridabad", slug: "faridabad", description: "Industrial city.", history: "Baba Farid.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Badkhal_Lake_Dried.jpg/800px-Badkhal_Lake_Dried.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Surajkund", category: "heritage", description: "Stepwell.", images: [], isActive: true },
                { name: "Badkhal Lake", category: "nature", description: "Dry lake.", images: [], isActive: true },
                { name: "Raja Nahar Singh Palace", category: "heritage", description: "Palace.", images: [], isActive: true },
                { name: "Shirdi Sai Baba Temple", category: "temple", description: "Temple.", images: [], isActive: true },
                { name: "Town Park", category: "nature", description: "Park.", images: [], isActive: true }
            ],
            foods: [
                { name: "Paratha", type: "veg", description: "Stuffed.", famousFor: "Breakfast", approxPrice: "₹40", image: "", isActive: true },
                { name: "Chole", type: "veg", description: "Curry.", famousFor: "Spicy", approxPrice: "₹50", image: "", isActive: true },
                { name: "Samosa", type: "veg", description: "Snack.", famousFor: "Tea", approxPrice: "₹15", image: "", isActive: true },
                { name: "Jalebi", type: "sweet", description: "Sweet.", famousFor: "Hot", approxPrice: "₹30", image: "", isActive: true },
                { name: "Rabri", type: "sweet", description: "Milk sweet.", famousFor: "Dessert", approxPrice: "₹50", image: "", isActive: true }
            ],
            transports: [
                { type: "metro", description: "Delhi Metro", connectivity: "Connnected", approxCost: "₹40", isActive: true }
            ]
        },
        {
            name: "Ambala", slug: "ambala", description: "Twin city.", history: "Cantonment.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Ambala_Cantt_Junction.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Gurudwara Panjokhra Sahib", category: "temple", description: "Sikh shrine.", images: [], isActive: true },
                { name: "Rani Ka Talab", category: "heritage", description: "Pond.", images: [], isActive: true },
                { name: "Holy Redeemer Church", category: "temple", description: "Church.", images: [], isActive: true },
                { name: "Patel Park", category: "nature", description: "Park.", images: [], isActive: true },
                { name: "Science Market", category: "other", description: "Lab equipment.", images: [], isActive: true }
            ],
            foods: [
                { name: "Aloo Tikki", type: "veg", description: "Patty.", famousFor: "Street", approxPrice: "₹30", image: "", isActive: true },
                { name: "Bun Tikki", type: "veg", description: "Burger style.", famousFor: "Snack", approxPrice: "₹40", image: "", isActive: true },
                { name: "Golgappa", type: "veg", description: "Water balls.", famousFor: "Spicy", approxPrice: "₹20", image: "", isActive: true },
                { name: "Barfi", type: "sweet", description: "Sweet.", famousFor: "Singla", approxPrice: "₹300/kg", image: "", isActive: true },
                { name: "Chaat", type: "veg", description: "Mix.", famousFor: "Tangy", approxPrice: "₹40", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Ambala Cantt", connectivity: "Major Hub", approxCost: "₹150", isActive: true }
            ]
        },
        {
            name: "Hisar", slug: "hisar", description: "Steel City.", history: "Firoz Shah Tughlaq.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Firoz_Shah_Palace_Complex.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Firoz Shah Palace", category: "heritage", description: "Ruins.", images: [], isActive: true },
                { name: "Blue Bird Lake", category: "nature", description: "Lake.", images: [], isActive: true },
                { name: "Agroha Dham", category: "temple", description: "Temple.", images: [], isActive: true },
                { name: "O.P. Jindal Park", category: "nature", description: "Park.", images: [], isActive: true },
                { name: "Gujri Mahal", category: "heritage", description: "Palace.", images: [], isActive: true }
            ],
            foods: [
                { name: "Peda", type: "sweet", description: "Milk sweet.", famousFor: "Hansi", approxPrice: "₹300/kg", image: "", isActive: true },
                { name: "Kachori", type: "veg", description: "Fried snack.", famousFor: "Breakfast", approxPrice: "₹20", image: "", isActive: true },
                { name: "Milk Cake", type: "sweet", description: "Sweet.", famousFor: "Rich", approxPrice: "₹350/kg", image: "", isActive: true },
                { name: "Chole Bhature", type: "veg", description: "Meal.", famousFor: "Heavy", approxPrice: "₹80", image: "", isActive: true },
                { name: "Lassi", type: "beverage", description: "Drink.", famousFor: "Cold", approxPrice: "₹30", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Hisar Jn", connectivity: "Rail", approxCost: "₹100", isActive: true }
            ]
        },
        {
            name: "Rohtak", slug: "rohtak", description: "Educational Hub.", history: "Ancient.", image: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Tilyar_Lake.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Tilyar Lake", category: "nature", description: "Lake and Zoo.", images: [], isActive: true },
                { name: "Mansarover Park", category: "nature", description: "Park.", images: [], isActive: true },
                { name: "Asthal Bohar", category: "temple", description: "Math.", images: [], isActive: true },
                { name: "Sheetla Mata Mandir", category: "temple", description: "Temple.", images: [], isActive: true },
                { name: "Rose Garden", category: "nature", description: "Garden.", images: [], isActive: true }
            ],
            foods: [
                { name: "Rewri", type: "sweet", description: "Sesame candy.", famousFor: "Winter", approxPrice: "₹200/kg", image: "", isActive: true },
                { name: "Gajak", type: "sweet", description: "Peanut brittle.", famousFor: "Famous", approxPrice: "₹250/kg", image: "", isActive: true },
                { name: "Paratha", type: "veg", description: "Bread.", famousFor: "Sagar", approxPrice: "₹50", image: "", isActive: true },
                { name: "Churma", type: "sweet", description: "Crumble.", famousFor: "Traditional", approxPrice: "₹100", image: "", isActive: true },
                { name: "Milk", type: "beverage", description: "Hot milk.", famousFor: "Kadhai", approxPrice: "₹40", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Rohtak Jn", connectivity: "Rail", approxCost: "₹50", isActive: true }
            ]
        },
        {
            name: "Karnal", slug: "karnal", description: "Rice Bowl.", history: "Karna.", image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Karnal_Lake.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Karna Lake", category: "nature", description: "Chakravaka.", images: [], isActive: true },
                { name: "Cantonment Church Tower", category: "heritage", description: "Tower.", images: [], isActive: true },
                { name: "Pukka Pul", category: "heritage", description: "Bridge.", images: [], isActive: true },
                { name: "Kalander Shah Tomb", category: "heritage", description: "Tomb.", images: [], isActive: true },
                { name: "Atal Park", category: "nature", description: "Park.", images: [], isActive: true }
            ],
            foods: [
                { name: "Rice", type: "veg", description: "Basmati.", famousFor: "Export", approxPrice: "₹100/kg", image: "", isActive: true },
                { name: "Chole", type: "veg", description: "Dish.", famousFor: "Spicy", approxPrice: "₹60", image: "", isActive: true },
                { name: "Sita Ram Sweets", type: "sweet", description: "Shop.", famousFor: "Jalebis", approxPrice: "₹40", image: "", isActive: true },
                { name: "Paneer", type: "veg", description: "Cheese.", famousFor: "Dairy", approxPrice: "₹300/kg", image: "", isActive: true },
                { name: "Pakora", type: "veg", description: "Snack.", famousFor: "Rain", approxPrice: "₹20", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Karnal Station", connectivity: "Rail", approxCost: "₹100", isActive: true }
            ]
        },
        {
            name: "Sonipat", slug: "sonipat", description: "Golden City.", history: "Swarnaprastha.", image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Khwaja_Khizr_Tomb.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Khwaja Khizr Tomb", category: "heritage", description: "Tomb.", images: [], isActive: true },
                { name: "Murthal", category: "culture", description: "Dhabas.", images: [], isActive: true },
                { name: "Jurasic Park Inn", category: "nature", description: "Water park.", images: [], isActive: true },
                { name: "Mughal Bridge", category: "heritage", description: "Old bridge.", images: [], isActive: true },
                { name: "Badkhalsa Memorial", category: "heritage", description: "Sikh history.", images: [], isActive: true }
            ],
            foods: [
                { name: "Alooo Paratha", type: "veg", description: "Stuffed.", famousFor: "Murthal", approxPrice: "₹60", image: "", isActive: true },
                { name: "White Butter", type: "veg", description: "Makhan.", famousFor: "Topping", approxPrice: "Free", image: "", isActive: true },
                { name: "Tea", type: "beverage", description: "Chai.", famousFor: "Dhaba", approxPrice: "₹20", image: "", isActive: true },
                { name: "Thali", type: "veg", description: "Meal.", famousFor: "Full", approxPrice: "₹200", image: "", isActive: true },
                { name: "Lassi", type: "beverage", description: "Drink.", famousFor: "Tall glass", approxPrice: "₹50", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Sonipat Jn", connectivity: "Rail", approxCost: "₹50", isActive: true }
            ]
        }
    ]
};

const outputPath = path.join(__dirname, '../../data/generated/Haryana.json');
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(stateData, null, 2));
console.log(`Generated Haryana data at ${outputPath}`);
