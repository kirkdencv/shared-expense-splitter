# 📁 Project Files Summary

## 🚀 **Startup Scripts**
- `start-dev.bat` - Automated development environment setup (CMD version)
- `start-dev-powershell.bat` - Automated development environment setup (PowerShell version)

## 🧪 **Testing Files**
- `server/test-api.js` - Node.js script to test API endpoints
- `server/test-setup.js` - Environment and dependency verification script
- `server/api-tests.http` - REST Client testing file for VS Code

## 📝 **Documentation**
- `TESTING.md` - Complete testing guide and documentation
- `server/.env.example` - Environment variables template

## 🎯 **Quick Commands**

### Start Everything Automatically:
```cmd
start-dev.bat
```

### Manual Testing:
```cmd
# Test environment setup
cd server && node test-setup.js

# Test API endpoints (make sure server is running first)
cd server && node test-api.js

# Start server manually
cd server && npm start

# Start client manually (in new terminal)
cd client && npm run dev
```

### Using VS Code REST Client:
1. Install REST Client extension
2. Open `server/api-tests.http`
3. Click "Send Request" above each endpoint

## 🔧 **File Locations**
```
shared-expense-splitter/
├── start-dev.bat                    # Main startup script
├── start-dev-powershell.bat         # PowerShell startup script
├── TESTING.md                       # Testing documentation
├── FILES-SUMMARY.md                 # This file
├── server/
│   ├── test-api.js                  # API testing script
│   ├── test-setup.js                # Environment testing
│   ├── api-tests.http               # REST Client tests
│   ├── .env.example                 # Environment template
│   └── ...other server files
└── client/
    └── ...client files
```
