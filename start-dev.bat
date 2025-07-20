@echo off
echo 🚀 Starting Shared Expense Splitter Development Environment
echo.

echo 🔍 Checking environment...
cd server
if not exist .env (
    echo ❌ .env file not found! Please create one based on .env.example
    echo 💡 Copy .env.example to .env and update with your values
    pause
    exit /b 1
)
echo ✅ Environment file found

echo ✅ Step 1: Installing dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo ❌ Server dependency installation failed
    pause
    exit /b 1
)

cd ../client
call npm install
if %errorlevel% neq 0 (
    echo ❌ Client dependency installation failed
    pause
    exit /b 1
)

echo.
echo ✅ Step 2: Starting the backend server...
cd ../server
start "Expense Splitter Server" cmd /k "cd /d %CD% && npm start"

echo.
echo ⏳ Waiting 3 seconds for server to start...
timeout /t 3 /nobreak >nul

echo.
echo ✅ Step 3: Testing environment setup...
node test-setup.js
echo.
echo ✅ Step 4: Testing API endpoints...
node test-api.js

echo.
echo ✅ Step 5: Starting the frontend...
cd ../client
start "Expense Splitter Client" cmd /k "cd /d %CD% && npm run dev"

echo.
echo ✅ Step 6: Opening browser windows...
timeout /t 2 /nobreak >nul
start http://localhost:3000
start http://localhost:5173

echo.
echo 🎉 Development environment is ready!
echo.
echo 📍 Server: http://localhost:3000
echo 📍 Client: http://localhost:5173
echo 📍 API Tests: Available in server directory
echo.
echo Press any key to exit this setup script...
pause >nul
