const fs = require('fs');
const path = require('path');

const stateData = {
    state: {
        name: "Andhra Pradesh",
        slug: "andhra-pradesh",
        description: "Andhra Pradesh, known as the 'Rice Bowl of India', is a state renowned for its rich culture, historic temples, textile heritage, and scenic coastline along the Bay of Bengal.",
        culturalSummary: "The culture of Andhra Pradesh is best expressed through its classical dance form Kuchipudi, Carnatic music, spicy Telugu cuisine, and festivals like Sankranti and Ugadi.",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tirumala_09062013.jpg",
        isActive: true
    },
    culture: {
        stateName: "Andhra Pradesh",
        overview: {
            introduction: "Andhra Pradesh boasts a rich historical, spiritual, and cultural legacy. From the ancient Satavahanas to the Vijayanagara Empire, the state has been a cradle of civilization.",
            lifestyle: "The lifestyle is traditionally rooted, with agriculture and handlooms being significant. People are known for their warmth and love for spicy food and cinema.",
            traditions: "Kuchipudi dance, Kalamkari art, and festive gatherings define the traditions.",
            history: "A land of ancient dynasties, Buddhist heritage, and the glorious Vijayanagara empire.",
            images: [
                "https://upload.wikimedia.org/wikipedia/commons/e/e0/Kuchipudi_Dance_Performance.jpg"
            ]
        },
        cuisine: {
            description: "Andhra cuisine is known for its hot and spicy taste, characterized by the liberal use of chili powder, tamarind, and gongura.",
            dishes: [
                {
                    name: "Pulihora",
                    type: "Veg",
                    priceRange: "₹50–₹100",
                    description: "Tamarind rice spiced with mustard seeds, curry leaves, and peanuts.",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Pulihora.JPG/800px-Pulihora.JPG"
                },
                {
                    name: "Gongura Mutton",
                    type: "Non-Veg",
                    priceRange: "₹300–₹500",
                    description: "A spicy mutton curry cooked with sorrel leaves (Gongura), a signature dish.",
                    image: "https://c.ndtvimg.com/2019-11/klg29n7g_mutton-curry_625x300_27_November_19.jpg"
                },
                {
                    name: "Pootharekulu",
                    type: "Sweet",
                    priceRange: "₹200–₹400",
                    description: "Paper-thin sweet sheets made from rice starch, sugar/jaggery, and ghee.",
                    image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Pootharekulu.jpg"
                }
            ]
        },
        foodShops: [
            {
                name: "Subbayya Gari Hotel",
                location: "Kakinada",
                famousDish: "Andhra Thali",
                priceRange: "₹200–₹400",
                rating: 4.8,
                timings: "11 AM - 10 PM"
            }
        ],
        danceAndMusic: {
            dances: [
                {
                    name: "Kuchipudi",
                    type: "Classical",
                    description: "A major Indian classical dance form originating from the village of Kuchipudi.",
                    image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Kuchipudi_Dance_Performance.jpg"
                },
                {
                    name: "Lambadi",
                    type: "Folk",
                    description: "A tribal dance performed by the Banjara community.",
                    image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Lambadi_dance.jpg"
                }
            ],
            music: [
                {
                    name: "Carnatic Music",
                    description: "Andhra Pradesh has a rich lineage of Carnatic musicians like Tyagaraja.",
                    image: ""
                }
            ],
            instruments: [
                {
                    name: "Veena",
                    description: "Saraswati Veena is a key instrument in Carnatic music.",
                    image: ""
                }
            ]
        },
        traditionalAttire: {
            men: {
                description: "Traditional wear includes Dhoti and Kurta (Pancha and Kanduva).",
                attire: [
                    {
                        name: "Pancha",
                        description: "A white dhoti worn with a shirt or kurta."
                    }
                ],
                images: []
            },
            women: {
                description: "Sarees are the staple, with varying styles like Dharmavaram and Mangalagiri.",
                attire: [
                    {
                        name: "Dharmavaram Saree",
                        description: "Silk sarees known for broad borders and heavy pallus."
                    }
                ],
                images: []
            },
            fabrics: [
                {
                    name: "Kalamkari",
                    description: "Hand-painted or block-printed cotton textile."
                }
            ]
        },
        festivals: [
            {
                name: "Sankranti",
                celebrationTime: "January",
                significance: "Harvest Festival",
                description: "Celebrated with bonfires (Bhogi), rangolis (Muggulu), and kite flying.",
                images: ["https://upload.wikimedia.org/wikipedia/commons/4/4f/Sankranti_Prabhalu.jpg"]
            },
            {
                name: "Ugadi",
                celebrationTime: "March/April",
                significance: "Telugu New Year",
                description: "Marked by the consumption of Ugadi Pachadi, signifying the six tastes of life.",
                images: []
            }
        ],
        artAndHandicrafts: [
            {
                name: "Kondapalli Toys",
                type: "Woodcraft",
                description: "Lightweight wooden toys made in Kondapalli village.",
                famousFor: "Dasara dolls",
                images: ["https://upload.wikimedia.org/wikipedia/commons/9/90/Kondapalli_toys_1.jpg"]
            },
            {
                name: "Etikoppaka Toys",
                type: "Lacquerware",
                description: "Traditional toys made with lacquer colors.",
                famousFor: "Bright colors and smooth finish",
                images: []
            }
        ],
        heritageAndTraditions: {
            customs: [
                {
                    title: "Inti Peru",
                    description: "The practice of using the family name (surname) before the given name."
                }
            ],
            rituals: [
                {
                    title: "Satyanarayana Swamy Vratam",
                    description: "A common ritual performed for prosperity and well-being."
                }
            ],
            dailyLife: "Centered around family, agriculture, and religious observances.",
            values: "Respect for tradition, hospitality, and spiritual devotion."
        },
        culturalPlaces: [
            {
                name: "Tirumala Venkateswara Temple",
                type: "Temple",
                location: "Tirupati",
                description: "One of the richest and most visited religious sites in the world.",
                image: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tirumala_09062013.jpg"
            }
        ],
        extraSections: [
            {
                title: "Language",
                content: "Telugu is the official language and is known as the 'Italian of the East' because all words end in a vowel."
            }
        ],
        culturalExperience: {
            liveEvents: [
                {
                    name: "Visakha Utsav",
                    location: "Visakhapatnam",
                    date: "2024-12-28",
                    entryFee: "Free",
                    image: "",
                    audience: ["Tourist", "Family"]
                }
            ],
            foodTrails: [
                {
                    name: "Vijayawada Street Food",
                    type: "Food Walk",
                    description: "Tasting spicy Mirchi Bajji and Idli.",
                    priceRange: "₹300",
                    duration: "2 Hours",
                    audience: ["Foodie"]
                }
            ],
            workshops: [
                {
                    name: "Kalamkari Painting",
                    type: "Art",
                    duration: "4 Hours",
                    price: "₹1500",
                    skillLevel: "Beginner",
                    audience: ["Artist", "Tourist"]
                }
            ],
            festivalCalendar: [
                {
                    name: "Sankranti",
                    priority: 1,
                    date: "2025-01-14",
                    significance: "Harvest",
                    images: [],
                    audience: ["Family"]
                }
            ]
        },
        isActive: true
    },
    cities: [
        {
            name: "Visakhapatnam",
            slug: "visakhapatnam",
            description: "A port city and industrial center known for its beaches and landscape.",
            history: "Ancient history dating back to the 6th century BC.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Visakhapatnam_Collage.jpg/800px-Visakhapatnam_Collage.jpg",
            isPopular: true,
            isActive: true,
            places: [
                {
                    name: "RK Beach",
                    category: "nature",
                    description: "Popular beach in the city with the submarine museum.",
                    images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/RK_Beach_Vizag.jpg/800px-RK_Beach_Vizag.jpg"],
                    bestTimeToVisit: "November to February",
                    entryFee: "Free",
                    location: "Visakhapatnam",
                    isActive: true
                },
                {
                    name: "INS Kurusura Submarine Museum",
                    category: "museum",
                    description: "A museum inside a real decommissioned submarine.",
                    images: [],
                    bestTimeToVisit: "All year",
                    entryFee: "₹40",
                    location: "RK Beach Road",
                    isActive: true
                },
                {
                    name: "Kailasagiri",
                    category: "nature",
                    description: "Hilltop park with panoramic sea views.",
                    images: [],
                    bestTimeToVisit: "Evening",
                    entryFee: "₹10",
                    location: "Visakhapatnam",
                    isActive: true
                },
                {
                    name: "Araku Valley",
                    category: "nature",
                    description: "Hill station known for coffee plantations.",
                    images: [],
                    bestTimeToVisit: "September to March",
                    entryFee: "Free",
                    location: "114 km from Vizag",
                    isActive: true
                },
                {
                    name: "Borra Caves",
                    category: "nature",
                    description: "Million-year-old limestone caves.",
                    images: [],
                    bestTimeToVisit: "All year",
                    entryFee: "₹60",
                    location: "Araku Valley",
                    isActive: true
                }
            ],
            foods: [
                {
                    name: "Bamboo Chicken",
                    type: "non-veg",
                    description: "Chicken cooked inside bamboo shoots without oil.",
                    famousFor: "Tribal cuisine of Araku",
                    approxPrice: "₹200",
                    image: "",
                    isActive: true
                },
                {
                    name: "Cashew Curry",
                    type: "veg",
                    description: "Rich curry made with local cashews.",
                    famousFor: "Local produce",
                    approxPrice: "₹150",
                    image: "",
                    isActive: true
                },
                {
                    name: "Bongulo Chicken",
                    type: "non-veg",
                    description: "Another variation of bamboo chicken.",
                    famousFor: "Smoky flavor",
                    approxPrice: "₹250",
                    image: "",
                    isActive: true
                },
                {
                    name: "Madugula Halwa",
                    type: "sweet",
                    description: "A jelly-like sweet made from wheat milk.",
                    famousFor: "Unique texture",
                    approxPrice: "₹400/kg",
                    image: "",
                    isActive: true
                },
                {
                    name: "Andhra Meals",
                    type: "veg",
                    description: "Spicy full course meal.",
                    famousFor: "Spiciness",
                    approxPrice: "₹120",
                    image: "",
                    isActive: true
                }
            ],
            transports: [
                { type: "flight", description: "Visakhapatnam International Airport", connectivity: "Major cities", approxCost: "₹3000+", isActive: true },
                { type: "train", description: "Visakhapatnam Junction", connectivity: "Major hub", approxCost: "₹200-₹1500", isActive: true },
                { type: "bus", description: "APSRTC buses", connectivity: "Inter-state", approxCost: "₹200+", isActive: true },
                { type: "auto", description: "Local autos", connectivity: "City wide", approxCost: "₹30+", isActive: true },
                { type: "taxi", description: "App cabs", connectivity: "City wide", approxCost: "₹20/km", isActive: true }
            ]
        },
        {
            name: "Tirupati",
            slug: "tirupati",
            description: "Spiritual capital of Andhra Pradesh, home to the Tirumala temple.",
            history: "Ancient pilgrimage center.",
            image: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tirumala_09062013.jpg",
            isPopular: true,
            isActive: true,
            places: [
                { name: "Tirumala Temple", category: "temple", description: "Abode of Lord Venkateswara.", images: [], bestTimeToVisit: "All year", entryFee: "Free/Paid options", location: "Tirumala", isActive: true },
                { name: "Kapila Theertham", category: "temple", description: "Waterfall and temple dedicated to Lord Shiva.", images: [], bestTimeToVisit: "Monsoon", entryFee: "Free", location: "Tirupati", isActive: true },
                { name: "Sri Kalahasti", category: "temple", description: "Wind element Shiva temple nearby.", images: [], bestTimeToVisit: "All year", entryFee: "Free", location: "36km away", isActive: true },
                { name: "Talakona Waterfalls", category: "nature", description: "Highest waterfall in AP.", images: [], bestTimeToVisit: "Sep-Jan", entryFee: "₹50", location: "50km away", isActive: true },
                { name: "Chandragiri Fort", category: "fort", description: "Historical fort.", images: [], bestTimeToVisit: "Winter", entryFee: "₹20", location: "Chandragiri", isActive: true }
            ],
            foods: [
                { name: "Tirupati Laddu", type: "sweet", description: "Famous prasadam of the temple.", famousFor: "GI Tagged Sweet", approxPrice: "₹50", image: "", isActive: true },
                { name: "Dosa", type: "veg", description: "Crispy South Indian crepe.", famousFor: "Breakfast", approxPrice: "₹40", image: "", isActive: true },
                { name: "Pongal", type: "veg", description: "Rice and lentil dish.", famousFor: "Offering", approxPrice: "₹40", image: "", isActive: true },
                { name: "Vada", type: "veg", description: "Fried lentil donut.", famousFor: "Breakfast", approxPrice: "₹30", image: "", isActive: true },
                { name: "Curd Rice", type: "veg", description: "Rice with yogurt.", famousFor: "Cooling", approxPrice: "₹40", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Tirupati Airport", connectivity: "Domestic", approxCost: "₹4000+", isActive: true },
                { type: "train", description: "Tirupati Railway Station", connectivity: "Well connected", approxCost: "₹100+", isActive: true },
                { type: "bus", description: "APSRTC", connectivity: "Frequent", approxCost: "₹100+", isActive: true },
                { type: "taxi", description: "Private Cabs", connectivity: "Tirumala drops", approxCost: "₹1000+", isActive: true },
                { type: "auto", description: "Autos", connectivity: "Local", approxCost: "₹50+", isActive: true }
            ]
        },
        {
            name: "Vijayawada",
            slug: "vijayawada",
            description: "A major commercial hub on the banks of Krishna River.",
            history: "Known as Bezawada historically.",
            image: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Prakasam_Barrage_Vijayawada.jpg",
            isPopular: true,
            isActive: true,
            places: [
                { name: "Kanaka Durga Temple", category: "temple", description: "Famous temple on Indrakeeladri hill.", images: [], bestTimeToVisit: "Navratri", entryFee: "Free", location: "Indrakeeladri", isActive: true },
                { name: "Prakasam Barrage", category: "other", description: "Iconic bridge across Krishna river.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "Krishna River", isActive: true },
                { name: "Undavalli Caves", category: "heritage", description: "Rock cut caves.", images: [], bestTimeToVisit: "Winter", entryFee: "₹20", location: "Undavalli", isActive: true },
                { name: "Bhavani Island", category: "nature", description: "River island resort.", images: [], bestTimeToVisit: "All year", entryFee: "₹50", location: "Krishna River", isActive: true },
                { name: "Gandhi Hill", category: "heritage", description: "First Gandhi memorial.", images: [], bestTimeToVisit: "Evening", entryFee: "₹10", location: "City center", isActive: true }
            ],
            foods: [
                { name: "Mirchi Bajji", type: "veg", description: "Stuffed chili fritters.", famousFor: "Street food", approxPrice: "₹20", image: "", isActive: true },
                { name: "Pulihora", type: "veg", description: "Tamarind rice.", famousFor: "Tangy taste", approxPrice: "₹50", image: "", isActive: true },
                { name: "Sunnundalu", type: "sweet", description: "Urad dal laddu.", famousFor: "Healthy sweet", approxPrice: "₹300/kg", image: "", isActive: true },
                { name: "Idli Sambar", type: "veg", description: "Steamed cakes with soup.", famousFor: "Breakfast", approxPrice: "₹40", image: "", isActive: true },
                { name: "Panipuri", type: "veg", description: "Street snack.", famousFor: "Snack", approxPrice: "₹20", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Vijayawada Airport", connectivity: "Gannavaram", approxCost: "₹3000+", isActive: true },
                { type: "train", description: "Vijayawada Junction", connectivity: "Major hub", approxCost: "₹100+", isActive: true },
                { type: "bus", description: "Pandit Nehru Bus Station", connectivity: "Largest bus station", approxCost: "₹100+", isActive: true },
                { type: "auto", description: "Autos", connectivity: "Local", approxCost: "₹30+", isActive: true },
                { type: "taxi", description: "Cabs", connectivity: "Local", approxCost: "₹200+", isActive: true }
            ]
        },
        {
            name: "Amaravati",
            slug: "amaravati",
            description: "The capital region known for its Buddhist Stupa.",
            history: "Ancient Buddhist site.",
            image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Amaravati_Stupa_Mockup.jpg",
            isPopular: false,
            isActive: true,
            places: [
                { name: "Amaravati Stupa", category: "heritage", description: "Ruined Buddhist stupa.", images: [], bestTimeToVisit: "Winter", entryFee: "₹20", location: "Amaravati", isActive: true },
                { name: "Amaralingeswara Temple", category: "temple", description: "Pancharama Kshetras.", images: [], bestTimeToVisit: "All year", entryFee: "Free", location: "Amaravati", isActive: true },
                { name: "Dhyana Buddha Statue", category: "heritage", description: "Tall Buddha statue.", images: [], bestTimeToVisit: "All year", entryFee: "Free", location: "Amaravati", isActive: true },
                { name: "Archaeological Museum", category: "museum", description: "Houses Buddhist artifacts.", images: [], bestTimeToVisit: "Day", entryFee: "₹10", location: "Near Stupa", isActive: true },
                { name: "Krishna River Ghats", category: "nature", description: "River banks.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "Amaravati", isActive: true }
            ],
            foods: [
                { name: "Pesarattu", type: "veg", description: "Green gram crepe.", famousFor: "Breakfast", approxPrice: "₹40", image: "", isActive: true },
                { name: "Upma", type: "veg", description: "Semolina porridge.", famousFor: "Breakfast", approxPrice: "₹30", image: "", isActive: true },
                { name: "Gongura Pachadi", type: "veg", description: "Sorrel leaf pickle.", famousFor: "Spicy side", approxPrice: "₹100/jar", image: "", isActive: true },
                { name: "Ariselu", type: "sweet", description: "Rice flour and jaggery sweet.", famousFor: "Festivals", approxPrice: "₹15/pc", image: "", isActive: true },
                { name: "Tea", type: "veg", description: "Chai.", famousFor: "Refreshment", approxPrice: "₹10", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "APSRTC", connectivity: "From Vijayawada", approxCost: "₹50", isActive: true },
                { type: "taxi", description: "Cabs", connectivity: "From Vijayawada", approxCost: "₹800", isActive: true },
                { type: "auto", description: "Autos", connectivity: "Local", approxCost: "₹30+", isActive: true },
                { type: "train", description: "Guntur Jn", connectivity: "Nearby", approxCost: "₹50+", isActive: true },
                { type: "flight", description: "Vijayawada Airport", connectivity: "Nearest", approxCost: "₹3000+", isActive: true }
            ]
        },
        {
            name: "Kurnool",
            slug: "kurnool",
            description: "Gateway to Rayalaseema.",
            history: "Former capital of Andhra State.",
            image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Konda_Reddy_Buruju.jpg",
            isPopular: false,
            isActive: true,
            places: [
                { name: "Konda Reddy Buruju", category: "fort", description: "Iconic watchtower.", images: [], bestTimeToVisit: "All year", entryFee: "Free", location: "City center", isActive: true },
                { name: "Belum Caves", category: "nature", description: "Longest caves in plains.", images: [], bestTimeToVisit: "Winter", entryFee: "₹60", location: "Nearby", isActive: true },
                { name: "Oravakallu Rock Garden", category: "nature", description: "Natural rock formations.", images: [], bestTimeToVisit: "Winter", entryFee: "₹20", location: "Outer city", isActive: true },
                { name: "Yaganti", category: "temple", description: "Temple with growing Nandi.", images: [], bestTimeToVisit: "All year", entryFee: "Free", location: "Nearby", isActive: true },
                { name: "Rollapadu Bird Sanctuary", category: "nature", description: "Great Indian Bustard habitat.", images: [], bestTimeToVisit: "Winter", entryFee: "₹30", location: "Nearby", isActive: true }
            ],
            foods: [
                { name: "Uggani", type: "veg", description: "Puffed rice dish.", famousFor: "Breakfast", approxPrice: "₹30", image: "", isActive: true },
                { name: "Bajji", type: "veg", description: "Fritters.", famousFor: "Combo with Uggani", approxPrice: "₹20", image: "", isActive: true },
                { name: "Jowar Roti", type: "veg", description: "Sorghum bread.", famousFor: "Healthy staple", approxPrice: "₹20", image: "", isActive: true },
                { name: "Ragi Sangati", type: "veg", description: "Finger millet ball.", famousFor: "Nutritious", approxPrice: "₹60", image: "", isActive: true },
                { name: "Nati Kodi Pulusu", type: "non-veg", description: "Country chicken curry.", famousFor: "Spicy", approxPrice: "₹250", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "APSRTC", connectivity: "Statewide", approxCost: "₹100+", isActive: true },
                { type: "train", description: "Kurnool City", connectivity: "Major line", approxCost: "₹100+", isActive: true },
                { type: "flight", description: "Kurnool Airport", connectivity: "Limited", approxCost: "₹3000+", isActive: true },
                { type: "auto", description: "Autos", connectivity: "Local", approxCost: "₹30+", isActive: true },
                { type: "taxi", description: "Cabs", connectivity: "Comfort", approxCost: "₹200+", isActive: true }
            ]
        },
        {
            name: "Rajahmundry",
            slug: "rajahmundry",
            description: "Cultural capital of Andhra on Godavari banks.",
            history: "Ancient city.",
            image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Godavari_Arch_Bridge_%28Rajahmundry%29.jpg",
            isPopular: false,
            isActive: true,
            places: [
                { name: "Godavari Bridge", category: "other", description: "Asia's third longest rail-cum-road bridge.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "River", isActive: true },
                { name: "Pushkar Ghat", category: "religious", description: "Major bathing ghat.", images: [], bestTimeToVisit: "Morning", entryFee: "Free", location: "River bank", isActive: true },
                { name: "ISKCON Temple", category: "temple", description: "Krishna temple.", images: [], bestTimeToVisit: "All year", entryFee: "Free", location: "City", isActive: true },
                { name: "Papi Hills", category: "nature", description: "Scenic gorge.", images: [], bestTimeToVisit: "Winter", entryFee: "₹500 (Boat)", location: "River trip", isActive: true },
                { name: "Kadiyam Nurseries", category: "nature", description: "Plant nurseries.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Nearby", isActive: true }
            ],
            foods: [
                { name: "Rose Milk", type: "veg", description: "Flavored milk.", famousFor: "Local brand", approxPrice: "₹30", image: "", isActive: true },
                { name: "Bajjis", type: "veg", description: "Fritters.", famousFor: "Street food", approxPrice: "₹20", image: "", isActive: true },
                { name: "Mango Pickle", type: "veg", description: "Avakaya.", famousFor: "Spicy", approxPrice: "₹200/jar", image: "", isActive: true },
                { name: "Pulasa Fish Curry", type: "non-veg", description: "Rare fish curry.", famousFor: "Expensive delicacy", approxPrice: "₹2000+", image: "", isActive: true },
                { name: "Pootharekulu", type: "sweet", description: "Paper sweet.", famousFor: "Atreyapuram origin", approxPrice: "₹15/pc", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Rajahmundry Station", connectivity: "Major stop", approxCost: "₹100+", isActive: true },
                { type: "bus", description: "APSRTC", connectivity: "Hub", approxCost: "₹100+", isActive: true },
                { type: "flight", description: "Rajahmundry Airport", connectivity: "Connects Hyd/Bir", approxCost: "₹3000+", isActive: true },
                { type: "boat", description: "Launches", connectivity: "To Bhadrachalam", approxCost: "₹800+", isActive: true },
                { type: "auto", description: "Autos", connectivity: "Local", approxCost: "₹30+", isActive: true }
            ]
        },
        {
            name: "Nellore",
            slug: "nellore",
            description: "City on Penna river, famous for agriculture.",
            history: "Ancient roots.",
            image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Ranganathaswamy_Temple_Nellore_Gopuram.jpg",
            isPopular: false,
            isActive: true,
            places: [
                { name: "Ranganthaswamy Temple", category: "temple", description: "Ancient Vishnu temple.", images: [], bestTimeToVisit: "All year", entryFee: "Free", location: "Talpagiri", isActive: true },
                { name: "Mypadu Beach", category: "nature", description: "Scenic beach.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "25km away", isActive: true },
                { name: "Pulicat Lake", category: "nature", description: "Bird sanctuary.", images: [], bestTimeToVisit: "Winter", entryFee: "Free", location: "Nearby", isActive: true },
                { name: "Penchalakona", category: "temple", description: "Narasimha Swamy temple.", images: [], bestTimeToVisit: "All year", entryFee: "Free", location: "Nearby", isActive: true },
                { name: "Nelapattu Bird Sanctuary", category: "nature", description: "Pelicans.", images: [], bestTimeToVisit: "Winter", entryFee: "₹30", location: "Nearby", isActive: true }
            ],
            foods: [
                { name: "Nellore Chepala Pulusu", type: "non-veg", description: "Spicy fish curry.", famousFor: "Signature dish", approxPrice: "₹250", image: "", isActive: true },
                { name: "Malai Kajaa", type: "sweet", description: "Sweet delicacy.", famousFor: "Local sweet", approxPrice: "₹300/kg", image: "", isActive: true },
                { name: "Dosa", type: "veg", description: "Carb breakfast.", famousFor: "Common", approxPrice: "₹40", image: "", isActive: true },
                { name: "Punugulu", type: "veg", description: "Deep fried snack.", famousFor: "Evening snack", approxPrice: "₹30", image: "", isActive: true },
                { name: "Bobbatlu", type: "sweet", description: "Stuffed flatbread.", famousFor: "Festive", approxPrice: "₹20/pc", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Nellore Station", connectivity: "Main line", approxCost: "₹100+", isActive: true },
                { type: "bus", description: "APSRTC", connectivity: "Frequent", approxCost: "₹100+", isActive: true },
                { type: "auto", description: "Autos", connectivity: "Local", approxCost: "₹30+", isActive: true },
                { type: "taxi", description: "Cabs", connectivity: "Available", approxCost: "₹200+", isActive: true },
                { type: "flight", description: "Tirupati Airport", connectivity: "Nearest (130km)", approxCost: "₹3000+", isActive: true }
            ]
        },
        {
            name: "Kakinada",
            slug: "kakinada",
            description: "Planned city and port known as Fertilizer City.",
            history: "British influence.",
            image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Kakinada_Beach.jpg",
            isPopular: false,
            isActive: true,
            places: [
                { name: "Kakinada Beach", category: "nature", description: "Popular hangout.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "City", isActive: true },
                { name: "Coringa Wildlife Sanctuary", category: "nature", description: "Mangrove forest.", images: [], bestTimeToVisit: "Winter", entryFee: "₹50", location: "Nearby", isActive: true },
                { name: "Hope Island", category: "nature", description: "Sand spit.", images: [], bestTimeToVisit: "Day", entryFee: "Boat charges", location: "Sea", isActive: true },
                { name: "Uppada Beach", category: "nature", description: "Scenic road.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "Nearby", isActive: true },
                { name: "Draksharama", category: "temple", description: "Pancharama Kshetram.", images: [], bestTimeToVisit: "All year", entryFee: "Free", location: "Nearby", isActive: true }
            ],
            foods: [
                { name: "Kakinada Kaja", type: "sweet", description: "Syrupy sweet.", famousFor: "Kotaiah Kaja", approxPrice: "₹300/kg", image: "", isActive: true },
                { name: "Subbayya Hotel Meal", type: "veg", description: "Grand thali.", famousFor: "Hospitality", approxPrice: "₹250", image: "", isActive: true },
                { name: "Pesarattu Upma", type: "veg", description: "Crepe with porridge.", famousFor: "Breakfast", approxPrice: "₹60", image: "", isActive: true },
                { name: "Bajji Mixture", type: "veg", description: "Street snack.", famousFor: "Evening", approxPrice: "₹30", image: "", isActive: true },
                { name: "Seafood", type: "non-veg", description: "Fresh catch.", famousFor: "Crabs/Prawns", approxPrice: "₹300", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Kakinada Port", connectivity: "Terminus", approxCost: "₹100+", isActive: true },
                { type: "bus", description: "APSRTC", connectivity: "Good", approxCost: "₹100+", isActive: true },
                { type: "auto", description: "Autos", connectivity: "Local", approxCost: "₹30+", isActive: true },
                { type: "taxi", description: "Cabs", connectivity: "Available", approxCost: "₹200+", isActive: true },
                { type: "flight", description: "Rajahmundry Airport", connectivity: "Nearest (60km)", approxCost: "₹3000+", isActive: true }
            ]
        },
        {
            name: "Anantapur",
            slug: "anantapur",
            description: "Dry region headquarters, known for Lepakshi.",
            history: "Vijayanagara influence.",
            image: "https://upload.wikimedia.org/wikipedia/commons/2/23/Lepakshi_Nandi.jpg",
            isPopular: false,
            isActive: true,
            places: [
                { name: "Lepakshi", category: "heritage", description: "Temple with hanging pillar.", images: [], bestTimeToVisit: "Winter", entryFee: "Free", location: "Hindupur", isActive: true },
                { name: "Penukonda Fort", category: "fort", description: "Historical fort.", images: [], bestTimeToVisit: "Winter", entryFee: "Free", location: "Penukonda", isActive: true },
                { name: "Thimmamma Marrimanu", category: "nature", description: "Giant banyan tree.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Kadiri", isActive: true },
                { name: "ISKCON Temple", category: "temple", description: "Modern temple.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "City", isActive: true },
                { name: "Gooty Fort", category: "fort", description: "Shell shaped fort.", images: [], bestTimeToVisit: "Winter", entryFee: "Free", location: "Gooty", isActive: true }
            ],
            foods: [
                { name: "Uggani Bajji", type: "veg", description: "Rayalaseema staple.", famousFor: "Breakfast", approxPrice: "₹40", image: "", isActive: true },
                { name: "Ragi Mudda", type: "veg", description: "Millet ball.", famousFor: "Lunch", approxPrice: "₹50", image: "", isActive: true },
                { name: "Nati Kodi", type: "non-veg", description: "Country chicken.", famousFor: "Spicy", approxPrice: "₹250", image: "", isActive: true },
                { name: "Groundnut Chutney", type: "veg", description: "Side dish.", famousFor: "Local crop", approxPrice: "-", image: "", isActive: true },
                { name: "Jilebi", type: "sweet", description: "Dessert.", famousFor: "Sweet", approxPrice: "₹20", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Anantapur Station", connectivity: "Major line", approxCost: "₹100+", isActive: true },
                { type: "bus", description: "APSRTC", connectivity: "Hub", approxCost: "₹100+", isActive: true },
                { type: "flight", description: "Bangalore Airport", connectivity: "Nearest major (200km)", approxCost: "₹3000+", isActive: true },
                { type: "auto", description: "Autos", connectivity: "Local", approxCost: "₹30+", isActive: true },
                { type: "taxi", description: "Cabs", connectivity: "Available", approxCost: "₹200+", isActive: true }
            ]
        },
        {
            name: "Srikakulam",
            slug: "srikakulam",
            description: "Northernmost district headquarters, known for Sun Temple.",
            history: "Kalinga region.",
            image: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Arasavalli_Temple.jpg",
            isPopular: false,
            isActive: true,
            places: [
                { name: "Arasavalli Sun Temple", category: "temple", description: "Ancient Sun temple.", images: [], bestTimeToVisit: "Sunday", entryFee: "Free", location: "City", isActive: true },
                { name: "Srikurmam", category: "temple", description: "Kurma avatar temple.", images: [], bestTimeToVisit: "All year", entryFee: "Free", location: "Nearby", isActive: true },
                { name: "Kalingapatnam", category: "nature", description: "Beach and lighthouse.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "Nearby", isActive: true },
                { name: "Salihundam", category: "heritage", description: "Buddhist site.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Hilltop", isActive: true },
                { name: "Telineelapuram", category: "nature", description: "Bird sanctuary.", images: [], bestTimeToVisit: "Winter", entryFee: "Free", location: "Nearby", isActive: true }
            ],
            foods: [
                { name: "Ulavacharu", type: "veg", description: "Horse gram soup.", famousFor: "Local dish", approxPrice: "₹100", image: "", isActive: true },
                { name: "Idli", type: "veg", description: "Common breakfast.", famousFor: "Breakfast", approxPrice: "₹30", image: "", isActive: true },
                { name: "Fish Curry", type: "non-veg", description: "Coastal style.", famousFor: "Fresh", approxPrice: "₹200", image: "", isActive: true },
                { name: "Cashews", type: "veg", description: "Palasa cashews.", famousFor: "Export quality", approxPrice: "₹800/kg", image: "", isActive: true },
                { name: "Puri", type: "veg", description: "Fried bread.", famousFor: "Breakfast", approxPrice: "₹30", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Srikakulam Road", connectivity: "10km away", approxCost: "₹100+", isActive: true },
                { type: "bus", description: "APSRTC", connectivity: "Good", approxCost: "₹100+", isActive: true },
                { type: "auto", description: "Autos", connectivity: "Local", approxCost: "₹30+", isActive: true },
                { type: "taxi", description: "Cabs", connectivity: "Available", approxCost: "₹200+", isActive: true },
                { type: "flight", description: "Visakhapatnam", connectivity: "Nearest (100km)", approxCost: "₹3000+", isActive: true }
            ]
        }
    ]
};

const outputPath = path.join(__dirname, '../../data/generated/Andhra_Pradesh.json');
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(stateData, null, 2));
console.log(`Generated Andhra Pradesh data at ${outputPath}`);
