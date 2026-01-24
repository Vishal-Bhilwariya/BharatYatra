# 🗺️ BharatYatra State Data Structure Template

**Purpose:** Complete data structure template for creating comprehensive state information  
**Usage:** Use this template to create data for any Indian state  
**Format:** JSON structure matching MongoDB models  

---

## 📋 Complete Data Hierarchy

```
State
├── Basic Information
├── Cities
│   ├── City Details
│   ├── Places (Tourist Attractions)
│   ├── Foods (Local Cuisine)
│   └── Transport Options
├── Culture (Comprehensive)
├── Hidden Gems
└── Safety Information
```

---

## 🏛️ 1. STATE STRUCTURE

```javascript
{
  // Basic State Information
  name: "State Name",
  slug: "state-name",
  description: "Brief description of the state (2-3 sentences)",
  culturalSummary: "One-line cultural summary",
  image: "https://example.com/state-image.jpg",
  isActive: true
}
```

**Example:**
```javascript
{
  name: "Rajasthan",
  slug: "rajasthan",
  description: "The Land of Kings, known for its royal palaces, desert landscapes, and vibrant culture. Rajasthan is famous for its forts, folk music, and colorful festivals.",
  culturalSummary: "A royal state with magnificent palaces, desert culture, and rich traditions.",
  image: "https://example.com/rajasthan-image.jpg",
  isActive: true
}
```

---

## 🏙️ 2. CITY STRUCTURE

```javascript
{
  // City Information
  name: "City Name",
  slug: "city-name",
  stateId: "STATE_OBJECT_ID",
  description: "Detailed city description (3-4 sentences)",
  history: "Historical background of the city",
  image: "https://example.com/city-image.jpg",
  isPopular: true/false,
  isActive: true
}
```

**Example:**
```javascript
{
  name: "Jaipur",
  slug: "jaipur",
  stateId: "RAJASTHAN_STATE_ID",
  description: "The Pink City of India, Jaipur is the capital of Rajasthan known for its stunning architecture, royal palaces, and vibrant bazaars. The city is a UNESCO World Heritage Site and a major tourist destination.",
  history: "Founded in 1727 by Maharaja Sawai Jai Singh II, Jaipur was one of the first planned cities in India.",
  image: "https://example.com/jaipur-image.jpg",
  isPopular: true,
  isActive: true
}
```

---

## 🏛️ 3. PLACES STRUCTURE

```javascript
{
  // Tourist Place Information
  name: "Place Name",
  slug: "place-name",
  cityId: "CITY_OBJECT_ID",
  category: "temple|fort|palace|museum|nature|heritage|religious|other",
  description: "Detailed description of the place",
  history: "Historical significance and background",
  images: [
    "https://example.com/place-image1.jpg",
    "https://example.com/place-image2.jpg"
  ],
  bestTimeToVisit: "October to March",
  entryFee: "₹50 for Indians, ₹200 for foreigners",
  location: "Specific address or landmark",
  isActive: true
}
```

**Example:**
```javascript
{
  name: "Hawa Mahal",
  slug: "hawa-mahal",
  cityId: "JAIPUR_CITY_ID",
  category: "palace",
  description: "The Palace of Winds, a stunning five-story palace with 953 small windows called jharokhas. Built in 1799, it's an iconic symbol of Jaipur's architecture.",
  history: "Built by Maharaja Sawai Pratap Singh in 1799, designed by Lal Chand Ustad in the form of Krishna's crown.",
  images: [
    "https://example.com/hawa-mahal1.jpg",
    "https://example.com/hawa-mahal2.jpg"
  ],
  bestTimeToVisit: "October to March, early morning for best photography",
  entryFee: "₹50 for Indians, ₹200 for foreigners",
  location: "Hawa Mahal Rd, Badi Choupad, Jaipur",
  isActive: true
}
```

---

## 🍽️ 4. FOOD STRUCTURE

