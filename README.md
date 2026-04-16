# BharatYatra

BharatYatra is a full-stack India travel platform with a React frontend and Node.js/Express backend. It includes destination discovery, itinerary generation, recommendations, translation tools, transportation planning, and an admin CMS for travel data.

## Current Features

### User features
- OTP-based signup flow (`send-otp -> verify-otp -> register`)
- Email/password login with HTTP-only auth cookie
- Forgot password with OTP reset flow
- Protected user routes (`/`, `/explore`, `/state/:slug`, `/city/:slug`, etc.)
- Explore states and cities with slug-based detail pages
- Trending cities on home page
- Voice-assisted destination search on home page
- Culture explorer (`/explore-culture` and `/explore-culture/:stateSlug`)

### Planning and intelligence
- Personalized recommendation generation (`/api/recommendations/generate`) using weighted scoring
- Multi-day itinerary generation (`/api/itineraries/generate`) using an algorithmic planner
- Itinerary output includes day-wise activities and estimated budget
- Interactive map rendering for generated itinerary locations (Leaflet)
- Floating travel assistant chat widget using `/api/chat/parse`
- Chat intent extraction powered by Gemini API (for itinerary intent parsing)

### Translation and transport
- AI translator page with source/target language selection
- Speech-to-text input and text-to-speech playback in translator UI
- Preset travel phrases (`/api/translate/phrases`)
- Transportation planner with state/city route planning
- Geolocation start point support
- Route estimation via OSRM and geocoding via Nominatim
- Google Maps redirect for live navigation
- Destination transport options from backend (`/api/transports/city/slug/:citySlug`)

### Admin features
- Admin login with JWT bearer token
- Admin dashboard for state/city/place/food/transport/culture modules
- CRUD for states, cities, places, foods, transports, and culture
- Active/inactive toggle endpoints per content type
- Bulk upload for states/cities/places/foods/transports via `.xlsx`, `.xls`, or `.csv`
- Bulk state image update endpoint (`/api/admin/states/bulk-update-images`)

### Platform and security
- CORS allowlist support via `CLIENT_URLS`
- OTP request rate limiting and login attempt rate limiting
- MongoDB persistence with Mongoose models
- i18n wiring for English and Hindi on frontend

## Tech Stack

### Frontend
- React 19 + Vite
- React Router DOM 7
- Tailwind CSS
- Axios
- React Leaflet + Leaflet
- i18next + react-i18next
- Lucide React

### Backend
- Node.js + Express 5
- MongoDB + Mongoose
- JWT + cookie-parser
- Nodemailer (SMTP or jsonTransport fallback)
- Multer + XLSX
- express-rate-limit
- Gemini API integration (`@google/genai` + REST call in chat controller)

## Project Structure

```text
BharatYatra/
  client/                 # React frontend
    src/
      pages/              # Home, Explore, City/State details, Itinerary, Recommendations, Translator, Transportation
      pages/admin/        # Admin dashboard and module management pages
      components/         # Shared UI and travel assistant widget
      context/            # Auth/Admin/Theme contexts
      api/api.jsx         # Axios instance + interceptors
  server/                 # Express backend
    controllers/          # Route handlers
    routes/               # API route modules
    models/               # Mongoose schemas
    middlewares/          # Auth and rate-limit middleware
    services/             # OTP, token, and email services
    utils/                # Helpers (itinerary algorithm, validation, responses)
```

## Local Setup

### 1. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 2. Configure environment variables

Create `server/.env`:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URLS=http://localhost:5173,http://localhost:5174

# OTP/auth tuning (optional)
OTP_EXPIRY_MINUTES=5
OTP_RESEND_COOLDOWN_SECONDS=30
VERIFIED_SIGNUP_WINDOW_MINUTES=10
MAX_OTP_ATTEMPTS=5

# SMTP (optional in dev; if omitted, server logs OTP in console via jsonTransport)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_user
SMTP_PASS=your_pass
MAIL_FROM=no-reply@bharatyatra.app

# Required for chat assistant intent parsing
GEMINI_API_KEY=your_gemini_api_key
```

Create `client/.env`:

```env
VITE_API_URL=http://127.0.0.1:5001/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 3. Run the apps

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
cd client
npm run dev
```

## API Overview

Base URL (local): `http://127.0.0.1:5001/api`

Public/user routes:
- `/auth/*` (otp signup, login, forgot/reset password, profile)
- `/states`, `/cities`, `/places`, `/foods`, `/cultures`
- `/transports/states-cities`, `/transports/city/:cityId`, `/transports/city/slug/:citySlug`
- `/recommendations/generate`, `/recommendations`
- `/itineraries/generate`, `/itineraries`, `/itineraries/:id`
- `/translate`, `/translate/phrases`
- `/chat/parse`

Admin routes:
- `/admin/login`
- `/admin/states/*`, `/admin/cities/*`, `/admin/places/*`, `/admin/foods/*`, `/admin/transports/*`, `/admin/culture/*`

## Notes

- `server/routes/userRoutes.js` still contains legacy endpoints (`/api/user/*`) including Google auth path support.
- Deployment config files exist for common platforms: `client/vercel.json`, `client/netlify.toml`, `server/vercel.json`, `server/render.yaml`.
