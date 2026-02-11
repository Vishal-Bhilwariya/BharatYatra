# 🚀 BharatYatra Deployment Guide

## 📋 Pre-Deployment Checklist

✅ Files Updated:
- `server/server.js` - Dynamic CORS configuration
- `client/src/api/api.jsx` - Environment-based API URL
- `.env.example` files created for both frontend and backend
- `vercel.json` files created for deployment
- `_redirects` file for Netlify option

## 🎯 Recommended Deployment Stack

**Frontend**: Vercel (Free tier, automatic deployments)
**Backend**: Render (Free tier, 750 hours/month)
**Database**: MongoDB Atlas (Already configured ✓)

---

## 🔧 Backend Deployment (Render)

### Step 1: Push Code to GitHub
```bash
cd d:\BharatYatra
git init
git add .
git commit -m "Initial commit - Ready for deployment"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy on Render

1. **Sign up**: Go to [render.com](https://render.com) and sign up with GitHub
2. **New Web Service**: Click "New +" → "Web Service"
3. **Connect Repository**: Select your BharatYatra repository
4. **Configure**:
   - **Name**: `bharatyatra-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

5. **Environment Variables** (Click "Advanced" → "Add Environment Variable"):
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://bharatYatra:bharatYatra90@bharatyatra.9v7edjt.mongodb.net/bharatyatra?retryWrites=true&w=majority
   JWT_SECRET=supersecretkey
   NODE_ENV=production
   CLIENT_URL=https://your-frontend-url.vercel.app
   ```
   
   ⚠️ **IMPORTANT**: Update `CLIENT_URL` after deploying frontend

6. **Deploy**: Click "Create Web Service"
7. **Copy URL**: Save your backend URL (e.g., `https://bharatyatra-backend.onrender.com`)

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Update Environment Variable

Create `client/.env.production`:
```env
VITE_API_URL=https://bharatyatra-backend.onrender.com/api
```

Replace with your actual Render backend URL.

### Step 2: Deploy on Vercel

1. **Sign up**: Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. **Import Project**: Click "Add New" → "Project"
3. **Import Repository**: Select your BharatYatra repository
4. **Configure**:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Environment Variables**:
   ```
   VITE_API_URL=https://bharatyatra-backend.onrender.com/api
   ```

6. **Deploy**: Click "Deploy"
7. **Copy URL**: Save your frontend URL (e.g., `https://bharatyatra.vercel.app`)

### Step 3: Update Backend CORS

Go back to Render dashboard:
1. Navigate to your backend service
2. Go to "Environment" tab
3. Update `CLIENT_URL` variable:
   ```
   CLIENT_URL=https://bharatyatra.vercel.app
   ```
4. Save changes (service will auto-redeploy)

---

## 🔄 Alternative: Deploy Backend on Vercel

If you prefer to deploy both on Vercel:

### Backend on Vercel

1. **Import Project**: Import repository again
2. **Configure**:
   - **Root Directory**: `server`
   - **Framework Preset**: Other
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty

3. **Environment Variables**: Same as Render setup

4. **Deploy**: Your backend will be at `https://bharatyatra-backend.vercel.app`

⚠️ **Note**: Vercel has 10-second timeout for serverless functions. For long-running operations, use Render.

---

## 🌐 Alternative: Deploy Frontend on Netlify

### Netlify Deployment

1. **Sign up**: Go to [netlify.com](https://netlify.com)
2. **Import Project**: "Add new site" → "Import an existing project"
3. **Configure**:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`

4. **Environment Variables**:
   ```
   VITE_API_URL=https://bharatyatra-backend.onrender.com/api
   ```

5. **Deploy**: Click "Deploy site"

---

## 🔐 Security Checklist

Before going live:

1. **Update JWT Secret**:
   ```bash
   # Generate strong secret
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
   Update in Render environment variables

2. **MongoDB Security**:
   - Go to MongoDB Atlas → Network Access
   - Remove `0.0.0.0/0` if present
   - Add Render's IP addresses or use `0.0.0.0/0` for serverless

3. **Environment Variables**:
   - Never commit `.env` files
   - Verify all secrets are in platform dashboards

4. **CORS Configuration**:
   - Ensure `CLIENT_URL` matches your frontend domain exactly
   - No trailing slashes

---

## 🧪 Testing Deployment

### Test Backend
```bash
curl https://bharatyatra-backend.onrender.com/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "mongodb": "Connected"
}
```

### Test Frontend
1. Visit your Vercel URL
2. Check browser console for errors
3. Test API calls (states, cities, etc.)
4. Verify admin login works

---

## 📊 Post-Deployment Tasks

### 1. Create Admin User
```bash
# SSH into Render (if using Render)
# Or run locally and it will create in production DB
cd server
node scripts/createAdmin.js
```

### 2. Upload Initial Data
- Login to admin panel: `https://your-frontend-url.vercel.app/admin/login`
- Use bulk upload feature with Excel files from `Data/` folder

### 3. Monitor Performance
- **Render**: Dashboard → Metrics
- **Vercel**: Dashboard → Analytics
- **MongoDB**: Atlas → Metrics

---

## 🐛 Common Issues & Solutions

### Issue: CORS Error
**Solution**: Verify `CLIENT_URL` in backend matches frontend URL exactly

### Issue: API calls fail
**Solution**: Check `VITE_API_URL` in frontend environment variables

### Issue: MongoDB connection fails
**Solution**: 
- Check MongoDB Atlas Network Access
- Verify connection string in `MONGO_URI`

### Issue: 404 on page refresh
**Solution**: Ensure `vercel.json` or `_redirects` file exists in frontend

### Issue: Render service sleeping (free tier)
**Solution**: 
- First request takes 30-60 seconds (cold start)
- Consider upgrading to paid tier for always-on service
- Or use cron-job.org to ping your backend every 10 minutes

---

## 🔄 Continuous Deployment

Both Vercel and Render support automatic deployments:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```

2. **Auto-Deploy**: Both platforms will automatically detect changes and redeploy

---

## 📈 Scaling Considerations

### Free Tier Limits
- **Render**: 750 hours/month, sleeps after 15 min inactivity
- **Vercel**: 100GB bandwidth, 100 serverless function invocations/day
- **MongoDB Atlas**: 512MB storage

### When to Upgrade
- High traffic (>10k requests/day)
- Need always-on backend
- Require more database storage
- Need faster build times

---

## 📞 Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com

---

## ✅ Deployment Complete!

Your BharatYatra platform is now live! 🎉

**Frontend**: https://bharatyatra.vercel.app
**Backend**: https://bharatyatra-backend.onrender.com
**Admin Panel**: https://bharatyatra.vercel.app/admin/login

---

**Made with ❤️ for exploring Incredible India**