```javascript
{
  // Food Item Information
  name: "Dish Name",
  slug: "dish-name",
  cityId: "CITY_OBJECT_ID",
  type: "veg|non-veg|vegan",
  description: "Detailed description of the dish",
  famousFor: "What makes this dish special",
  approxPrice: "₹100–₹300",
  image: "https://example.com/food-image.jpg",
  isActive: true
}
```

**Example:**
```javascript
{
  name: "Dal Baati Churma",
  slug: "dal-baati-churma",
  cityId: "JAIPUR_CITY_ID",
  type: "veg",
  description: "A traditional Rajasthani dish consisting of dal (lentil curry), baati (hard wheat rolls), and churma (sweet crumbled wheat).",
  famousFor: "The signature dish of Rajasthan, representing the essence of desert cuisine",
  approxPrice: "₹150–₹400",
  image: "https://example.com/dal-baati-churma.jpg",
  isActive: true
}
```

---

## 🚌 5. TRANSPORT STRUCTURE

```javascript
{
  // Transport Information
  cityId: "CITY_OBJECT_ID",
  type: "bus|train|flight|taxi|auto|metro",
  description: "Detailed transport information",
  connectivity: "Connected cities and transport hubs",
  approxCost: "₹200–₹500",
  isActive: true
}
```

**Example:**
```javascript
{
  cityId: "JAIPUR_CITY_ID",
  type: "train",
  description: "Jaipur Junction is well connected to major cities across India. Regular trains to Delhi, Mumbai, Kolkata, and other major destinations.",
  connectivity: "Delhi (4-5 hours), Mumbai (12-14 hours), Agra (4-5 hours)",
  approxCost: "₹200–₹2000 depending on class",
  isActive: true
}
```

---

## 🎭 6. COMPREHENSIVE CULTURE STRUCTURE

