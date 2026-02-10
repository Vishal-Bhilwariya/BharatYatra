# 🇮🇳 BharatYatra

**BharatYatra** is a full-stack travel platform designed to help travelers explore the incredible diversity of India. From discovering hidden gems in remote villages to planning detailed itineraries for popular tourist destinations, this platform serves as your digital travel companion for experiencing India's rich cultural tapestry, culinary traditions, and historical landmarks.

## 🎯 Project Overview

BharatYatra bridges the gap between travelers and authentic Indian experiences by providing:
- Comprehensive information about 28+ states and 700+ cities
- Detailed guides for tourist places, local cuisines, and transportation
- AI-powered recommendations based on user preferences
- Multi-language support for regional accessibility
- Admin-powered content management for real-time updates

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Admin Features](#admin-features)
- [Contributing](#contributing)

## ✨ Features

### 🗺️ Exploration Features
- **State & City Explorer**: Browse 28 Indian states with detailed descriptions, cultural summaries, and high-quality images. Each state contains multiple cities with historical context and popularity ratings
- **Tourist Places**: Discover 1000+ destinations categorized by type (temples, forts, palaces, museums, nature spots). Includes entry fees, best visiting times, location details, and historical significance
- **Local Cuisine**: Explore authentic regional dishes with descriptions, ingredients, taste profiles, and cultural significance. Find where to eat and what makes each dish special
- **Transportation Guide**: Access detailed information about local transport (buses, metros, auto-rickshaws, taxis), intercity connectivity (trains, flights), and estimated costs
- **Cultural Insights**: Deep dive into local festivals, traditions, languages, dress codes, and cultural etiquette for each region

### 🤖 Smart Features
- **AI Recommendations**: Get personalized travel suggestions based on your interests (adventure, culture, food, nature), budget, and travel duration
- **Itinerary Planning**: Create, save, and manage custom multi-day travel plans with day-wise activities, estimated costs, and time management
- **Multi-language Support**: Translate content to 10+ Indian regional languages for better accessibility

### 👨‍💼 Admin Features
- **Comprehensive Dashboard**: Manage all content (states, cities, places, foods, transport, culture) from a single interface
- **Bulk Upload System**: Import data via Excel files with validation and error handling
- **Content Moderation**: Activate/deactivate content, mark popular destinations, and maintain data quality
- **Analytics**: Track user engagement, popular destinations, and content performance

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest version with improved performance and concurrent features for smooth user experience
- **Vite** - Lightning-fast build tool with Hot Module Replacement (HMR) for rapid development
- **React Router DOM v7** - Client-side routing with nested routes and dynamic navigation
- **Tailwind CSS** - Utility-first CSS framework for responsive, modern UI design
- **Axios** - Promise-based HTTP client for API communication with interceptors for auth
- **Recharts** - Composable charting library for admin analytics and data visualization
- **Lucide React** - Beautiful, consistent icon set with 1000+ icons
- **Context API** - State management for user authentication and global app state

### Backend
- **Node.js (v16+)** - JavaScript runtime for scalable server-side applications
- **Express.js v5** - Minimalist web framework with robust routing and middleware support
- **MongoDB Atlas** - Cloud-hosted NoSQL database for flexible, document-based data storage
- **Mongoose v7** - Elegant MongoDB ODM with schema validation, middleware, and query building
- **JWT (jsonwebtoken)** - Secure token-based authentication for admin routes
- **Multer** - Middleware for handling multipart/form-data for Excel file uploads
- **XLSX** - Parse and process Excel files for bulk data import
- **Bcrypt** - Industry-standard password hashing with salt rounds for security
- **CORS** - Cross-Origin Resource Sharing configuration for frontend-backend communication
- **Dotenv** - Environment variable management for secure configuration

## 📁 Project Structure

```
BharatYatra/
├── client/                          # Frontend React Application
│   ├── src/
│   │   ├── api/                    # API service layer
│   │   │   ├── axios.js           # Axios instance with base config
│   │   │   ├── stateApi.js        # State-related API calls
│   │   │   ├── cityApi.js         # City-related API calls
│   │   │   ├── placeApi.js        # Tourist places API
│   │   │   ├── foodApi.js         # Food & cuisine API
│   │   │   └── adminApi.js        # Admin operations API
│   │   │
│   │   ├── components/             # Reusable React components
│   │   │   ├── Navbar.jsx         # Navigation bar
│   │   │   ├── Footer.jsx         # Footer component
│   │   │   ├── StateCard.jsx      # State display card
│   │   │   ├── CityCard.jsx       # City display card
│   │   │   ├── PlaceCard.jsx      # Tourist place card
│   │   │   └── AdminSidebar.jsx   # Admin dashboard sidebar
│   │   │
│   │   ├── context/                # React Context for state management
│   │   │   ├── AuthContext.jsx    # User authentication state
│   │   │   └── ThemeContext.jsx   # Theme preferences
│   │   │
│   │   ├── pages/                  # Page-level components
│   │   │   ├── Home.jsx           # Landing page
│   │   │   ├── States.jsx         # All states listing
│   │   │   ├── StateDetail.jsx    # Individual state page
│   │   │   ├── CityDetail.jsx     # City information page
│   │   │   ├── Places.jsx         # Tourist places listing
│   │   │   ├── Foods.jsx          # Cuisine explorer
│   │   │   ├── Itinerary.jsx      # Trip planning page
│   │   │   └── admin/             # Admin pages
│   │   │       ├── Dashboard.jsx  # Admin overview
│   │   │       ├── ManageStates.jsx
│   │   │       ├── ManageCities.jsx
│   │   │       └── BulkUpload.jsx # Excel upload interface
│   │   │
│   │   ├── App.jsx                 # Root component
│   │   ├── routes.jsx              # Route configuration
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Global styles
│   │
│   ├── public/                     # Static assets
│   ├── index.html                  # HTML template
│   ├── vite.config.js              # Vite configuration
│   ├── tailwind.config.js          # Tailwind CSS config
│   └── package.json                # Frontend dependencies
│
├── server/                          # Backend Node.js Application
│   ├── config/
│   │   └── db.js                   # MongoDB connection setup
│   │
│   ├── models/                      # Mongoose schemas
│   │   ├── State.js                # State schema (name, description, image)
│   │   ├── City.js                 # City schema (linked to state)
│   │   ├── Place.js                # Tourist place schema (category, fees, timings)
│   │   ├── Food.js                 # Food schema (ingredients, taste, price)
│   │   ├── Transport.js            # Transport schema (type, routes, cost)
│   │   ├── Culture.js              # Cultural info schema (festivals, traditions)
│   │   ├── Itinerary.js            # User itinerary schema
│   │   ├── Recommendation.js       # AI recommendation schema
│   │   └── Admin.js                # Admin user schema (hashed password)
│   │
│   ├── controllers/                 # Business logic handlers
│   │   ├── stateController.js      # State CRUD operations
│   │   ├── cityController.js       # City operations
│   │   ├── placeController.js      # Place operations
│   │   ├── foodController.js       # Food operations
│   │   ├── transportController.js  # Transport operations
│   │   ├── cultureController.js    # Culture operations
│   │   ├── itineraryController.js  # Itinerary management
│   │   ├── recommendationController.js  # AI recommendations
│   │   ├── translatorController.js # Language translation
│   │   ├── adminController.js      # Admin auth (login, register)
│   │   └── adminBulkUpload*.js     # Excel bulk upload handlers
│   │
│   ├── routes/                      # Express route definitions
│   │   ├── stateRoutes.js          # GET /api/states
│   │   ├── cityRoutes.js           # GET /api/cities
│   │   ├── placeRoutes.js          # GET /api/places
│   │   ├── foodRoutes.js           # GET /api/foods
│   │   ├── transportRoutes.js      # GET /api/transports
│   │   ├── cultureRoutes.js        # GET /api/cultures
│   │   ├── itineraryRoutes.js      # CRUD /api/itineraries
│   │   ├── recommendationRoutes.js # POST /api/recommendations
│   │   ├── translatorRoutes.js     # POST /api/translate
│   │   ├── adminRoutes.js          # POST /api/admin/login
│   │   └── admin*.js               # Protected admin routes
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js      # JWT verification middleware
│   │
│   ├── scripts/                     # Utility scripts
│   │   ├── createAdmin.js          # Create admin user CLI
│   │   └── generators/             # Data generation scripts
│   │
│   ├── utils/
│   │   └── apiResponse.js          # Standardized API response format
│   │
│   ├── .env                         # Environment variables (not in git)
│   ├── server.js                    # Express app entry point
│   └── package.json                 # Backend dependencies
│
├── Data/                            # Sample Excel files for bulk upload
│   ├── States/
│   │   └── BharatYatra_States.xlsx
│   ├── Cities/
│   │   └── Uttar_Pradesh_All_Cities_Updated.xlsx
│   ├── Places/
│   │   └── Agra_Places_Advanced_Format.xlsx
│   ├── Foods/
│   │   └── Agra_Foods.xlsx
│   └── Transports/
│       └── Agra_Transport.xlsx
│
├── Documentations/                  # Project documentation
│   ├── Backend_API_Documentation_v2.md
│   ├── Complete_Project_Overview.md
│   └── State_Data_Structure_Template.md
│
├── .gitignore                       # Git ignore rules
├── EXCEL_UPLOAD_GUIDE.md           # Guide for bulk data upload
└── README.md                        # This file
```

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Clone Repository
```bash
git clone <repository-url>
cd BharatYatra
```

### Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5000

# MongoDB Configuration
# Get this from MongoDB Atlas: Clusters > Connect > Connect your application
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bharatyatra?retryWrites=true&w=majority

# JWT Secret for Admin Authentication
# Generate a strong random string (e.g., using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
```

### MongoDB Atlas Setup

1. **Create Account**: Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Create Cluster**: Choose free tier (M0) for development
3. **Database Access**: Create a database user with read/write permissions
4. **Network Access**: Add your IP address (or 0.0.0.0/0 for development)
5. **Get Connection String**: Click "Connect" > "Connect your application" > Copy the connection string
6. **Update .env**: Replace `<username>`, `<password>`, and database name

### Frontend Configuration

Update API base URL in `client/src/api/axios.js` if deploying:

```javascript
// Development
const API_BASE_URL = 'http://localhost:5000';

// Production
const API_BASE_URL = 'https://your-backend-domain.com';
```

## 🏃 Running the Application

### Development Mode

**Start Backend:**
```bash
cd server
npm run dev
```
Server runs on `http://localhost:5000`

**Start Frontend:**
```bash
cd client
npm run dev
```
Client runs on `http://localhost:5173`

### Create Admin User

```bash
cd server
npm run create-admin
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Public Endpoints (No Authentication Required)

#### States
- `GET /states` - Get all active states with pagination
  - Query params: `?page=1&limit=10`
  - Returns: Array of states with name, description, image, cultural summary
- `GET /states/:id` - Get single state by MongoDB ObjectId
  - Returns: State details with associated cities count

#### Cities
- `GET /cities` - Get all active cities
  - Query params: `?page=1&limit=20&isPopular=true`
  - Returns: Cities with state reference populated
- `GET /cities/:id` - Get city by ID with full details
  - Returns: City info, history, places count, foods count
- `GET /cities/state/:stateId` - Get all cities in a specific state
  - Returns: Filtered cities array

#### Places
- `GET /places` - Get all tourist places
  - Query params: `?category=temple&city=<cityId>`
  - Categories: temple, fort, palace, museum, nature, heritage, religious, other
- `GET /places/:id` - Get place details
  - Returns: Full place info with images array, entry fee, best time to visit
- `GET /places/city/:cityId` - Get all places in a city
  - Returns: Places grouped by category

#### Foods
- `GET /foods` - Get all food items
  - Query params: `?type=vegetarian&city=<cityId>`
- `GET /foods/:id` - Get food details
  - Returns: Name, description, ingredients, taste profile, price range, where to find
- `GET /foods/city/:cityId` - Get city-specific cuisines
  - Returns: Local specialties and popular dishes

#### Transports
- `GET /transports` - Get all transport options
  - Query params: `?type=local&city=<cityId>`
- `GET /transports/:id` - Get transport details
  - Returns: Type, routes, timings, cost, booking info
- `GET /transports/city/:cityId` - Get city transport options
  - Returns: Local and intercity transport details

#### Culture
- `GET /cultures/:cityId` - Get cultural information for a city
  - Returns: Festivals, traditions, languages, dress code, etiquette, local customs

#### Recommendations
- `POST /recommendations` - Get AI-powered travel recommendations
  - Body: `{ "interests": ["culture", "food"], "budget": "medium", "duration": 3 }`
  - Returns: Personalized itinerary suggestions

#### Itineraries
- `GET /itineraries` - Get all public itineraries
- `GET /itineraries/:id` - Get specific itinerary
- `POST /itineraries` - Create new itinerary
  - Body: `{ "title": "3 Days in Agra", "days": [...], "totalCost": 5000 }`
- `PUT /itineraries/:id` - Update itinerary
- `DELETE /itineraries/:id` - Delete itinerary

#### Translation
- `POST /translate` - Translate text to regional languages
  - Body: `{ "text": "Welcome", "targetLanguage": "hi" }`
  - Supported: Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam

### Admin Endpoints (JWT Authentication Required)

All admin routes require `Authorization: Bearer <token>` header.

#### Authentication
- `POST /admin/login` - Admin login
  - Body: `{ "email": "admin@example.com", "password": "password" }`
  - Returns: JWT token valid for 7 days
- `POST /admin/register` - Register new admin (requires existing admin token)
  - Body: `{ "name": "Admin Name", "email": "...", "password": "..." }`

#### Bulk Upload (Excel)
- `POST /admin/states/bulk-upload` - Upload states Excel file
  - Content-Type: multipart/form-data
  - Field: `file` (Excel file)
  - Returns: Success count, error details
- `POST /admin/cities/bulk-upload` - Upload cities Excel
- `POST /admin/places/bulk-upload` - Upload places Excel
- `POST /admin/foods/bulk-upload` - Upload foods Excel
- `POST /admin/transports/bulk-upload` - Upload transports Excel

#### CRUD Operations
- `POST /admin/states` - Create new state
- `PUT /admin/states/:id` - Update state
- `DELETE /admin/states/:id` - Delete state
- Similar routes for cities, places, foods, transports, culture

For detailed API documentation with request/response examples, see [Backend_API_Documentation_v2.md](./Documentations/Backend_API_Documentation_v2.md)

## 👨‍💼 Admin Features

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/register` - Register new admin

### Content Management
All admin routes require JWT authentication.

#### Bulk Upload (Excel)
- `POST /api/admin/states/bulk-upload` - Upload states
- `POST /api/admin/cities/bulk-upload` - Upload cities
- `POST /api/admin/places/bulk-upload` - Upload places
- `POST /api/admin/foods/bulk-upload` - Upload foods
- `POST /api/admin/transports/bulk-upload` - Upload transports

#### CRUD Operations
- States: `/api/admin/states`
- Cities: `/api/admin/cities`
- Places: `/api/admin/places`
- Foods: `/api/admin/foods`
- Transports: `/api/admin/transports`
- Culture: `/api/admin/culture`

See [EXCEL_UPLOAD_GUIDE.md](./EXCEL_UPLOAD_GUIDE.md) for bulk upload instructions.

## 📊 Database Models

### State Schema
```javascript
{
  name: String (required, unique),        // "Uttar Pradesh"
  slug: String (required, unique),        // "uttar-pradesh"
  description: String (required),         // Detailed state description
  culturalSummary: String,                // Brief cultural overview
  image: String (required),               // State banner image URL
  isActive: Boolean (default: true),      // Visibility control
  timestamps: true                        // createdAt, updatedAt
}
```

### City Schema
```javascript
{
  name: String (required),                // "Agra"
  slug: String (required),                // "agra"
  stateId: ObjectId (ref: State),         // Reference to parent state
  description: String (required),         // City overview
  history: String,                        // Historical background
  image: String (required),               // City image URL
  isPopular: Boolean (default: false),    // Featured city flag
  isActive: Boolean (default: true),
  timestamps: true
}
```

### Place Schema
```javascript
{
  name: String (required),                // "Taj Mahal"
  slug: String (required),                // "taj-mahal"
  cityId: ObjectId (ref: City),           // Reference to city
  category: String (enum),                // temple, fort, palace, museum, nature, heritage, religious, other
  description: String (required),         // Place description
  history: String,                        // Historical significance
  images: [String],                       // Array of image URLs
  bestTimeToVisit: String,                // "October to March"
  entryFee: String,                       // "₹50 for Indians, ₹1000 for foreigners"
  location: String,                       // Address/landmark
  isActive: Boolean (default: true),
  timestamps: true
}
```

### Food Schema
```javascript
{
  name: String (required),                // "Petha"
  slug: String (required),                // "petha"
  cityId: ObjectId (ref: City),
  description: String (required),         // Food description
  ingredients: [String],                  // ["Ash gourd", "Sugar", "Lime"]
  tasteProfile: String,                   // "Sweet, soft, translucent"
  type: String (enum),                    // vegetarian, non-vegetarian, vegan
  priceRange: String,                     // "₹100-₹300 per kg"
  whereToFind: String,                    // "Panchhi Petha, Agra"
  isActive: Boolean (default: true),
  timestamps: true
}
```

### Transport Schema
```javascript
{
  cityId: ObjectId (ref: City),
  type: String (enum),                    // local, intercity, airport, railway
  name: String (required),                // "Agra Metro"
  description: String,                    // Service details
  routes: [String],                       // Available routes
  timings: String,                        // Operating hours
  cost: String,                           // Fare information
  bookingInfo: String,                    // How to book
  isActive: Boolean (default: true),
  timestamps: true
}
```

### Culture Schema
```javascript
{
  cityId: ObjectId (ref: City, unique),
  festivals: [{
    name: String,                         // "Taj Mahotsav"
    description: String,
    month: String                         // "February"
  }],
  traditions: String,                     // Local customs
  languages: [String],                    // ["Hindi", "Urdu"]
  dressCode: String,                      // Traditional attire
  etiquette: String,                      // Do's and don'ts
  timestamps: true
}
```

### Itinerary Schema
```javascript
{
  userId: String,                         // User identifier
  title: String (required),               // "3 Days in Golden Triangle"
  description: String,
  days: [{
    day: Number,                          // 1, 2, 3...
    activities: [{
      time: String,                       // "09:00 AM"
      activity: String,                   // "Visit Taj Mahal"
      location: String,
      estimatedCost: Number
    }]
  }],
  totalCost: Number,                      // Total estimated cost
  duration: Number,                       // Number of days
  isPublic: Boolean (default: false),     // Share with community
  timestamps: true
}
```

### Recommendation Schema
```javascript
{
  userId: String,
  preferences: {
    interests: [String],                  // ["culture", "food", "adventure"]
    budget: String,                       // "low", "medium", "high"
    duration: Number                      // Days
  },
  recommendations: [{
    cityId: ObjectId (ref: City),
    places: [ObjectId (ref: Place)],
    foods: [ObjectId (ref: Food)],
    reasoning: String                     // Why recommended
  }],
  timestamps: true
}
```

### Admin Schema
```javascript
{
  name: String (required),
  email: String (required, unique),       // Admin email
  password: String (required),            // Bcrypt hashed password
  role: String (default: "admin"),       // Future: super-admin, editor, viewer
  isActive: Boolean (default: true),
  lastLogin: Date,
  timestamps: true
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 📧 Contact

For questions or support, please refer to the documentation in the `Documentations/` folder.

---

**Made with ❤️ for exploring Incredible India**

© 2025 BharatYatra. All Rights Reserved to Vishal.
