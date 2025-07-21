@echo off
echo 🚀 Starting Shared Expense Splitter Development Environment
echo.

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
start "Expense Splitter Server" powershell -NoExit -Command "Set-Location '%CD%'; npm start"

echo.
echo ⏳ Waiting 3 seconds for server to start...
timeout /t 3 /nobreak >nul

echo.
echo ✅ Step 3: Testing API endpoints...
node test-api.js

echo.
echo ✅ Step 4: Starting the frontend...
cd ../client
start "Expense Splitter Client" powershell -NoExit -Command "Set-Location '%CD%'; npm run dev"

echo.
echo 🎉 Development environment is ready!
echo.
echo 📍 Server: http://localhost:3000
echo 📍 Client: http://localhost:5173
echo.
echo Press any key to exit this setup script...
pause >nul
