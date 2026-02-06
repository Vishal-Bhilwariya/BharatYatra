const fs = require('fs');
const path = require('path');

const stateData = {
    state: {
        name: "Kerala",
        slug: "kerala",
        description: "Kerala, 'God's Own Country', is a tropical paradise known for its palm-lined beaches, tranquil backwaters, Ayurveda, and lush hill stations.",
        culturalSummary: "Kerala's culture is a blend of Dravidian and Aryan influences, famous for Kathakali, Kalaripayattu, temple festivals (Pooram), and boat races.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Alappuzha_Boat_Beauty_W.jpg/800px-Alappuzha_Boat_Beauty_W.jpg",
        isActive: true
    },
    culture: {
        stateName: "Kerala",
        overview: {
            introduction: "A narrow strip of land between the Arabian Sea and the Western Ghats, Kerala has a unique culture shaped by its geography and maritime history.",
            lifestyle: "High literacy rate, matrilineal traditions (historically), and a relaxed pace of life.",
            traditions: "Onam involves floral rangolis (Pookkalam) and grand feasts (Sadya).",
            history: "Ancient spice trade hub, ruled by Cheras and later colonized by Portuguese, Dutch, and British.",
            images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Alappuzha_Boat_Beauty_W.jpg/800px-Alappuzha_Boat_Beauty_W.jpg"]
        },
        cuisine: {
            description: "Generous use of coconut, rice, tapioca, and spices like black pepper, cardamom, and cloves.",
            dishes: [
                { name: "Sadhya", type: "Veg", priceRange: "₹200", description: "Grand feast served on banana leaf.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Onam_Sadhya.jpg/800px-Onam_Sadhya.jpg" },
                { name: "Appam with Stew", type: "Veg", priceRange: "₹100", description: "Rice pancake with coconut milk stew.", image: "" },
                { name: "Puttu and Kadala", type: "Veg", priceRange: "₹60", description: "Steamed rice cake with chickpea curry.", image: "" },
                { name: "Karimeen Pollichathu", type: "Non-Veg", priceRange: "₹400", description: "Pearl spot fish marinated and grilled in banana leaf.", image: "" },
                { name: "Malabar Biriyani", type: "Non-Veg", priceRange: "₹250", description: "Aromatic birzani from Malabar region.", image: "" }
            ]
        },
        foodShops: [
            { name: "Paragon Restaurant", location: "Kozhikode", famousFor: "Biryani", priceRange: "₹300", rating: 4.9, timings: "11 AM - 11 PM" }
        ],
        danceAndMusic: {
            dances: [
                { name: "Kathakali", type: "Classical", description: "Story play art form with elaborate makeup.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Kathakali_performer.jpg/800px-Kathakali_performer.jpg" },
                { name: "Mohiniyattam", type: "Classical", description: "Dance of the Enchantress.", image: "" },
                { name: "Theyyam", type: "Ritual", description: "Ritual dance worship.", image: "" }
            ],
            music: [{ name: "Sopana Sangeetham", description: "Temple music.", image: "" }],
            instruments: [{ name: "Chenda", description: "Cylindrical percussion instrument.", image: "" }]
        },
        traditionalAttire: {
            men: { description: "Mundu (Dhoti) and Shirt.", attire: [{ name: "Kasavu Mundu", description: "White dhoti with gold border." }], images: [] },
            women: { description: "Set Mundu (Two-piece saree).", attire: [{ name: "Kasavu Saree", description: "White saree with gold border." }], images: [] },
            fabrics: [{ name: "Balaramapuram Handloom", description: "Fine cotton." }]
        },
        festivals: [
            { name: "Onam", celebrationTime: "August/September", significance: "Harvest/Homecoming", description: "State festival of Kerala.", images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Onam_Sadhya.jpg/800px-Onam_Sadhya.jpg"] },
            { name: "Thrissur Pooram", celebrationTime: "April/May", significance: "Temple", description: "Grand elephant procession and fireworks.", images: [] },
            { name: "Vishu", celebrationTime: "April", significance: "New Year", description: "Astronomical New Year.", images: [] }
        ],
        artAndHandicrafts: [
            { name: "Mural Painting", type: "Painting", description: "Temple wall paintings.", famousFor: "Natural colors", images: [] },
            { name: "Coir Products", type: "Craft", description: "Mats and crafts from coconut fiber.", famousFor: "Eco-friendly", images: [] },
            { name: "Aranmula Kannadi", type: "Metal", description: "Handmade metal mirror.", famousFor: "Mirror", images: [] }
        ],
        heritageAndTraditions: {
            customs: [{ title: "Nilavilakku", description: "Lighting the lamp at dusk." }],
            rituals: [{ title: "Vidyarambham", description: "Initiation into world of letters." }],
            dailyLife: "Ayurveda is a way of life.",
            values: "Simplicity and harmony with nature."
        },
        culturalPlaces: [
            { name: "Padmanabhaswamy Temple", type: "Temple", location: "Thiruvananthapuram", description: "Richest temple in the world.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Padmanabhaswamy_Temple.jpg/800px-Padmanabhaswamy_Temple.jpg" }
        ],
        extraSections: [
            { title: "Ayurveda", content: "Kerala is the center of Ayurveda, offering traditional healing and wellness therapies." }
        ],
        culturalExperience: {
            liveEvents: [],
            foodTrails: [],
            workshops: [],
            festivalCalendar: [
                { name: "Thrissur Pooram", priority: 1, date: "2025-05-08", significance: "Culture", images: [], audience: ["Tourist", "Local"] }
            ]
        },
        isActive: true
    },
    cities: [
        {
            name: "Thiruvananthapuram", slug: "trivandrum", description: "Evergreen City.", history: "Travancore capital.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Padmanabhaswamy_Temple.jpg/800px-Padmanabhaswamy_Temple.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Sri Padmanabhaswamy Temple", category: "temple", description: "Gold plated.", images: [], bestTimeToVisit: "Morning", entryFee: "Free", location: "East Fort", isActive: true },
                { name: "Kovalam Beach", category: "nature", description: "Lighthouse beach.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "Kovalam", isActive: true },
                { name: "Napier Museum", category: "museum", description: "Art and history.", images: [], bestTimeToVisit: "Day", entryFee: "₹20", location: "Museum Compound", isActive: true },
                { name: "Kuthiramalika Palace", category: "heritage", description: "Horse palace.", images: [], bestTimeToVisit: "Day", entryFee: "₹50", location: "East Fort", isActive: true },
                { name: "Ponmudi", category: "nature", description: "Hill station.", images: [], bestTimeToVisit: "Morning", entryFee: "₹30", location: "Outskirts", isActive: true },
                { name: "Poovar Island", category: "nature", description: "Estuary.", images: [], bestTimeToVisit: "Evening", entryFee: "Boating fees", location: "Poovar", isActive: true },
                { name: "Veli Tourist Village", category: "nature", description: "Picnic spot.", images: [], bestTimeToVisit: "Evening", entryFee: "₹20", location: "Veli", isActive: true },
                { name: "Attukal Bhagavathy Temple", category: "temple", description: "Women's Sabarimala.", images: [], bestTimeToVisit: "Morning", entryFee: "Free", location: "Attukal", isActive: true },
                { name: "Magic Planet", category: "other", description: "Magic theme park.", images: [], bestTimeToVisit: "Day", entryFee: "₹400", location: "Kazhakootam", isActive: true },
                { name: "Agasthyarkoodam", category: "nature", description: "Trekking peak.", images: [], bestTimeToVisit: "Winter", entryFee: "Permit req", location: "Outskirts", isActive: true }
            ],
            foods: [
                { name: "Boli and Payasam", type: "sweet", description: "Sweet crepe with kheer.", famousFor: "Unique", approxPrice: "₹50", image: "", isActive: true },
                { name: "Appam Stew", type: "veg", description: "Breakfast.", famousFor: "Classic", approxPrice: "₹80", image: "", isActive: true },
                { name: "Fish Fry", type: "non-veg", description: "Spicy.", famousFor: "Street", approxPrice: "₹100", image: "", isActive: true },
                { name: "Chicken Fry", type: "non-veg", description: "Kethel's Chicken", famousFor: "Kethel's", approxPrice: "₹150", image: "", isActive: true },
                { name: "Puttu", type: "veg", description: "Steamed cake.", famousFor: "Breakfast", approxPrice: "₹40", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Trivandrum International Airport", connectivity: "Global", approxCost: "₹3000+", isActive: true },
                { type: "train", description: "Trivandrum Central", connectivity: "Rail Hub", approxCost: "₹200+", isActive: true },
                { type: "bus", description: "KSRTC", connectivity: "City/Interstate", approxCost: "₹10+", isActive: true },
                { type: "auto", description: "Auto", connectivity: "Local", approxCost: "₹30+", isActive: true },
                { type: "taxi", description: "Uber/Ola", connectivity: "City", approxCost: "₹150+", isActive: true }
            ]
        },
        {
            name: "Kochi", slug: "kochi", description: "Queen of Arabian Sea.", history: "Colonial.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Chinese_Fishing_Nets_Kochi.jpg/800px-Chinese_Fishing_Nets_Kochi.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Fort Kochi", category: "heritage", description: "Colonial town.", images: [], isActive: true },
                { name: "Chinese Fishing Nets", category: "heritage", description: "Iconic nets.", images: [], isActive: true },
                { name: "Mattancherry Palace", category: "heritage", description: "Dutch Palace.", images: [], isActive: true },
                { name: "Marine Drive", category: "nature", description: "Promenade.", images: [], isActive: true },
                { name: "Lulu Mall", category: "other", description: "Shopping.", images: [], isActive: true }
            ],
            foods: [
                { name: "Karimeen Pollichathu", type: "non-veg", description: "Pearl spot.", famousFor: "Local", approxPrice: "₹400", image: "", isActive: true },
                { name: "Beef Fry", type: "non-veg", description: "Kerala style.", famousFor: "Spicy", approxPrice: "₹200", image: "", isActive: true },
                { name: "Puttu Kadala", type: "veg", description: "Classic combo.", famousFor: "Breakfast", approxPrice: "₹60", image: "", isActive: true },
                { name: "Biryani", type: "non-veg", description: "Kayees.", famousFor: "Kayees", approxPrice: "₹250", image: "", isActive: true },
                { name: "Kulukki Sarbath", type: "beverage", description: "Shaken lemonade.", famousFor: "Street", approxPrice: "₹30", image: "", isActive: true }
            ],
            transports: [
                { type: "metro", description: "Kochi Metro", connectivity: "Modern", approxCost: "₹30", isActive: true },
                { type: "ferry", description: "Water Metro", connectivity: "Islands", approxCost: "₹20", isActive: true }
            ]
        },
        {
            name: "Alappuzha", slug: "alappuzha", description: "Venice of the East.", history: "Backwaters.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Alappuzha_Boat_Beauty_W.jpg/800px-Alappuzha_Boat_Beauty_W.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Backwaters", category: "nature", description: "Houseboats.", images: [], isActive: true },
                { name: "Alappuzha Beach", category: "nature", description: "Old pier.", images: [], isActive: true },
                { name: "Marari Beach", category: "nature", description: "Quiet.", images: [], isActive: true },
                { name: "Krishnapuram Palace", category: "heritage", description: "Mural.", images: [], isActive: true },
                { name: "Ambalappuzha Temple", category: "temple", description: "Krishna.", images: [], isActive: true }
            ],
            foods: [
                { name: "Palada Payasam", type: "sweet", description: "Milk sweet.", famousFor: "Temple", approxPrice: "₹50", image: "", isActive: true },
                { name: "Duck Roast", type: "non-veg", description: "Kuttanad style.", famousFor: "Toddy shop", approxPrice: "₹300", image: "", isActive: true },
                { name: "Fish Curry", type: "non-veg", description: "Red curry.", famousFor: "Spicy", approxPrice: "₹200", image: "", isActive: true },
                { name: "Toddy", type: "beverage", description: "Palm wine.", famousFor: "Local", approxPrice: "₹100", image: "", isActive: true },
                { name: "Kappa Meen", type: "non-veg", description: "Tapioca fish.", famousFor: "Staple", approxPrice: "₹150", image: "", isActive: true }
            ],
            transports: [
                { type: "boat", description: "Houseboat", connectivity: "Backwaters", approxCost: "₹5000+", isActive: true }
            ]
        },
        {
            name: "Munnar", slug: "munnar", description: "Tea Gardens.", history: "British resort.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Munnar_hills.jpg/800px-Munnar_hills.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Tea Museum", category: "museum", description: "Tea history.", images: [], isActive: true },
                { name: "Eravikulam National Park", category: "nature", description: "Nilgiri Tahr.", images: [], isActive: true },
                { name: "Mattupetty Dam", category: "nature", description: "Boating.", images: [], isActive: true },
                { name: "Top Station", category: "nature", description: "View.", images: [], isActive: true },
                { name: "Echo Point", category: "nature", description: "Echo.", images: [], isActive: true }
            ],
            foods: [
                { name: "Tea", type: "beverage", description: "Fresh brew.", famousFor: "Gardens", approxPrice: "₹20", image: "", isActive: true },
                { name: "Vada", type: "veg", description: "Snack.", famousFor: "Tea time", approxPrice: "₹15", image: "", isActive: true },
                { name: "Homemade Chocolate", type: "sweet", description: "Cocoa.", famousFor: "Souvenir", approxPrice: "₹100", image: "", isActive: true },
                { name: "Appam", type: "veg", description: "Breakfast.", famousFor: "Warm", approxPrice: "₹50", image: "", isActive: true },
                { name: "Cutlet", type: "non-veg", description: "Meat.", famousFor: "Bakery", approxPrice: "₹30", image: "", isActive: true }
            ],
            transports: [
                { type: "car", description: "Taxi", connectivity: "Hilly", approxCost: "₹2000", isActive: true }
            ]
        },
        {
            name: "Wayanad", slug: "wayanad", description: "Green Paradise.", history: "Tribal.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Wayanad_Churam.jpg/800px-Wayanad_Churam.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Edakkal Caves", category: "heritage", description: "Prehistoric.", images: [], isActive: true },
                { name: "Banasura Sagar Dam", category: "nature", description: "Earth dam.", images: [], isActive: true },
                { name: "Pookode Lake", category: "nature", description: "Lake.", images: [], isActive: true },
                { name: "Chembra Peak", category: "nature", description: "Heart lake.", images: [], isActive: true },
                { name: "Soochipara Falls", category: "nature", description: "Waterfall.", images: [], isActive: true }
            ],
            foods: [
                { name: "Bamboo Rice", type: "veg", description: "Tribal grain.", famousFor: "Rare", approxPrice: "₹100", image: "", isActive: true },
                { name: "Chatti Pathiri", type: "sweet", description: "Layered pastry.", famousFor: "Malabar", approxPrice: "₹50", image: "", isActive: true },
                { name: "Unniyappam", type: "sweet", description: "Rice ball.", famousFor: "Snack", approxPrice: "₹20", image: "", isActive: true },
                { name: "Fish Moilee", type: "non-veg", description: "Mild curry.", famousFor: "Coconut", approxPrice: "₹250", image: "", isActive: true },
                { name: "Coffee", type: "beverage", description: "Robusta.", famousFor: "Wayanad", approxPrice: "₹20", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "KSRTC", connectivity: "Hilly", approxCost: "₹100", isActive: true }
            ]
        },
        {
            name: "Kozhikode", slug: "kozhikode", description: "City of Spices.", history: "Vasco da Gama.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Kozhikode_Beach.jpg/800px-Kozhikode_Beach.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Kozhikode Beach", category: "nature", description: "Sunset.", images: [], isActive: true },
                { name: "Mananchira Square", category: "nature", description: "Park.", images: [], isActive: true },
                { name: "Kappad Beach", category: "heritage", description: "Vasco landed.", images: [], isActive: true },
                { name: "Sarovaram Bio Park", category: "nature", description: "Mangroves.", images: [], isActive: true },
                { name: "Beypore", category: "heritage", description: "Ship building.", images: [], isActive: true }
            ],
            foods: [
                { name: "Kozhikode Halwa", type: "sweet", description: "Jelly sweet.", famousFor: "SM Street", approxPrice: "₹200/kg", image: "", isActive: true },
                { name: "Biryani", type: "non-veg", description: "Paragon.", famousFor: "Best", approxPrice: "₹250", image: "", isActive: true },
                { name: "Banana Chips", type: "veg", description: "Crispy.", famousFor: "Kumari", approxPrice: "₹300/kg", image: "", isActive: true },
                { name: "Kallummakkaya", type: "non-veg", description: "Mussels.", famousFor: "Kiosk", approxPrice: "₹100", image: "", isActive: true },
                { name: "Sulaimani", type: "beverage", description: "Black tea.", famousFor: "Love", approxPrice: "₹10", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Kozhikode Station", connectivity: "Rail", approxCost: "₹150", isActive: true }
            ]
        },
        {
            name: "Thrissur", slug: "thrissur", description: "Cultural Capital.", history: "Pooram.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Vadakkunnathan_Temple_Thrissur.jpg/800px-Vadakkunnathan_Temple_Thrissur.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Vadakkunnathan Temple", category: "temple", description: "Shiva.", images: [], isActive: true },
                { name: "Athirappilly Falls", category: "nature", description: "Niagara of Kerala.", images: [], isActive: true },
                { name: "Thrissur Zoo", category: "nature", description: "Zoo.", images: [], isActive: true },
                { name: "Our Lady of Dolours Basilica", category: "temple", description: "Tallest church.", images: [], isActive: true },
                { name: "Sakthan Thampuran Palace", category: "heritage", description: "Museum.", images: [], isActive: true }
            ],
            foods: [
                { name: "Vellayappam", type: "veg", description: "Pancake.", famousFor: "Breakfast", approxPrice: "₹10", image: "", isActive: true },
                { name: "Thrissur Pooram Special", type: "veg", description: "Festival food.", famousFor: "Event", approxPrice: "Var", image: "", isActive: true },
                { name: "Beef roast", type: "non-veg", description: "Spicy.", famousFor: "Local", approxPrice: "₹150", image: "", isActive: true },
                { name: "Ada Pradhaman", type: "sweet", description: "Payasam.", famousFor: "Onam", approxPrice: "₹100", image: "", isActive: true },
                { name: "Soda", type: "beverage", description: "Goli Soda.", famousFor: "Street", approxPrice: "₹20", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Thrissur Station", connectivity: "Rail", approxCost: "₹100", isActive: true }
            ]
        },
        {
            name: "Kollam", slug: "kollam", description: "Cashew Capital.", history: "Trade.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Kollam_Light_House.jpg/800px-Kollam_Light_House.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Ashtamudi Lake", category: "nature", description: "Gateway to backwaters.", images: [], isActive: true },
                { name: "Thangassery Light House", category: "heritage", description: "View.", images: [], isActive: true },
                { name: "Palaruvi Falls", category: "nature", description: "Milk stream.", images: [], isActive: true },
                { name: "Jatayu Earth's Center", category: "other", description: "Giant bird sculpture.", images: [], isActive: true },
                { name: "Munroe Island", category: "nature", description: "Canal cruise.", images: [], isActive: true }
            ],
            foods: [
                { name: "Cashew Nuts", type: "veg", description: "Nuts.", famousFor: "Export", approxPrice: "₹800/kg", image: "", isActive: true },
                { name: "Fish Curry", type: "non-veg", description: "Spicy.", famousFor: "Local", approxPrice: "₹150", image: "", isActive: true },
                { name: "Tapioca", type: "veg", description: "Kappa.", famousFor: "Staple", approxPrice: "₹50", image: "", isActive: true },
                { name: "Prawn Roast", type: "non-veg", description: "Fry.", famousFor: "Lake", approxPrice: "₹250", image: "", isActive: true },
                { name: "Coconut Water", type: "beverage", description: "Drink.", famousFor: "Refresh", approxPrice: "₹30", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Kollam Junction", connectivity: "Rail", approxCost: "₹100", isActive: true }
            ]
        },
        {
            name: "Palakkad", slug: "palakkad", description: "Granary of Kerala.", history: "Fort.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Palakkad_Fort.jpg/800px-Palakkad_Fort.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Palakkad Fort", category: "heritage", description: "Tipu's Fort.", images: [], isActive: true },
                { name: "Malampuzha Dam", category: "nature", description: "Gardens.", images: [], isActive: true },
                { name: "Silent Valley", category: "nature", description: "National Park.", images: [], isActive: true },
                { name: "Nelliyampathy", category: "nature", description: "Hills.", images: [], isActive: true },
                { name: "Parambikulam", category: "nature", description: "Tiger reserve.", images: [], isActive: true }
            ],
            foods: [
                { name: "Palakkad Matta Rice", type: "veg", description: "Red rice.", famousFor: "Healthy", approxPrice: "₹60/kg", image: "", isActive: true },
                { name: "Ramassery Idli", type: "veg", description: "Flat idli.", famousFor: "Unique", approxPrice: "₹10", image: "", isActive: true },
                { name: "Jackfruit Halwa", type: "sweet", description: "Chakka Varatti.", famousFor: "Sweet", approxPrice: "₹200", image: "", isActive: true },
                { name: "Vada", type: "veg", description: "Snack.", famousFor: "Crispy", approxPrice: "₹10", image: "", isActive: true },
                { name: "Puttu", type: "veg", description: "Breakfast.", famousFor: "Steam", approxPrice: "₹30", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Palakkad Junction", connectivity: "Rail", approxCost: "₹100", isActive: true }
            ]
        },
        {
            name: "Kannur", slug: "kannur", description: "Land of Looms and Lores.", history: "Theyyam.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/St_Angelos_Fort.jpg", isPopular: false, isActive: true,
            places: [
                { name: "St. Angelo Fort", category: "heritage", description: "Sea fort.", images: [], isActive: true },
                { name: "Muzhappilangad Beach", category: "nature", description: "Drive-in beach.", images: [], isActive: true },
                { name: "Parassinikadavu Snake Park", category: "nature", description: "Snakes.", images: [], isActive: true },
                { name: "Payyambalam Beach", category: "nature", description: "Picnic.", images: [], isActive: true },
                { name: "Arakkal Museum", category: "museum", description: "Royal family.", images: [], isActive: true }
            ],
            foods: [
                { name: "Thalassery Biryani", type: "non-veg", description: "Famous.", famousFor: "Parippuvada", approxPrice: "₹200", image: "", isActive: true },
                { name: "Unnakaya", type: "sweet", description: "Banana cotton.", famousFor: "Snack", approxPrice: "₹20", image: "", isActive: true },
                { name: "Mussels Fry", type: "non-veg", description: "Arikkadukka.", famousFor: "Spicy", approxPrice: "₹50", image: "", isActive: true },
                { name: "Pathiri", type: "veg", description: "Rice roti.", famousFor: "Dinner", approxPrice: "₹10", image: "", isActive: true },
                { name: "Tea", type: "beverage", description: "Chaya.", famousFor: "Hot", approxPrice: "₹10", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Kannur Airport", connectivity: "International", approxCost: "₹3000", isActive: true }
            ]
        }
    ]
};

const outputPath = path.join(__dirname, '../../data/generated/Kerala.json');
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(stateData, null, 2));
console.log(`Generated Kerala data at ${outputPath}`);
