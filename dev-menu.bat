@echo off
title Shared Expense Splitter - Developer Menu

:menu
cls
echo.
echo ==========================================
echo   Shared Expense Splitter Dev Menu
echo ==========================================
echo.
echo 1. Full Setup (Install + Start Everything)
echo 2. Quick Start (Skip Install)
echo 3. Server Only (Auto-Restart)
echo 4. Server Only (Regular Start)
echo 5. Client Only  
echo 6. Test API Only
echo 7. Reset Environment (Clean Install)
echo 8. Exit
echo.
set /p choice=Enter your choice (1-8): 

if "%choice%"=="1" goto fullsetup
if "%choice%"=="2" goto quickstart
if "%choice%"=="3" goto serverautorestart
if "%choice%"=="4" goto serveronly
if "%choice%"=="5" goto clientonly
if "%choice%"=="6" goto testonly
if "%choice%"=="7" goto reset
if "%choice%"=="8" exit
goto menu

:fullsetup
echo Starting Full Setup...
cd server
call npm install
cd ../client
call npm install
goto startall

:quickstart
echo Quick Start...
goto startall

:startall
cd ../server
start "Expense Splitter Server (Auto-Restart)" cmd /k "cd /d %CD% && node start.js"
timeout /t 5 /nobreak >nul
node test-api.js
cd ../client
start "Expense Splitter Client" cmd /k "cd /d %CD% && npm run dev"
echo Both services started with auto-restart!
goto menu

:serverautorestart
echo Starting Server with Auto-Restart...
cd server
start "Expense Splitter Server (Auto-Restart)" cmd /k "cd /d %CD% && node start.js"
echo Server started with auto-restart enabled!
goto menu

:serveronly
echo Starting Server (Regular)...
cd server
start "Expense Splitter Server" cmd /k "cd /d %CD% && npm start"
echo Server started!
goto menu

:clientonly
echo Starting Client Only...
cd client
start "Expense Splitter Client" cmd /k "cd /d %CD% && npm run dev"
echo Client started!
goto menu

:testonly
echo Running API Tests...
cd server
node test-api.js
pause
goto menu

:reset
echo Resetting Environment...
cd server
rmdir /s /q node_modules 2>nul
cd ../client
rmdir /s /q node_modules 2>nul
echo Node modules cleared!
goto fullsetup
