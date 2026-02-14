# 🔐 User Authentication Setup Guide

## ✅ Features Implemented

- ✨ User Registration with Name, Email, Password
- 🔑 User Login with Email & Password
- 🌐 Google OAuth Login/Signup
- 🔒 JWT Token-based Authentication
- 👤 User Profile Management
- 🚪 Logout Functionality
- 🛡️ Protected Routes (Optional - can be added to any route)

## 📦 Database Structure

**User Collection** (`users`):
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed with bcrypt),
  googleId: String (for Google OAuth users),
  avatar: String (profile picture URL),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Google OAuth Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google+ API**

### Step 2: Create OAuth Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth Client ID**
3. Configure OAuth consent screen:
   - User Type: External
   - App name: BharatYatra
   - User support email: Your email
   - Developer contact: Your email
4. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: BharatYatra Web Client
   - Authorized JavaScript origins:
     - `http://localhost:5173` (development)
     - Your production URL (when deploying)
   - Authorized redirect URIs:
     - `http://localhost:5173` (development)
     - Your production URL (when deploying)
5. Copy the **Client ID**

### Step 3: Configure Environment Variables

**Backend** (`server/.env`):
```env
GOOGLE_CLIENT_ID=your_google_client_id_here
```

**Frontend** (`client/.env`):
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

## 🚀 How to Use

### 1. Start Backend
```bash
cd server
npm install
npm run dev
```

### 2. Start Frontend
```bash
cd client
npm install
npm run dev
```

### 3. Test Authentication

1. Open `http://localhost:5173`
2. Click **Sign Up** or **Login** button in header
3. Register with email/password OR use Google login
4. After login, you'll see your name in the header
5. Click **Logout** to sign out

## 🔐 API Endpoints

### Public Routes
- `POST /api/user/register` - Register new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/user/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/user/google` - Google OAuth login
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "googleId": "google_user_id",
    "avatar": "https://profile-pic-url.jpg"
  }
  ```

### Protected Routes (Requires JWT Token)
- `GET /api/user/profile` - Get user profile
  - Header: `Authorization: Bearer <token>`

## 🛡️ How to Protect Routes

### Backend (Protect API Routes)
```javascript
const { protect } = require('../middlewares/userAuth.middleware');

router.get('/protected-route', protect, (req, res) => {
  // req.user contains authenticated user data
  res.json({ user: req.user });
});
```

### Frontend (Protect Pages)
```javascript
import ProtectedRoute from '../components/ProtectedRoute';

<Route 
  path="/profile" 
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  } 
/>
```

## 📱 Frontend Usage

### Access User Data
```javascript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, loading, login, register, googleLogin, logout } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={() => navigate('/login')}>Login</button>
        </div>
      )}
    </div>
  );
}
```

## 🎨 UI Components Created

1. **Login Page** (`/login`)
   - Email/Password login
   - Google OAuth button
   - Link to signup page

2. **Signup Page** (`/signup`)
   - Name, Email, Password registration
   - Google OAuth button
   - Link to login page

3. **Header Component** (Already Updated)
   - Shows Login/Signup buttons when logged out
   - Shows user avatar and name when logged in
   - Logout button

## 🔒 Security Features

- ✅ Passwords hashed with bcrypt (10 salt rounds)
- ✅ JWT tokens with 30-day expiration
- ✅ HTTP-only cookies support (can be enabled)
- ✅ Protected routes with middleware
- ✅ Email uniqueness validation
- ✅ Google OAuth secure integration

## 📝 Notes

- User data is stored in separate `users` collection (not in admin collection)
- Google OAuth users don't need password
- JWT token stored in localStorage (can be moved to httpOnly cookies for better security)
- All passwords are hashed before storing in database
- User authentication is separate from admin authentication

## 🚨 Important

**Replace placeholder Google Client IDs** in both `.env` files with your actual Google OAuth credentials before testing Google login!

---

**Made with ❤️ for BharatYatra**
