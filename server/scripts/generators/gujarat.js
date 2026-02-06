const fs = require('fs');
const path = require('path');

const stateData = {
    state: {
        name: "Gujarat",
        slug: "gujarat",
        description: "Gujarat, the 'Jewel of Western India', is known for its Asiatic lions, Rann of Kutch, vibrant festivals, and enterprising people.",
        culturalSummary: "Gujarat's culture is a colorful tapestry of folk dance (Garba), intricate handicrafts, and a largely vegetarian cuisine.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Rann_of_Kutch_White_Desert.jpg/800px-Rann_of_Kutch_White_Desert.jpg",
        isActive: true
    },
    culture: {
        stateName: "Gujarat",
        overview: {
            introduction: "Home to the Mahatma, Gujarat boasts a 1600 km coastline and a heritage dating back to the Indus Valley Civilization.",
            lifestyle: "Business-oriented yet deeply spiritual and traditional.",
            traditions: "Navratri festival with 9 nights of dance is the soul of Gujarat.",
            history: "From Lothal's docks to Gandhi's Satyagraha, Gujarat shaped India's history.",
            images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Rann_of_Kutch_White_Desert.jpg/800px-Rann_of_Kutch_White_Desert.jpg"]
        },
        cuisine: {
            description: "Predominantly vegetarian, Gujarati cuisine strikes a balance between sweet, salty, and spicy flavors.",
            dishes: [
                { name: "Dhokla", type: "Veg", priceRange: "₹40–₹80", description: "Steamed fermented rice and chickpea cake.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Dhokla.jpg/800px-Dhokla.jpg" },
                { name: "Undhiyu", type: "Veg", priceRange: "₹150", description: "Mixed vegetable curry, a winter specialty.", image: "" },
                { name: "Thepla", type: "Veg", priceRange: "₹30", description: "Spiced flatbread made with fenugreek leaves.", image: "" },
                { name: "Khandvi", type: "Veg", priceRange: "₹60", description: "Rolled gram flour snack.", image: "" },
                { name: "Basundi", type: "Sweet", priceRange: "₹100", description: "Thickened sweetened milk.", image: "" }
            ]
        },
        foodShops: [
            { name: "Das Khaman", location: "Ahmedabad", famousFor: "Khaman Dhokla", priceRange: "₹100", rating: 4.7, timings: "8 AM - 9 PM" }
        ],
        danceAndMusic: {
            dances: [
                { name: "Garba", type: "Folk", description: "Circular dance performed around a lamp/Goddess.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Garba_Dance.jpg/800px-Garba_Dance.jpg" },
                { name: "Dandiya Raas", type: "Folk", description: "Stick dance depicting Krishna and Gopis.", image: "" }
            ],
            music: [{ name: "Sugam Sangeet", description: "Light classical vocal music.", image: "" }],
            instruments: [{ name: "Ravanhatha", description: "Ancient string instrument.", image: "" }]
        },
        traditionalAttire: {
            men: { description: "Kediyu and Dhoti.", attire: [{ name: "Kediyu", description: "Pleated frock-like top." }], images: [] },
            women: { description: "Chaniya Choli.", attire: [{ name: "Chaniya Choli", description: "Embroidered skirt and blouse." }], images: [] },
            fabrics: [{ name: "Patola Silk", description: "Double ikat woven saree from Patan." }, { name: "Bandhani", description: "Tie-dye textile." }]
        },
        festivals: [
            { name: "Navratri", celebrationTime: "October", significance: "Goddess Durga", description: "Nine nights of dance and devotion.", images: [] },
            { name: "Rann Utsav", celebrationTime: "Winter", significance: "Culture", description: "Desert festival in Kutch.", images: [] },
            { name: "Uttarayan", celebrationTime: "January", significance: "Kite Festival", description: "International Kite Festival.", images: [] }
        ],
        artAndHandicrafts: [
            { name: "Embroidery", type: "Textile", description: "Kutch embroidery with mirror work.", famousFor: "Vibrant colors", images: [] },
            { name: "Roghan Painting", type: "Art", description: "Painting on fabric using castor oil and colors.", famousFor: "Nirona village", images: [] }
        ],
        heritageAndTraditions: {
            customs: [{ title: "Atithi Devo Bhava", description: "Guests are treated exceptionally well." }],
            rituals: [{ title: "Aarti", description: "Evening prayers in temples." }],
            dailyLife: "Starts with tea and fafda-jalebi for many.",
            values: "Non-violence and entrepreneurship."
        },
        culturalPlaces: [
            { name: "Somnath Temple", type: "Temple", location: "Veraval", description: "First Jyotirlinga of Shiva.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Somnath_Mandir_det.jpg/800px-Somnath_Mandir_det.jpg" }
        ],
        extraSections: [
            { title: "White Desert", content: "The Great Rann of Kutch is the largest salt desert in the world." }
        ],
        culturalExperience: {
            liveEvents: [],
            foodTrails: [],
            workshops: [],
            festivalCalendar: [
                { name: "Navratri", priority: 1, date: "2025-10-23", significance: "Dance", images: [], audience: ["Everyone"] }
            ]
        },
        isActive: true
    },
    cities: [
        {
            name: "Ahmedabad", slug: "ahmedabad", description: "First World Heritage City of India.", history: "Founded by Ahmed Shah.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Sabarmati_Ashram.jpg/800px-Sabarmati_Ashram.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Sabarmati Ashram", category: "heritage", description: "Gandhi's home.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Sabarmati", isActive: true },
                { name: "Adalaj Stepwell", category: "heritage", description: "Intricate stepwell.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Adalaj", isActive: true },
                { name: "Kankaria Lake", category: "nature", description: "Lakefront.", images: [], bestTimeToVisit: "Evening", entryFee: "₹25", location: "Maninagar", isActive: true },
                { name: "Sidi Saiyyed Mosque", category: "heritage", description: "Stone lattice work.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Lal Darwaja", isActive: true },
                { name: "Auto World Vintage Car Museum", category: "museum", description: "Classic cars.", images: [], bestTimeToVisit: "Day", entryFee: "₹100", location: "Kathwada", isActive: true },
                { name: "Science City", category: "museum", description: "Science park.", images: [], bestTimeToVisit: "Day", entryFee: "₹500", location: "SG Highway", isActive: true },
                { name: "Law Garden", category: "other", description: "Market.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "Ellisbridge", isActive: true },
                { name: "Hutheesing Jain Temple", category: "temple", description: "Marble temple.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Bardolpura", isActive: true },
                { name: "Akshardham Temple", category: "temple", description: "Grand temple.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "Gandhinagar (Near)", isActive: true },
                { name: "Riverfront", category: "nature", description: "Promenade.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "Sabarmati", isActive: true }
            ],
            foods: [
                { name: "Gujarati Thali", type: "veg", description: "Full meal.", famousFor: "Variety", approxPrice: "₹300", image: "", isActive: true },
                { name: "Khaman", type: "veg", description: "Snack.", famousFor: "Soft", approxPrice: "₹40", image: "", isActive: true },
                { name: "Fafda Jalebi", type: "veg", description: "Breakfast.", famousFor: "Crispy", approxPrice: "₹60", image: "", isActive: true },
                { name: "Dabeli", type: "veg", description: "Bun.", famousFor: "Spicy", approxPrice: "₹20", image: "", isActive: true },
                { name: "Ice Cream", type: "sweet", description: "Dessert.", famousFor: "Local brands", approxPrice: "₹40", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "SVPI Airport", connectivity: "International", approxCost: "₹3000+", isActive: true },
                { type: "train", description: "Kalupur Station", connectivity: "Hub", approxCost: "₹200+", isActive: true },
                { type: "bus", description: "GSRTC/BRTS", connectivity: "Excellent", approxCost: "₹20+", isActive: true },
                { type: "taxi", description: "Uber/Ola", connectivity: "City", approxCost: "₹150+", isActive: true },
                { type: "auto", description: "Rickshaw", connectivity: "Local", approxCost: "₹30+", isActive: true }
            ]
        },
        {
            name: "Surat", slug: "surat", description: "Diamond City.", history: "Port city.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Surat_Castle.jpg/800px-Surat_Castle.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Dumas Beach", category: "nature", description: "Black sand.", images: [], isActive: true },
                { name: "Dutch Garden", category: "heritage", description: "Tombs.", images: [], isActive: true },
                { name: "Sarthana Nature Park", category: "nature", description: "Zoo.", images: [], isActive: true },
                { name: "Science Centre", category: "museum", description: "Science.", images: [], isActive: true },
                { name: "Surat Castle", category: "fort", description: "Historic.", images: [], isActive: true }
            ],
            foods: [
                { name: "Locho", type: "veg", description: "Steamed snack.", famousFor: "Surti", approxPrice: "₹30", image: "", isActive: true },
                { name: "Surti Ghari", type: "sweet", description: "Sweet.", famousFor: "Rich", approxPrice: "₹500/kg", image: "", isActive: true },
                { name: "Undhiyu", type: "veg", description: "Mix veg.", famousFor: "Winter", approxPrice: "₹200", image: "", isActive: true },
                { name: "Ponk", type: "veg", description: "Sorghum.", famousFor: "Winter", approxPrice: "₹100", image: "", isActive: true },
                { name: "Cold Coco", type: "beverage", description: "Chocolate drink.", famousFor: "Thick", approxPrice: "₹50", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Surat Station", connectivity: "Major", approxCost: "₹150+", isActive: true },
                { type: "flight", description: "Surat Airport", connectivity: "Domestic", approxCost: "₹3000", isActive: true }
            ]
        },
        {
            name: "Vadodara", slug: "vadodara", description: "Cultural capital (Baroda).", history: "Gaekwad.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Laxmi_Vilas_Palace_Vadodara.jpg/800px-Laxmi_Vilas_Palace_Vadodara.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Laxmi Vilas Palace", category: "heritage", description: "Grand palace.", images: [], isActive: true },
                { name: "Sayaji Baug", category: "nature", description: "Park and zoo.", images: [], isActive: true },
                { name: "EME Temple", category: "temple", description: "Aluminum temple.", images: [], isActive: true },
                { name: "Kirti Mandir", category: "heritage", description: "Cenotaph.", images: [], isActive: true },
                { name: "Baroda Museum", category: "museum", description: "Art.", images: [], isActive: true }
            ],
            foods: [
                { name: "Sev Usal", type: "veg", description: "Spicy peas.", famousFor: "Snack", approxPrice: "₹40", image: "", isActive: true },
                { name: "Bhakarwadi", type: "veg", description: "Crispy snack.", famousFor: "Jagdish", approxPrice: "₹200/kg", image: "", isActive: true },
                { name: "Lilo Chevdo", type: "veg", description: "Snack.", famousFor: "Mixture", approxPrice: "₹200/kg", image: "", isActive: true },
                { name: "Poha", type: "veg", description: "Breakfast.", famousFor: "Tari", approxPrice: "₹20", image: "", isActive: true },
                { name: "Sugarcane Juice", type: "beverage", description: "Fresh.", famousFor: "Cool", approxPrice: "₹20", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Vadodara Jn", connectivity: "Hub", approxCost: "₹150+", isActive: true },
                { type: "flight", description: "Vadodara Airport", connectivity: "Domestic", approxCost: "₹3000", isActive: true }
            ]
        },
        {
            name: "Rajkot", slug: "rajkot", description: "Centre of Saurashtra.", history: "Princely state.", image: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Watson_Museum.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Watson Museum", category: "museum", description: "History.", images: [], isActive: true },
                { name: "Kaba Gandhi No Delo", category: "heritage", description: "Gandhi's home.", images: [], isActive: true },
                { name: "Rotary Dolls Museum", category: "museum", description: "Dolls.", images: [], isActive: true },
                { name: "Aji Dam", category: "nature", description: "Dam.", images: [], isActive: true },
                { name: "Race Course", category: "nature", description: "Park.", images: [], isActive: true }
            ],
            foods: [
                { name: "Penda", type: "sweet", description: "Milk sweet.", famousFor: "Thabdi", approxPrice: "₹300/kg", image: "", isActive: true },
                { name: "Ganthiya", type: "veg", description: "Chickpea snack.", famousFor: "Breakfast", approxPrice: "₹100/kg", image: "", isActive: true },
                { name: "Chikki", type: "sweet", description: "Brittle.", famousFor: "Winter", approxPrice: "₹200/kg", image: "", isActive: true },
                { name: "Fafda", type: "veg", description: "Snack.", famousFor: "Crispy", approxPrice: "₹200/kg", image: "", isActive: true },
                { name: "Green Chutney", type: "veg", description: "Spicy.", famousFor: "Side", approxPrice: "Free", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Hirasar Airport", connectivity: "New", approxCost: "₹3000", isActive: true }
            ]
        },
        {
            name: "Dwarka", slug: "dwarka", description: "Krishna's Kingdom.", history: "Mythology.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Dwarkadhish_Temple.jpg/800px-Dwarkadhish_Temple.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Dwarkadhish Temple", category: "temple", description: "Main temple.", images: [], isActive: true },
                { name: "Nageshwar Jyotirlinga", category: "temple", description: "Shiva.", images: [], isActive: true },
                { name: "Bet Dwarka", category: "nature", description: "Island.", images: [], isActive: true },
                { name: "Rukmini Devi Temple", category: "temple", description: "Temple.", images: [], isActive: true },
                { name: "Shivrajpur Beach", category: "nature", description: "Blue flag.", images: [], isActive: true }
            ],
            foods: [
                { name: "Khichdi", type: "veg", description: "Rice lentil.", famousFor: "Prasad", approxPrice: "₹50", image: "", isActive: true },
                { name: "Lassi", type: "beverage", description: "Yogurt.", famousFor: "Thick", approxPrice: "₹30", image: "", isActive: true },
                { name: "Thali", type: "veg", description: "Meal.", famousFor: "Unlimited", approxPrice: "₹150", image: "", isActive: true },
                { name: "Khaman", type: "veg", description: "Snack.", famousFor: "Light", approxPrice: "₹30", image: "", isActive: true },
                { name: "Buttermilk", type: "beverage", description: "Chaas.", famousFor: "Cool", approxPrice: "₹10", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Dwarka Station", connectivity: "Terminus", approxCost: "₹200", isActive: true }
            ]
        },
        {
            name: "Somnath", slug: "somnath", description: "Eternal Shrine.", history: "Rebuilt.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Somnath_Mandir_det.jpg/800px-Somnath_Mandir_det.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Somnath Temple", category: "temple", description: "Jyotirlinga.", images: [], isActive: true },
                { name: "Bhalka Tirth", category: "heritage", description: "Krishna's departure.", images: [], isActive: true },
                { name: "Triveni Sangam", category: "nature", description: "Confluence.", images: [], isActive: true },
                { name: "Paanch Pandav Gufa", category: "heritage", description: "Caves.", images: [], isActive: true },
                { name: "Prabhas Patan Museum", category: "museum", description: "History.", images: [], isActive: true }
            ],
            foods: [
                { name: "Coconut Water", type: "beverage", description: "Fresh.", famousFor: "Drink", approxPrice: "₹30", image: "", isActive: true },
                { name: "Puran Poli", type: "sweet", description: "Flatbread.", famousFor: "Sweet", approxPrice: "₹40", image: "", isActive: true },
                { name: "Khandvi", type: "veg", description: "Roll.", famousFor: "Snack", approxPrice: "₹50", image: "", isActive: true },
                { name: "Dhokla", type: "veg", description: "Cake.", famousFor: "Breakfast", approxPrice: "₹40", image: "", isActive: true },
                { name: "Mag", type: "sweet", description: "Sweet.", famousFor: "Prasad", approxPrice: "₹100", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Veraval", connectivity: "Nearby", approxCost: "₹150", isActive: true }
            ]
        },
        {
            name: "Bhuj", slug: "bhuj", description: "Gateway to Kutch.", history: "Earthquake.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Prag_Mahal_Bhuj.jpg/800px-Prag_Mahal_Bhuj.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Aina Mahal", category: "heritage", description: "Mirror palace.", images: [], isActive: true },
                { name: "Prag Mahal", category: "heritage", description: "Gothic palace.", images: [], isActive: true },
                { name: "Hamirsar Lake", category: "nature", description: "Central lake.", images: [], isActive: true },
                { name: "Kutch Museum", category: "museum", description: "Oldest.", images: [], isActive: true },
                { name: "Swaminarayan Temple", category: "temple", description: "Grand.", images: [], isActive: true }
            ],
            foods: [
                { name: "Dabeli", type: "veg", description: "Spicy burger.", famousFor: "Origin", approxPrice: "₹15", image: "", isActive: true },
                { name: "Kutchi Thali", type: "veg", description: "Meal.", famousFor: "Bajra Roti", approxPrice: "₹200", image: "", isActive: true },
                { name: "Pakwan", type: "veg", description: "Crispy.", famousFor: "Breakfast", approxPrice: "₹30", image: "", isActive: true },
                { name: "Gulab Pak", type: "sweet", description: "Rose sweet.", famousFor: "Rich", approxPrice: "₹400/kg", image: "", isActive: true },
                { name: "Mesuk", type: "sweet", description: "Sweet.", famousFor: "Soft", approxPrice: "₹300/kg", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Bhuj Airport", connectivity: "Mumbai", approxCost: "₹4000", isActive: true }
            ]
        },
        {
            name: "Junagadh", slug: "junagadh", description: "Old Fort.", history: "Girnar.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Mahabat_Maqbara.jpg/800px-Mahabat_Maqbara.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Uparkot Fort", category: "fort", description: "Ancient fort.", images: [], isActive: true },
                { name: "Mahabat Maqbara", category: "heritage", description: "Mausoleum.", images: [], isActive: true },
                { name: "Girnar", category: "nature", description: "Mountain.", images: [], isActive: true },
                { name: "Sakkarbaug Zoo", category: "nature", description: "Lions.", images: [], isActive: true },
                { name: "Damodar Kund", category: "nature", description: "Holy tank.", images: [], isActive: true }
            ],
            foods: [
                { name: "Kesar Mango", type: "veg", description: "Fruit.", famousFor: "Summer", approxPrice: "₹100/kg", image: "", isActive: true },
                { name: "Kathiawadi Thali", type: "veg", description: "Spicy meal.", famousFor: "Dinner", approxPrice: "₹150", image: "", isActive: true },
                { name: "Ganthiya", type: "veg", description: "Snack.", famousFor: "Vanela", approxPrice: "₹150/kg", image: "", isActive: true },
                { name: "Tea", type: "beverage", description: "Strong.", famousFor: "Girnar", approxPrice: "₹20", image: "", isActive: true },
                { name: "Peda", type: "sweet", description: "Sweet.", famousFor: "Offer", approxPrice: "₹200/kg", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Junagadh Jn", connectivity: "Rail", approxCost: "₹150", isActive: true }
            ]
        },
        {
            name: "Gandhinagar", slug: "gandhinagar", description: "Green City.", history: "Planned capital.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Akshardham_Gandhinagar.jpg/800px-Akshardham_Gandhinagar.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Akshardham Temple", category: "temple", description: "Massive complex.", images: [], isActive: true },
                { name: "Indroda Park", category: "nature", description: "Dinosaur park.", images: [], isActive: true },
                { name: "Adalaj Stepwell", category: "heritage", description: "Nearby.", images: [], isActive: true },
                { name: "Dandi Kutir", category: "museum", description: "Gandhi museum.", images: [], isActive: true },
                { name: "Sarita Udyan", category: "nature", description: "Garden.", images: [], isActive: true }
            ],
            foods: [
                { name: "Farsan", type: "veg", description: "Snacks.", famousFor: "Variety", approxPrice: "₹100", image: "", isActive: true },
                { name: "Thepla", type: "veg", description: "Flatbread.", famousFor: "Travel", approxPrice: "₹20", image: "", isActive: true },
                { name: "Handvo", type: "veg", description: "Cake.", famousFor: "Savory", approxPrice: "₹50", image: "", isActive: true },
                { name: "Mohanthal", type: "sweet", description: "Gram sweet.", famousFor: "Rich", approxPrice: "₹300/kg", image: "", isActive: true },
                { name: "Shrikhand", type: "sweet", description: "Yogurt.", famousFor: "Dessert", approxPrice: "₹100/kg", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "GSRTC", connectivity: "Hub", approxCost: "₹30", isActive: true }
            ]
        },
        {
            name: "Bhavnagar", slug: "bhavnagar", description: "Cultural center.", history: "Port.", image: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Takhteshwar_Temple_Bhavnagar.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Takhteshwar Temple", category: "temple", description: "Hilltop.", images: [], isActive: true },
                { name: "Victoria Park", category: "nature", description: "Forest.", images: [], isActive: true },
                { name: "Velavadar Park", category: "nature", description: "Blackbuck.", images: [], isActive: true },
                { name: "Nishkalank Mahadev", category: "temple", description: "Sea temple.", images: [], isActive: true },
                { name: "Khodiyar Mandir", category: "temple", description: "Lake.", images: [], isActive: true }
            ],
            foods: [
                { name: "Ganthiya", type: "veg", description: "Bhavnagari.", famousFor: "Spicy", approxPrice: "₹150/kg", image: "", isActive: true },
                { name: "Penda", type: "sweet", description: "Sihori.", famousFor: "Sweet", approxPrice: "₹300/kg", image: "", isActive: true },
                { name: "Bataka Bhungla", type: "veg", description: "Spicy potato.", famousFor: "Street", approxPrice: "₹30", image: "", isActive: true },
                { name: "Pav Ganthiya", type: "veg", description: "Breakfast.", famousFor: "Unique", approxPrice: "₹40", image: "", isActive: true },
                { name: "Jalebi", type: "sweet", description: "Sweet.", famousFor: "Pair", approxPrice: "₹200/kg", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Bhavnagar Airport", connectivity: "Mumbai", approxCost: "₹3000", isActive: true }
            ]
        }
    ]
};

const outputPath = path.join(__dirname, '../../data/generated/Gujarat.json');
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(stateData, null, 2));
console.log(`Generated Gujarat data at ${outputPath}`);
