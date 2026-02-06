const fs = require('fs');
const path = require('path');

const stateData = {
    state: {
        name: "Maharashtra",
        slug: "maharashtra",
        description: "Maharashtra, the 'Land of Marathas', is a powerhouse of culture, economy, and history, known for its dazzling Bollywood, ancient caves, and Sahyadri mountains.",
        culturalSummary: "Maharashtrian culture is defined by its valor, devotion to Vithoba and Ganesha, and a love for arts, theater, and spicy distinct cuisine.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Gateway_of_India_Dec_2016.jpg/800px-Gateway_of_India_Dec_2016.jpg",
        isActive: true
    },
    culture: {
        stateName: "Maharashtra",
        overview: {
            introduction: "From the bustling streets of Mumbai to the serene Konkan coast and Vidarbha's forests, Maharashtra is diverse.",
            lifestyle: "Fast-paced in cities, rooted in agriculture and festivals in rural areas.",
            traditions: "Ganesh Chaturthi is the biggest festival celebrated with grandeur.",
            history: "Home of the Maratha Empire founded by Chhatrapati Shivaji Maharaj.",
            images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Gateway_of_India_Dec_2016.jpg/800px-Gateway_of_India_Dec_2016.jpg"]
        },
        cuisine: {
            description: "Ranges from mild Konkani seafood to fiery Kolhapuri mutton and humble Varhadi curries.",
            dishes: [
                { name: "Vada Pav", type: "Veg", priceRange: "₹20", description: "Indian burger.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Vada_Pav.jpg/800px-Vada_Pav.jpg" },
                { name: "Misal Pav", type: "Veg", priceRange: "₹60", description: "Spicy sprout curry with bread.", image: "" },
                { name: "Puran Poli", type: "Sweet", priceRange: "₹50", description: "Sweet lentil stuffed bread.", image: "" },
                { name: "Pithla Bhakri", type: "Veg", priceRange: "₹100", description: "Gram flour curry with sorghum bread.", image: "" },
                { name: "Modak", type: "Sweet", priceRange: "₹30", description: "Steamed dumpling offered to Ganesha.", image: "" }
            ]
        },
        foodShops: [
            { name: "Aaswad", location: "Mumbai", famousFor: "Misal Pav", priceRange: "₹200", rating: 4.7, timings: "9 AM - 10 PM" }
        ],
        danceAndMusic: {
            dances: [
                { name: "Lavani", type: "Folk", description: "High tempo dance performed to Dholki.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Lavani_Dance.jpg/800px-Lavani_Dance.jpg" },
                { name: "Koli", type: "Folk", description: "Fisherman dance.", image: "" },
                { name: "Dhangari Gaja", type: "Folk", description: "Shepherd dance.", image: "" }
            ],
            music: [{ name: "Natya Sangeet", description: "Musical theatre.", image: "" }],
            instruments: [{ name: "Dholki", description: "Drum.", image: "" }]
        },
        traditionalAttire: {
            men: { description: "Dhotar and Pheta.", attire: [{ name: "Pheta", description: "Turban." }], images: [] },
            women: { description: "Nauvari Saree.", attire: [{ name: "Nauvari", description: "Nine-yard saree draped like a dhoti." }, { name: "Paithani", description: "Royal silk saree." }], images: [] },
            fabrics: [{ name: "Paithani", description: "Silk with peacock motifs." }]
        },
        festivals: [
            { name: "Ganesh Chaturthi", celebrationTime: "August/September", significance: "Wisdom", description: "10-day worship of Lord Ganesha.", images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Ganesh_Chaturthi_Mumbai.jpg/800px-Ganesh_Chaturthi_Mumbai.jpg"] },
            { name: "Gudi Padwa", celebrationTime: "March/April", significance: "New Year", description: "Maharashtrian New Year.", images: [] },
            { name: "Palkhi Festival", celebrationTime: "June/July", significance: "Pilgrimage", description: "Warkari procession to Pandharpur.", images: [] }
        ],
        artAndHandicrafts: [
            { name: "Warli Painting", type: "Painting", description: "Tribal art using geometric shapes.", famousFor: "Wall art", images: [] },
            { name: "Kolhapuri Chappal", type: "Leather", description: "Handmade leather sandals.", famousFor: "Footwear", images: [] },
            { name: "Sawantwadi Toys", type: "Craft", description: "Wooden toys.", famousFor: "Ganjifa cards", images: [] }
        ],
        heritageAndTraditions: {
            customs: [{ title: "Oti Bharne", description: "Honoring a woman." }],
            rituals: [{ title: "Mangalagaur", description: "Worship by newly married women." }],
            dailyLife: "Fast paced in Mumbai, agrarian elsewhere.",
            values: "Pride and resilience."
        },
        culturalPlaces: [
            { name: "Gateway of India", type: "Monument", location: "Mumbai", description: "Colonial arch.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Gateway_of_India_Dec_2016.jpg/800px-Gateway_of_India_Dec_2016.jpg" }
        ],
        extraSections: [
            { title: "Bollywood", content: "Mumbai is the home of Bollywood, the world's largest film industry in terms of output." }
        ],
        culturalExperience: {
            liveEvents: [],
            foodTrails: [],
            workshops: [],
            festivalCalendar: [
                { name: "Ganesh Chaturthi", priority: 1, date: "2025-08-27", significance: "Culture", images: [], audience: ["Everyone"] }
            ]
        },
        isActive: true
    },
    cities: [
        {
            name: "Mumbai", slug: "mumbai", description: "City of Dreams.", history: "Seven Islands.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Gateway_of_India_Dec_2016.jpg/800px-Gateway_of_India_Dec_2016.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Gateway of India", category: "heritage", description: "Iconic arch.", images: [], bestTimeToVisit: "Morning", entryFee: "Free", location: "Colaba", isActive: true },
                { name: "Marine Drive", category: "nature", description: "Queen's Necklace.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "South Mumbai", isActive: true },
                { name: "Chhatrapati Shivaji Maharaj Terminus", category: "heritage", description: "Victorian Gothic.", images: [], bestTimeToVisit: "Night", entryFee: "View", location: "Fort", isActive: true },
                { name: "Elephanta Caves", category: "heritage", description: "Island caves.", images: [], bestTimeToVisit: "Day", entryFee: "₹40", location: "Ferry from Gateway", isActive: true },
                { name: "Juhu Beach", category: "nature", description: "Celebrity spot.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "Andheri", isActive: true },
                { name: "Siddhivinayak Temple", category: "temple", description: "Ganesha.", images: [], bestTimeToVisit: "Tue", entryFee: "Free", location: "Prabhadevi", isActive: true },
                { name: "Haji Ali Dargah", category: "temple", description: "Mosque in sea.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "Worli", isActive: true },
                { name: "Colaba Causeway", category: "other", description: "Shopping.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Colaba", isActive: true },
                { name: "Sanjay Gandhi National Park", category: "nature", description: "City forest.", images: [], bestTimeToVisit: "Morning", entryFee: "₹50", location: "Borivali", isActive: true },
                { name: "Bandra-Worli Sea Link", category: "other", description: "Bridge.", images: [], bestTimeToVisit: "Drive", entryFee: "Toll", location: "Bandra", isActive: true }
            ],
            foods: [
                { name: "Vada Pav", type: "veg", description: "Street staple.", famousFor: "Ashok Vada Pav", approxPrice: "₹20", image: "", isActive: true },
                { name: "Pav Bhaji", type: "veg", description: "Butter mash.", famousFor: "Sardar", approxPrice: "₹150", image: "", isActive: true },
                { name: "Bhelpuri", type: "veg", description: "Chaat.", famousFor: "Beaches", approxPrice: "₹40", image: "", isActive: true },
                { name: "Bombil Fry", type: "non-veg", description: "Bombay Duck.", famousFor: "Gajalee", approxPrice: "₹300", image: "", isActive: true },
                { name: "Bun Maska", type: "veg", description: "Irani Cafe.", famousFor: "Britannia", approxPrice: "₹50", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "CSMIA", connectivity: "Global", approxCost: "₹3000+", isActive: true },
                { type: "train", description: "Local Train", connectivity: "Lifeline", approxCost: "₹10+", isActive: true },
                { type: "bus", description: "BEST", connectivity: "City", approxCost: "₹5+", isActive: true },
                { type: "taxi", description: "Kaali Peeli", connectivity: "City", approxCost: "₹50+", isActive: true },
                { type: "auto", description: "Auto", connectivity: "Suburbs", approxCost: "₹23+", isActive: true }
            ]
        },
        {
            name: "Pune", slug: "pune", description: "Oxford of the East.", history: "Peshwas.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Shaniwar_Wada_Pune.jpg/800px-Shaniwar_Wada_Pune.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Shaniwar Wada", category: "heritage", description: "Fort ruins.", images: [], isActive: true },
                { name: "Aga Khan Palace", category: "heritage", description: "Gandhi memorial.", images: [], isActive: true },
                { name: "Sinhagad Fort", category: "fort", description: "Trek.", images: [], isActive: true },
                { name: "Dagdusheth Halwai Ganpati", category: "temple", description: "Rich temple.", images: [], isActive: true },
                { name: "Pataleshwar Cave Temple", category: "temple", description: "Rock cut.", images: [], isActive: true }
            ],
            foods: [
                { name: "Misal Pav", type: "veg", description: "Spicy curry.", famousFor: "Bedekar", approxPrice: "₹80", image: "", isActive: true },
                { name: "Bakarwadi", type: "veg", description: "Crispy roll.", famousFor: "Chitale", approxPrice: "₹300/kg", image: "", isActive: true },
                { name: "Mastani", type: "sweet", description: "Thick shake.", famousFor: "Sujata", approxPrice: "₹60", image: "", isActive: true },
                { name: "Puran Poli", type: "sweet", description: "Festive bread.", famousFor: "Home", approxPrice: "₹50", image: "", isActive: true },
                { name: "Vada Pav", type: "veg", description: "Garden JP.", famousFor: "JJ Garden", approxPrice: "₹20", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Pune Airport", connectivity: "Domestic", approxCost: "₹3000", isActive: true },
                { type: "train", description: "Pune Junction", connectivity: "Rail", approxCost: "₹150", isActive: true }
            ]
        },
        {
            name: "Nagpur", slug: "nagpur", description: "Orange City.", history: "Zero Mile.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Deekshabhoomi_Nagpur.jpg/800px-Deekshabhoomi_Nagpur.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Deekshabhoomi", category: "temple", description: "Buddhist stupa.", images: [], isActive: true },
                { name: "Ambazari Lake", category: "nature", description: "Garden.", images: [], isActive: true },
                { name: "Zero Mile Stone", category: "heritage", description: "Center of India.", images: [], isActive: true },
                { name: "Ramtek Fort", category: "temple", description: "Rama temple.", images: [], isActive: true },
                { name: "Sitabuldi Fort", category: "fort", description: "Battle site.", images: [], isActive: true }
            ],
            foods: [
                { name: "Saoji Chicken", type: "non-veg", description: "Very spicy.", famousFor: "Saoji", approxPrice: "₹200", image: "", isActive: true },
                { name: "Tarri Poha", type: "veg", description: "Spicy Poha.", famousFor: "Breakfast", approxPrice: "₹30", image: "", isActive: true },
                { name: "Orange Burfi", type: "sweet", description: "Citrus sweet.", famousFor: "Haldiram", approxPrice: "₹400/kg", image: "", isActive: true },
                { name: "Samosa", type: "veg", description: "Nagpuri style.", famousFor: "Breakfast", approxPrice: "₹15", image: "", isActive: true },
                { name: "Param Ki Daal", type: "veg", description: "Smoky dal.", famousFor: "Dhaba", approxPrice: "₹100", image: "", isActive: true }
            ],
            transports: [
                { type: "metro", description: "Nagpur Metro", connectivity: "City", approxCost: "₹20", isActive: true },
                { type: "flight", description: "Dr. Babasaheb Ambedkar Airport", connectivity: "Intl", approxCost: "₹3000", isActive: true }
            ]
        },
        {
            name: "Nashik", slug: "nashik", description: "Wine Capital.", history: "Ramayana.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Sula_Vineyards.jpg/800px-Sula_Vineyards.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Sula Vineyards", category: "other", description: "Wine tour.", images: [], isActive: true },
                { name: "Trimbakeshwar", category: "temple", description: "Jyotirlinga.", images: [], isActive: true },
                { name: "Pandavleni Caves", category: "heritage", description: "Rock cut.", images: [], isActive: true },
                { name: "Panchvati", category: "temple", description: "Ram kunda.", images: [], isActive: true },
                { name: "Muktidham", category: "temple", description: "Marble.", images: [], isActive: true }
            ],
            foods: [
                { name: "Misal Pav", type: "veg", description: "Black spice.", famousFor: "Mamacha Mala", approxPrice: "₹80", image: "", isActive: true },
                { name: "Kondaaji Chivda", type: "veg", description: "Spicy mix.", famousFor: "Snack", approxPrice: "₹200/kg", image: "", isActive: true },
                { name: "Grapes", type: "veg", description: "Fresh.", famousFor: "Farm", approxPrice: "₹50/kg", image: "", isActive: true },
                { name: "Wine", type: "beverage", description: "Local.", famousFor: "Sula", approxPrice: "₹500", image: "", isActive: true },
                { name: "Thalipeeth", type: "veg", description: "Multigrain bread.", famousFor: "Breakfast", approxPrice: "₹50", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "MSRTC", connectivity: "State", approxCost: "₹100", isActive: true }
            ]
        },
        {
            name: "Aurangabad", slug: "aurangabad", description: "Tourism Capital.", history: "Mughal.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Bibi_Ka_Maqbara_Aurangabad.jpg/800px-Bibi_Ka_Maqbara_Aurangabad.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Ajanta Caves", category: "heritage", description: "Paintings.", images: [], isActive: true },
                { name: "Ellora Caves", category: "heritage", description: "Sculptures.", images: [], isActive: true },
                { name: "Bibi Ka Maqbara", category: "heritage", description: "Mini Taj.", images: [], isActive: true },
                { name: "Daulatabad Fort", category: "fort", description: "Hill fort.", images: [], isActive: true },
                { name: "Panchakki", category: "heritage", description: "Water mill.", images: [], isActive: true }
            ],
            foods: [
                { name: "Naan Qalia", type: "non-veg", description: "Meat curry.", famousFor: "Local", approxPrice: "₹150", image: "", isActive: true },
                { name: "Tahri", type: "veg", description: "Rice.", famousFor: "Marathwada", approxPrice: "₹100", image: "", isActive: true },
                { name: "Imarti", type: "sweet", description: "Sweet flower.", famousFor: "Dessert", approxPrice: "₹30", image: "", isActive: true },
                { name: "Sheermal", type: "veg", description: "Saffron bread.", famousFor: "Meal", approxPrice: "₹40", image: "", isActive: true },
                { name: "Cantukky", type: "non-veg", description: "Fried chicken.", famousFor: "Street", approxPrice: "₹100", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Aurangabad Airport", connectivity: "Domestic", approxCost: "₹3000", isActive: true }
            ]
        },
        {
            name: "Kolhapur", slug: "kolhapur", description: "Historic City.", history: "Maratha.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Mahalakshmi_Temple_Kolhapur.jpg/800px-Mahalakshmi_Temple_Kolhapur.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Mahalakshmi Temple", category: "temple", description: "Shakti Peeth.", images: [], isActive: true },
                { name: "Rankala Lake", category: "nature", description: "Evening spot.", images: [], isActive: true },
                { name: "Panhala Fort", category: "fort", description: "Hill station.", images: [], isActive: true },
                { name: "New Palace", category: "heritage", description: "Museum.", images: [], isActive: true },
                { name: "Jyotiba Temple", category: "temple", description: "Hill temple.", images: [], isActive: true }
            ],
            foods: [
                { name: "Kolhapuri Misal", type: "veg", description: "Spicy.", famousFor: "Phadtare", approxPrice: "₹70", image: "", isActive: true },
                { name: "Tambda Pandhra Rassa", type: "non-veg", description: "Mutton broths.", famousFor: "Thali", approxPrice: "₹250", image: "", isActive: true },
                { name: "Mutton Thali", type: "non-veg", description: "Feast.", famousFor: "Parakh", approxPrice: "₹300", image: "", isActive: true },
                { name: "Bhel", type: "veg", description: "Spicy mix.", famousFor: "Raja Bhau", approxPrice: "₹30", image: "", isActive: true },
                { name: "Jaggery", type: "sweet", description: "Pure.", famousFor: "Market", approxPrice: "₹60/kg", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Kolhapur Station", connectivity: "Rail", approxCost: "₹150", isActive: true }
            ]
        },
        {
            name: "Shirdi", slug: "shirdi", description: "Sai Baba.", history: "Saint.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Sai_Baba_Samadhi_Mandir.jpg/800px-Sai_Baba_Samadhi_Mandir.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Sai Baba Samadhi Mandir", category: "temple", description: "Shrine.", images: [], isActive: true },
                { name: "Dwarkamai", category: "temple", description: "Mosque.", images: [], isActive: true },
                { name: "Chavadi", category: "heritage", description: "Procession.", images: [], isActive: true },
                { name: "Dixit Wada Museum", category: "museum", description: "Artifacts.", images: [], isActive: true },
                { name: "Wet N Joy", category: "other", description: "Water park.", images: [], isActive: true }
            ],
            foods: [
                { name: "Prasad Ladoo", type: "sweet", description: "Blessed.", famousFor: "Temple", approxPrice: "₹20", image: "", isActive: true },
                { name: "Sheera", type: "sweet", description: "Semolina.", famousFor: "Breakfast", approxPrice: "₹30", image: "", isActive: true },
                { name: "Thali", type: "veg", description: "Meal.", famousFor: "Prasadalaya", approxPrice: "Free/₹50", image: "", isActive: true },
                { name: "Poha", type: "veg", description: "Snack.", famousFor: "Morning", approxPrice: "₹20", image: "", isActive: true },
                { name: "Guava", type: "veg", description: "Fruit.", famousFor: "Local", approxPrice: "₹40/kg", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Shirdi Airport", connectivity: "Domestic", approxCost: "₹3000", isActive: true }
            ]
        },
        {
            name: "Mahabaleshwar", slug: "mahabaleshwar", description: "Strawberry Capital.", history: "Summer capital.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Mahabaleshwar_Hills.jpg/800px-Mahabaleshwar_Hills.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Arthur's Seat", category: "nature", description: "Viewpoint.", images: [], isActive: true },
                { name: "Venna Lake", category: "nature", description: "Boating.", images: [], isActive: true },
                { name: "Mapro Garden", category: "other", description: "Strawberries.", images: [], isActive: true },
                { name: "Elephant's Head Point", category: "nature", description: "Rock formation.", images: [], isActive: true },
                { name: "Pratapgad Fort", category: "fort", description: "Shivaji.", images: [], isActive: true }
            ],
            foods: [
                { name: "Strawberry with Cream", type: "sweet", description: "Fresh.", famousFor: "Mapro", approxPrice: "₹200", image: "", isActive: true },
                { name: "Corn Pattice", type: "veg", description: "Snack.", famousFor: "Hot", approxPrice: "₹50", image: "", isActive: true },
                { name: "Mulberry", type: "veg", description: "Fruit.", famousFor: "Local", approxPrice: "₹100/box", image: "", isActive: true },
                { name: "Chikki", type: "sweet", description: "Peanut bar.", famousFor: "Market", approxPrice: "₹100", image: "", isActive: true },
                { name: "Carrot", type: "veg", description: "Fresh.", famousFor: "Farm", approxPrice: "₹40/kg", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "Bus", connectivity: "Pune/Mumbai", approxCost: "₹300", isActive: true }
            ]
        },
        {
            name: "Solapur", slug: "solapur", description: "Textile City.", history: "Chadar.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Siddheshwar_Temple_Solapur.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Siddheshwar Temple", category: "temple", description: "Lake temple.", images: [], isActive: true },
                { name: "Great Indian Bustard Sanctuary", category: "nature", description: "Wildlife.", images: [], isActive: true },
                { name: "Solapur Fort", category: "fort", description: "Bhuikot.", images: [], isActive: true },
                { name: "Akkalkot Swami Samarth", category: "temple", description: "Shrine.", images: [], isActive: true },
                { name: "Pandharpur", category: "temple", description: "Vithoba.", images: [], isActive: true }
            ],
            foods: [
                { name: "Shengdana Chutney", type: "veg", description: "Peanut spice.", famousFor: "Spicy", approxPrice: "₹100/kg", image: "", isActive: true },
                { name: "Jowar Bhakri", type: "veg", description: "Sorghum bread.", famousFor: "Staple", approxPrice: "₹20", image: "", isActive: true },
                { name: "Khara Mutton", type: "non-veg", description: "Salty meat.", famousFor: "Local", approxPrice: "₹200", image: "", isActive: true },
                { name: "Ladoo", type: "sweet", description: "Motichoor.", famousFor: "Temple", approxPrice: "₹20", image: "", isActive: true },
                { name: "Shev Bhaji", type: "veg", description: "Spicy curry.", famousFor: "Dhaba", approxPrice: "₹80", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Solapur Station", connectivity: "Rail", approxCost: "₹150", isActive: true }
            ]
        },
        {
            name: "Ratnagiri", slug: "ratnagiri", description: "Mango City.", history: "Port.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Ratnagiri_Coast.jpg/800px-Ratnagiri_Coast.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Ratnadurg Fort", category: "fort", description: "Sea fort.", images: [], isActive: true },
                { name: "Ganpatipule", category: "temple", description: "Beach temple.", images: [], isActive: true },
                { name: "Thiba Palace", category: "heritage", description: "Burmese King.", images: [], isActive: true },
                { name: "Bhatye Beach", category: "nature", description: "Black sand.", images: [], isActive: true },
                { name: "Jaigad Fort", category: "fort", description: "Cliff.", images: [], isActive: true }
            ],
            foods: [
                { name: "Alphonso Mango", type: "sweet", description: "Hapus.", famousFor: "King", approxPrice: "₹1000/doz", image: "", isActive: true },
                { name: "Sol Kadhi", type: "beverage", description: "Kokum milk.", famousFor: "Drink", approxPrice: "₹30", image: "", isActive: true },
                { name: "Modak", type: "sweet", description: "Ukadiche.", famousFor: "Ganesh", approxPrice: "₹40", image: "", isActive: true },
                { name: "Fish Thali", type: "non-veg", description: "Seafood.", famousFor: "Lunch", approxPrice: "₹250", image: "", isActive: true },
                { name: "Amboli", type: "veg", description: "Pancake.", famousFor: "Breakfast", approxPrice: "₹30", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Ratnagiri Station", connectivity: "Konkan Rail", approxCost: "₹150", isActive: true }
            ]
        }
    ]
};

const outputPath = path.join(__dirname, '../../data/generated/Maharashtra.json');
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(stateData, null, 2));
console.log(`Generated Maharashtra data at ${outputPath}`);