```javascript
{
  // Complete Cultural Information
  stateId: "STATE_OBJECT_ID",
  
  // 1. Overview
  overview: {
    introduction: "Comprehensive introduction to state culture",
    lifestyle: "Description of local lifestyle and daily life",
    traditions: "Major traditions and customs",
    history: "Cultural and historical background",
    images: ["https://example.com/culture1.jpg"]
  },
  
  // 2. Cuisine
  cuisine: {
    description: "Overview of state cuisine",
    dishes: [
      {
        name: "Dish Name",
        type: "Veg|Non-Veg|Vegan|Beverage|Sweet",
        priceRange: "₹100–₹300",
        description: "Dish description",
        image: "https://example.com/dish.jpg"
      }
    ]
  },
  
  // 3. Famous Food Shops
  foodShops: [
    {
      name: "Shop Name",
      location: "City Name",
      famousDish: "Signature Dish",
      priceRange: "₹100–₹500",
      rating: 4.5,
      timings: "10 AM - 10 PM"
    }
  ],
  
  // 4. Dance & Music
  danceAndMusic: {
    dances: [
      {
        name: "Dance Name",
        type: "Classical|Folk|Tribal|Modern",
        description: "Dance description and significance",
        image: "https://example.com/dance.jpg",
        video: "https://example.com/dance-video.mp4"
      }
    ],
    music: [
      {
        name: "Music Form",
        description: "Music description and characteristics",
        image: "https://example.com/music.jpg"
      }
    ],
    instruments: [
      {
        name: "Instrument Name",
        description: "Instrument description and usage",
        image: "https://example.com/instrument.jpg"
      }
    ]
  },
  
  // 5. Traditional Attire
  traditionalAttire: {
    men: {
      description: "Men's traditional clothing description",
      attire: [
        { name: "Garment Name", description: "Description" }
      ],
      images: ["https://example.com/men-attire.jpg"]
    },
    women: {
      description: "Women's traditional clothing description",
      attire: [
        { name: "Garment Name", description: "Description" }
      ],
      images: ["https://example.com/women-attire.jpg"]
    },
    fabrics: [
      {
        name: "Fabric Name",
        description: "Fabric description and significance"
      }
    ]
  },
  
  // 6. Festivals
  festivals: [
    {
      name: "Festival Name",
      celebrationTime: "Month or season",
      significance: "Religious or cultural significance",
      description: "Detailed festival description",
      images: ["https://example.com/festival.jpg"]
    }
  ],
  
  // 7. Art & Handicrafts
  artAndHandicrafts: [
    {
      name: "Art/Craft Name",
      type: "Painting|Pottery|Handloom|Metalwork|etc",
      description: "Art form description",
      famousFor: "What it's known for",
      images: ["https://example.com/art.jpg"]
    }
  ],
  
  // 8. Heritage & Traditions
  heritageAndTraditions: {
    customs: [
      { title: "Custom Name", description: "Custom description" }
    ],
    rituals: [
      { title: "Ritual Name", description: "Ritual description" }
    ],
    dailyLife: "Description of daily life and routines",
    values: "Core cultural values and beliefs"
  },
  
  // 9. Cultural Places
  culturalPlaces: [
    {
      name: "Place Name",
      type: "Museum|Village|Temple|Monument|etc",
      location: "City/Area",
      description: "Cultural significance",
      image: "https://example.com/cultural-place.jpg"
    }
  ],
  
  // 10. Extra Sections
  extraSections: [
    {
      title: "Section Title (e.g., Languages, Literature)",
      content: "Detailed content about the topic"
    }
  ],
  
  // 11. Cultural Experience Planner
  culturalExperience: {
    liveEvents: [
      {
        name: "Event Name",
        location: "Venue",
        date: "2024-12-25T18:00:00.000Z",
        entryFee: "₹500",
        image: "https://example.com/event.jpg",
        audience: ["Tourist", "Family", "Music Lover"]
      }
    ],
    foodTrails: [
      {
        name: "Food Trail Name",
        type: "Food Walk|Food Tour",
        description: "Trail description",
        priceRange: "₹800",
        duration: "3 Hours",
        audience: ["Tourist", "Foodie"]
      }
    ],
    workshops: [
      {
        name: "Workshop Name",
        type: "Craft|Art|Music|Dance",
        duration: "2 Hours",
        price: "₹1200",
        skillLevel: "Beginner|Intermediate|Advanced",
        audience: ["Student", "Family", "Artist"]
      }
    ],
    festivalCalendar: [
      {
        name: "Festival Name",
        priority: 1, // 1=high, 2=medium, 3=low
        date: "2024-12-25T00:00:00.000Z",
        significance: "Festival significance",
        images: ["https://example.com/festival.jpg"],
        audience: ["Tourist", "Family", "Researcher"]
      }
    ]
  },
  
  isActive: true
}
```

---

## 💎 7. HIDDEN GEMS STRUCTURE

```javascript
{
  // Hidden Gem Information
  name: "Hidden Gem Name",
  slug: "hidden-gem-name",
  cityId: "CITY_OBJECT_ID",
  stateId: "STATE_OBJECT_ID",
  description: "Why this place is special and hidden",
  category: "scenic|historical|cultural|adventure|food|nature|spiritual|offbeat",
  location: {
    address: "Detailed address",
    coordinates: {
      lat: 26.9124,
      lng: 75.7873
    }
  },
  images: ["https://example.com/hidden-gem.jpg"],
  whyHidden: "Explanation of why it's lesser known",
  bestTimeToVisit: "Best season or time",
  accessibility: "easy|moderate|difficult",
  localTips: [
    "Tip 1: Local advice",
    "Tip 2: Best practices"
  ],
  isActive: true
}
```

---

## 🛡️ 8. SAFETY INFORMATION STRUCTURE

