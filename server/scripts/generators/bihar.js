const fs = require('fs');
const path = require('path');

const stateData = {
    state: {
        name: "Bihar",
        slug: "bihar",
        description: "Bihar, the land of monasteries, is a place of deep historical significance, being the birthplace of Buddhism and Jainism and home to the ancient university of Nalanda.",
        culturalSummary: "Bihar's culture is a tapestry of ancient history, religion, and festivals like Chhath Puja, with a strong tradition of Madhubani art and rustic cuisine.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Ruins_of_Nalanda_University.jpg/800px-Ruins_of_Nalanda_University.jpg",
        isActive: true
    },
    culture: {
        stateName: "Bihar",
        overview: {
            introduction: "Bihar is one of the world's most ancient cradle of civilizations, mentioned in the Vedas, Puranas, and Epics.",
            lifestyle: "Predominantly rural and agrarian, with a deep-rooted value system and community living.",
            traditions: "Rich in folk songs (Sohar, Sumangali) and oral storytelling.",
            history: "Home to the Magadha empire, Emperor Ashoka, and the Gupta dynasty.",
            images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Ruins_of_Nalanda_University.jpg/800px-Ruins_of_Nalanda_University.jpg"]
        },
        cuisine: {
            description: "Wholesome and earthy, Bihar's cuisine is known for its usage of sattu (roasted gram flour) and mustard oil.",
            dishes: [
                { name: "Litti Chokha", type: "Veg", priceRange: "₹50–₹100", description: "Wheat balls stuffed with sattu, served with mashed vegetables.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Litti_Chokha.jpg/800px-Litti_Chokha.jpg" },
                { name: "Sattu Paratha", type: "Veg", priceRange: "₹60", description: "Paratha stuffed with spiced sattu.", image: "" },
                { name: "Khaja", type: "Sweet", priceRange: "₹100", description: "Crispy, layered sweet pastry.", image: "" },
                { name: "Thekua", type: "Sweet", priceRange: "₹50", description: "Deep-fried cookie made for Chhath Puja.", image: "" },
                { name: "Champaran Meat", type: "Non-Veg", priceRange: "₹300", description: "Mutton cooked in clay pots with whole spices.", image: "" }
            ]
        },
        foodShops: [
            { name: "Old Champaran Meat House", location: "Patna", famousFor: "Ahuna Mutton", priceRange: "₹400", rating: 4.6, timings: "12 PM - 10 PM" }
        ],
        danceAndMusic: {
            dances: [
                { name: "Jat-Jatin", type: "Folk", description: "Couple dance depicting the story of lovers Jat and Jatin.", image: "" },
                { name: "Jhumari", type: "Folk", description: "Performed by married women.", image: "" }
            ],
            music: [{ name: "Sohar", description: "Songs sung during childbirth.", image: "" }],
            instruments: [{ name: "Dholak", description: "Drum.", image: "" }, { name: "Harmonium", description: "Keyboard instrument.", image: "" }]
        },
        traditionalAttire: {
            men: { description: "Dhoti and Kurta.", attire: [{ name: "Dhoti", description: "Traditional wrap." }], images: [] },
            women: { description: "Saree.", attire: [{ name: "Tussar Silk Saree", description: "Local silk saree." }], images: [] },
            fabrics: [{ name: "Bhagalpuri Silk", description: "Famous Tussar silk from Bhagalpur." }]
        },
        festivals: [
            { name: "Chhath Puja", celebrationTime: "October/November", significance: "Sun God Worship", description: "Most reverent festival involving fasting and river rituals.", images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Chhath_Puja_Arghya.jpg/800px-Chhath_Puja_Arghya.jpg"] },
            { name: "Sonepur Mela", celebrationTime: "November", significance: "Cattle Fair", description: "Asia's largest cattle fair.", images: [] },
            { name: "Makar Sankranti", celebrationTime: "January", significance: "Harvest", description: "Kite flying and eating dahi-chura.", images: [] }
        ],
        artAndHandicrafts: [
            { name: "Madhubani Painting", type: "Painting", description: "Folk art done with fingers, twigs, and natural dyes.", famousFor: "Mithila region", images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Madhubani_Art.jpg/800px-Madhubani_Art.jpg"] },
            { name: "Sikki Grass Craft", type: "Craft", description: "Golden grass items.", famousFor: "Baskets", images: [] }
        ],
        heritageAndTraditions: {
            customs: [{ title: "Touching Feet", description: "Pranam to elders." }],
            rituals: [{ title: "Mundan", description: "Head shaving ceremony for kids." }],
            dailyLife: "Closely knit communities.",
            values: "Respect for elders and education."
        },
        culturalPlaces: [
            { name: "Mahabodhi Temple", type: "Temple", location: "Bodh Gaya", description: "UNESCO site where Buddha attained enlightenment.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Mahabodhi_Temple_Bodh_Gaya.jpg/800px-Mahabodhi_Temple_Bodh_Gaya.jpg" }
        ],
        extraSections: [
            { title: "Education", content: "Ancient Nalanda and Vikramshila universities were centers of global learning." }
        ],
        culturalExperience: {
            liveEvents: [],
            foodTrails: [],
            workshops: [],
            festivalCalendar: [
                { name: "Chhath Puja", priority: 1, date: "2025-10-27", significance: "Sun Worship", images: [], audience: ["Family", "Devotee"] }
            ]
        },
        isActive: true
    },
    cities: [
        {
            name: "Patna", slug: "patna", description: "Capital city and ancient Pataliputra.", history: "Capital of Magadha empires.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Golghar_Patna.jpg/800px-Golghar_Patna.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Golghar", category: "heritage", description: "Granary with city view.", images: [], bestTimeToVisit: "Day", entryFee: "₹10", location: "Gandhi Maidan", isActive: true },
                { name: "Patna Museum", category: "museum", description: "Jadu Ghar.", images: [], bestTimeToVisit: "Day", entryFee: "₹50", location: "City", isActive: true },
                { name: "Takht Sri Patna Sahib", category: "temple", description: "Birthplace of Guru Gobind Singh.", images: [], bestTimeToVisit: "All year", entryFee: "Free", location: "Patna City", isActive: true },
                { name: "Sanjay Gandhi Jaivik Udyan", category: "nature", description: "Zoo.", images: [], bestTimeToVisit: "Day", entryFee: "₹30", location: "Bailey Road", isActive: true },
                { name: "Budhha Smriti Park", category: "nature", description: "Peace park.", images: [], bestTimeToVisit: "Evening", entryFee: "₹20", location: "Station Road", isActive: true },
                { name: "Bihar Museum", category: "museum", description: "World class museum.", images: [], bestTimeToVisit: "Day", entryFee: "₹100", location: "Bailey Road", isActive: true },
                { name: "Gandhi Ghat", category: "nature", description: "Ganga river bank.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "NIT Patna", isActive: true },
                { name: "Mahavir Mandir", category: "temple", description: "Hanuman temple.", images: [], bestTimeToVisit: "Tuesday", entryFee: "Free", location: "Station Road", isActive: true },
                { name: "Kumhrar", category: "heritage", description: "Ancient ruins.", images: [], bestTimeToVisit: "Day", entryFee: "₹20", location: "Kankarbagh", isActive: true },
                { name: "Eco Park", category: "nature", description: "Recreational park.", images: [], bestTimeToVisit: "Evening", entryFee: "₹20", location: "Strand Road", isActive: true }
            ],
            foods: [
                { name: "Litti Chokha", type: "veg", description: "Stuffed balls.", famousFor: "Signature dish", approxPrice: "₹40", image: "", isActive: true },
                { name: "Chana Ghugni", type: "veg", description: "Spicy chickpeas.", famousFor: "Snack", approxPrice: "₹30", image: "", isActive: true },
                { name: "Mutton Curry", type: "non-veg", description: "Spicy meat.", famousFor: "Ahuna style", approxPrice: "₹300", image: "", isActive: true },
                { name: "Khaja", type: "sweet", description: "Layered sweet.", famousFor: "Silad", approxPrice: "₹100/kg", image: "", isActive: true },
                { name: "Samosa (Singhara)", type: "veg", description: "Fried snack.", famousFor: "Tea time", approxPrice: "₹10", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "JPNI Airport", connectivity: "Major cities", approxCost: "₹3000+", isActive: true },
                { type: "train", description: "Patna Junction", connectivity: "Major hub", approxCost: "₹200+", isActive: true },
                { type: "bus", description: "BSRTC", connectivity: "Statewide", approxCost: "₹100+", isActive: true },
                { type: "taxi", description: "Ola/Uber", connectivity: "City wide", approxCost: "₹200+", isActive: true },
                { type: "auto", description: "Autos", connectivity: "Local", approxCost: "₹20+", isActive: true }
            ]
        },
        {
            name: "Gaya", slug: "gaya", description: "Hindu pilgrimage site.", history: "Vishnupad.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Mahabodhi_Temple_Bodh_Gaya.jpg/800px-Mahabodhi_Temple_Bodh_Gaya.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Vishnupad Temple", category: "temple", description: "Footprint of Vishnu.", images: [], isActive: true },
                { name: "Mahabodhi Temple", category: "temple", description: "Bodh Gaya (nearby).", images: [], isActive: true },
                { name: "Bodhi Tree", category: "heritage", description: "Tree of enlightenment.", images: [], isActive: true },
                { name: "Dungeshwari Caves", category: "heritage", description: "Meditation caves.", images: [], isActive: true },
                { name: "Great Buddha Statue", category: "heritage", description: "80ft statue.", images: [], isActive: true }
            ],
            foods: [
                { name: "Tilkut", type: "sweet", description: "Sesame sweet.", famousFor: "Winter", approxPrice: "₹200/kg", image: "", isActive: true },
                { name: "Anarsa", type: "sweet", description: "Rice cookie.", famousFor: "Gaya special", approxPrice: "₹200/kg", image: "", isActive: true },
                { name: "Lai", type: "sweet", description: "Puffed rice ball.", famousFor: "Snack", approxPrice: "₹10", image: "", isActive: true },
                { name: "Litti", type: "veg", description: "Baked.", famousFor: "Meal", approxPrice: "₹30", image: "", isActive: true },
                { name: "Kesaria Peda", type: "sweet", description: "Milk sweet.", famousFor: "Prasad", approxPrice: "₹300/kg", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Gaya Airport", connectivity: "International", approxCost: "₹4000+", isActive: true },
                { type: "train", description: "Gaya Junction", connectivity: "Grand Chord", approxCost: "₹200+", isActive: true }
            ]
        },
        {
            name: "Nalanda", slug: "nalanda", description: "Ancient center of learning.", history: "Nalanda University.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Ruins_of_Nalanda_University.jpg/800px-Ruins_of_Nalanda_University.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Ruins of Nalanda", category: "heritage", description: "University ruins.", images: [], isActive: true },
                { name: "Hieun Tsang Memorial", category: "museum", description: "Chinese traveler.", images: [], isActive: true },
                { name: "Nalanda Museum", category: "museum", description: "Artifacts.", images: [], isActive: true },
                { name: "Pawapuri", category: "temple", description: "Jain pilgrimage.", images: [], isActive: true },
                { name: "Rajgir", category: "nature", description: "Nearby hills.", images: [], isActive: true }
            ],
            foods: [
                { name: "Khaja", type: "sweet", description: "Silao Khaja.", famousFor: "Crispy", approxPrice: "₹150/kg", image: "", isActive: true },
                { name: "Sattu Drink", type: "beverage", description: "Cooling drink.", famousFor: "Summer", approxPrice: "₹20", image: "", isActive: true },
                { name: "Litti", type: "veg", description: "Stuffed.", famousFor: "Lunch", approxPrice: "₹30", image: "", isActive: true },
                { name: "Rice", type: "veg", description: "Meal.", famousFor: "Staple", approxPrice: "₹50", image: "", isActive: true },
                { name: "Dahi", type: "veg", description: "Curd.", famousFor: "Side", approxPrice: "₹20", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Nalanda Station", connectivity: "Local", approxCost: "₹50", isActive: true },
                { type: "bus", description: "Bus", connectivity: "From Patna", approxCost: "₹100", isActive: true }
            ]
        },
        {
            name: "Muzaffarpur", slug: "muzaffarpur", description: "Litchi Kingdom.", history: "Commercial hub.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Litchi_Muzaffarpur.jpg/800px-Litchi_Muzaffarpur.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Litchi Gardens", category: "nature", description: "Fruit orchards.", images: [], isActive: true },
                { name: "Garib Sthan Mandir", category: "temple", description: "Shiva temple.", images: [], isActive: true },
                { name: "Jubba Sahni Park", category: "nature", description: "Park.", images: [], isActive: true },
                { name: "Ram Chandra Shahi Museum", category: "museum", description: "Artifacts.", images: [], isActive: true },
                { name: "Khudiram Bose Memorial", category: "heritage", description: "Freedom fighter.", images: [], isActive: true }
            ],
            foods: [
                { name: "Shahi Litchi", type: "veg", description: "Fruit.", famousFor: "GI Tag", approxPrice: "₹100/kg", image: "", isActive: true },
                { name: "Chura Dahi", type: "veg", description: "Breakfast.", famousFor: "Traditional", approxPrice: "₹50", image: "", isActive: true },
                { name: "Mutton Chaap", type: "non-veg", description: "Fry.", famousFor: "Spicy", approxPrice: "₹150", image: "", isActive: true },
                { name: "Sattu", type: "veg", description: "Flour.", famousFor: "Staple", approxPrice: "₹80/kg", image: "", isActive: true },
                { name: "Balushahi", type: "sweet", description: "Sweet.", famousFor: "Dessert", approxPrice: "₹200/kg", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Muzaffarpur Jn", connectivity: "Major", approxCost: "₹150+", isActive: true }
            ]
        },
        {
            name: "Bhagalpur", slug: "bhagalpur", description: "Silk City.", history: "River port.", image: "https://upload.wikimedia.org/wikipedia/commons/2/22/Vikramshila_Ruins.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Vikramshila University", category: "heritage", description: "Ancient ruins.", images: [], isActive: true },
                { name: "Dolphin Sanctuary", category: "nature", description: "Gangetic Dolphin.", images: [], isActive: true },
                { name: "Mandart Hill", category: "nature", description: "Mythology.", images: [], isActive: true },
                { name: "Budhanath Temple", category: "temple", description: "Shiva.", images: [], isActive: true },
                { name: "Kuppa Ghat", category: "culture", description: "Ashram.", images: [], isActive: true }
            ],
            foods: [
                { name: "Katarni Rice", type: "veg", description: "Aromatic.", famousFor: "GI Tag", approxPrice: "₹80/kg", image: "", isActive: true },
                { name: "Zardalu Mango", type: "veg", description: "Fruit.", famousFor: "GI Tag", approxPrice: "₹100/kg", image: "", isActive: true },
                { name: "Tilkut", type: "sweet", description: "Sesame.", famousFor: "Crunchy", approxPrice: "₹200/kg", image: "", isActive: true },
                { name: "Litti", type: "veg", description: "Baked.", famousFor: "Snack", approxPrice: "₹20", image: "", isActive: true },
                { name: "Fish Curry", type: "non-veg", description: "River fish.", famousFor: "Fresh", approxPrice: "₹200", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Bhagalpur Jn", connectivity: "Major", approxCost: "₹150+", isActive: true }
            ]
        },
        {
            name: "Darbhanga", slug: "darbhanga", description: "Cultural capital of Mithila.", history: "Royal family.", image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Darbhanga_Fort.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Darbhanga Fort", category: "heritage", description: "Royal fort.", images: [], isActive: true },
                { name: "Shyama Mai Temple", category: "temple", description: "Kali temple.", images: [], isActive: true },
                { name: "Ahilya Asthan", category: "temple", description: "Ramayana site.", images: [], isActive: true },
                { name: "Kusheshwar Asthan", category: "nature", description: "Bird sanctuary.", images: [], isActive: true },
                { name: "Chandradhari Museum", category: "museum", description: "Artifacts.", images: [], isActive: true }
            ],
            foods: [
                { name: "Makhana", type: "veg", description: "Fox nuts.", famousFor: "Superfood", approxPrice: "₹500/kg", image: "", isActive: true },
                { name: "Fish", type: "non-veg", description: "Maach.", famousFor: "Mithila", approxPrice: "₹200", image: "", isActive: true },
                { name: "Dahi", type: "veg", description: "Curd.", famousFor: "Quality", approxPrice: "₹60", image: "", isActive: true },
                { name: "Malpua", type: "sweet", description: "Pancake.", famousFor: "Dessert", approxPrice: "₹20", image: "", isActive: true },
                { name: "Paan", type: "veg", description: "Betel leaf.", famousFor: "Sweet", approxPrice: "₹10", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Darbhanga Airport", connectivity: "Major cities", approxCost: "₹3000+", isActive: true }
            ]
        },
        {
            name: "Rajgir", slug: "rajgir", description: "Hill town.", history: "Magadha capital.", image: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Vishwa_Shanti_Stupa_Rajgir.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Vishwa Shanti Stupa", category: "temple", description: "Peace pagoda.", images: [], isActive: true },
                { name: "Gridhakuta Hill", category: "heritage", description: "Buddha preached here.", images: [], isActive: true },
                { name: "Hot Springs", category: "nature", description: "Medicinal.", images: [], isActive: true },
                { name: "Cyclopean Wall", category: "heritage", description: "Ancient wall.", images: [], isActive: true },
                { name: "Venu Vana", category: "nature", description: "Bamboo grove.", images: [], isActive: true }
            ],
            foods: [
                { name: "Kaja", type: "sweet", description: "Silao.", famousFor: "Local", approxPrice: "₹150", image: "", isActive: true },
                { name: "Chanar Murki", type: "sweet", description: "Cottage cheese.", famousFor: "Sweet", approxPrice: "₹200", image: "", isActive: true },
                { name: "Litti", type: "veg", description: "Stuffed.", famousFor: "Snack", approxPrice: "₹30", image: "", isActive: true },
                { name: "Thali", type: "veg", description: "Meal.", famousFor: "Lunch", approxPrice: "₹100", image: "", isActive: true },
                { name: "Coconut Water", type: "beverage", description: "Fresh.", famousFor: "Drink", approxPrice: "₹40", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "Bus", connectivity: "Patna", approxCost: "₹150", isActive: true }
            ]
        },
        {
            name: "Vaishali", slug: "vaishali", description: "First republic.", history: "Lord Mahavira.", image: "https://upload.wikimedia.org/wikipedia/commons/8/87/Ashokan_Pillar_Vaishali.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Ashokan Pillar", category: "heritage", description: "Lion pillar.", images: [], isActive: true },
                { name: "Buddha Stupa", category: "heritage", description: "Ashes of Buddha.", images: [], isActive: true },
                { name: "Abhishek Pushkarini", category: "nature", description: "Coronation tank.", images: [], isActive: true },
                { name: "Vishwa Shanti Stupa", category: "temple", description: "Pagoda.", images: [], isActive: true },
                { name: "Bawan Pokhar Temple", category: "temple", description: "Old temple.", images: [], isActive: true }
            ],
            foods: [
                { name: "Banana", type: "veg", description: "Hajipur banana.", famousFor: "Small", approxPrice: "₹40/dozen", image: "", isActive: true },
                { name: "Litti", type: "veg", description: "Local.", famousFor: "Snack", approxPrice: "₹20", image: "", isActive: true },
                { name: "Samosa", type: "veg", description: "Potato.", famousFor: "Snack", approxPrice: "₹10", image: "", isActive: true },
                { name: "Tea", type: "beverage", description: "Kulhad.", famousFor: "Drink", approxPrice: "₹10", image: "", isActive: true },
                { name: "Sweets", type: "sweet", description: "Local.", famousFor: "Dessert", approxPrice: "₹100", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "Bus", connectivity: "Patna", approxCost: "₹100", isActive: true }
            ]
        },
        {
            name: "Sasaram", slug: "sasaram", description: "Historical town.", history: "Sher Shah Suri.", image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Tomb_of_Sher_Shah_Suri.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Sher Shah Suri Tomb", category: "heritage", description: "Mausoleum in lake.", images: [], isActive: true },
                { name: "Rohtasgarh Fort", category: "fort", description: "Hill fort.", images: [], isActive: true },
                { name: "Tara Chandi Temple", category: "temple", description: "Shakti Peeth.", images: [], isActive: true },
                { name: "Manjhar Kund", category: "nature", description: "Waterfall.", images: [], isActive: true },
                { name: "Indrapuri Dam", category: "nature", description: "Dam.", images: [], isActive: true }
            ],
            foods: [
                { name: "Belgrami", type: "sweet", description: "Cottage cheese.", famousFor: "Udwantnagar", approxPrice: "₹200", image: "", isActive: true },
                { name: "Litti", type: "veg", description: "Classic.", famousFor: "Meal", approxPrice: "₹30", image: "", isActive: true },
                { name: "Chicken", type: "non-veg", description: "Curry.", famousFor: "Spicy", approxPrice: "₹200", image: "", isActive: true },
                { name: "Paratha", type: "veg", description: "Fried bread.", famousFor: "Staple", approxPrice: "₹10", image: "", isActive: true },
                { name: "Chana", type: "veg", description: "Fried.", famousFor: "Snack", approxPrice: "₹20", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Sasaram Jn", connectivity: "Rail", approxCost: "₹100+", isActive: true }
            ]
        },
        {
            name: "Purnia", slug: "purnia", description: "Oldest district.", history: "British era.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Purnia_City.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Jalalgarh Fort", category: "fort", description: "Ruined fort.", images: [], isActive: true },
                { name: "Puran Devi Temple", category: "temple", description: "Goddess.", images: [], isActive: true },
                { name: "Kajha Kothi", category: "heritage", description: "British building.", images: [], isActive: true },
                { name: "Bio Diversity Park", category: "nature", description: "Park.", images: [], isActive: true },
                { name: "Kali Bari", category: "temple", description: "Temple.", images: [], isActive: true }
            ],
            foods: [
                { name: "Gulab Jamun", type: "sweet", description: "Sweet.", famousFor: "Soft", approxPrice: "₹20", image: "", isActive: true },
                { name: "Mutton", type: "non-veg", description: "Curry.", famousFor: "Rich", approxPrice: "₹300", image: "", isActive: true },
                { name: "Fish", type: "non-veg", description: "Maach.", famousFor: "Bengal influence", approxPrice: "₹200", image: "", isActive: true },
                { name: "Chura", type: "veg", description: "Beaten rice.", famousFor: "Breakfast", approxPrice: "₹40", image: "", isActive: true },
                { name: "Dahi Jalebi", type: "sweet", description: "Combo.", famousFor: "Breakfast", approxPrice: "₹50", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Purnia Jn", connectivity: "Rail", approxCost: "₹150", isActive: true }
            ]
        }
    ]
};

const outputPath = path.join(__dirname, '../../data/generated/Bihar.json');
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(stateData, null, 2));
console.log(`Generated Bihar data at ${outputPath}`);
