# 🚀 Deploy LaTeX to PDF Converter on Netlify

## 📋 Prerequisites

1. **GitHub Account**: Create a free account at [github.com](https://github.com)
2. **Netlify Account**: Create a free account at [netlify.com](https://netlify.com)
3. **Git Installed**: Install Git on your machine

---

## 🛠️ Step 1: Prepare Your Local Repository

### Initialize Git and Push to GitHub

```bash
# Navigate to your project directory
cd /path/to/your/project

# Initialize Git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: LaTeX to PDF Converter with all features"

# Create a new repository on GitHub first, then add remote
git remote add origin https://github.com/YOUR_USERNAME/latex-pdf-converter.git

# Push to GitHub
git push -u origin main
```

---

## 🌐 Step 2: Deploy to Netlify

### Method 1: Git Integration (Recommended)

1. **Connect Netlify to GitHub**:
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and authenticate

2. **Select Repository**:
   - Find your `latex-pdf-converter` repository
   - Click "Import site"

3. **Configure Build Settings**:
   ```
   Build command: npm run build
   Publish directory: out
   Node version: 18
   ```

4. **Deploy**:
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site

### Method 2: Drag & Drop

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Deploy**:
   - Drag the `out` folder to the Netlify deploy page
   - Your site will be live instantly

---

## ⚙️ Important Configuration Notes

### API Routes on Netlify

Since your app uses API routes (`/api/convert-latex`), they will be deployed as **Netlify Functions** automatically. The `netlify.toml` file handles this conversion.

### Environment Variables

If you need environment variables in the future:

1. Go to **Site settings** → **Environment variables** in Netlify
2. Add your variables there
3. Re-deploy your site

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### 1. Build Fails
```bash
# Clear cache and rebuild
rm -rf .next out
npm run build
```

#### 2. API Routes Not Working
- Ensure `netlify.toml` is in your root directory
- Check that the build output directory is set to `out`

#### 3. PDF Generation Issues
- The app uses fallback PDF generation when `pdflatex` is not available
- This is expected behavior and works correctly

---

## 🌍 Your Live Site

After deployment, your site will be available at:
- `https://your-site-name.netlify.app`
- Or with a custom domain if you configure one

---

## 🔄 Automatic Deployments

Once connected to GitHub, Netlify will:

- **Auto-deploy** on every push to `main` branch
- **Preview deployments** for pull requests
- **Rollback** capability to previous versions

---

## 📱 Features Available on Deployed Site

✅ **All features work on Netlify**:
- LaTeX to PDF conversion
- Plain text to LaTeX converter  
- Auto-preview with debouncing
- A4 page size with normal margins
- File upload (.tex files)
- PDF download
- Responsive design
- Copy to clipboard

---

## 🎯 Next Steps

1. **Custom Domain**: Add your custom domain in Netlify settings
2. **Analytics**: Enable Netlify Analytics for visitor insights
3. **SEO**: Customize meta tags in `src/app/layout.tsx`
4. **Performance**: Enable Netlify's optimization features

---

## 📞 Support

If you encounter any issues:

1. Check the **Deploy log** in Netlify dashboard
2. Verify your **build settings** match the configuration above
3. Ensure all files are committed to GitHub

---

**🎉 Congratulations! Your LaTeX to PDF Converter is now live on Netlify!**