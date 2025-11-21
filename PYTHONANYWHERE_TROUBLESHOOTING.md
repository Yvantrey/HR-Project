# PythonAnywhere Troubleshooting Guide

If you're seeing an "Unhandled Exception" error on PythonAnywhere, follow these steps:

## Step 1: Check Error Logs

1. Go to PythonAnywhere Dashboard → **Web** tab
2. Click on your web app
3. Click on **Error log** link (usually `yvantrey.pythonanywhere.com.error.log`)
4. Copy the error message - this tells you exactly what's wrong

## Step 2: Common Issues & Fixes

### Issue 1: Missing Dependencies

**Symptom:** ImportError in logs (e.g., "No module named 'fpdf'")

**Fix:**
```bash
# In PythonAnywhere Bash console:
cd /home/yvantrey/mysite
workon your-venv-name  # or use virtualenv
cd Backend
pip install -r requirements.txt
pip install fpdf python-dotenv
```

### Issue 2: Database Connection Error

**Symptom:** Database connection error in logs

**Fix:**
1. Check your `.env` file in the `Backend` folder on PythonAnywhere
2. Make sure it has:
   ```env
   DB_HOST=yvantrey.mysql.pythonanywhere-services.com
   DB_USER=yvantrey
   DB_PASSWORD=your-actual-password-here
   DB_NAME=yvantrey$default
   DB_PORT=3306
   ```
3. **Important:** On PythonAnywhere, you need to use your MySQL password, not an empty password
4. To get your MySQL password:
   - Go to PythonAnywhere Dashboard → **Databases** tab
   - Your MySQL password is shown there

### Issue 3: WSGI Configuration Error

**Symptom:** "No module named 'Backend'" or import errors

**Fix:**
1. Go to PythonAnywhere Dashboard → **Web** tab
2. Click on **WSGI configuration file** link
3. Make sure it looks like this:
   ```python
   import sys
   path = '/home/yvantrey/mysite'
   if path not in sys.path:
       sys.path.append(path)
   
   from Backend.server import app as application
   ```
4. **Important:** Replace `yvantrey` with your actual PythonAnywhere username if different

### Issue 4: File Path Issues

**Symptom:** Permission errors or folder creation errors

**Fix:**
1. Make sure the `uploads` folder exists:
   ```bash
   cd /home/yvantrey/mysite/Backend
   mkdir -p uploads/cvs
   mkdir -p uploads/quiz_submissions
   mkdir -p uploads/quizzes
   mkdir -p uploads/task_documents
   ```

### Issue 5: Python Version Mismatch

**Symptom:** Syntax errors or version incompatibility

**Fix:**
1. Check Python version in Web tab (should be Python 3.9 or 3.10)
2. Make sure your virtual environment uses the same version:
   ```bash
   mkvirtualenv --python=/usr/bin/python3.9 your-venv-name
   ```

### Issue 6: CORS Issues

**Symptom:** Works locally but not from frontend

**Fix:**
1. Update `server.py` to add your frontend domain to CORS origins
2. After updating, reload the web app in PythonAnywhere dashboard

## Step 3: Test Your Setup

1. **Test the health check endpoint:**
   - Visit: `https://yvantrey.pythonanywhere.com/api/health`
   - Should return: `{"status": "healthy", "database": "connected", ...}`

2. **Test database connection:**
   ```bash
   # In PythonAnywhere Bash console:
   python3
   >>> from Backend.server import get_db_connection
   >>> conn = get_db_connection()
   >>> print("Database connected!")
   >>> conn.close()
   ```

## Step 4: Reload Web App

After making any changes:
1. Go to PythonAnywhere Dashboard → **Web** tab
2. Click the big green **Reload** button
3. Wait a few seconds
4. Try accessing your site again

## Step 5: Still Not Working?

1. Check the error log again (see Step 1)
2. Copy the full error message
3. Common fixes based on error:
   - **ModuleNotFoundError**: Install missing package
   - **Database error**: Check `.env` file and credentials
   - **Permission denied**: Check file/folder permissions
   - **ImportError**: Check WSGI file configuration

## Quick Checklist

- [ ] All dependencies installed in virtual environment
- [ ] `.env` file exists with correct database credentials
- [ ] `uploads` folder and subfolders exist and are writable
- [ ] WSGI file is correctly configured
- [ ] Python version matches (3.9 or 3.10)
- [ ] Web app has been reloaded after changes
- [ ] Error log has been checked for specific errors

## Need More Help?

1. Check error log: `yvantrey.pythonanywhere.com.error.log`
2. Check server log: `yvantrey.pythonanywhere.com.server.log`
3. Contact PythonAnywhere support with error log content