```javascript
{
  // Safety Information
  stateId: "STATE_OBJECT_ID", // or cityId for city-specific
  cityId: "CITY_OBJECT_ID", // optional
  
  emergencyContacts: [
    {
      name: "Police",
      number: "100",
      type: "police"
    },
    {
      name: "Tourist Helpline",
      number: "1363",
      type: "tourist-helpline"
    }
  ],
  
  safetyTips: [
    {
      category: "general|transport|food|health|weather|cultural|scams",
      tip: "Specific safety advice",
      priority: "high|medium|low"
    }
  ],
  
  healthInfo: {
    vaccinations: ["Hepatitis A", "Typhoid"],
    commonHealthIssues: ["Heat stroke", "Dehydration"],
    hospitals: [
      {
        name: "Hospital Name",
        address: "Hospital Address",
        contact: "+91-XXXXXXXXXX"
      }
    ]
  },
  
  weatherAlerts: [
    {
      season: "Summer",
      alert: "Extreme heat conditions",
      precautions: ["Stay hydrated", "Avoid noon sun"]
    }
  ],
  
  isActive: true
}
```

---

## 📝 SAMPLE COMPLETE STATE DATA (Rajasthan Example)

```javascript
// 1. STATE
{
  name: "Rajasthan",
  slug: "rajasthan",
  description: "The Land of Kings, known for its royal palaces, desert landscapes, and vibrant culture. Home to magnificent forts, colorful festivals, and rich traditions.",
  culturalSummary: "Royal heritage with desert culture, palaces, and folk traditions",
  image: "https://example.com/rajasthan.jpg",
  isActive: true
}

// 2. CITIES
[
  {
    name: "Jaipur",
    slug: "jaipur",
    stateId: "RAJASTHAN_ID",
    description: "The Pink City, capital of Rajasthan, known for its royal architecture and vibrant culture.",
    history: "Founded in 1727 by Maharaja Sawai Jai Singh II",
    image: "https://example.com/jaipur.jpg",
    isPopular: true,
    isActive: true
  },
  {
    name: "Udaipur",
    slug: "udaipur",
    stateId: "RAJASTHAN_ID",
    description: "The City of Lakes, known for its romantic palaces and beautiful lakes.",
    history: "Founded in 1559 by Maharana Udai Singh II",
    image: "https://example.com/udaipur.jpg",
    isPopular: true,
    isActive: true
  }
]

// 3. PLACES (for Jaipur)
[
  {
    name: "Amber Fort",
    slug: "amber-fort",
    cityId: "JAIPUR_ID",
    category: "fort",
    description: "A majestic fort built with red sandstone and marble, showcasing Rajput architecture.",
    history: "Built by Raja Man Singh I in 1592",
    images: ["https://example.com/amber-fort1.jpg"],
    bestTimeToVisit: "October to March",
    entryFee: "₹100 for Indians, ₹500 for foreigners",
    location: "Devisinghpura, Amer, Jaipur",
    isActive: true
  }
]

// 4. FOODS (for Jaipur)
[
  {
    name: "Pyaaz Kachori",
    slug: "pyaaz-kachori",
    cityId: "JAIPUR_ID",
    type: "veg",
    description: "Deep-fried pastry filled with spiced onion mixture, a Jaipur specialty.",
    famousFor: "Crispy texture and flavorful onion filling",
    approxPrice: "₹20–₹50",
    image: "https://example.com/pyaaz-kachori.jpg",
    isActive: true
  }
]

// 5. CULTURE (Complete structure as shown above)
// 6. HIDDEN GEMS
// 7. SAFETY INFO
```

---

## 🚀 USAGE INSTRUCTIONS

### **Step 1: Create State Data**
1. Fill the state basic information
2. Create slug from state name (lowercase, hyphenated)
3. Add comprehensive description and cultural summary

### **Step 2: Add Cities**
1. Create major cities for the state
2. Link each city to the state using stateId
3. Mark popular cities with isPopular: true

### **Step 3: Add Places for Each City**
1. Add tourist attractions for each city
2. Categorize properly (temple, fort, palace, etc.)
3. Include multiple images and detailed information

