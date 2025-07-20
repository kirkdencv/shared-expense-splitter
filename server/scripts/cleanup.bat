@echo off
echo Cleaning project...
cd server
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul
npm cache clean --force
echo Cleanup complete!
echo Run 'npm install' to reinstall dependencies