# 🚀 BharatYatra Deployment - Ready to Launch!

## Your Setup
- **GitHub**: https://github.com/Vishal-Bhilwariya
- **Frontend**: Vercel (Free)
- **Backend**: Render (Free)
- **Domain**: Platform-provided (free) - Can add custom domain later

---

## 🎬 Step 1: Push to GitHub (2 minutes)

Open terminal in `d:\BharatYatra`:

```bash
git init
git add .
git commit -m "Initial commit - BharatYatra ready for deployment"
git branch -M main
git remote add origin https://github.com/Vishal-Bhilwariya/BharatYatra.git
git push -u origin main
```

⚠️ **Before running**: Create repository on GitHub
1. Go to https://github.com/Vishal-Bhilwariya
2. Click "New repository"
3. Name: `BharatYatra`
4. Keep it Public
5. Don't initialize with README
6. Click "Create repository"
7. Then run the commands above

---

## 🔧 Step 2: Deploy Backend on Render (5 minutes)

### 2.1 Create Web Service
1. Go to https://render.com/
2. Sign up with GitHub account
3. Click **"New +"** → **"Web Service"**
4. Click **"Connect account"** → Authorize Render to access GitHub
5. Find and select **"BharatYatra"** repository

### 2.2 Configure Service
Fill in these exact values:

| Field | Value |
|-------|-------|
| **Name** | `bharatyatra-api` |
| **Region** | Singapore (closest to India) |
| **Branch** | `main` |
| **Root Directory** | `server` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### 2.3 Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Add these 4 variables:

```
PORT=5000
```
```
MONGO_URI=mongodb+srv://bharatYatra:bharatYatra90@bharatyatra.9v7edjt.mongodb.net/bharatyatra?retryWrites=true&w=majority
```
```
JWT_SECRET=supersecretkey
```
```
NODE_ENV=production
```
```
CLIENT_URL=https://bharatyatra.vercel.app
```

⚠️ **Note**: We'll update `CLIENT_URL` after deploying frontend

### 2.4 Deploy
1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. **Copy your backend URL**: `https://bharatyatra-api.onrender.com`

---

## 🎨 Step 3: Deploy Frontend on Vercel (3 minutes)

### 3.1 Import Project
1. Go to https://vercel.com/
2. Sign up with GitHub account
3. Click **"Add New..."** → **"Project"**
4. Find **"BharatYatra"** → Click **"Import"**

### 3.2 Configure Project
Fill in these exact values:

| Field | Value |
|-------|-------|
| **Framework Preset** | Vite |
| **Root Directory** | `client` (click Edit, select client folder) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### 3.3 Add Environment Variable
Click **"Environment Variables"** → Add:

**Key**: `VITE_API_URL`  
**Value**: `https://bharatyatra-api.onrender.com/api`

(Replace with your actual Render URL from Step 2)

### 3.4 Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. **Copy your frontend URL**: `https://bharatyatra-xxxx.vercel.app`

---

## 🔄 Step 4: Update Backend CORS (1 minute)

Now that frontend is deployed, update backend:

1. Go to Render dashboard: https://dashboard.render.com/
2. Click on **"bharatyatra-api"** service
3. Click **"Environment"** tab (left sidebar)
4. Find **"CLIENT_URL"** variable
5. Click **"Edit"**
6. Update value to your Vercel URL: `https://bharatyatra-xxxx.vercel.app`
7. Click **"Save Changes"**
8. Service will auto-redeploy (takes 2 minutes)

---

## ✅ Step 5: Test Your Deployment (2 minutes)

### Test Backend
Open browser: `https://bharatyatra-api.onrender.com/api/health`

Should see:
```json
{
  "success": true,
  "message": "Server is running",
  "mongodb": "Connected"
}
```

⏰ **First request takes 30-60 seconds** (Render free tier cold start)

### Test Frontend
1. Open: `https://bharatyatra-xxxx.vercel.app`
2. Homepage should load with states
3. Click on any state → Should show cities
4. Check browser console (F12) for errors

---

## 👨‍💼 Step 6: Create Admin & Upload Data (5 minutes)

### 6.1 Create Admin User
Open terminal in `d:\BharatYatra\server`:

```bash
node scripts/createAdmin.js
```

Follow prompts to create admin account.

