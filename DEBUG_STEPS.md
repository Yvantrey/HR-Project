# Debug Steps - Still Getting "Not Found"

## Step 1: Check if Updated server.py is Uploaded

Make sure you've uploaded the updated `server.py` file to PythonAnywhere:

1. Go to PythonAnywhere Dashboard → **Files** tab
2. Navigate to `/home/YvanTrey/HR-Project/Backend/`
3. Check if `server.py` is there
4. **If not uploaded:** Upload the updated `server.py` file from your local machine

## Step 2: Check Error Logs Again

1. Go to **Web** tab → Click your web app
2. Click on **Error log** (`yvantrey.pythonanywhere.com.error.log`)
3. **Copy the latest error** (scroll to the bottom)
4. Share the error message

## Step 3: Verify WSGI File

1. Go to **Web** tab → Click **WSGI configuration file** link
2. Make sure it says:
   ```python
   import sys
   
   path = '/home/YvanTrey/HR-Project'
   if path not in sys.path:
       sys.path.append(path)
   
   from Backend.server import app as application
   ```
3. **Save** if you made changes

## Step 4: Verify File Paths

1. Go to **Web** tab → Check your web app settings:
   - **Source code:** `/home/YvanTrey/HR-Project/Backend` ✅
   - **Working directory:** `/home/YvanTrey/HR-Project/Backend` (or `/home/YvanTrey/`)
   - **Python version:** Should be 3.9 or 3.10 (NOT 3.13)

## Step 5: Reload Web App

After any changes:
1. Go to **Web** tab
2. Click the big green **Reload** button
3. Wait 10-15 seconds
4. Try accessing the site again

## Step 6: Test API Endpoint Directly

Try these URLs in your browser:

1. **Root URL:** `https://yvantrey.pythonanywhere.com/`
   - Should show JSON with API info

2. **Health check:** `https://yvantrey.pythonanywhere.com/api/health`
   - Should show database connection status

If both show "Not Found", the app isn't loading properly.
If one works but not the other, there's a routing issue.

---

## Quick Checklist

- [ ] Updated `server.py` uploaded to PythonAnywhere
- [ ] WSGI file is correct (imports from `Backend.server`)
- [ ] Python version is 3.9 or 3.10 (not 3.13)
- [ ] Web app has been reloaded after changes
- [ ] Error log checked for new errors
- [ ] Source code path is correct

---

**What error are you seeing exactly?**
- "Not Found" on the root URL `/`?
- "Not Found" on `/api/health`?
- Or still getting "Unhandled Exception"?

