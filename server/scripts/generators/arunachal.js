const fs = require('fs');
const path = require('path');

const stateData = {
    state: {
        name: "Arunachal Pradesh",
        slug: "arunachal-pradesh",
        description: "Arunachal Pradesh, the 'Land of Dawn-Lit Mountains', is India's easternmost state offering pristine nature, diverse tribal culture, and ancient monasteries.",
        culturalSummary: "Home to 26 major tribes and over 100 sub-tribes, the culture is characterized by festivals like Losar, intricate bamboo crafts, and a harmony with nature.",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tawang_Monastery_Arunachal.jpg",
        isActive: true
    },
    culture: {
        stateName: "Arunachal Pradesh",
        overview: {
            introduction: "Arunachal Pradesh is a treasure trove of culture and nature, often called the Orchid State of India.",
            lifestyle: "Tribal lifestyle close to nature, with distinctive housing and agricultural practices like Jhum cultivation.",
            traditions: "Rich oral traditions, shamanism (Donyi-Polo), and Mahayana Buddhism coexist.",
            history: "Historically known as the Prabhu Mountains in the Puranas, it has a rich legacy of tribal chieftainship.",
            images: ["https://upload.wikimedia.org/wikipedia/commons/e/e8/Tawang_Monastery_Arunachal.jpg"]
        },
        cuisine: {
            description: "Simple, organic, and flavorful, often using fermented bamboo shoots, herbs, and meats.",
            dishes: [
                { name: "Thukpa", type: "Non-Veg", priceRange: "₹100–₹200", description: "Noodle soup with vegetables and meat.", image: "https://upload.wikimedia.org/wikipedia/commons/9/90/Thukpa_soup.jpg" },
                { name: "Momos", type: "Non-Veg", priceRange: "₹80–₹150", description: "Steamed dumplings filled with meat or vegetables.", image: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Momo_nepal.jpg" },
                { name: "Pika Pila", type: "Veg", priceRange: "₹50–₹100", description: "Pickle made of bamboo shoots and pork fat (optional).", image: "" },
                { name: "Apong", type: "Beverage", priceRange: "₹50", description: "Local rice beer served in bamboo tumblers.", image: "" },
                { name: "Lukter", type: "Non-Veg", priceRange: "₹150", description: "Cooked dry meat with chilli flakes.", image: "" }
            ]
        },
        foodShops: [
            { name: "Orange Restaurant", location: "Tawang", famousFor: "Thukpa", priceRange: "₹300", rating: 4.5, timings: "10 AM - 9 PM" }
        ],
        danceAndMusic: {
            dances: [
                { name: "Aji Lhamu", type: "Mask Dance", description: "Performed by the Monpa tribe depicting the saga of King Gesar.", image: "" },
                { name: "Chalo", type: "Folk", description: "Harvest festival dance of the Nocte tribe.", image: "" }
            ],
            music: [{ name: "Folk Songs", description: "Sung during festivals and agriculture.", image: "" }],
            instruments: [{ name: "Emul", description: "A type of cymbal used in dances.", image: "" }]
        },
        traditionalAttire: {
            men: { description: "Varies by tribe; commonly sleeveless shirts (chemise) and wraps.", attire: [{ name: "Monpa Dress", description: "Woolen coats and trousers." }], images: [] },
            women: { description: "Vibrant skirts and heavy jewelry of turquoise and coral.", attire: [{ name: "Gale", description: "Woven skirt with geometric patterns." }], images: [] },
            fabrics: [{ name: "Eri Silk", description: "Ahimsa silk produced without killing silkworms." }]
        },
        festivals: [
            { name: "Losar", celebrationTime: "February", significance: "Tibetan New Year", description: "Major festival of the Monpa tribe celebrated with fanfare.", images: ["https://upload.wikimedia.org/wikipedia/commons/5/58/Losar_festival.jpg"] },
            { name: "Ziro Festival of Music", celebrationTime: "September", significance: "Music and Culture", description: "Outdoor music festival showcasing independent artists.", images: [] },
            { name: "Nyokum", celebrationTime: "February", significance: "Nyishi Tribe Festival", description: "Celebrating communal harmony and prosperity.", images: [] }
        ],
        artAndHandicrafts: [
            { name: "Bamboo Cane Crafts", type: "Craft", description: "Baskets, furniture, and mats woven from bamboo.", famousFor: "Durability and design", images: [] },
            { name: "Thangka Painting", type: "Painting", description: "Buddhist religious painting on cotton/silk.", famousFor: "Intricate detail", images: [] }
        ],
        heritageAndTraditions: {
            customs: [{ title: "Hospitality", description: "Offering Apong to guests is a sign of respect." }],
            rituals: [{ title: "Animism", description: "Worship of nature spirits (Donyi-Polo) is prevalent." }],
            dailyLife: "Revolves around agriculture, weaving, and community bonding.",
            values: "Simplicity, community living, and respect for nature."
        },
        culturalPlaces: [
            { name: "Tawang Monastery", type: "Monastery", location: "Tawang", description: "Largest monastery in India.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tawang_Monastery_Arunachal.jpg" }
        ],
        extraSections: [
            { title: "Languages", content: "Most diverse linguistic region in Asia, with over 30 distinct languages." }
        ],
        culturalExperience: {
            liveEvents: [],
            foodTrails: [],
            workshops: [],
            festivalCalendar: [
                { name: "Ziro Festival", priority: 1, date: "2025-09-25", significance: "Music", images: [], audience: ["Youth", "Tourist"] }
            ]
        },
        isActive: true
    },
    cities: [
        {
            name: "Itanagar", slug: "itanagar", description: "Capital city known for Ita Fort and scenic beauty.", history: "Named after Ita Fort.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Itanagar_Gompa.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Ita Fort", category: "fort", description: "For of bricks dating to 14th century.", images: [], bestTimeToVisit: "Winter", entryFee: "₹10", location: "City", isActive: true },
                { name: "Gompa", category: "temple", description: "Buddhist center.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Hilltop", isActive: true },
                { name: "Ganga Lake", category: "nature", description: "Scenic lake also known as Geker Sinying.", images: [], bestTimeToVisit: "Day", entryFee: "₹20", location: "City", isActive: true },
                { name: "Jawaharlal Nehru State Museum", category: "museum", description: "Displays tribal culture.", images: [], bestTimeToVisit: "Day", entryFee: "₹20", location: "City", isActive: true }
            ],
            foods: [
                { name: "Momos", type: "non-veg", description: "Dumplings.", famousFor: "Snack", approxPrice: "₹100", image: "", isActive: true },
                { name: "Thukpa", type: "non-veg", description: "Soup.", famousFor: "Dinner", approxPrice: "₹120", image: "", isActive: true },
                { name: "Bamboo Shoot Curry", type: "veg", description: "Local dish.", famousFor: "Unique taste", approxPrice: "₹150", image: "", isActive: true },
                { name: "Zan", type: "veg", description: "Finger millet porridge.", famousFor: "Monpa dish", approxPrice: "₹100", image: "", isActive: true },
                { name: "Khura", type: "veg", description: "Buckwheat pancake.", famousFor: "Breakfast", approxPrice: "₹50", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Hollongi Airport", connectivity: "New airport", approxCost: "₹4000+", isActive: true },
                { type: "train", description: "Naharlagun Station", connectivity: "15km away", approxCost: "₹200+", isActive: true },
                { type: "bus", description: "APSTS", connectivity: "To Guwahati", approxCost: "₹500+", isActive: true },
                { type: "taxi", description: "Shared Sumo", connectivity: "Hilly terrain", approxCost: "₹500+", isActive: true }
            ]
        },
        {
            name: "Tawang", slug: "tawang", description: "Scenic town famous for its monastery.", history: "Birthplace of 6th Dalai Lama.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tawang_Monastery_Arunachal.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Tawang Monastery", category: "heritage", description: "Largest monastery in India.", images: ["https://upload.wikimedia.org/wikipedia/commons/e/e8/Tawang_Monastery_Arunachal.jpg"], isActive: true },
                { name: "Sela Pass", category: "nature", description: "High altitude pass.", images: ["https://upload.wikimedia.org/wikipedia/commons/7/7b/Sela_Pass.jpg"], isActive: true },
                { name: "Madhuri Lake", category: "nature", description: "Sungtester Lake made famous by movie Koyla.", images: [], isActive: true },
                { name: "Jaswant Garh", category: "heritage", description: "War memorial.", images: [], isActive: true },
                { name: "Nuranang Falls", category: "nature", description: "Spectacular waterfalls.", images: [], isActive: true }
            ],
            foods: [
                { name: "Butter Tea", type: "beverage", description: "Salted tea with yak butter.", famousFor: "Warmth", approxPrice: "₹50", image: "", isActive: true },
                { name: "Churpi", type: "veg", description: "Yak cheese.", famousFor: "Local cheese", approxPrice: "₹200", image: "", isActive: true },
                { name: "Thukpa", type: "non-veg", description: "Noodle soup.", famousFor: "Meal", approxPrice: "₹120", image: "", isActive: true },
                { name: "Momos", type: "non-veg", description: "Dumplings.", famousFor: "Snack", approxPrice: "₹100", image: "", isActive: true },
                { name: "Bresi", type: "sweet", description: "Sweet rice.", famousFor: "Dessert", approxPrice: "₹80", image: "", isActive: true }
            ],
            transports: [
                { type: "taxi", description: "Sumo Service", connectivity: "To Tezpur/Guwahati", approxCost: "₹1000+", isActive: true },
                { type: "flight", description: "Helicopter", connectivity: "From Guwahati", approxCost: "₹3000+", isActive: true }
            ]
        },
        {
            name: "Ziro", slug: "ziro", description: "Old town famous for Apatani tribe and music festival.", history: "World Heritage candidate.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Ziro_Valley.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Talley Valley", category: "nature", description: "Wildlife sanctuary.", images: [], isActive: true },
                { name: "Meghna Cave Temple", category: "temple", description: "Ancient temple.", images: [], isActive: true },
                { name: "Kile Pakho", category: "nature", description: "Ridge view.", images: [], isActive: true },
                { name: "Tarin Fish Farm", category: "other", description: "Paddy fish cultivation.", images: [], isActive: true },
                { name: "Pine Grove", category: "nature", description: "Picnic spot.", images: [], isActive: true }
            ],
            foods: [
                { name: "Bamboo Chicken", type: "non-veg", description: "Cooked in bamboo.", famousFor: "Flavor", approxPrice: "₹250", image: "", isActive: true },
                { name: "Pika Pila", type: "veg", description: "Pickle.", famousFor: "Side dish", approxPrice: "₹50", image: "", isActive: true },
                { name: "Rice Beer", type: "beverage", description: "Apong.", famousFor: "Drink", approxPrice: "₹100", image: "", isActive: true },
                { name: "Smoked Meat", type: "non-veg", description: "Pork.", famousFor: "Preserved", approxPrice: "₹300", image: "", isActive: true },
                { name: "Boiled Vegetables", type: "veg", description: "Organic.", famousFor: "Healthy", approxPrice: "₹100", image: "", isActive: true }
            ],
            transports: [
                { type: "taxi", description: "Sumo", connectivity: "To Itanagar", approxCost: "₹500+", isActive: true }
            ]
        },
        {
            name: "Pasighat", slug: "pasighat", description: "Oldest town, gateway to Arunachal.", history: "Founded by British.", image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Siang_River_Pasighat.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Siang River", category: "nature", description: "River rafting.", images: [], isActive: true },
                { name: "Daying Ering Sanctuary", category: "nature", description: "Wildlife.", images: [], isActive: true },
                { name: "Pangin", category: "nature", description: "Confluence of Siang and Siyom.", images: [], isActive: true },
                { name: "Kekar Monying", category: "heritage", description: "Historical cliff.", images: [], isActive: true },
                { name: "Bodak Scenic Area", category: "nature", description: "Picnic spot.", images: [], isActive: true }
            ],
            foods: [
                { name: "Fish Curry", type: "non-veg", description: "River fish.", famousFor: "Fresh", approxPrice: "₹200", image: "", isActive: true },
                { name: "Rice", type: "veg", description: "Local variety.", famousFor: "Staple", approxPrice: "₹50", image: "", isActive: true },
                { name: "Boiled Leafy Veg", type: "veg", description: "Lai Patta.", famousFor: "Healthy", approxPrice: "₹80", image: "", isActive: true },
                { name: "Smoked Pork", type: "non-veg", description: "Traditional.", famousFor: "Taste", approxPrice: "₹250", image: "", isActive: true },
                { name: "Apong", type: "beverage", description: "Rice beer.", famousFor: "Local", approxPrice: "₹50", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Pasighat Airport", connectivity: "Flights to Guwahati", approxCost: "₹2000+", isActive: true },
                { type: "ferry", description: "Boat", connectivity: "To Dibrugarh", approxCost: "₹100", isActive: true }
            ]
        },
        {
            name: "Bomdila", slug: "bomdila", description: "Scenic town with apple orchards.", history: "District HQ.", image: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Bomdila_View.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Bomdila Monastery", category: "temple", description: "GRL Monastery.", images: [], isActive: true },
                { name: "Apple Orchards", category: "nature", description: "Fruit gardens.", images: [], isActive: true },
                { name: "Eagle's Nest Sanctuary", category: "nature", description: "Bird watching.", images: [], isActive: true },
                { name: "Bomdila View Point", category: "nature", description: "Panoramic view.", images: [], isActive: true },
                { name: "Craft Centre", category: "other", description: "Local weaves.", images: [], isActive: true }
            ],
            foods: [
                { name: "Thukpa", type: "non-veg", description: "Soup.", famousFor: "Warmth", approxPrice: "₹100", image: "", isActive: true },
                { name: "Momos", type: "non-veg", description: "Dumplings.", famousFor: "Snack", approxPrice: "₹100", image: "", isActive: true },
                { name: "Butter Tea", type: "beverage", description: "Tea.", famousFor: "Drink", approxPrice: "₹40", image: "", isActive: true },
                { name: "Chhurpi", type: "veg", description: "Cheese.", famousFor: "Local", approxPrice: "₹200", image: "", isActive: true },
                { name: "Khura", type: "veg", description: "Pancake.", famousFor: "Breakfast", approxPrice: "₹40", image: "", isActive: true }
            ],
            transports: [
                { type: "taxi", description: "Sumo", connectivity: "To Tezpur", approxCost: "₹500+", isActive: true }
            ]
        },
        {
            name: "Dirang", slug: "dirang", description: "Valley town on way to Tawang.", history: "Stopover.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Dirang_Valley.jpg/800px-Dirang_Valley.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Dirang Dzong", category: "fort", description: "Old fort.", images: [], isActive: true },
                { name: "Hot Water Spring", category: "nature", description: "Medicinal.", images: [], isActive: true },
                { name: "Sangti Valley", category: "nature", description: "Scenic valley.", images: [], isActive: true },
                { name: "National Yak Research Centre", category: "other", description: "Yak farm.", images: [], isActive: true },
                { name: "Kalachakra Gompa", category: "temple", description: "Monastery.", images: [], isActive: true }
            ],
            foods: [
                { name: "Thukpa", type: "non-veg", description: "Soup.", famousFor: "Staple", approxPrice: "₹100", image: "", isActive: true },
                { name: "Momos", type: "non-veg", description: "Snack.", famousFor: "Snack", approxPrice: "₹80", image: "", isActive: true },
                { name: "Yak Meat", type: "non-veg", description: "Local delicacy.", famousFor: "Winter", approxPrice: "₹300", image: "", isActive: true },
                { name: "Butter Tea", type: "beverage", description: "Tea.", famousFor: "Drink", approxPrice: "₹30", image: "", isActive: true },
                { name: "Buckwheat Noodles", type: "veg", description: "Local grain.", famousFor: "Healthy", approxPrice: "₹120", image: "", isActive: true }
            ],
            transports: [
                { type: "taxi", description: "Sumo", connectivity: "On highway", approxCost: "₹500+", isActive: true }
            ]
        },
        {
            name: "Roing", slug: "roing", description: "Town in Lower Dibang Valley.", history: "Archaeological sites.", image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Roing.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Mayodia Pass", category: "nature", description: "Snowfall in winter.", images: [], isActive: true },
                { name: "Mehao Lake", category: "nature", description: "Oligotrophic lake.", images: [], isActive: true },
                { name: "Sally Lake", category: "nature", description: "Resort.", images: [], isActive: true },
                { name: "Bhismaknagar Fort", category: "heritage", description: "Ruins.", images: [], isActive: true },
                { name: "Mehao Wildlife Sanctuary", category: "nature", description: "Biodiversity.", images: [], isActive: true }
            ],
            foods: [
                { name: "Bamboo Shoot", type: "veg", description: "Curry.", famousFor: "Local", approxPrice: "₹100", image: "", isActive: true },
                { name: "Fish", type: "non-veg", description: "Fried.", famousFor: "River fish", approxPrice: "₹150", image: "", isActive: true },
                { name: "Rice", type: "veg", description: "Steamed.", famousFor: "Staple", approxPrice: "₹40", image: "", isActive: true },
                { name: "Dal", type: "veg", description: "Lentils.", famousFor: "Side", approxPrice: "₹50", image: "", isActive: true },
                { name: "Chutney", type: "veg", description: "Spicy.", famousFor: "Dip", approxPrice: "₹20", image: "", isActive: true }
            ],
            transports: [
                { type: "taxi", description: "Sumo", connectivity: "To Tinsukia", approxCost: "₹400+", isActive: true }
            ]
        },
        {
            name: "Aalo", slug: "aalo", description: "Headquarters of West Siang.", history: "Orange orchards.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Aalo_Valley.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Patum Bridge", category: "other", description: "Suspension bridge.", images: [], isActive: true },
                { name: "Kamba Village", category: "culture", description: "Cultural life.", images: [], isActive: true },
                { name: "Darka Village", category: "culture", description: "Large village.", images: [], isActive: true },
                { name: "River Rafting", category: "nature", description: "Siyom river.", images: [], isActive: true },
                { name: "Orange Orchards", category: "nature", description: "Fruit picking.", images: [], isActive: true }
            ],
            foods: [
                { name: "Oranges", type: "veg", description: "Fresh fruit.", famousFor: "Quality", approxPrice: "₹50/kg", image: "", isActive: true },
                { name: "Rice Beer", type: "beverage", description: "Apong.", famousFor: "Local", approxPrice: "₹50", image: "", isActive: true },
                { name: "Pork with Bamboo", type: "non-veg", description: "Curry.", famousFor: "Dish", approxPrice: "₹200", image: "", isActive: true },
                { name: "Boiled Veg", type: "veg", description: "Stew.", famousFor: "Healthy", approxPrice: "₹80", image: "", isActive: true },
                { name: "Chilli Chutney", type: "veg", description: "Spicy.", famousFor: "Side", approxPrice: "₹20", image: "", isActive: true }
            ],
            transports: [
                { type: "taxi", description: "Sumo", connectivity: "To Pasighat", approxCost: "₹400+", isActive: true }
            ]
        },
        {
            name: "Namdapha", slug: "namdapha", description: "National Park area.", history: "Biodiversity.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Namdapha_National_Park.jpg/800px-Namdapha_National_Park.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Namdapha National Park", category: "nature", description: "Tiger reserve.", images: [], isActive: true },
                { name: "Miao", category: "culture", description: "Tibetan settlement.", images: [], isActive: true },
                { name: "Deban", category: "nature", description: "Camping spot.", images: [], isActive: true },
                { name: "Noa-Dihing River", category: "nature", description: "River view.", images: [], isActive: true },
                { name: "Museum", category: "museum", description: "Park museum.", images: [], isActive: true }
            ],
            foods: [
                { name: "Tibetan Food", type: "non-veg", description: "Momos/Thukpa.", famousFor: "Miao", approxPrice: "₹150", image: "", isActive: true },
                { name: "Fish", type: "non-veg", description: "River fish.", famousFor: "Fresh", approxPrice: "₹200", image: "", isActive: true },
                { name: "Rice", type: "veg", description: "Staple.", famousFor: "Meal", approxPrice: "₹50", image: "", isActive: true },
                { name: "Vegetable Stew", type: "veg", description: "Mixed.", famousFor: "Simple", approxPrice: "₹80", image: "", isActive: true },
                { name: "Tea", type: "beverage", description: "Local.", famousFor: "Drink", approxPrice: "₹20", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "APSTS", connectivity: "To Miao", approxCost: "₹200", isActive: true }
            ]
        },
        {
            name: "Bhalukpong", slug: "bhalukpong", description: "Entry point to Arunachal.", history: "Picnic spot.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Kameng_River_Bhalukpong.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Kameng River", category: "nature", description: "Angling and rafting.", images: [], isActive: true },
                { name: "Tipi Orchidarium", category: "nature", description: "Orchid center.", images: [], isActive: true },
                { name: "Pakhui Wildlife Sanctuary", category: "nature", description: "Tiger reserve.", images: [], isActive: true },
                { name: "Bhalukpong Fort", category: "fort", description: "Ruins.", images: [], isActive: true },
                { name: "Picnic Spot", category: "nature", description: "River bank.", images: [], isActive: true }
            ],
            foods: [
                { name: "Fish", type: "non-veg", description: "Fresh river fish.", famousFor: "Angling", approxPrice: "₹200", image: "", isActive: true },
                { name: "Thalis", type: "veg", description: "Meal.", famousFor: "Lunch", approxPrice: "₹120", image: "", isActive: true },
                { name: "Momos", type: "non-veg", description: "Snack.", famousFor: "Snack", approxPrice: "₹80", image: "", isActive: true },
                { name: "Noodles", type: "veg", description: "Fried.", famousFor: "Chinese", approxPrice: "₹100", image: "", isActive: true },
                { name: "Beer", type: "beverage", description: "Local/Bottled.", famousFor: "Relax", approxPrice: "₹150", image: "", isActive: true }
            ],
            transports: [
                { type: "taxi", description: "Sumo", connectivity: "To Tezpur", approxCost: "₹100", isActive: true }
            ]
        }
    ]
};

const outputPath = path.join(__dirname, '../../data/generated/Arunachal_Pradesh.json');
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(stateData, null, 2));
console.log(`Generated Arunachal Pradesh data at ${outputPath}`);
