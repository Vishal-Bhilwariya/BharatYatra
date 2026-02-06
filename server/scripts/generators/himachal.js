const fs = require('fs');
const path = require('path');

const stateData = {
    state: {
        name: "Himachal Pradesh",
        slug: "himachal-pradesh",
        description: "Himachal Pradesh, the 'Land of Gods', is a paradise for nature lovers, adventure enthusiasts, and spiritual seekers, nestled in the Himalayas.",
        culturalSummary: "Himachali culture is defined by its warm hospitality, colorful pahari attire, folk dances (Nati), and deep-rooted religious traditions.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Manali_Himalayas.jpg/800px-Manali_Himalayas.jpg",
        isActive: true
    },
    culture: {
        stateName: "Himachal Pradesh",
        overview: {
            introduction: "Himachal is a state of snow-capped peaks, lush valleys, and flowing rivers.",
            lifestyle: "Simple, hardworking pahari life, closely tied to nature and seasons.",
            traditions: "Every village has its own deity (Devta) who is consulted for major decisions.",
            history: "Known as 'Dev Bhoomi', it has a history of small kingdoms and British summer retreats.",
            images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Manali_Himalayas.jpg/800px-Manali_Himalayas.jpg"]
        },
        cuisine: {
            description: "Simple, hearty, and warming, using spices like cardamom, cinnamon, and cloves.",
            dishes: [
                { name: "Dham", type: "Veg", priceRange: "₹200", description: "Traditional festive meal served on leaf plates.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Himachali_Dham.jpg/800px-Himachali_Dham.jpg" },
                { name: "Siddu", type: "Veg", priceRange: "₹50", description: "Steamed wheat bun stuffed with poppy seeds/walnuts.", image: "" },
                { name: "Madra", type: "Veg", priceRange: "₹100", description: "Yogurt-based chickpea curry.", image: "" },
                { name: "Babru", type: "Veg", priceRange: "₹40", description: "Fried bread stuffed with black gram.", image: "" },
                { name: "Tudkiya Bhath", type: "Veg", priceRange: "₹120", description: "Spicy rice pilaf.", image: "" }
            ]
        },
        foodShops: [
            { name: "Sita Ram Sweets", location: "Shimla", famousFor: "Sidu", priceRange: "₹50", rating: 4.5, timings: "10 AM - 8 PM" }
        ],
        danceAndMusic: {
            dances: [
                { name: "Nati", type: "Folk", description: "Guinness record holding community dance.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Nati_Dance.jpg/800px-Nati_Dance.jpg" },
                { name: "Dangi", type: "Folk", description: "Dance of the Gaddis.", image: "" }
            ],
            music: [{ name: "Jhoori", description: "Love songs sung in open fields.", image: "" }],
            instruments: [{ name: "Ranasingha", description: "Curved trumpet.", image: "" }]
        },
        traditionalAttire: {
            men: { description: "Kurta, Pajama, and Himachali Topi.", attire: [{ name: "Himachali Topi", description: "Woolen cap with colorful band." }], images: [] },
            women: { description: "Reshta (gown) and Dhatu (headscarf).", attire: [{ name: "Pattu", description: "Woolen shawl." }], images: [] },
            fabrics: [{ name: "Kullu Shawls", description: "Woolen shawls with geometric patterns." }]
        },
        festivals: [
            { name: "Kullu Dussehra", celebrationTime: "October", significance: "Victory of Good", description: "Week-long congregation of village deities.", images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Kullu_Dussehra_Rath.jpg/800px-Kullu_Dussehra_Rath.jpg"] },
            { name: "Shivratri", celebrationTime: "February", significance: "Shiva", description: "Mandi Shivratri fair.", images: [] },
            { name: "Minjar", celebrationTime: "August", significance: "Harvest", description: "Maize festival in Chamba.", images: [] }
        ],
        artAndHandicrafts: [
            { name: "Kangra Painting", type: "Painting", description: "Miniature pahari paintings.", famousFor: "Love themes", images: [] },
            { name: "Wood Carving", type: "Craft", description: "Intricate temple carvings.", famousFor: "Temples", images: [] }
        ],
        heritageAndTraditions: {
            customs: [{ title: "Hospitality", description: "Serving tea/water to every guest." }],
            rituals: [{ title: "Fagua", description: "Festival of colors in spring." }],
            dailyLife: "Agriculture and weaving.",
            values: "Respect for nature and gods."
        },
        culturalPlaces: [
            { name: "Hadimba Temple", type: "Temple", location: "Manali", description: "Wooden pagoda-style temple.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Hidimba_Devi_Temple_Manali.jpg/800px-Hidimba_Devi_Temple_Manali.jpg" }
        ],
        extraSections: [
            { title: "Toy Train", content: "Kalka-Shimla Railway is a UNESCO World Heritage site." }
        ],
        culturalExperience: {
            liveEvents: [],
            foodTrails: [],
            workshops: [],
            festivalCalendar: [
                { name: "Kullu Dussehra", priority: 1, date: "2025-10-02", significance: "Deities", images: [], audience: ["Tourist", "Local"] }
            ]
        },
        isActive: true
    },
    cities: [
        {
            name: "Shimla", slug: "shimla", description: "Queen of Hills.", history: "Summer capital of British India.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Shimla_Ridge.jpg/800px-Shimla_Ridge.jpg", isPopular: true, isActive: true,
            places: [
                { name: "The Ridge", category: "other", description: "City center.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "Mall Road", isActive: true },
                { name: "Mall Road", category: "other", description: "Shopping street.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "Shimla", isActive: true },
                { name: "Jakhu Temple", category: "temple", description: "Hanuman temple.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Jakhu Hill", isActive: true },
                { name: "Viceregal Lodge", category: "heritage", description: "Rashtrapati Niwas.", images: [], bestTimeToVisit: "Day", entryFee: "₹50", location: "Observatory Hill", isActive: true },
                { name: "Christ Church", category: "temple", description: "Neo-Gothic church.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Ridge", isActive: true },
                { name: "Kufri", category: "nature", description: "Snow sports.", images: [], bestTimeToVisit: "Winter", entryFee: "Free", location: "Nearby", isActive: true },
                { name: "Chadwick Falls", category: "nature", description: "Waterfall.", images: [], bestTimeToVisit: "Monsoon", entryFee: "Free", location: "Glen", isActive: true },
                { name: "Tara Devi Temple", category: "temple", description: "Hilltop temple.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Shoghi", isActive: true },
                { name: "Army Heritage Museum", category: "museum", description: "Army history.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Annandale", isActive: true },
                { name: "Himalayan Bird Park", category: "nature", description: "Aviary.", images: [], bestTimeToVisit: "Summer", entryFee: "₹20", location: "Chaura Maidan", isActive: true }
            ],
            foods: [
                { name: "Sidu", type: "veg", description: "Stuffed bun.", famousFor: "Ghee", approxPrice: "₹60", image: "", isActive: true },
                { name: "Chana Madra", type: "veg", description: "Chickpeas.", famousFor: "Dham", approxPrice: "₹100", image: "", isActive: true },
                { name: "Chicken Anardana", type: "non-veg", description: "Tangy chicken.", famousFor: "Spice", approxPrice: "₹300", image: "", isActive: true },
                { name: "Thukpa", type: "non-veg", description: "Noodle soup.", famousFor: "Warmth", approxPrice: "₹150", image: "", isActive: true },
                { name: "Kurkey", type: "veg", description: "Mushroom.", famousFor: "Wild", approxPrice: "₹200", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Kalka-Shimla Toy Train", connectivity: "Scenic", approxCost: "₹500", isActive: true },
                { type: "flight", description: "Jubbarhatti Airport", connectivity: "Limited", approxCost: "₹4000", isActive: true },
                { type: "bus", description: "HRTC", connectivity: "Excellent", approxCost: "₹50+", isActive: true },
                { type: "taxi", description: "Union Taxi", connectivity: "Local", approxCost: "₹500+", isActive: true },
                { type: "foot", description: "Walking", connectivity: "Mall Road", approxCost: "Free", isActive: true }
            ]
        },
        {
            name: "Manali", slug: "manali", description: "Adventure hub.", history: "Manu's home.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Manali_Himalayas.jpg/800px-Manali_Himalayas.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Hadimba Devi Temple", category: "temple", description: "Wooden temple.", images: [], isActive: true },
                { name: "Solang Valley", category: "nature", description: "Adventure sports.", images: [], isActive: true },
                { name: "Rohtang Pass", category: "nature", description: "Snow point.", images: [], isActive: true },
                { name: "Vashisht Baths", category: "nature", description: "Hot springs.", images: [], isActive: true },
                { name: "Mall Road", category: "other", description: "Market.", images: [], isActive: true }
            ],
            foods: [
                { name: "Trout Fish", type: "non-veg", description: "River fish.", famousFor: "Fresh", approxPrice: "₹500", image: "", isActive: true },
                { name: "Mittha", type: "sweet", description: "Sweet rice.", famousFor: "Dham", approxPrice: "₹80", image: "", isActive: true },
                { name: "Cantonese Noodles", type: "non-veg", description: "Chinese.", famousFor: "Tourists", approxPrice: "₹200", image: "", isActive: true },
                { name: "Momos", type: "non-veg", description: "Dumplings.", famousFor: "Street", approxPrice: "₹100", image: "", isActive: true },
                { name: "Apple Pie", type: "sweet", description: "Dessert.", famousFor: "Orchards", approxPrice: "₹150", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "Volvo", connectivity: "Delhi/Chandigarh", approxCost: "₹1000", isActive: true }
            ]
        },
        {
            name: "Dharamshala", slug: "dharamshala", description: "Little Lhasa.", history: "Dalai Lama.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Dharamshala_Stadium.jpg/800px-Dharamshala_Stadium.jpg", isPopular: true, isActive: true,
            places: [
                { name: "McLeod Ganj", category: "culture", description: "Tibetan hub.", images: [], isActive: true },
                { name: "HPCA Stadium", category: "other", description: "Cricket.", images: [], isActive: true },
                { name: "Bhagsunag Falls", category: "nature", description: "Waterfall.", images: [], isActive: true },
                { name: "Triund", category: "nature", description: "Trek.", images: [], isActive: true },
                { name: "War Memorial", category: "heritage", description: "Tribute.", images: [], isActive: true }
            ],
            foods: [
                { name: "Tibetan Butter Tea", type: "beverage", description: "Salty tea.", famousFor: "Unique", approxPrice: "₹50", image: "", isActive: true },
                { name: "Thenthuk", type: "veg", description: "Noodle soup.", famousFor: "Tibetan", approxPrice: "₹120", image: "", isActive: true },
                { name: "Bhagsu Cake", type: "sweet", description: "Dessert.", famousFor: "Local", approxPrice: "₹40", image: "", isActive: true },
                { name: "Shapta", type: "non-veg", description: "Meat curry.", famousFor: "Spicy", approxPrice: "₹250", image: "", isActive: true },
                { name: "Tingmo", type: "veg", description: "Steamed bread.", famousFor: "Soft", approxPrice: "₹40", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Gaggal Airport", connectivity: "Nearby", approxCost: "₹3500", isActive: true }
            ]
        },
        {
            name: "Dalhousie", slug: "dalhousie", description: "Colonial charm.", history: "Lord Dalhousie.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Dalhousie_Khajjiar.jpg/800px-Dalhousie_Khajjiar.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Khajjiar", category: "nature", description: "Mini Switzerland.", images: [], isActive: true },
                { name: "Panchpula", category: "nature", description: "Waterfall.", images: [], isActive: true },
                { name: "Satdhara Falls", category: "nature", description: "Seven springs.", images: [], isActive: true },
                { name: "Dainkund Peak", category: "nature", description: "Viewpoint.", images: [], isActive: true },
                { name: "St. John's Church", category: "temple", description: "Oldest church.", images: [], isActive: true }
            ],
            foods: [
                { name: "Maggi", type: "veg", description: "Noodles.", famousFor: "Hills", approxPrice: "₹50", image: "", isActive: true },
                { name: "Pakoras", type: "veg", description: "Fritters.", famousFor: "Tea", approxPrice: "₹100", image: "", isActive: true },
                { name: "Soup", type: "veg", description: "Hot.", famousFor: "Cold", approxPrice: "₹80", image: "", isActive: true },
                { name: "Bun Omelette", type: "non-veg", description: "Egg.", famousFor: "Breakfast", approxPrice: "₹60", image: "", isActive: true },
                { name: "Coffee", type: "beverage", description: "Hot.", famousFor: "Warmth", approxPrice: "₹50", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "Bus", connectivity: "Pathankot", approxCost: "₹100", isActive: true }
            ]
        },
        {
            name: "Spiti Valley", slug: "spiti", description: "Middle Land.", history: "Buddhism.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Key_Monastery_Spiti.jpg/800px-Key_Monastery_Spiti.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Key Monastery", category: "temple", description: "Ancient.", images: [], isActive: true },
                { name: "Chandratal Lake", category: "nature", description: "Moon lake.", images: [], isActive: true },
                { name: "Kaza", category: "culture", description: "Main town.", images: [], isActive: true },
                { name: "Pin Valley", category: "nature", description: "Park.", images: [], isActive: true },
                { name: "Hikkim", category: "other", description: "Highest post office.", images: [], isActive: true }
            ],
            foods: [
                { name: "Thukpa", type: "veg", description: "Soup.", famousFor: "Warm", approxPrice: "₹150", image: "", isActive: true },
                { name: "Momo", type: "veg", description: "Dumpling.", famousFor: "Staple", approxPrice: "₹100", image: "", isActive: true },
                { name: "Butter Tea", type: "beverage", description: "Tea.", famousFor: "Energy", approxPrice: "₹40", image: "", isActive: true },
                { name: "Sea Buckthorn Tea", type: "beverage", description: "Berry.", famousFor: "Health", approxPrice: "₹50", image: "", isActive: true },
                { name: "Tsampa", type: "veg", description: "Barley flour.", famousFor: "Bfast", approxPrice: "₹60", image: "", isActive: true }
            ],
            transports: [
                { type: "taxi", description: "Sumo/Traveller", connectivity: "Shimla/Manali", approxCost: "₹1000+", isActive: true }
            ]
        },
        {
            name: "Kasol", slug: "kasol", description: "Mini Israel.", history: "Parvati Valley.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Parvati_River_Kasol.jpg/800px-Parvati_River_Kasol.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Parvati River", category: "nature", description: "River.", images: [], isActive: true },
                { name: "Manikaran", category: "temple", description: "Gurudwara.", images: [], isActive: true },
                { name: "Tosh", category: "nature", description: "Village.", images: [], isActive: true },
                { name: "Malana", category: "culture", description: "Ancient village.", images: [], isActive: true },
                { name: "Kheerganga", category: "nature", description: "Trek.", images: [], isActive: true }
            ],
            foods: [
                { name: "Shakshuka", type: "veg", description: "Eggs.", famousFor: "Israeli", approxPrice: "₹200", image: "", isActive: true },
                { name: "Hummus Pita", type: "veg", description: "Dip.", famousFor: "Cafe", approxPrice: "₹180", image: "", isActive: true },
                { name: "Falafel", type: "veg", description: "Wrap.", famousFor: "Snack", approxPrice: "₹150", image: "", isActive: true },
                { name: "Schnitzel", type: "non-veg", description: "Chicken.", famousFor: "Dinner", approxPrice: "₹300", image: "", isActive: true },
                { name: "Nutella Pancake", type: "sweet", description: "Dessert.", famousFor: "Sweet", approxPrice: "₹150", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "Bus", connectivity: "Bhuntar", approxCost: "₹50", isActive: true }
            ]
        },
        {
            name: "Palampur", slug: "palampur", description: "Tea Capital.", history: "British.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Tea_Garden_Palampur.jpg/800px-Tea_Garden_Palampur.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Tea Gardens", category: "nature", description: "Greenery.", images: [], isActive: true },
                { name: "Neugal Khad", category: "nature", description: "Stream.", images: [], isActive: true },
                { name: "Saurabh Van Vihar", category: "nature", description: "Park.", images: [], isActive: true },
                { name: "Baijnath Temple", category: "temple", description: "Shiva.", images: [], isActive: true },
                { name: "Andretta Pottery", category: "culture", description: "Art.", images: [], isActive: true }
            ],
            foods: [
                { name: "Kangra Tea", type: "beverage", description: "Tea.", famousFor: "Aroma", approxPrice: "₹20", image: "", isActive: true },
                { name: "Patande", type: "sweet", description: "Pancakes.", famousFor: "Local", approxPrice: "₹50", image: "", isActive: true },
                { name: "Lungru", type: "veg", description: "Fern.", famousFor: "Pickle", approxPrice: "₹100", image: "", isActive: true },
                { name: "Momo", type: "veg", description: "Tibetan.", famousFor: "Snack", approxPrice: "₹80", image: "", isActive: true },
                { name: "Bhaturu", type: "veg", description: "Bread.", famousFor: "Meal", approxPrice: "₹20", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "Bus", connectivity: "Road", approxCost: "₹50", isActive: true }
            ]
        },
        {
            name: "Chamba", slug: "chamba", description: "Ancient Capital.", history: "Raja Sahil Varman.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Chamba_Town.jpg/800px-Chamba_Town.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Laxmi Narayan Temple", category: "temple", description: "Group.", images: [], isActive: true },
                { name: "Bhuri Singh Museum", category: "museum", description: "Arts.", images: [], isActive: true },
                { name: "Chaugan", category: "nature", description: "Ground.", images: [], isActive: true },
                { name: "Chamunda Devi Temple", category: "temple", description: "Wood.", images: [], isActive: true },
                { name: "Rang Mahal", category: "heritage", description: "Palace.", images: [], isActive: true }
            ],
            foods: [
                { name: "Chana Madra", type: "veg", description: "Curry.", famousFor: "Dham", approxPrice: "₹120", image: "", isActive: true },
                { name: "Chukh", type: "veg", description: "Chilli dip.", famousFor: "Spicy", approxPrice: "₹50", image: "", isActive: true },
                { name: "Rajma", type: "veg", description: "Beans.", famousFor: "Chamba", approxPrice: "₹100", image: "", isActive: true },
                { name: "Honey", type: "sweet", description: "Organic.", famousFor: "Pure", approxPrice: "₹500/kg", image: "", isActive: true },
                { name: "Apple", type: "veg", description: "Fruit.", famousFor: "Fresh", approxPrice: "₹100/kg", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "Bus", connectivity: "Dalhousie", approxCost: "₹100", isActive: true }
            ]
        },
        {
            name: "Mandi", slug: "mandi", description: "Varanasi of Hills.", history: "Temples.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Mandi_Town.jpg/800px-Mandi_Town.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Bhootnath Temple", category: "temple", description: "Shiva.", images: [], isActive: true },
                { name: "Rewalsar Lake", category: "nature", description: "Sacred.", images: [], isActive: true },
                { name: "Prashar Lake", category: "nature", description: "Trek.", images: [], isActive: true },
                { name: "Pandoh Dam", category: "nature", description: "Dam.", images: [], isActive: true },
                { name: "Janjehli", category: "nature", description: "Valley.", images: [], isActive: true }
            ],
            foods: [
                { name: "Sepu Vadi", type: "veg", description: "Dumpling curry.", famousFor: "Dham", approxPrice: "₹150", image: "", isActive: true },
                { name: "Kachori", type: "veg", description: "Fried.", famousFor: "Snack", approxPrice: "₹30", image: "", isActive: true },
                { name: "Jalebi", type: "sweet", description: "Sweet.", famousFor: "Bhaiya", approxPrice: "₹40", image: "", isActive: true },
                { name: "Tea", type: "beverage", description: "Chai.", famousFor: "Break", approxPrice: "₹15", image: "", isActive: true },
                { name: "Dry Fruits", type: "veg", description: "Nuts.", famousFor: "Market", approxPrice: "₹1000/kg", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "Bus", connectivity: "Junction", approxCost: "₹100", isActive: true }
            ]
        },
        {
            name: "Kasauli", slug: "kasauli", description: "Quiet Hill Station.", history: "Cantonment.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Kasauli_Church.jpg/800px-Kasauli_Church.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Monkey Point", category: "nature", description: "View.", images: [], isActive: true },
                { name: "Christ Church", category: "temple", description: "Gothic.", images: [], isActive: true },
                { name: "Sunset Point", category: "nature", description: "View.", images: [], isActive: true },
                { name: "Gilbert Trail", category: "nature", description: "Walk.", images: [], isActive: true },
                { name: "Kasauli Brewery", category: "heritage", description: "Whiskey.", images: [], isActive: true }
            ],
            foods: [
                { name: "Bun Samosa", type: "veg", description: "Fusion.", famousFor: "Narinder", approxPrice: "₹40", image: "", isActive: true },
                { name: "Band Samosa", type: "veg", description: "Stuffed.", famousFor: "Snack", approxPrice: "₹30", image: "", isActive: true },
                { name: "Ginger Tea", type: "beverage", description: "Tea.", famousFor: "Cold", approxPrice: "₹20", image: "", isActive: true },
                { name: "Wine", type: "beverage", description: "Fruit wine.", famousFor: "Local", approxPrice: "₹300", image: "", isActive: true },
                { name: "Momos", type: "veg", description: "Steam.", famousFor: "Roadside", approxPrice: "₹80", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "Bus", connectivity: "Chandigarh", approxCost: "₹100", isActive: true }
            ]
        }
    ]
};

const outputPath = path.join(__dirname, '../../data/generated/Himachal_Pradesh.json');
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(stateData, null, 2));
console.log(`Generated Himachal Pradesh data at ${outputPath}`);
