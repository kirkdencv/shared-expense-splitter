#!/bin/bash

echo "Starting Shared Expense Splitter Development Environment"
echo ""

echo "Checking environment..."
cd server
if [ ! -f .env ]; then
    echo "ERROR: .env file not found! Please create one based on .env.example"
    echo "NOTE: Copy .env.example to .env and update with your values"
    read -p "Press any key to exit..."
    exit 1
fi
echo "Environment file found"

echo "Step 1: Installing dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Server dependency installation failed"
    read -p "Press any key to exit..."
    exit 1
fi

cd ../client
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Client dependency installation failed"
    read -p "Press any key to exit..."
    exit 1
fi

echo ""
echo "Step 2: Starting the backend server with auto-restart..."
cd ../server
osascript -e 'tell app "Terminal" to do script "cd '$(pwd)' && node start.js"' &

echo ""
echo "Waiting 5 seconds for server to establish connection..."
sleep 5

echo ""
echo "Step 3: Testing environment setup..."
node test-setup.js
echo ""
echo "Step 4: Testing API endpoints..."
node test-api.js

echo ""
echo "Step 5: Starting the frontend..."
cd ../client
osascript -e 'tell app "Terminal" to do script "cd '$(pwd)' && npm run dev"' &

echo ""
echo "Step 6: Opening browser windows..."
sleep 2
open http://localhost:3000
open http://localhost:5173

echo ""
echo "Development environment is ready!"
echo ""
echo "Server: http://localhost:3000 (Auto-Restart Enabled)"
echo "Client: http://localhost:5173"
echo "API Tests: Available in server directory"
echo ""
echo "The server will automatically restart if database connection fails."
echo "Press any key to exit this setup script..."
read -p ""
