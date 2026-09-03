#!/bin/bash

# Deployment script for BAYPEDIA Hub
# Usage: ./deploy.sh [vercel|railway|all]

TYPE=${1:-all}

echo "🚀 Starting BAYPEDIA Deployment Workflow..."

# 1. Clean & Build Frontend
echo "📦 Building Frontend Assets..."
npm run build:frontend

if [ "$TYPE" == "vercel" ] || [ "$TYPE" == "all" ]; then
    echo "⚡ Deploying Frontend to Vercel..."
    # vercel --prod
    echo "Check: https://vercel.com/dashboard"
fi

if [ "$TYPE" == "railway" ] || [ "$TYPE" == "all" ]; then
    echo "🚂 Deploying Backend to Railway..."
    # railway up
    echo "Check: https://railway.app/dashboard"
fi

echo "✅ Workflow complete!"
