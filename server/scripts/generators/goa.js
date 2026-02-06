const fs = require('fs');
const path = require('path');

const stateData = {
    state: {
        name: "Goa",
        slug: "goa",
        description: "Goa is a kaleidoscope of Indian and Portuguese cultures, sweetened with sun, sea, sand, seafood, and spirituality.",
        culturalSummary: "Goan culture is a blend of Hindu and Catholic traditions, visible in its festivals (Carnival, Shigmo), architecture, and cuisine.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Goa_Beach.jpg/800px-Goa_Beach.jpg",
        isActive: true
    },
    culture: {
        stateName: "Goa",
        overview: {
            introduction: "Goa, the 'Pearl of the Orient', is known for its Gothic churches, crumbling forts, palm-fringed beaches, and coconut groves.",
            lifestyle: "Susegad (relaxed) lifestyle is the hallmark of Goan living.",
            traditions: "A harmonious blend of East and West, with festivals like Carnival and Ganesh Chaturthi celebrated with equal zeal.",
            history: "Ruled by the Portuguese for 450 years, leaving a lasting colonial influence.",
            images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Goa_Beach.jpg/800px-Goa_Beach.jpg"]
        },
        cuisine: {
            description: "Goan cuisine is famous for its rich variety of fish dishes cooked with elaborate masalas, vinegar, and coconut.",
            dishes: [
                { name: "Goan Fish Curry", type: "Non-Veg", priceRange: "₹250–₹400", description: "Fish cooked in a coconut milk-based gravy with spices.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Goan_Fish_Curry.jpg/800px-Goan_Fish_Curry.jpg" },
                { name: "Vindaloo", type: "Non-Veg", priceRange: "₹300–₹500", description: "Spicy pork dish marinated in wine and garlic.", image: "" },
                { name: "Chicken Xacuti", type: "Non-Veg", priceRange: "₹250", description: "Chicken curry with roasted grated coconut and spices.", image: "" },
                { name: "Bebinca", type: "Sweet", priceRange: "₹150", description: "Traditional layered cake.", image: "" },
                { name: "Prawn Balchão", type: "Non-Veg", priceRange: "₹350", description: "Prawn pickle/curry.", image: "" }
            ]
        },
        foodShops: [
            { name: "Mum's Kitchen", location: "Panaji", famousFor: "Authentic Goan Cuisine", priceRange: "₹800", rating: 4.5, timings: "11 AM - 11 PM" }
        ],
        danceAndMusic: {
            dances: [
                { name: "Dekhni", type: "Folk", description: "Semi-classical dance form.", image: "" },
                { name: "Fugdi", type: "Folk", description: "Performed by women during festivals like Ganesh Chaturthi.", image: "" },
                { name: "Corridinho", type: "Folk", description: "Portuguese folk dance.", image: "" }
            ],
            music: [{ name: "Mando", description: "Musical form evolving from the 19th and 20th century.", image: "" }],
            instruments: [{ name: "Ghumot", description: "Earthen vessel drum.", image: "" }]
        },
        traditionalAttire: {
            men: { description: "Western wear is common; fishermen wear loincloths.", attire: [{ name: "Shirt and Trousers", description: "Standard attire." }], images: [] },
            women: { description: "Pano Bhaju.", attire: [{ name: "Pano Bhaju", description: "Traditional dress worn during dances." }, { name: "Nav-vari Saree", description: "Nine-yard saree worn by Hindu women." }], images: [] },
            fabrics: [{ name: "Kunbi Saree", description: "Cotton saree with checkered patterns." }]
        },
        festivals: [
            { name: "Goa Carnival", celebrationTime: "February", significance: "Pre-Lent Festival", description: "Parades, music, and masks.", images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Goa_Carnival.jpg/800px-Goa_Carnival.jpg"] },
            { name: "Shigmo", celebrationTime: "March", significance: "Spring Festival", description: "Goan version of Holi with folk dances.", images: [] },
            { name: "Sao Joao", celebrationTime: "June", significance: "Feast of St. John", description: "Jumping into wells.", images: [] }
        ],
        artAndHandicrafts: [
            { name: "Azulejos", type: "Ceramic", description: "Painted tin-glazed ceramic tilework.", famousFor: "Portuguese style", images: [] },
            { name: "Coconut Shell Craft", type: "Craft", description: "Items made from coconut shells.", famousFor: "Souvenirs", images: [] }
        ],
        heritageAndTraditions: {
            customs: [{ title: "Siesta", description: "Afternoon nap is a cherished tradition." }],
            rituals: [{ title: "Litanies", description: "Ladainha sung in front of the roadside cross." }],
            dailyLife: "Laid back and community-oriented.",
            values: "Hospitality and joy of life."
        },
        culturalPlaces: [
            { name: "Basilica of Bom Jesus", type: "Church", location: "Old Goa", description: "UNESCO site holding the remains of St. Francis Xavier.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Basilica_of_Bom_Jesus_Ver_2.jpg/800px-Basilica_of_Bom_Jesus_Ver_2.jpg" }
        ],
        extraSections: [
            { title: "Cashew Feni", content: "Goa has its own GI tagged alcoholic beverage, Feni, made from cashew apples or coconut sap." }
        ],
        culturalExperience: {
            liveEvents: [],
            foodTrails: [],
            workshops: [],
            festivalCalendar: [
                { name: "Carnival", priority: 1, date: "2025-02-22", significance: "Culture", images: [], audience: ["Tourist", "Family"] }
            ]
        },
        isActive: true
    },
    cities: [
        {
            name: "Panaji", slug: "panaji", description: "State capital on the banks of Mandovi.", history: "Portuguese capital.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Panjim_Church.jpg/800px-Panjim_Church.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Immaculate Conception Church", category: "temple", description: "Iconic white church.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "City center", isActive: true },
                { name: "Miramar Beach", category: "nature", description: "City beach.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "Panaji", isActive: true },
                { name: "Dona Paula", category: "nature", description: "Viewpoint.", images: [], bestTimeToVisit: "Evening", entryFee: "Free", location: "Outskirts", isActive: true },
                { name: "Fontainhas", category: "heritage", description: "Latin Quarter.", images: [], bestTimeToVisit: "Morning", entryFee: "Free", location: "City", isActive: true },
                { name: "Goa State Museum", category: "museum", description: "History.", images: [], bestTimeToVisit: "Day", entryFee: "₹10", location: "Patto", isActive: true },
                { name: "Reis Magos Fort", category: "fort", description: "Restored fort.", images: [], bestTimeToVisit: "Day", entryFee: "₹50", location: "Verem", isActive: true },
                { name: "Mandovi River Cruise", category: "other", description: "Boat ride.", images: [], bestTimeToVisit: "Evening", entryFee: "₹500", location: "Jetty", isActive: true },
                { name: "Salim Ali Bird Sanctuary", category: "nature", description: "Mangroves.", images: [], bestTimeToVisit: "Morning", entryFee: "₹50", location: "Chorao", isActive: true },
                { name: "Altinho Hill", category: "nature", description: "Hilltop view.", images: [], bestTimeToVisit: "Day", entryFee: "Free", location: "Altinho", isActive: true },
                { name: "Casino Royale", category: "other", description: "Offshore casino.", images: [], bestTimeToVisit: "Night", entryFee: "₹2000+", location: "River", isActive: true }
            ],
            foods: [
                { name: "Fish Thali", type: "non-veg", description: "Meal.", famousFor: "Lunch", approxPrice: "₹200", image: "", isActive: true },
                { name: "Prawn Curry", type: "non-veg", description: "Curry.", famousFor: "Taste", approxPrice: "₹250", image: "", isActive: true },
                { name: "Bebinca", type: "sweet", description: "Cake.", famousFor: "Dessert", approxPrice: "₹100", image: "", isActive: true },
                { name: "Vindaloo", type: "non-veg", description: "Pork.", famousFor: "Spicy", approxPrice: "₹300", image: "", isActive: true },
                { name: "Feni", type: "beverage", description: "Drink.", famousFor: "Local", approxPrice: "₹100", image: "", isActive: true }
            ],
            transports: [
                { type: "flight", description: "Dabolim/Mopa", connectivity: "International", approxCost: "₹3000+", isActive: true },
                { type: "bus", description: "KTC", connectivity: "Statewide", approxCost: "₹20+", isActive: true },
                { type: "taxi", description: "Taxi", connectivity: "City", approxCost: "₹300+", isActive: true },
                { type: "auto", description: "Pilot (Bike Taxi)", connectivity: "Solo", approxCost: "₹50+", isActive: true },
                { type: "ferry", description: "Ferry", connectivity: "River crossing", approxCost: "Free", isActive: true }
            ]
        },
        {
            name: "Margao", slug: "margao", description: "Cultural capital.", history: "Salcete headquarters.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Margao_Municipal_Council.jpg/800px-Margao_Municipal_Council.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Colva Beach", category: "nature", description: "White sand.", images: [], isActive: true },
                { name: "Benaulim Beach", category: "nature", description: "Quiet beach.", images: [], isActive: true },
                { name: "Holy Spirit Church", category: "temple", description: "Baroque church.", images: [], isActive: true },
                { name: "Sat Burzam Ghor", category: "heritage", description: "House of Seven Gables.", images: [], isActive: true },
                { name: "Monte Hill", category: "nature", description: "View.", images: [], isActive: true }
            ],
            foods: [
                { name: "Sausages", type: "non-veg", description: "Choris.", famousFor: "Spicy", approxPrice: "₹200", image: "", isActive: true },
                { name: "Fish Curry Rice", type: "non-veg", description: "Staple.", famousFor: "Lunch", approxPrice: "₹150", image: "", isActive: true },
                { name: "Sanna", type: "veg", description: "Rice cake.", famousFor: "Bread", approxPrice: "₹20", image: "", isActive: true },
                { name: "Sorpotel", type: "non-veg", description: "Pork.", famousFor: "Rich", approxPrice: "₹300", image: "", isActive: true },
                { name: "Alle Belle", type: "sweet", description: "Pancake.", famousFor: "Tea", approxPrice: "₹50", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Madgaon Junction", connectivity: "Major hub", approxCost: "₹100+", isActive: true }
            ]
        },
        {
            name: "Vasco da Gama", slug: "vasco-da-gama", description: "Port city.", history: "Founded 1543.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Vasco_da_Gama_Goa.jpg/800px-Vasco_da_Gama_Goa.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Bogmalo Beach", category: "nature", description: "Near airport.", images: [], isActive: true },
                { name: "Naval Aviation Museum", category: "museum", description: "Navy planes.", images: [], isActive: true },
                { name: "St. Andrew's Church", category: "temple", description: "Church.", images: [], isActive: true },
                { name: "Japanese Garden", category: "nature", description: "Park.", images: [], isActive: true },
                { name: "Pilot Point", category: "nature", description: "View.", images: [], isActive: true }
            ],
            foods: [
                { name: "Seafood", type: "non-veg", description: "Fresh.", famousFor: "Port", approxPrice: "₹300", image: "", isActive: true },
                { name: "Biryani", type: "non-veg", description: "Rice.", famousFor: "Lunch", approxPrice: "₹200", image: "", isActive: true },
                { name: "Bun Maska", type: "veg", description: "Bread.", famousFor: "Bakery", approxPrice: "₹30", image: "", isActive: true },
                { name: "Xacuti", type: "non-veg", description: "Curry.", famousFor: "Spicy", approxPrice: "₹250", image: "", isActive: true },
                { name: "Dodol", type: "sweet", description: "Jaggery sweet.", famousFor: "Christmas", approxPrice: "₹100", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Vasco Station", connectivity: "Terminus", approxCost: "₹100", isActive: true },
                { type: "flight", description: "Dabolim Airport", connectivity: "Nearby", approxCost: "₹0", isActive: true }
            ]
        },
        {
            name: "Mapusa", slug: "mapusa", description: "Market town.", history: "Trading hub.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Mapusa_Market.jpg/800px-Mapusa_Market.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Mapusa Market", category: "other", description: "Friday market.", images: [], isActive: true },
                { name: "Bodgeshwar Temple", category: "temple", description: "Wish fulfilling.", images: [], isActive: true },
                { name: "St. Jerome Church", category: "temple", description: "Church.", images: [], isActive: true },
                { name: "Maruti Temple", category: "temple", description: "Hanuman.", images: [], isActive: true },
                { name: "Canka", category: "nature", description: "Hill.", images: [], isActive: true }
            ],
            foods: [
                { name: "Choris Pao", type: "non-veg", description: "Sausage bread.", famousFor: "Street food", approxPrice: "₹50", image: "", isActive: true },
                { name: "Ras Omelette", type: "non-veg", description: "Omelette in gravy.", famousFor: "Snack", approxPrice: "₹80", image: "", isActive: true },
                { name: "Baji Pao", type: "veg", description: "Veg gravy.", famousFor: "Breakfast", approxPrice: "₹40", image: "", isActive: true },
                { name: "Dry Fish", type: "non-veg", description: "Dried.", famousFor: "Market", approxPrice: "₹100", image: "", isActive: true },
                { name: "Bibinca", type: "sweet", description: "Layered.", famousFor: "Sweet", approxPrice: "₹150", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "Mapusa Bus Stand", connectivity: "North Goa", approxCost: "₹20+", isActive: true }
            ]
        },
        {
            name: "Ponda", slug: "ponda", description: "Temple town.", history: "Hindu heartland.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Shanta_Durga_Temple.jpg/800px-Shanta_Durga_Temple.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Shanta Durga Temple", category: "temple", description: "Famous temple.", images: [], isActive: true },
                { name: "Mangueshi Temple", category: "temple", description: "Shiva temple.", images: [], isActive: true },
                { name: "Spice Farms", category: "nature", description: "Plantation.", images: [], isActive: true },
                { name: "Safd Masjid", category: "temple", description: "Mosque.", images: [], isActive: true },
                { name: "Butterfly Conservatory", category: "nature", description: "Insects.", images: [], isActive: true }
            ],
            foods: [
                { name: "Veg Thali", type: "veg", description: "Saraswat meal.", famousFor: "Temple food", approxPrice: "₹150", image: "", isActive: true },
                { name: "Sol Kadhi", type: "beverage", description: "Kokum drink.", famousFor: "Digestive", approxPrice: "₹30", image: "", isActive: true },
                { name: "Usal", type: "veg", description: "Sprouts.", famousFor: "Breakfast", approxPrice: "₹40", image: "", isActive: true },
                { name: "Modak", type: "sweet", description: "Dumpling.", famousFor: "Ganesh", approxPrice: "₹20", image: "", isActive: true },
                { name: "Khatkhate", type: "veg", description: "Mixed stew.", famousFor: "Festive", approxPrice: "₹100", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "Bus", connectivity: "Central", approxCost: "₹30", isActive: true }
            ]
        },
        {
            name: "Calangute", slug: "calangute", description: "Queen of Beaches.", history: "Tourism.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Calangute_Beach.jpg/800px-Calangute_Beach.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Calangute Beach", category: "nature", description: "Busy beach.", images: [], isActive: true },
                { name: "St. Alex Church", category: "temple", description: "Church.", images: [], isActive: true },
                { name: "Market", category: "other", description: "Tibetan market.", images: [], isActive: true },
                { name: "Art Gallery", category: "culture", description: "Art.", images: [], isActive: true },
                { name: "Water Sports", category: "nature", description: "Activity.", images: [], isActive: true }
            ],
            foods: [
                { name: "Seafood Platter", type: "non-veg", description: "Mixed.", famousFor: "Shacks", approxPrice: "₹1000", image: "", isActive: true },
                { name: "Beer", type: "beverage", description: "Kingfisher.", famousFor: "Beach", approxPrice: "₹100", image: "", isActive: true },
                { name: "Goan Curry", type: "non-veg", description: "Fish.", famousFor: "Lunch", approxPrice: "₹250", image: "", isActive: true },
                { name: "Pizza", type: "veg", description: "Italian.", famousFor: "Global", approxPrice: "₹300", image: "", isActive: true },
                { name: "Gelato", type: "sweet", description: "Ice cream.", famousFor: "Cool", approxPrice: "₹100", image: "", isActive: true }
            ],
            transports: [
                { type: "taxi", description: "Taxi", connectivity: "Expensive", approxCost: "₹500+", isActive: true }
            ]
        },
        {
            name: "Anjuna", slug: "anjuna", description: "Hippie paradise.", history: "Flower power.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Anjuna_Beach.jpg/800px-Anjuna_Beach.jpg", isPopular: true, isActive: true,
            places: [
                { name: "Anjuna Beach", category: "nature", description: "Rocky beach.", images: [], isActive: true },
                { name: "Flea Market", category: "other", description: "Wednesday market.", images: [], isActive: true },
                { name: "Curlies", category: "other", description: "Shack.", images: [], isActive: true },
                { name: "Chapora Fort", category: "fort", description: "Dil Chahta Hai fort.", images: [], isActive: true },
                { name: "Shiva Valley", category: "other", description: "Trance.", images: [], isActive: true }
            ],
            foods: [
                { name: "Burger", type: "non-veg", description: "Beef.", famousFor: "Cafe", approxPrice: "₹250", image: "", isActive: true },
                { name: "Juice", type: "beverage", description: "Fresh.", famousFor: "Health", approxPrice: "₹100", image: "", isActive: true },
                { name: "Vegan Food", type: "veg", description: "Salad.", famousFor: "Hipster", approxPrice: "₹300", image: "", isActive: true },
                { name: "Pancakes", type: "sweet", description: "Banana.", famousFor: "Breakfast", approxPrice: "₹150", image: "", isActive: true },
                { name: "Coffee", type: "beverage", description: "Brew.", famousFor: "Cafe", approxPrice: "₹100", image: "", isActive: true }
            ],
            transports: [
                { type: "auto", description: "Bike Rental", connectivity: "Self", approxCost: "₹300/day", isActive: true }
            ]
        },
        {
            name: "Old Goa", slug: "old-goa", description: "Historical city.", history: "Former capital.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Basilica_of_Bom_Jesus_Ver_2.jpg/800px-Basilica_of_Bom_Jesus_Ver_2.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Se Cathedral", category: "temple", description: "Largest church.", images: [], isActive: true },
                { name: "Basilica of Bom Jesus", category: "temple", description: "St Francis.", images: [], isActive: true },
                { name: "Church of St Cajetan", category: "temple", description: "Roman style.", images: [], isActive: true },
                { name: "Archaeological Museum", category: "museum", description: "History.", images: [], isActive: true },
                { name: "Viceroy's Arch", category: "heritage", description: "Gate.", images: [], isActive: true }
            ],
            foods: [
                { name: "Snacks", type: "veg", description: "Patties.", famousFor: "Quick", approxPrice: "₹20", image: "", isActive: true },
                { name: "Thali", type: "veg", description: "Meal.", famousFor: "Lunch", approxPrice: "₹100", image: "", isActive: true },
                { name: "Lime Soda", type: "beverage", description: "Drink.", famousFor: "Heat", approxPrice: "₹30", image: "", isActive: true },
                { name: "Buns", type: "veg", description: "Sweet bread.", famousFor: "Snack", approxPrice: "₹15", image: "", isActive: true },
                { name: "Ice Cream", type: "sweet", description: "Cart.", famousFor: "Cool", approxPrice: "₹20", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "Bus", connectivity: "Panaji", approxCost: "₹20", isActive: true }
            ]
        },
        {
            name: "Canacona", slug: "canacona", description: "South Goa hub.", history: "Scenic.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Palolem_Beach.jpg/800px-Palolem_Beach.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Palolem Beach", category: "nature", description: "Bay beach.", images: [], isActive: true },
                { name: "Agonda Beach", category: "nature", description: "Turtle nesting.", images: [], isActive: true },
                { name: "Cabo de Rama", category: "fort", description: "Coastal fort.", images: [], isActive: true },
                { name: "Cola Beach", category: "nature", description: "Lagoon.", images: [], isActive: true },
                { name: "Mallikarjun Temple", category: "temple", description: "Old temple.", images: [], isActive: true }
            ],
            foods: [
                { name: "Fried Fish", type: "non-veg", description: "Rava fry.", famousFor: "Beach", approxPrice: "₹300", image: "", isActive: true },
                { name: "Cocktails", type: "beverage", description: "Drink.", famousFor: "Sunset", approxPrice: "₹250", image: "", isActive: true },
                { name: "Crab", type: "non-veg", description: "Curry.", famousFor: "Fresh", approxPrice: "₹400", image: "", isActive: true },
                { name: "Pasta", type: "veg", description: "Italian.", famousFor: "Tourists", approxPrice: "₹250", image: "", isActive: true },
                { name: "Fruit Salad", type: "veg", description: "Fresh.", famousFor: "Breakfast", approxPrice: "₹150", image: "", isActive: true }
            ],
            transports: [
                { type: "train", description: "Canacona Station", connectivity: "Rail", approxCost: "₹50", isActive: true }
            ]
        },
        {
            name: "Bicholim", slug: "bicholim", description: "Mining town.", history: "Inland.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Mayem_Lake.jpg", isPopular: false, isActive: true,
            places: [
                { name: "Mayem Lake", category: "nature", description: "Boating.", images: [], isActive: true },
                { name: "Corjuem Fort", category: "fort", description: "Fort.", images: [], isActive: true },
                { name: "Saptakoteshwar Temple", category: "temple", description: "Shiva.", images: [], isActive: true },
                { name: "Arvalem Caves", category: "heritage", description: "Pandava caves.", images: [], isActive: true },
                { name: "Arvalem Waterfall", category: "nature", description: "Falls.", images: [], isActive: true }
            ],
            foods: [
                { name: "Bhaji Pao", type: "veg", description: "Local.", famousFor: "Breakfast", approxPrice: "₹30", image: "", isActive: true },
                { name: "Clams", type: "non-veg", description: "Tisryo.", famousFor: "Local", approxPrice: "₹150", image: "", isActive: true },
                { name: "Rice", type: "veg", description: "Meal.", famousFor: "Staple", approxPrice: "₹50", image: "", isActive: true },
                { name: "Sol Kadhi", type: "beverage", description: "Drink.", famousFor: "Digestive", approxPrice: "₹20", image: "", isActive: true },
                { name: "Laddoo", type: "sweet", description: "Sweet.", famousFor: "Temple", approxPrice: "₹10", image: "", isActive: true }
            ],
            transports: [
                { type: "bus", description: "Bus", connectivity: "Road", approxCost: "₹30", isActive: true }
            ]
        }
    ]
};

const outputPath = path.join(__dirname, '../../data/generated/Goa.json');
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(stateData, null, 2));
console.log(`Generated Goa data at ${outputPath}`);