### 6.2 Login to Admin Panel
1. Go to: `https://bharatyatra-xxxx.vercel.app/admin/login`
2. Enter your admin credentials
3. You should see the admin dashboard

### 6.3 Upload Initial Data
1. In admin panel, go to **"Bulk Upload"**
2. Upload Excel files from `d:\BharatYatra\Data\` folder:
   - `States/BharatYatra_States.xlsx`
   - `Cities/Uttar_Pradesh_All_Cities_Updated.xlsx`
   - `Places/Agra_Places_Advanced_Format.xlsx`
   - `Foods/Agra_Foods.xlsx`
   - `Transports/Agra_Transport.xlsx`

---

## 🎉 Deployment Complete!

### Your Live URLs:
- **Frontend**: `https://bharatyatra-xxxx.vercel.app`
- **Backend API**: `https://bharatyatra-api.onrender.com`
- **Admin Panel**: `https://bharatyatra-xxxx.vercel.app/admin/login`

---

## 🌐 Add Custom Domain (Optional - FREE)

### For Frontend (Vercel):
1. Vercel Dashboard → Your project → **"Settings"** → **"Domains"**
2. Enter your domain: `bharatyatra.com`
3. Follow DNS configuration instructions
4. Add these records to your domain provider:
   - Type: `A` | Name: `@` | Value: `76.76.21.21`
   - Type: `CNAME` | Name: `www` | Value: `cname.vercel-dns.com`

### For Backend (Render):
1. Render Dashboard → Your service → **"Settings"** → **"Custom Domain"**
2. Enter: `api.bharatyatra.com`
3. Add CNAME record to your domain:
   - Type: `CNAME` | Name: `api` | Value: `bharatyatra-api.onrender.com`

**Cost**: FREE on both platforms! You only pay for the domain registration (~$10-15/year).

---

## 🔄 Future Updates

To deploy updates:

```bash
cd d:\BharatYatra
git add .
git commit -m "Your update message"
git push origin main
```

Both Vercel and Render will **auto-deploy** within 2-3 minutes!

---

## ⚠️ Important Notes

1. **Backend Cold Start**: First request after 15 min inactivity takes 30-60 seconds
2. **Free Tier Limits**:
   - Render: 750 hours/month (enough for 24/7)
   - Vercel: 100GB bandwidth/month
   - MongoDB: 512MB storage
3. **Security**: Your MongoDB credentials are visible in .env - consider rotating them
4. **Monitoring**: Check Render/Vercel dashboards for errors

---

## 🆘 Troubleshooting

### Issue: "CORS Error" in browser console
**Fix**: Verify `CLIENT_URL` in Render matches your Vercel URL exactly (no trailing slash)

### Issue: "Network Error" when calling API
**Fix**: Check `VITE_API_URL` in Vercel environment variables

### Issue: Backend shows "Disconnected" in health check
**Fix**: Verify MongoDB Atlas Network Access allows connections from anywhere (0.0.0.0/0)

### Issue: 404 on page refresh
**Fix**: `vercel.json` file should be in client folder (already added ✓)

### Issue: Admin login fails
**Fix**: Ensure you created admin user using `node scripts/createAdmin.js`

---

## 📊 Monitor Your App

- **Render Logs**: https://dashboard.render.com/ → Your service → "Logs"
- **Vercel Analytics**: https://vercel.com/dashboard → Your project → "Analytics"
- **MongoDB Metrics**: https://cloud.mongodb.com/ → Your cluster → "Metrics"

---

## 🚀 Next Steps After Deployment

1. ✅ Test all features (states, cities, places, foods)
2. ✅ Upload more data via admin panel
3. ✅ Share your live URL with friends/users
4. ✅ Monitor performance and errors
5. ✅ Consider adding custom domain
6. ✅ Add Google Analytics (optional)
7. ✅ Set up error monitoring (Sentry - optional)

---

**Total Deployment Time**: ~20 minutes
**Cost**: $0 (100% FREE)

**Made with ❤️ by Vishal for exploring Incredible India**

---

## 📞 Quick Links

- **GitHub Repo**: https://github.com/Vishal-Bhilwariya/BharatYatra
- **Render Dashboard**: https://dashboard.render.com/
- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://cloud.mongodb.com/

---

Good luck with your deployment! 🎉🇮🇳
