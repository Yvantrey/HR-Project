# Deployment Guide

This guide covers deploying both the frontend (React/Vite) and backend (Flask) components of the Employee Bridge application.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [Environment Variables](#environment-variables)
5. [Database Setup](#database-setup)
6. [Post-Deployment Checklist](#post-deployment-checklist)

---

## Prerequisites

- **Backend:**
  - Python 3.8+
  - MySQL database (local or cloud)
  - Python dependencies installed

- **Frontend:**
  - Node.js 20.19+ (or 22.12+)
  - npm or yarn

---

## Backend Deployment

### Option 1: PythonAnywhere (Current Setup)

1. **Create account:** Sign up at [pythonanywhere.com](https://www.pythonanywhere.com)

2. **Upload files:**
   - Use the Files tab to upload your `Backend` folder
   - Or use Git: `git clone <your-repo>`

3. **Set up virtual environment:**
   ```bash
   mkvirtualenv --python=/usr/bin/python3.9 myenv
   workon myenv
   pip install -r requirements.txt
   pip install fpdf python-dotenv
   ```

4. **Configure database:**
   - Use PythonAnywhere's MySQL database or external MySQL
   - Import schema: `mysql -u username -p database_name < hrdatabase.sql`

5. **Set environment variables:**
   - Create `.env` file in Backend directory:
   ```env
   DB_HOST=your-db-host
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
   DB_NAME=your-db-name
   JWT_SECRET=your-secret-key
   ```

6. **Configure Web App:**
   - Go to Web tab → Add a new web app
   - Select Flask and Python 3.9
   - Set source code path: `/home/username/mysite/Backend`
   - Set WSGI file: `/var/www/username_pythonanywhere_com_wsgi.py`
   - Edit WSGI file:
   ```python
   import sys
   path = '/home/username/mysite'
   if path not in sys.path:
       sys.path.append(path)
   
   from Backend.server import app as application
   ```

7. **Update CORS in server.py:**
   - Add your frontend domain to allowed origins:
   ```python
   CORS(app, resources={
       r"/api/*": {
           "origins": [
               "https://your-frontend-domain.vercel.app",
               "https://your-frontend-domain.netlify.app",
               # ... other origins
           ],
           "methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
           "allow_headers": ["Content-Type", "Authorization"]
       }
   })
   ```

8. **Reload web app** in PythonAnywhere dashboard

---

### Option 2: Railway

1. **Install Railway CLI:**
   ```bash
   npm i -g @railway/cli
   railway login
   ```

2. **Initialize project:**
   ```bash
   cd Backend
   railway init
   ```

3. **Set environment variables** in Railway dashboard:
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - `JWT_SECRET`
   - `FLASK_ENV=production`

4. **Deploy:**
   ```bash
   railway up
   ```

5. **Add MySQL service** in Railway dashboard and connect

---

### Option 3: Render

1. **Create new Web Service** on [render.com](https://render.com)

2. **Connect repository** or upload code

3. **Configure:**
   - **Build Command:** `pip install -r requirements.txt && pip install fpdf python-dotenv`
   - **Start Command:** `gunicorn server:app`
   - **Environment:** Python 3

4. **Add environment variables** (same as Railway)

5. **Add MySQL database** service and connect

---

### Option 4: Heroku

1. **Install Heroku CLI:**
   ```bash
   heroku login
   ```

2. **Create app:**
   ```bash
   cd Backend
   heroku create your-app-name
   ```

3. **Add buildpacks:**
   ```bash
   heroku buildpacks:add heroku/python
   ```

4. **Create Procfile:**
   ```
   web: gunicorn server:app
   ```

5. **Set environment variables:**
   ```bash
   heroku config:set DB_HOST=...
   heroku config:set DB_USER=...
   heroku config:set DB_PASSWORD=...
   heroku config:set DB_NAME=...
   heroku config:set JWT_SECRET=...
   ```

6. **Add MySQL addon:**
   ```bash
   heroku addons:create cleardb:ignite
   ```

7. **Deploy:**
   ```bash
   git push heroku main
   ```

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd /path/to/project/root
   vercel
   ```

3. **Or use Vercel Dashboard:**
   - Connect GitHub repository
   - Vercel auto-detects Vite
   - Set build command: `npm run build`
   - Set output directory: `dist`

4. **Set environment variables:**
   - In Vercel dashboard → Settings → Environment Variables
   - Add `VITE_API_URL=https://your-backend-url.com/api`

5. **Update apiClient.ts:**
   ```typescript
   const API_URL = import.meta.env.VITE_API_URL || 'https://manzi897098.pythonanywhere.com/api';
   ```

6. **Redeploy** after changes

---

### Option 2: Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   cd /path/to/project/root
   netlify deploy --prod
   ```

3. **Or use Netlify Dashboard:**
   - Connect repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

4. **Set environment variables:**
   - Site settings → Environment variables
   - Add `VITE_API_URL`

5. **Add netlify.toml:**
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

---

### Option 3: GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json:**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/your-repo-name"
   }
   ```

3. **Update vite.config.ts:**
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

---

## Environment Variables

### Backend (.env)
```env
# Database
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this

# Flask
FLASK_ENV=production
FLASK_DEBUG=False

# CORS (optional, if needed)
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-url.com/api
```

**Note:** For Vite, environment variables must be prefixed with `VITE_` to be exposed to the client.

---

## Database Setup

1. **Create MySQL database:**
   ```sql
   CREATE DATABASE hrdatabase;
   ```

2. **Import schema:**
   ```bash
   mysql -u username -p hrdatabase < Backend/hrdatabase.sql
   ```
   Or use:
   ```bash
   mysql -u username -p hrdatabase < src/database/realschema2.sql
   ```

3. **Verify tables:**
   ```sql
   USE hrdatabase;
   SHOW TABLES;
   ```

4. **For cloud databases (PlanetScale, AWS RDS, etc.):**
   - Create database instance
   - Get connection string
   - Update `DB_HOST` in backend `.env`
   - Import schema using MySQL client or admin panel

---

## Post-Deployment Checklist

### Backend
- [ ] Backend URL is accessible
- [ ] CORS is configured for frontend domain
- [ ] Database connection works
- [ ] Environment variables are set
- [ ] File uploads directory exists and is writable
- [ ] JWT authentication works
- [ ] API endpoints respond correctly

### Frontend
- [ ] Frontend builds without errors
- [ ] Environment variables are set
- [ ] API URL points to deployed backend
- [ ] All routes work (SPA routing)
- [ ] Authentication flow works
- [ ] Images/assets load correctly
- [ ] Dark/light mode works

### Testing
- [ ] Login with each role (Admin, Team Leader, Employee)
- [ ] Dashboard loads correctly
- [ ] API calls succeed
- [ ] File uploads work
- [ ] Notifications work
- [ ] PDF exports work

---

## Troubleshooting

### Backend Issues

**CORS Errors:**
- Add frontend domain to `CORS` origins in `server.py`
- Check `Access-Control-Allow-Origin` headers

**Database Connection:**
- Verify credentials in `.env`
- Check database host allows external connections
- Test connection with MySQL client

**File Uploads:**
- Ensure `uploads/` directory exists
- Check write permissions
- Verify file size limits

### Frontend Issues

**API Connection:**
- Verify `VITE_API_URL` is set correctly
- Check browser console for CORS errors
- Ensure backend is running

**Build Errors:**
- Clear `node_modules` and reinstall
- Check Node.js version (20.19+)
- Review build logs

**Routing Issues:**
- Ensure redirect rules are set (Vercel/Netlify)
- Check `vercel.json` or `netlify.toml` configuration

---

## Quick Deploy Commands

### Backend (PythonAnywhere)
```bash
cd Backend
# Upload files, then in PythonAnywhere:
workon myenv
pip install -r requirements.txt
# Configure web app, reload
```

### Frontend (Vercel)
```bash
npm run build
vercel --prod
```

### Frontend (Netlify)
```bash
npm run build
netlify deploy --prod
```

---

## Security Notes

1. **Never commit `.env` files** - Add to `.gitignore`
2. **Use strong JWT secrets** - Generate with: `python -c "import secrets; print(secrets.token_urlsafe(32))"`
3. **Enable HTTPS** - Most platforms do this automatically
4. **Set secure CORS origins** - Don't use `*` in production
5. **Database credentials** - Use strong passwords, limit access
6. **File uploads** - Validate file types and sizes

---

## Support

For issues specific to deployment platforms:
- **Vercel:** [vercel.com/docs](https://vercel.com/docs)
- **Netlify:** [docs.netlify.com](https://docs.netlify.com)
- **Railway:** [docs.railway.app](https://docs.railway.app)
- **Render:** [render.com/docs](https://render.com/docs)
- **PythonAnywhere:** [help.pythonanywhere.com](https://help.pythonanywhere.com)

