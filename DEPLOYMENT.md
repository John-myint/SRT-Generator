# 🚀 Deployment Guide

Step-by-step instructions to deploy your SRT Generator for free.

---

## 📋 Prerequisites

- A GitHub account (free)
- Git installed on your computer
- Your completed SRT Generator project

---

## Method 1: GitHub Pages (Easiest & Recommended)

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com)
2. Click the **+** icon → **New repository**
3. Repository name: `srt-generator` (or any name you prefer)
4. Description: "Free client-side SRT subtitle generator"
5. Choose **Public** (required for free GitHub Pages)
6. **Do NOT** initialize with README (we already have one)
7. Click **Create repository**

### Step 2: Push Your Code to GitHub

Open a terminal in your project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: SRT Generator v1.0"

# Add GitHub remote (replace YOUR-USERNAME and REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/srt-generator.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down and click **Pages** (left sidebar)
4. Under **Source**:
   - Branch: Select `main`
   - Folder: Select `/ (root)`
5. Click **Save**

### Step 4: Access Your Live Site

- GitHub will show a green box with your URL
- Format: `https://YOUR-USERNAME.github.io/srt-generator/`
- Wait 1-2 minutes for deployment
- Visit the URL - your app is live! 🎉

### Updating Your Site

Whenever you make changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

GitHub Pages will automatically redeploy (takes 1-2 minutes).

---

## Method 2: Cloudflare Pages

### Step 1: Sign Up

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Sign up for free account
3. Verify your email

### Step 2: Create a Project

1. Click **Create a project**
2. Click **Connect to Git**
3. Authorize Cloudflare to access GitHub
4. Select your `srt-generator` repository

### Step 3: Configure Build

- **Project name**: srt-generator
- **Production branch**: main
- **Framework preset**: None
- **Build command**: (leave empty)
- **Build output directory**: `/`

### Step 4: Deploy

1. Click **Save and Deploy**
2. Wait 1-2 minutes
3. Your site will be live at: `srt-generator.pages.dev`
4. Optional: Add custom domain in settings

### Benefits of Cloudflare Pages

- ✅ Global CDN (faster worldwide)
- ✅ Unlimited bandwidth
- ✅ Automatic HTTPS
- ✅ Preview deployments for branches
- ✅ Free custom domains

---

## Method 3: Netlify

### Step 1: Sign Up

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Authorize Netlify

### Step 2: Create New Site

1. Click **Add new site** → **Import an existing project**
2. Click **GitHub**
3. Find and select your `srt-generator` repository

### Step 3: Configure Build

- **Branch to deploy**: main
- **Build command**: (leave empty)
- **Publish directory**: `/` (or leave empty)

### Step 4: Deploy

1. Click **Deploy site**
2. Wait 30-60 seconds
3. Your site is live at: `random-name.netlify.app`
4. Optional: Change site name in settings

### Benefits of Netlify

- ✅ Instant cache invalidation
- ✅ Deploy previews for pull requests
- ✅ Form handling (if needed later)
- ✅ Serverless functions (if needed later)
- ✅ Free SSL certificates

---

## Method 4: Vercel

### Step 1: Sign Up

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Authorize Vercel

### Step 2: Import Project

1. Click **Add New** → **Project**
2. Import your `srt-generator` repository
3. Click **Import**

### Step 3: Configure

- **Framework Preset**: Other
- **Root Directory**: ./
- **Build Command**: (leave empty)
- **Output Directory**: (leave empty)

### Step 4: Deploy

1. Click **Deploy**
2. Wait 30-60 seconds
3. Your site is live at: `srt-generator.vercel.app`

---

## Method 5: Local Testing

For development and testing locally:

### Option A: Python HTTP Server

```bash
# Navigate to project folder
cd "C:\Users\KG\Desktop\Projects\SRT Generator"

# Start server (Python 3)
python -m http.server 8000

# Open browser
# Visit: http://localhost:8000
```

### Option B: Node.js Serve

