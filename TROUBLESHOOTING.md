# Troubleshooting Guide

## Common Issues & Solutions

### 🔌 **Database Connection Issues**

#### Problem: "MongoServerSelectionError"
**Symptoms:**
- Server hangs on startup
- "connection failed" messages
- Database timeout errors

**Solutions:**
1. **Check Internet Connection**
   ```bash
   ping google.com
   ```

2. **Verify MongoDB URI**
   - Check `.env` file for correct connection string
   - Ensure username/password are correct
   - Verify cluster URL is accurate

3. **Use Auto-Restart Logic**
   ```bash
   node start.js  # Instead of npm start
   ```

#### Problem: "Authentication Failed"
**Symptoms:**
- "Invalid username or password" errors
- Connection rejected by MongoDB

**Solutions:**
1. **Update Credentials in .env**
   ```env
   MONGO_URI=mongodb+srv://newuser:newpass@cluster.mongodb.net/database
   ```

2. **Check MongoDB Atlas User Permissions**
   - Verify user has read/write access
   - Check IP whitelist settings

---

### 🔑 **Authentication Issues**

#### Problem: "Invalid Token" Errors
**Symptoms:**
- 401 Unauthorized responses
- "Access denied" messages

**Solutions:**
1. **Check JWT Secret**
   ```env
   JWT_SECRET=your-secure-secret-key
   ```

2. **Verify Token Format**
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Test Token Generation**
   ```bash
   cd server && node test-api.js
   ```

#### Problem: "User Already Exists"
**Symptoms:**
- Registration fails with existing email
- 400 Bad Request on registration

**Solutions:**
1. **Use Different Email**
2. **Clear Test Data from Database**
3. **Check for Case Sensitivity Issues**

---

### ⚙️ **Server Startup Issues**

#### Problem: "Port Already in Use"
**Symptoms:**
- EADDRINUSE errors
- Server won't start on port 3000

**Solutions:**
1. **Kill Existing Node Processes**
   ```cmd
   taskkill /f /im node.exe
   ```

2. **Use Different Port**
   ```env
   PORT=3001
   ```

3. **Check Running Processes**
   ```cmd
   netstat -ano | findstr :3000
   ```

#### Problem: "Module Not Found"
**Symptoms:**
- Cannot find module errors
- Import/require failures

**Solutions:**
1. **Reinstall Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Clear npm Cache**
   ```bash
   npm cache clean --force
   ```

3. **Check Node Version**
   ```bash
   node --version  # Should be v22.17.1 or compatible
   ```

---

### 🧪 **Testing Issues**

#### Problem: "Connection Refused" During Tests
**Symptoms:**
- test-api.js fails
- "ECONNREFUSED" errors

**Solutions:**
1. **Ensure Server is Running**
   ```bash
   node start.js  # In separate terminal
   ```

2. **Wait for Database Connection**
   ```bash
   # Wait for "Database connection established successfully"
   ```

3. **Check Server Port**
   ```bash
   # Verify server is on port 3000
   ```

#### Problem: "Test Timeouts"
**Symptoms:**
- Tests hang or timeout
- No response from server

**Solutions:**
1. **Increase Wait Time**
   ```javascript
   // In test files, increase timeout values
   setTimeout(() => {}, 10000); // 10 seconds
   ```

2. **Check Server Logs**
   ```bash
   # Look for error messages in server output
   ```

---

### 📁 **File & Environment Issues**

#### Problem: ".env File Not Found"
**Symptoms:**
- Environment variable errors
- Missing configuration

**Solutions:**
1. **Create .env File**
   ```bash
   copy .env.example .env
   ```

2. **Set Required Variables**
   ```env
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   PORT=3000
   NODE_ENV=development
   ```

#### Problem: "Permission Denied"
**Symptoms:**
- Cannot execute batch files
- Access denied errors

**Solutions:**
1. **Run as Administrator**
   - Right-click → "Run as administrator"

2. **Check File Permissions**
   - Ensure files are not read-only

3. **Use PowerShell Alternative**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

---

### 🔧 **Development Workflow Issues**

#### Problem: "Auto-Restart Not Working"
**Symptoms:**
- start.js not detecting failures
- Manual restart still required

**Solutions:**
1. **Check Connection Messages**
   ```javascript
   // Ensure these messages exist in your code:
   "MongoDB database connection established successfully"
   "Server is running on port"
   ```

2. **Update Detection Logic**
   ```javascript
   // In start.js, verify these strings match your server output
   ```

3. **Test Manual Restart**
   ```bash
   npm start  # Verify basic functionality first
   ```

#### Problem: "Development Menu Not Working"
**Symptoms:**
- dev-menu.bat fails
- Batch file errors

**Solutions:**
1. **Check File Paths**
   ```batch
   cd server  # Ensure correct directory navigation
   ```

2. **Run from Correct Location**
   ```cmd
   # Run from project root directory
   c:\Dev\projects\shared-expense-splitter\dev-menu.bat
   ```

3. **Check Dependencies**
   ```bash
   # Ensure npm install completed in both server and client
   ```

---

## 🆘 **Emergency Recovery Procedures**

### Complete Environment Reset
```bash
# 1. Stop all processes
taskkill /f /im node.exe

# 2. Clean dependencies
cd server
rmdir /s /q node_modules
del package-lock.json

cd ../client
rmdir /s /q node_modules
del package-lock.json

# 3. Reinstall everything
cd ../server
npm install

cd ../client
npm install

# 4. Verify environment
cd ../server
node test-setup.js
```

### Database Connection Reset
```bash
# 1. Test connection separately
cd server
node -e "require('dotenv').config(); console.log('MONGO_URI:', process.env.MONGO_URI)"

# 2. Verify credentials in MongoDB Atlas
# 3. Check IP whitelist (0.0.0.0/0 for development)
# 4. Test with new connection string
```

---

## 📞 **Getting Help**

### Debug Information to Collect
1. **Node.js Version:** `node --version`
2. **npm Version:** `npm --version`
3. **Error Messages:** Full console output
4. **Environment:** `.env` file contents (without sensitive data)
5. **Process Status:** Running processes and ports

### Useful Commands for Debugging
```bash
# Check environment
node test-setup.js

# Test API manually
node test-api.js

# Check server connectivity
curl http://localhost:3000

# View running processes
netstat -ano | findstr :3000

# Check Node processes
tasklist | findstr node.exe
```

---

*Keep this troubleshooting guide handy for quick problem resolution during development.*