### **Step 4: Add Local Foods**
1. Add city-specific dishes
2. Include price ranges and descriptions
3. Specify food type (veg/non-veg/vegan)

### **Step 5: Add Transport Options**
1. Add various transport modes for each city
2. Include connectivity and cost information

### **Step 6: Create Comprehensive Culture Data**
1. Fill all 11 sections of culture model
2. Include festivals, traditions, art, music, dance
3. Add cultural experience events and workshops

### **Step 7: Add Hidden Gems**
1. Research lesser-known places
2. Include GPS coordinates if possible
3. Add local tips and accessibility information

### **Step 8: Add Safety Information**
1. Include emergency contacts
2. Add location-specific safety tips
3. Include health and weather information

---

## 📋 CHECKLIST FOR COMPLETE STATE DATA

- [ ] State basic information
- [ ] At least 3-5 major cities
- [ ] 5-10 places per major city
- [ ] 3-5 local foods per city
- [ ] Transport options for each city
- [ ] Complete culture data (all 11 sections)
- [ ] 2-3 hidden gems per city
- [ ] Safety information for state/cities
- [ ] All images and URLs working
- [ ] Proper slugs and relationships

---

**Note:** This template provides the complete structure for creating comprehensive state data in BharatYatra. Use this as a reference to maintain consistency across all states.

---

## 📊 EXCEL FILE FORMATS FOR BULK UPLOAD

### **1. STATES EXCEL FORMAT**

**File Name:** `States_Data.xlsx`  
**Sheet Name:** `States`

| Column A | Column B | Column C | Column D | Column E |
|----------|----------|----------|----------|----------|
| **name** | **slug** | **description** | **culturalSummary** | **image** |
| Rajasthan | rajasthan | The Land of Kings, known for its royal palaces, desert landscapes, and vibrant culture. Home to magnificent forts, colorful festivals, and rich traditions. | Royal heritage with desert culture, palaces, and folk traditions | https://example.com/rajasthan.jpg |
| Maharashtra | maharashtra | The economic powerhouse of India, known for Bollywood, diverse culture, and historical sites. From Mumbai's cosmopolitan vibe to Pune's educational heritage. | Commercial hub with diverse culture and Marathi traditions | https://example.com/maharashtra.jpg |
| Kerala | kerala | God's Own Country, famous for backwaters, spices, Ayurveda, and lush greenery. Known for its unique culture, classical arts, and tropical beauty. | Tropical paradise with rich cultural heritage and natural beauty | https://example.com/kerala.jpg |

**Required Columns:**
- `name`: State name (Text)
- `slug`: URL-friendly name (Text, lowercase, hyphenated)
- `description`: Detailed description (Text, 2-3 sentences)
- `culturalSummary`: Brief cultural summary (Text, 1 sentence)
- `image`: Image URL (Text, valid URL)

### **2. CITIES EXCEL FORMAT**

**File Name:** `Cities_Data.xlsx`  
**Sheet Name:** `Cities`

| Column A | Column B | Column C | Column D | Column E | Column F | Column G |
|----------|----------|----------|----------|----------|----------|----------|
| **name** | **slug** | **stateName** | **description** | **history** | **image** | **isPopular** |
| Jaipur | jaipur | Rajasthan | The Pink City, capital of Rajasthan, known for its royal architecture, vibrant bazaars, and rich cultural heritage. A UNESCO World Heritage Site. | Founded in 1727 by Maharaja Sawai Jai Singh II, one of the first planned cities in India. | https://example.com/jaipur.jpg | TRUE |
| Udaipur | udaipur | Rajasthan | The City of Lakes, known for its romantic palaces, beautiful lakes, and stunning architecture. Often called the Venice of the East. | Founded in 1559 by Maharana Udai Singh II as the capital of Mewar kingdom. | https://example.com/udaipur.jpg | TRUE |
| Jodhpur | jodhpur | Rajasthan | The Blue City, famous for its blue-painted houses, magnificent Mehrangarh Fort, and desert culture. Gateway to the Thar Desert. | Founded in 1459 by Rao Jodha, the city served as the capital of Marwar kingdom. | https://example.com/jodhpur.jpg | FALSE |

