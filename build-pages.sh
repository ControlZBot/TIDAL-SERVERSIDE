#!/bin/bash

# Build script for GitHub Pages deployment
echo "🚀 Building Tidal Serverside website for GitHub Pages..."

# Build the React app
echo "📦 Building React application..."
NODE_ENV=production vite build --outDir=client/docs

# Copy built files to root
echo "📁 Copying files to root directory..."
cp -r client/docs/* .

# Update asset paths for GitHub Pages
echo "🔧 Updating asset paths..."
# This is already done in the current index.html

# Clean up
echo "🧹 Cleaning up..."
rm -rf client/docs

echo "✅ Build complete! Your GitHub Pages site is ready."
echo "📝 Next steps:"
echo "   1. Commit and push your changes"
echo "   2. Go to your GitHub repository settings"
echo "   3. Enable GitHub Pages from the main branch"
echo "   4. Your site will be available at: https://controlzbot.github.io/ControlZBot.github.io-TIDAL-SS/"