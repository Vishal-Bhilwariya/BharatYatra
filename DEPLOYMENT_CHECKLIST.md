# ✅ Quick Deployment Checklist

## Before You Start
- [ ] GitHub account created
- [ ] Render.com account created (for backend)
- [ ] Vercel.com account created (for frontend)
- [ ] MongoDB Atlas is accessible (already configured ✓)

## Step-by-Step Deployment

### 1️⃣ Push to GitHub (5 minutes)
```bash
cd d:\BharatYatra
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
# Create repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/BharatYatra.git
git push -u origin main
```

### 2️⃣ Deploy Backend on Render (10 minutes)
- [ ] Go to render.com → New Web Service
- [ ] Connect GitHub repository
- [ ] Root Directory: `server`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Add Environment Variables:
  - `PORT=5000`
  - `MONGO_URI=mongodb+srv://bharatYatra:bharatYatra90@bharatyatra.9v7edjt.mongodb.net/bharatyatra?retryWrites=true&w=majority`
  - `JWT_SECRET=supersecretkey`
  - `NODE_ENV=production`
  - `CLIENT_URL=` (leave empty for now)
- [ ] Click Deploy
- [ ] Copy backend URL: `https://bharatyatra-backend-XXXX.onrender.com`

### 3️⃣ Deploy Frontend on Vercel (5 minutes)
- [ ] Go to vercel.com → New Project
- [ ] Import GitHub repository
- [ ] Root Directory: `client`
- [ ] Framework: Vite
- [ ] Add Environment Variable:
  - `VITE_API_URL=https://bharatyatra-backend-XXXX.onrender.com/api`
- [ ] Click Deploy
- [ ] Copy frontend URL: `https://bharatyatra-XXXX.vercel.app`

### 4️⃣ Update Backend CORS (2 minutes)
- [ ] Go back to Render dashboard
- [ ] Environment → Edit `CLIENT_URL`
- [ ] Set to: `https://bharatyatra-XXXX.vercel.app`
- [ ] Save (auto-redeploys)

### 5️⃣ Test Deployment (5 minutes)
- [ ] Visit frontend URL
- [ ] Check homepage loads
- [ ] Test browsing states/cities
- [ ] Test admin login: `https://bharatyatra-XXXX.vercel.app/admin/login`

### 6️⃣ Create Admin & Upload Data (10 minutes)
- [ ] Run locally: `cd server && node scripts/createAdmin.js`
- [ ] Login to admin panel
- [ ] Upload Excel files from `Data/` folder

## 🎉 Done! Total Time: ~40 minutes

## 📝 Save These URLs
- **Frontend**: ___________________________
- **Backend**: ___________________________
- **Admin Panel**: ___________________________

## 🔐 Important Notes
1. First backend request takes 30-60 seconds (Render free tier cold start)
2. Backend sleeps after 15 minutes of inactivity
3. MongoDB connection string is already in your .env
4. Never share your JWT_SECRET or MongoDB credentials

## 🆘 Need Help?
See full guide: `DEPLOYMENT_GUIDE.md`