```bash
# Install serve globally (one-time)
npm install -g serve

# Navigate to project folder
cd "C:\Users\KG\Desktop\Projects\SRT Generator"

# Start server
serve

# Open browser to the URL shown (usually http://localhost:3000)
```

### Option C: VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Open project folder in VS Code
3. Right-click `index.html`
4. Select "Open with Live Server"
5. Browser opens automatically

---

## 🔧 Troubleshooting

### Issue: Site shows 404 error

**Solution**: 
- Check that GitHub Pages is enabled
- Verify branch name is correct (`main`)
- Wait a few more minutes for deployment
- Clear browser cache

### Issue: JavaScript not working

**Solution**:
- Check browser console (F12) for errors
- Ensure you're using Chrome or Edge
- Verify all files are uploaded correctly
- Check file paths are relative (no absolute paths)

### Issue: Icons not showing

**Solution**:
- Check internet connection (Lucide icons load from CDN)
- Wait for page to fully load
- Check browser console for loading errors

### Issue: Speech recognition not working

**Solution**:
- Use Chrome or Edge browser
- Grant microphone permissions when prompted
- Check that audio file is valid format
- Try with a smaller audio file first

---

## ✅ Deployment Checklist

Before deploying, make sure:

- [ ] All files are committed to git
- [ ] `index.html` is in root directory
- [ ] All file paths are relative (no `C:\` or absolute paths)
- [ ] External resources use HTTPS (CDN links)
- [ ] No API keys or secrets in code
- [ ] README.md has correct information
- [ ] LICENSE file is included
- [ ] Test locally first
- [ ] Repository is public (for GitHub Pages)

---

## 🌐 Custom Domain (Optional)

### GitHub Pages with Custom Domain

1. Buy a domain (Namecheap, Google Domains, etc.)
2. In repository settings → Pages
3. Add your domain in "Custom domain" field
4. In your domain DNS settings, add:
   - Type: `CNAME`
   - Name: `www` or `@`
   - Value: `YOUR-USERNAME.github.io`
5. Wait for DNS propagation (up to 48 hours)

### Cloudflare Pages with Custom Domain

1. In Cloudflare Pages project
2. Go to "Custom domains" tab
3. Click "Set up a custom domain"
4. Follow the instructions
5. Cloudflare automatically handles DNS

---

## 📊 Analytics (Optional)

Add free analytics to track visitors:

### Google Analytics (Free)

1. Create Google Analytics account
2. Get tracking ID
3. Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

### Plausible Analytics (Privacy-Friendly)

1. Sign up at plausible.io (paid after trial, or self-host for free)
2. Add to `index.html`:

```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## 🔒 Security Best Practices

- ✅ Use HTTPS (automatic with GitHub Pages, Netlify, Cloudflare)
- ✅ No sensitive data in client-side code
- ✅ No API keys exposed
- ✅ Content Security Policy headers (automatic on most platforms)
- ✅ Regular dependency updates (fonts, icons)

---

## 📈 Performance Optimization

### Already Optimized

- Pure vanilla JavaScript (no heavy frameworks)
- Minimal external dependencies
- CDN-hosted resources (Google Fonts, Lucide Icons)
- CSS variables for theming (no JS needed)

### Optional Improvements

1. **Lazy Load Icons**: Load icons only when needed
2. **Service Worker**: Enable offline functionality
3. **Compress Assets**: Minify CSS/JS for production
4. **Image Optimization**: If you add images, compress them

---

## 🎉 You're Live!

Congratulations! Your SRT Generator is now accessible to anyone in the world.

**Share your creation:**
- Tweet about it
- Share on Reddit
- Post on LinkedIn
- Add to Product Hunt
- Submit to awesome lists on GitHub

**Next Steps:**
- Monitor usage with analytics
- Collect user feedback
- Add new features
- Fix bugs
- Update documentation

---

**Questions?** Open an issue on GitHub or check the [README.md](README.md) for more information.
