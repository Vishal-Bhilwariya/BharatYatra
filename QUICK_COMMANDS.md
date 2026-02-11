# 🚀 Quick Commands - Copy & Paste

## 1️⃣ Push to GitHub

```bash
cd d:\BharatYatra
git init
git add .
git commit -m "Initial commit - BharatYatra ready for deployment"
git branch -M main
git remote add origin https://github.com/Vishal-Bhilwariya/BharatYatra.git
git push -u origin main
```

---

## 2️⃣ Render Configuration

**Root Directory**: `server`
**Build Command**: `npm install`
**Start Command**: `npm start`

**Environment Variables** (copy each line):
```
PORT=5000
MONGO_URI=mongodb+srv://bharatYatra:bharatYatra90@bharatyatra.9v7edjt.mongodb.net/bharatyatra?retryWrites=true&w=majority
JWT_SECRET=supersecretkey
NODE_ENV=production
CLIENT_URL=https://bharatyatra.vercel.app
```

---

## 3️⃣ Vercel Configuration

**Root Directory**: `client`
**Framework**: Vite
**Build Command**: `npm run build`
**Output Directory**: `dist`

**Environment Variable**:
```
VITE_API_URL=https://bharatyatra-api.onrender.com/api
```

---

## 4️⃣ Create Admin User

```bash
cd d:\BharatYatra\server
node scripts/createAdmin.js
```

---

## 5️⃣ Future Updates

```bash
cd d:\BharatYatra
git add .
git commit -m "Update: your message here"
git push origin main
```

---

## 📝 URLs to Save

After deployment, save these:

- **Frontend**: ___________________________________
- **Backend**: ___________________________________
- **Admin Panel**: ___________________________________

---

## ✅ Deployment Checklist

- [ ] Create GitHub repo: BharatYatra
- [ ] Push code to GitHub
- [ ] Deploy backend on Render
- [ ] Deploy frontend on Vercel
- [ ] Update CLIENT_URL in Render
- [ ] Test backend health endpoint
- [ ] Test frontend homepage
- [ ] Create admin user
- [ ] Login to admin panel
- [ ] Upload initial data

**Total Time**: ~20 minutes