**Required Columns:**
- `name`: City name (Text)
- `slug`: URL-friendly name (Text, lowercase, hyphenated)
- `stateName`: Parent state name (Text, must match existing state)
- `description`: Detailed description (Text, 3-4 sentences)
- `history`: Historical background (Text)
- `image`: Image URL (Text, valid URL)
- `isPopular`: Popular destination flag (Boolean: TRUE/FALSE)

### **3. PLACES EXCEL FORMAT**

**File Name:** `Places_Data.xlsx`  
**Sheet Name:** `Places`

| Column A | Column B | Column C | Column D | Column E | Column F | Column G | Column H | Column I | Column J |
|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
| **name** | **slug** | **cityName** | **category** | **description** | **history** | **bestTimeToVisit** | **entryFee** | **location** | **images** |
| Hawa Mahal | hawa-mahal | Jaipur | palace | The Palace of Winds, a stunning five-story palace with 953 small windows called jharokhas. An iconic symbol of Jaipur's architecture built in pink sandstone. | Built by Maharaja Sawai Pratap Singh in 1799, designed by Lal Chand Ustad in the form of Krishna's crown. | October to March, early morning for best photography | ₹50 for Indians, ₹200 for foreigners | Hawa Mahal Rd, Badi Choupad, Jaipur | https://example.com/hawa-mahal1.jpg,https://example.com/hawa-mahal2.jpg |
| Amber Fort | amber-fort | Jaipur | fort | A majestic fort built with red sandstone and marble, showcasing the finest examples of Rajput architecture. Known for its artistic Hindu style elements. | Built by Raja Man Singh I in 1592, later expanded by successive rulers of the Kachwaha dynasty. | October to March, avoid afternoon heat | ₹100 for Indians, ₹500 for foreigners | Devisinghpura, Amer, Jaipur | https://example.com/amber-fort1.jpg,https://example.com/amber-fort2.jpg |

**Required Columns:**
- `name`: Place name (Text)
- `slug`: URL-friendly name (Text, lowercase, hyphenated)
- `cityName`: Parent city name (Text, must match existing city)
- `category`: Place category (Text: temple|fort|palace|museum|nature|heritage|religious|other)
- `description`: Detailed description (Text)
- `history`: Historical significance (Text)
- `bestTimeToVisit`: Best visiting time (Text)
- `entryFee`: Entry fee information (Text)
- `location`: Address/landmark (Text)
- `images`: Image URLs (Text, comma-separated URLs)

### **4. FOODS EXCEL FORMAT**

**File Name:** `Foods_Data.xlsx`  
**Sheet Name:** `Foods`

| Column A | Column B | Column C | Column D | Column E | Column F | Column G | Column H |
|----------|----------|----------|----------|----------|----------|----------|----------|
| **name** | **slug** | **cityName** | **type** | **description** | **famousFor** | **approxPrice** | **image** |
| Dal Baati Churma | dal-baati-churma | Jaipur | veg | Traditional Rajasthani dish consisting of dal (lentil curry), baati (hard wheat rolls), and churma (sweet crumbled wheat). A complete meal representing desert cuisine. | The signature dish of Rajasthan, perfect combination of protein, carbs, and sweetness | ₹150–₹400 | https://example.com/dal-baati-churma.jpg |
| Pyaaz Kachori | pyaaz-kachori | Jaipur | veg | Deep-fried pastry filled with spiced onion mixture, served with tangy tamarind chutney. A popular street food and breakfast item in Jaipur. | Crispy texture with flavorful onion filling, Jaipur's most famous snack | ₹20–₹50 | https://example.com/pyaaz-kachori.jpg |
| Laal Maas | laal-maas | Jaipur | non-veg | Fiery red mutton curry made with red chilies and traditional Rajasthani spices. A royal dish with intense flavors and rich gravy. | Spicy royal dish originally prepared for Rajput warriors | ₹300–₹600 | https://example.com/laal-maas.jpg |

