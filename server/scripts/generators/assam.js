const fs = require('fs');
const path = require('path');

const stateData = {
    state: {
        name: "Assam",
        slug: "assam",
        description: "Assam is the gateway to Northeast India, known for its one-horned rhinoceros, silk, tea, and the mighty Brahmaputra river.",
        culturalSummary: "Assamese culture is a vibrant mix of Austric, Dravidian, Tibeto-Burman, and Aryan influences, celebrated through Bihu festivals and Satriya dance.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Kaziranga_National_Park_Rhino.jpg/800px-Kaziranga_National_Park_Rhino.jpg",
        isActive: true
    },
    culture: {
        stateName: "Assam",
        overview: {
            introduction: "Assam, the 'Land of Red River and Blue Hills', offers diverse history and wildlife.",
            lifestyle: "Agriculture centered, with tea gardens and rice paddies defining the landscape.",
            traditions: "Preservation of indigenous arts like mask-making and silk weaving.",
            history: "Ruled by the Ahom Dynasty for 600 years, leaving a legacy of monuments.",
            images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Kaziranga_National_Park_Rhino.jpg/800px-Kaziranga_National_Park_Rhino.jpg"]
        },
        cuisine: {
            description: "Characterized by very little use of spices, little cooking over fire, and strong flavors due to fermentation and drying.",
            dishes: [
                { name: "Masor Tenga", type: "Non-Veg", priceRange: "₹200", description: "Tangy fish curry made with elephant apple (ou tenga) or tomatoes.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Masor_Tenga.jpg/800px-Masor_Tenga.jpg" },
                { name: "Khar", type: "Veg", priceRange: "₹100", description: "Unique alkaline dish made with raw papaya and pulses.", image: "" },
                { name: "Duck Meat Curry", type: "Non-Veg", priceRange: "₹300", description: "Duck cooked with ash gourd.", image: "" },
                { name: "Aloo Pitika", type: "Veg", priceRange: "₹50", description: "Mashed potatoes with mustard oil, onions, and chillies.", image: "" },
                { name: "Pitha", type: "Sweet", priceRange: "₹100", description: "Rice cake.", image: "" }
            ]
        },
        foodShops: [
            { name: "Paradise", location: "Guwahati", famousFor: "Parampara Thali", priceRange: "₹600", rating: 4.7, timings: "11 AM - 10 PM" }
        ],
        danceAndMusic: {
            dances: [
                { name: "Bihu", type: "Folk", description: "Energetic youthful dance performed during Bihu festivals.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Bihu_Dance.jpg/800px-Bihu_Dance.jpg" },
                { name: "Sattriya", type: "Classical", description: "One of the 8 classical dances, originated in monasteries (Sattras).", image: "" }
            ],
            music: [{ name: "Borgeet", description: "Devotional songs composed by Srimanta Sankardeva.", image: "" }],
            instruments: [{ name: "Pepa", description: "Hornpipe instrument made from buffalo horn.", image: "" }, { name: "Dhol", description: "Drum.", image: "" }]
        },
        traditionalAttire: {
            men: { description: "Dhoti and Gamosa.", attire: [{ name: "Dhoti", description: "Lower garment." }, { name: "Gamosa", description: "Traditional towel/scarf symbol of respect." }], images: [] },
            women: { description: "Mekhela Sador.", attire: [{ name: "Mekhela Sador", description: "Two-piece cloth draped distinctively." }], images: [] },
            fabrics: [{ name: "Muga Silk", description: "Golden silk unique to Assam." }, { name: "Eri Silk", description: "Warm silk." }]
        },
        festivals: [
            { name: "Bohag Bihu", celebrationTime: "April", significance: "Assamese New Year", description: "Most important festival marking spring.", images: [] },
            { name: "Magh Bihu", celebrationTime: "January", significance: "Harvest", description: "Feasting and bonfires.", images: [] },
            { name: "Ambubachi Mela", celebrationTime: "June", significance: "Goddess Kamakhya", description: "Tantric fertility festival.", images: [] }
        ],
        artAndHandicrafts: [
            { name: "Bamboo Crafts", type: "Craft", description: "Jaapi (hat), furniture, and musical instruments.", famousFor: "Jaapi", images: [] },
            { name: "Mask Making", type: "Craft", description: "Masks for Sattriya theatre.", famousFor: "Majuli", images: [] }
        ],
        heritageAndTraditions: {
            customs: [{ title: "Tamul Pan", description: "Offering betel nut and leaf to guests." }],
            rituals: [{ title: "Naam Kirtan", description: "Community prayer in Namghars." }],
            dailyLife: "Influenced by the rhythm of the Brahmaputra.",
            values: "Inclusiveness and respect (Bhakti movement)."
        },
        culturalPlaces: [
            { name: "Kamakhya Temple", type: "Temple", location: "Guwahati", description: "One of the 51 Shakti Peethas.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Kamakhya_Temple_Guwahati.jpg/800px-Kamakhya_Temple_Guwahati.jpg" }
        ],
        extraSections: [
            { title: "Tea", content: "Assam is the world's largest tea-growing region by production. Assam tea is known for its body, briskness, malty flavor, and strong, bright color." }
        ],
        culturalExperience: {
            liveEvents: [],
            foodTrails: [],
            workshops: [],
            festivalCalendar: [
                { name: "Bohag Bihu", priority: 1, date: "2025-04-14", significance: "New Year", images: [], audience: ["Family"] }
            ]
        },
        isActive: true
    },
    cities: [
        {
            name: "Guwahati", slug: "guwahati", description: "Largest city in the North East and a major commercial hub.", history: "Ancient Pragjyotishpura.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Saraighat_Bridge_Guwahati.jpg/800px-Saraighat_Bridge_Guwahati.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Kamakhya Temple", category: "temple", description: "Famous Shakti shrine.", images: [], bestTimeToVisit: "All year", entryFee: "Free/VIP Ticket", location: "Nilachal Hill", isActive: true },
                { name: "Umananda Temple", category: "temple", description: "Temple on Peacock Island in Brahmaputra.", images: [], bestTimeToVisit: "Day", entryFee: "Boat fare", location: "Peacock Island", isActive: true },
                { name: "Assam State Zoo", category: "nature", description: "Largest zoo in NE.", images: [], bestTimeToVisit: "Day", entryFee: "₹30", location: "City", isActive: true },
                { name: "Srimanta Sankaradeva Kalakshetra", category: "museum", description: "Cultural complex.", images: [], bestTimeToVisit: "Evening", entryFee: "₹30", location: "Panjabari", isActive: true },
                { name: "Deepor Beel", category: "nature", description: "Ramser site wetland.", images: [], bestTimeToVisit: "Winter", entryFee: "Free", location: "Outskirts", isActive: true },
                { name: "Heritage Park", category: "nature", description: "Park.", images: [], bestTimeToVisit: "Evening", entryFee: "₹20", location: "City", isActive: true },
                { name: "Guwahati Planetarium", category: "other", description: "Astronomy.", images: [], bestTimeToVisit: "Day", entryFee: "₹30", location: "Uzan Bazar", isActive: true },
                { name: "Nehru Park", category: "nature", description: "City park.", images: [], bestTimeToVisit: "Evening", entryFee: "₹10", location: "City", isActive: true },
                { name: "Navagraha Temple", category: "temple", description: "Temple of 9 planets.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Chitrachal Hill", isActive: true },
                { name: "Fancy Bazar", category: "other", description: "Shopping hub.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "City", isActive: true }
            ],
            foods: [
                { name: "Masor Tenga", type: "non-veg", description: "Fish curry.", famousFor: "Classic", approxPrice: "₹200", image: "", isActive: true },
                { name: "Pork with Bamboo Shoot", type: "non-veg", description: "Tribal dish.", famousFor: "Spicy", approxPrice: "₹250", image: "", isActive: true },
                { name: "Momos", type: "non-veg", description: "Snack.", famousFor: "Popular", approxPrice: "₹100", image: "", isActive: true },
                { name: "Khar", type: "veg", description: "Alkaline dish.", famousFor: "Starter", approxPrice: "₹100", image: "", isActive: true },
                { name: "Luchi Bhaji", type: "veg", description: "Fried bread.", famousFor: "Breakfast", approxPrice: "₹50", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "LGBI Airport", connectivity: "International", approxCost: "₹3000+", isActive: true },
                { type: "train", description: "Guwahati Railway Station", connectivity: "Major hub", approxCost: "₹200+", isActive: true },
                { type: "bus", description: "ISBT", connectivity: "All NE states", approxCost: "₹200+", isActive: true },
                { type: "taxi", description: "Uber/Ola", connectivity: "City wide", approxCost: "₹200+", isActive: true },
                { type: "auto", description: "Autos", connectivity: "Local", approxCost: "₹50+", isActive: true }
            ]
        },
        {
            name: "Jorhat", slug: "jorhat", description: "Cultural capital and tea hub.", history: "Last capital of Ahom kingdom.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Jorhat_Gymkhana_Club.jpg/800px-Jorhat_Gymkhana_Club.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Majuli", category: "culture", description: "Largest river island.", images: [], isActive: true },
                { name: "Hoollongapar Gibbon Sanctuary", category: "nature", description: "Hoolock Gibbons.", images: [], isActive: true },
                { name: "Tocklai Tea Research", category: "other", description: "Tea science.", images: [], isActive: true },
                { name: "Gymkhana Club", category: "heritage", description: "Oldest golf course.", images: [], isActive: true },
                { name: "Sukapha Samannay Kshetra", category: "heritage", description: "Memorial.", images: [], isActive: true }
            ],
            foods: [
                { name: "Tea", type: "beverage", description: "Assam Tea.", famousFor: "World famous", approxPrice: "₹20", image: "", isActive: true },
                { name: "Duck Curry", type: "non-veg", description: "Traditional.", famousFor: "Rich", approxPrice: "₹300", image: "", isActive: true },
                { name: "Fish", type: "non-veg", description: "River fish.", famousFor: "Fresh", approxPrice: "₹200", image: "", isActive: true },
                { name: "Rice Cake", type: "sweet", description: "Pitha.", famousFor: "Bihu", approxPrice: "₹50", image: "", isActive: true },
                { name: "Khar", type: "veg", description: "Local.", famousFor: "Tradition", approxPrice: "₹100", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Rowriah Airport", connectivity: "Regular flights", approxCost: "₹3000+", isActive: true },
                { type: "ferry", description: "Majuli Ferry", connectivity: "Nimati Ghat", approxCost: "₹30", isActive: true }
            ]
        },
        {
            name: "Dibrugarh", slug: "dibrugarh", description: "Tea City of India.", history: "Colonial town.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Bogibeel_Bridge.jpg/800px-Bogibeel_Bridge.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Bogibeel Bridge", category: "other", description: "Longest rail-road bridge.", images: [], isActive: true },
                { name: "Tea Gardens", category: "nature", description: "Lush green.", images: [], isActive: true },
                { name: "Jagannath Temple", category: "temple", description: "Replica of Puri.", images: [], isActive: true },
                { name: "Dehing Patkai", category: "nature", description: "Rainforest.", images: [], isActive: true },
                { name: "Radha Krishna Temple", category: "temple", description: "Marble temple.", images: [], isActive: true }
            ],
            foods: [
                { name: "Tea", type: "beverage", description: "Fresh brew.", famousFor: "Best", approxPrice: "₹20", image: "", isActive: true },
                { name: "Smoked Pork", type: "non-veg", description: "Local fav.", famousFor: "Taste", approxPrice: "₹250", image: "", isActive: true },
                { name: "Masor Tenga", type: "non-veg", description: "Sour fish.", famousFor: "Lunch", approxPrice: "₹150", image: "", isActive: true },
                { name: "Aloo Pitika", type: "veg", description: "Mash.", famousFor: "Comfort", approxPrice: "₹50", image: "", isActive: true },
                { name: "Tamul", type: "veg", description: "Betel nut.", famousFor: "End", approxPrice: "₹5", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Mohanbari Airport", connectivity: "Major", approxCost: "₹3000+", isActive: true }
            ]
        },
        {
            name: "Tezpur", slug: "tezpur", description: "City of Eternal Romance.", history: "Mythological connection.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Tezpur_Agnigarh.jpg/800px-Tezpur_Agnigarh.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Agnigarh", category: "heritage", description: "Hillock garden.", images: [], isActive: true },
                { name: "Mahabhairab Temple", category: "temple", description: "Shiva temple.", images: [], isActive: true },
                { name: "Cole Park", category: "nature", description: "Chitralekha Udyan.", images: [], isActive: true },
                { name: "Brahmaputra River", category: "nature", description: "Scenic view.", images: [], isActive: true },
                { name: "Nameri National Park", category: "nature", description: "Tiger reserve.", images: [], isActive: true }
            ],
            foods: [
                { name: "Fish Curry", type: "non-veg", description: "Local.", famousFor: "Fresh", approxPrice: "₹150", image: "", isActive: true },
                { name: "Meat", type: "non-veg", description: "Curry.", famousFor: "Simple", approxPrice: "₹200", image: "", isActive: true },
                { name: "Momos", type: "non-veg", description: "Snack.", famousFor: "Snack", approxPrice: "₹80", image: "", isActive: true },
                { name: "Roti Sabzi", type: "veg", description: "Meal.", famousFor: "Dinner", approxPrice: "₹100", image: "", isActive: true },
                { name: "Tea", type: "beverage", description: "Drink.", famousFor: "Local", approxPrice: "₹10", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Tezpur Airport", connectivity: "Limited", approxCost: "₹3000+", isActive: true }
            ]
        },
        {
            name: "Silchar", slug: "silchar", description: "Hub of Barak Valley.", history: "Cachar kingdom.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Silchar_Railway_Station.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Khaspur", category: "heritage", description: "Dimasa ruins.", images: [], isActive: true },
                { name: "Undisclosed Lake", category: "nature", description: "Dolu.", images: [], isActive: true },
                { name: "Iskcon Temple", category: "temple", description: "Temple.", images: [], isActive: true },
                { name: "Bhuvan Hill", category: "temple", description: "Shiva temple.", images: [], isActive: true },
                { name: "Maniharan Tunnel", category: "heritage", description: "Mythology.", images: [], isActive: true }
            ],
            foods: [
                { name: "Shidol Chutney", type: "non-veg", description: "Fermented fish.", famousFor: "Spicy", approxPrice: "₹50", image: "", isActive: true },
                { name: "Bamboo Shoot", type: "veg", description: "Curry.", famousFor: "Taste", approxPrice: "₹100", image: "", isActive: true },
                { name: "Fish", type: "non-veg", description: "Hilsa.", famousFor: "Bengali style", approxPrice: "₹300", image: "", isActive: true },
                { name: "Mishti Doi", type: "sweet", description: "Yogurt.", famousFor: "Dessert", approxPrice: "₹40", image: "", isActive: true },
                { name: "Rasgulla", type: "sweet", description: "Sweet.", famousFor: "Soft", approxPrice: "₹20", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Kumbhirgram Airport", connectivity: "Regular", approxCost: "₹3000+", isActive: true }
            ]
        },
        {
            name: "Tinsukia", slug: "tinsukia", description: "Commercial city.", history: "Ahom era.", image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Dibru_Saikhowa.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Dibru Saikhowa", category: "nature", description: "Biosphere reserve.", images: [], isActive: true },
                { name: "Tilinga Mandir", category: "temple", description: "Bell temple.", images: [], isActive: true },
                { name: "Digboi", category: "heritage", description: "Oil town.", images: [], isActive: true },
                { name: "Margherita", category: "nature", description: "Coal mines.", images: [], isActive: true },
                { name: "Sadiya", category: "heritage", description: "Historical.", images: [], isActive: true }
            ],
            foods: [
                { name: "Singara", type: "veg", description: "Samosa.", famousFor: "Snack", approxPrice: "₹10", image: "", isActive: true },
                { name: "Pitha", type: "sweet", description: "Rice cake.", famousFor: "Local", approxPrice: "₹20", image: "", isActive: true },
                { name: "Pork", type: "non-veg", description: "Curry.", famousFor: "Tribal", approxPrice: "₹200", image: "", isActive: true },
                { name: "Rice", type: "veg", description: "Staple.", famousFor: "Meal", approxPrice: "₹50", image: "", isActive: true },
                { name: "Tea", type: "beverage", description: "Fresh.", famousFor: "Brew", approxPrice: "₹10", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Tinsukia Jn", connectivity: "Major", approxCost: "₹200+", isActive: true }
            ]
        },
        {
            name: "Sivasagar", slug: "sivasagar", description: "Historical capital of Ahoms.", history: "Monuments.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Rang_Ghar_Sivasagar.jpg/800px-Rang_Ghar_Sivasagar.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Rang Ghar", category: "heritage", description: "Amphitheatre.", images: [], isActive: true },
                { name: "Talatal Ghar", category: "heritage", description: "Palace.", images: [], isActive: true },
                { name: "Sivadol", category: "temple", description: "Tallest Shiva temple.", images: [], isActive: true },
                { name: "Joysagar Tank", category: "nature", description: "Lake.", images: [], isActive: true },
                { name: "Kareng Ghar", category: "heritage", description: "Palace.", images: [], isActive: true }
            ],
            foods: [
                { name: "Duck Curry", type: "non-veg", description: "Traditional.", famousFor: "Ahom dish", approxPrice: "₹300", image: "", isActive: true },
                { name: "Amroli Tup", type: "non-veg", description: "Ant eggs.", famousFor: "Rare", approxPrice: "₹200", image: "", isActive: true },
                { name: "Khar", type: "veg", description: "Alkaline.", famousFor: "Healthy", approxPrice: "₹100", image: "", isActive: true },
                { name: "Bora Saul", type: "veg", description: "Sticky rice.", famousFor: "Staple", approxPrice: "₹60", image: "", isActive: true },
                { name: "Pitha", type: "sweet", description: "Snack.", famousFor: "Tea time", approxPrice: "₹20", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "ASTC", connectivity: "Town", approxCost: "₹100+", isActive: true }
            ]
        },
        {
            name: "Haflong", slug: "haflong", description: "Only hill station of Assam.", history: "Dima Hasao.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Haflong_Lake.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Haflong Lake", category: "nature", description: "Central lake.", images: [], isActive: true },
                { name: "Jatinga", category: "nature", description: "Bird mystery.", images: [], isActive: true },
                { name: "Maibang", category: "heritage", description: "Old capital.", images: [], isActive: true },
                { name: "Panimoor Falls", category: "nature", description: "Waterfall.", images: [], isActive: true },
                { name: "Bendao Baglai", category: "nature", description: "Waterfall.", images: [], isActive: true }
            ],
            foods: [
                { name: "Bamboo Shoot", type: "veg", description: "Curry.", famousFor: "Local", approxPrice: "₹100", image: "", isActive: true },
                { name: "Pork", type: "non-veg", description: "Smoked.", famousFor: "Hills", approxPrice: "₹250", image: "", isActive: true },
                { name: "Rice Beer", type: "beverage", description: "Judima.", famousFor: "GI Tag", approxPrice: "₹50", image: "", isActive: true },
                { name: "Fish", type: "non-veg", description: "River.", famousFor: "Fresh", approxPrice: "₹200", image: "", isActive: true },
                { name: "Vegetables", type: "veg", description: "Boiled.", famousFor: "Organic", approxPrice: "₹80", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "New Haflong", connectivity: "Vista dome", approxCost: "₹200+", isActive: true }
            ]
        },
        {
            name: "Nagaon", slug: "nagaon", description: "Central Assam city.", history: "Birthplace of Sankardeva.", image: "https://upload.wikimedia.org/wikipedia/commons/5/52/Bordowa_Than.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Bordowa Than", category: "temple", description: "Birthplace of Sankardev.", images: [], isActive: true },
                { name: "Laokhowa Sanctuary", category: "nature", description: "Wildlife.", images: [], isActive: true },
                { name: "Champawati Kunda", category: "nature", description: "Waterfall.", images: [], isActive: true },
                { name: "Samaguri Beel", category: "nature", description: "Wetland.", images: [], isActive: true },
                { name: "Doboka", category: "heritage", description: "Ruins.", images: [], isActive: true }
            ],
            foods: [
                { name: "Fish", type: "non-veg", description: "Curry.", famousFor: "Local", approxPrice: "₹150", image: "", isActive: true },
                { name: "Rice", type: "veg", description: "Meal.", famousFor: "Staple", approxPrice: "₹50", image: "", isActive: true },
                { name: "Khar", type: "veg", description: "Dish.", famousFor: "Classic", approxPrice: "₹80", image: "", isActive: true },
                { name: "Pitika", type: "veg", description: "Mash.", famousFor: "Side", approxPrice: "₹40", image: "", isActive: true },
                { name: "Curd", type: "sweet", description: "Buffalo curd.", famousFor: "Thick", approxPrice: "₹60", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Nagaon Station", connectivity: "Line", approxCost: "₹100+", isActive: true }
            ]
        },
        {
            name: "Diphu", slug: "diphu", description: "Hill town in Karbi Anglong.", history: "Tribal.", image: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Diphu.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Botanical Garden", category: "nature", description: "Flora.", images: [], isActive: true },
                { name: "Arboretum", category: "nature", description: "Trees.", images: [], isActive: true },
                { name: "Taralangso", category: "culture", description: "Cultural center.", images: [], isActive: true },
                { name: "Umwang", category: "nature", description: "Scenic.", images: [], isActive: true },
                { name: "Khanduli", category: "nature", description: "Grassland.", images: [], isActive: true }
            ],
            foods: [
                { name: "Pork with Anthers", type: "non-veg", description: "Tribal.", famousFor: "Karbi dish", approxPrice: "₹250", image: "", isActive: true },
                { name: "Rice Beer", type: "beverage", description: "Hor.", famousFor: "Drink", approxPrice: "₹50", image: "", isActive: true },
                { name: "Bamboo Shoot", type: "veg", description: "Fry.", famousFor: "Side", approxPrice: "₹100", image: "", isActive: true },
                { name: "Chicken", type: "non-veg", description: "Hills.", famousFor: "Organic", approxPrice: "₹200", image: "", isActive: true },
                { name: "Rice", type: "veg", description: "Staple.", famousFor: "Meal", approxPrice: "₹50", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Diphu Station", connectivity: "Rail", approxCost: "₹100+", isActive: true }
            ]
        }
    ]
};

const outputPath = path.join(__dirname, '../../data/generated/Assam.json');
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(stateData, null, 2));
console.log(`Generated Assam data at ${outputPath}`);
