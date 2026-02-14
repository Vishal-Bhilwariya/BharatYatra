# 🚀 User Authentication - Quick Start (Hindi)

## ✅ Kya Implement Hua Hai

### Backend (Server)
- ✨ **User Model** - Name, Email, Password, Google ID, Avatar
- 🔐 **Authentication APIs** - Register, Login, Google OAuth
- 🛡️ **JWT Middleware** - Protected routes ke liye
- 📁 **Separate Collection** - `users` collection (admin se alag)

### Frontend (Client)
- 🎨 **Login Page** (`/login`) - Email/Password + Google login
- 🎨 **Signup Page** (`/signup`) - Registration + Google signup
- 🎯 **Welcome Modal** - First-time visitors ke liye
- 🔒 **Protected Route Component** - Routes ko protect karne ke liye
- 🌐 **Auth Context** - Global user state management
- 📱 **Header Integration** - User info display + Login/Logout buttons

## 🔧 Setup Kaise Karein

### 1. Google OAuth Setup (Important!)

**Step 1:** [Google Cloud Console](https://console.cloud.google.com/) pe jao

**Step 2:** Credentials banao:
- APIs & Services > Credentials > Create Credentials > OAuth Client ID
- Application type: Web application
- Authorized JavaScript origins: `http://localhost:5173`
- Client ID copy karo

**Step 3:** Environment variables update karo:

**Backend** (`server/.env`):
```env
GOOGLE_CLIENT_ID=apka_google_client_id_yahan_paste_karo
```

**Frontend** (`client/.env`):
```env
VITE_GOOGLE_CLIENT_ID=apka_google_client_id_yahan_paste_karo
```

### 2. Dependencies Install Karein

Backend aur frontend dono ke liye dependencies already install ho gayi hain:
- Backend: `passport`, `passport-google-oauth20`, `express-session`
- Frontend: `@react-oauth/google`, `jwt-decode`

### 3. Server Start Karein

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

### 4. Test Karein

1. Browser mein `http://localhost:5173` kholo
2. Welcome modal dikhega (first time)
3. "Create Account" ya "Login" click karo
4. Email/Password se register karo YA Google se login karo
5. Login hone ke baad header mein apka naam dikhega
6. "Logout" button se logout kar sakte ho

## 📂 Files Created/Modified

### Backend Files (New)
```
server/
├── models/User.js                      # User schema
├── controllers/userController.js       # Auth logic
├── middlewares/userAuth.middleware.js  # JWT protection
└── routes/userRoutes.js               # Auth routes
```

### Frontend Files (New)
```
client/src/
├── context/AuthContext.jsx            # User state management
├── pages/Login.jsx                    # Login page
├── pages/Signup.jsx                   # Signup page
├── components/ProtectedRoute.jsx      # Route protection
└── components/WelcomeModal.jsx        # Welcome popup
```

### Modified Files
```
client/src/
├── main.jsx                           # Google OAuth provider added
├── App.jsx                            # Auth routes added (already done)
├── components/Header.jsx              # Auth UI added (already done)
└── pages/Home.jsx                     # Welcome modal added
```

## 🎯 Features

### User Features
- ✅ Email/Password se registration
- ✅ Email/Password se login
- ✅ Google OAuth login/signup (one-click)
- ✅ JWT token-based authentication
- ✅ User profile management
- ✅ Logout functionality
- ✅ Welcome modal for new visitors
- ✅ Protected routes (optional)

### Security Features
- ✅ Password hashing (bcrypt)
- ✅ JWT tokens (30 days expiry)
- ✅ Separate user collection
- ✅ Google OAuth secure integration

## 🔐 API Endpoints

### Public (No Token Required)
- `POST /api/user/register` - Naya user banao
- `POST /api/user/login` - Login karo
- `POST /api/user/google` - Google se login

### Protected (Token Required)
- `GET /api/user/profile` - User profile dekho
  - Header: `Authorization: Bearer <token>`

## 🛡️ Routes Ko Protect Kaise Karein

### Backend (API Routes)
```javascript
const { protect } = require('../middlewares/userAuth.middleware');

router.get('/my-route', protect, (req, res) => {
  // req.user mein logged-in user ka data hoga
  res.json({ user: req.user });
});
```

### Frontend (Pages)
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

## 💡 Frontend Mein Use Kaise Karein

```javascript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, loading, logout } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
}
```

## 🎨 UI Flow

1. **First Visit** → Welcome Modal dikhega → Login/Signup option
2. **Login Page** → Email/Password YA Google button
3. **Signup Page** → Name, Email, Password YA Google button
4. **After Login** → Header mein user ka naam + avatar
5. **Logout** → Header mein logout button

## 📝 Important Notes

- ✅ User data `users` collection mein store hoga (admin se alag)
- ✅ Google OAuth users ko password nahi chahiye
- ✅ JWT token localStorage mein save hota hai
- ✅ Passwords bcrypt se hash hoke save hote hain
- ✅ Welcome modal sirf first-time visitors ko dikhega
- ⚠️ **Google Client ID zaroor update karein dono .env files mein!**

## 🚨 Agar Error Aaye

### "Google login not working"
- Check karo `.env` files mein `GOOGLE_CLIENT_ID` sahi hai ya nahi
- Google Cloud Console mein authorized origins check karo

### "Token invalid"
- Logout karke phir se login karo
- Browser localStorage clear karo

### "User not found"
- Database check karo - `users` collection bana hai ya nahi
- MongoDB connection string sahi hai ya nahi

## 📚 Detailed Documentation

Zyada details ke liye dekho: `USER_AUTH_SETUP.md`

---

**Enjoy! 🎉**