**Required Columns:**
- `name`: Food item name (Text)
- `slug`: URL-friendly name (Text, lowercase, hyphenated)
- `cityName`: Parent city name (Text, must match existing city)
- `type`: Food type (Text: veg|non-veg|vegan)
- `description`: Detailed description (Text)
- `famousFor`: What makes it special (Text)
- `approxPrice`: Price range (Text)
- `image`: Image URL (Text, valid URL)

### **5. TRANSPORT EXCEL FORMAT**

**File Name:** `Transport_Data.xlsx`  
**Sheet Name:** `Transport`

| Column A | Column B | Column C | Column D | Column E |
|----------|----------|----------|----------|----------|
| **cityName** | **type** | **description** | **connectivity** | **approxCost** |
| Jaipur | train | Jaipur Junction is well connected to major cities across India. Regular trains to Delhi, Mumbai, Kolkata, and other destinations with multiple daily services. | Delhi (4-5 hours), Mumbai (12-14 hours), Agra (4-5 hours), Kolkata (24 hours) | ₹200–₹2000 depending on class |
| Jaipur | flight | Jaipur International Airport connects to major Indian cities and some international destinations. Modern airport with good facilities. | Delhi (1.5 hours), Mumbai (2 hours), Bangalore (2.5 hours), Dubai (3.5 hours) | ₹3000–₹15000 depending on destination |
| Jaipur | bus | State and private buses connect Jaipur to nearby cities and towns. Rajasthan State Road Transport Corporation operates regular services. | Delhi (5-6 hours), Agra (5 hours), Udaipur (6-7 hours), Jodhpur (5-6 hours) | ₹200–₹800 depending on bus type |

**Required Columns:**
- `cityName`: Parent city name (Text, must match existing city)
- `type`: Transport type (Text: bus|train|flight|taxi|auto|metro)
- `description`: Detailed transport information (Text)
- `connectivity`: Connected destinations with time (Text)
- `approxCost`: Cost range (Text)

## 📋 EXCEL FILE PREPARATION GUIDELINES

### **General Rules:**
1. **File Format**: Use `.xlsx` format only
2. **Headers**: First row must contain exact column names as specified
3. **Data Types**: Follow specified data types for each column
4. **Required Fields**: All columns marked as required must have values
5. **Relationships**: Ensure parent entities exist (State before City, City before Place/Food)

### **Data Validation:**
- **URLs**: All image URLs must be valid and accessible
- **Slugs**: Must be lowercase, hyphenated, unique
- **Categories**: Must match predefined enum values
- **Boolean**: Use TRUE/FALSE for boolean fields
- **Prices**: Use ₹ symbol and ranges (e.g., ₹100–₹500)

### **Image Guidelines:**
- **Format**: JPG, PNG, WebP
- **Size**: Recommended 1200x800px minimum
- **Quality**: High resolution, clear images
- **Multiple Images**: Separate URLs with commas (no spaces)

### **Text Guidelines:**
- **Descriptions**: 2-4 sentences, informative and engaging
- **History**: Focus on key historical facts and dates
- **Names**: Use proper capitalization and spelling
- **Locations**: Include specific addresses or landmarks

### **Sample File Structure:**
```
BulkUpload_Files/
├── States_Data.xlsx
├── Cities_Data.xlsx
├── Places_Data.xlsx
├── Foods_Data.xlsx
└── Transport_Data.xlsx
```

### **Upload Order:**
1. **States** (must be uploaded first)
2. **Cities** (requires existing states)
3. **Places** (requires existing cities)
4. **Foods** (requires existing cities)
5. **Transport** (requires existing cities)