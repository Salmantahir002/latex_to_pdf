#!/bin/bash

# 🚀 LaTeX to PDF Converter - Deployment Script
# This script helps you deploy your project to Netlify

echo "🚀 LaTeX to PDF Converter - Deployment Helper"
echo "=========================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: LaTeX to PDF Converter with all features"
    echo "✅ Git repository initialized!"
else
    echo "✅ Git repository already exists"
fi

# Check if remote is set
if ! git remote get-url origin > /dev/null 2>&1; then
    echo ""
    echo "🌐 Next Steps:"
    echo "1. Create a new repository on GitHub: https://github.com/new"
    echo "2. Name it: latex-pdf-converter"
    echo "3. Run this command (replace YOUR_USERNAME):"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/latex-pdf-converter.git"
    echo "4. Push to GitHub:"
    echo "   git push -u origin main"
    echo ""
    echo "🌐 Then deploy to Netlify: https://app.netlify.com/drop"
    echo "📁 Upload the 'out' folder after running: npm run build"
else
    echo "✅ Git remote already configured"
    echo "🔄 To push latest changes: git push origin main"
fi

echo ""
echo "📋 Build Command:"
echo "   npm run build"
echo ""
echo "📁 Output Directory:"
echo "   out/"
echo ""
echo "⚙️  Netlify Build Settings:"
echo "   Build command: npm run build"
echo "   Publish directory: out"
echo "   Node version: 18"
echo ""
echo "📖 For detailed instructions, see: DEPLOYMENT.md"
echo ""
echo "🎉 Ready for deployment!"