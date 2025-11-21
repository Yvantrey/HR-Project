# How to Install Missing Packages on PythonAnywhere

## Step-by-Step Guide

### Step 1: Open Bash Console

1. Go to PythonAnywhere Dashboard
2. Click on **Consoles** tab (at the top)
3. Click **Bash** button (or "Open Bash console here" if you're in Files)

### Step 2: Navigate to Your Project

```bash
cd /home/YvanTrey/HR-Project/Backend
```

### Step 3: Activate Virtual Environment

**Option A: If you have a virtualenv (recommended)**
```bash
workon your-venv-name
```

**Option B: If you don't have one yet, create it first:**
```bash
# Create virtualenv with Python 3.9 (same version as your web app)
mkvirtualenv --python=/usr/bin/python3.9 hr-project-env

# Then activate it
workon hr-project-env
```

**To check if you have virtualenvs:**
```bash
lsvirtualenv
```

### Step 4: Install Packages

**Option A: Install from requirements.txt (recommended)**
```bash
cd /home/YvanTrey/HR-Project/Backend
pip install -r requirements.txt
```

**Option B: Install packages individually**
```bash
pip install Flask==2.0.1
pip install Flask-CORS==3.0.10
pip install mysql-connector-python==8.0.26
pip install PyJWT==2.3.0
pip install python-dotenv==0.19.0
pip install Werkzeug==2.0.1
pip install fpdf
```

### Step 5: Verify Installation

```bash
pip list
```

You should see all your packages listed.

---

## Important Notes

### 1. **Make sure your virtualenv Python version matches your web app**
- If your web app uses Python 3.9, use Python 3.9 for virtualenv
- If your web app uses Python 3.10, use Python 3.10 for virtualenv

### 2. **Activate virtualenv EVERY TIME**
- Before running `pip install`, always run `workon your-venv-name`
- This ensures packages install in the correct environment

### 3. **Configure Web App to Use Virtualenv**
In PythonAnywhere Web tab:
- Find **"Virtualenv"** section
- Enter your virtualenv path, for example:
  ```
  /home/YvanTrey/.virtualenvs/hr-project-env
  ```
  Or:
  ```
  /home/YvanTrey/.virtualenvs/your-venv-name
  ```

### 4. **After Installing Packages**
- **Reload** your web app (green button in Web tab)
- This ensures the web app picks up the new packages

---

## Quick Commands Summary

```bash
# Navigate to project
cd /home/YvanTrey/HR-Project/Backend

# Activate virtualenv
workon hr-project-env

# Install all packages
pip install -r requirements.txt

# Or install individually if needed
pip install fpdf python-dotenv

# Check what's installed
pip list
```

---

## Troubleshooting

### "Command not found: workon"
- You might need to use `source` instead:
  ```bash
  source ~/.virtualenvs/hr-project-env/bin/activate
  ```

### "Permission denied"
- Make sure you're using a virtualenv, not system Python
- Don't use `sudo pip install` on PythonAnywhere

### "Package not found after installation"
- Make sure virtualenv is activated
- Make sure web app is configured to use that virtualenv
- Reload web app after installing

### "ModuleNotFoundError" persists
- Verify package is installed: `pip list | grep package-name`
- Check virtualenv path in Web app settings
- Reload web app

---

## Your Required Packages (from requirements.txt)

- Flask==2.0.1
- Flask-CORS==3.0.10
- mysql-connector-python==8.0.26
- PyJWT==2.3.0
- python-dotenv==0.19.0
- Werkzeug==2.0.1
- fpdf (latest version)

