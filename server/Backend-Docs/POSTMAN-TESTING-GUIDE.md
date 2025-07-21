# 📮 Postman Testing Guide for Shared Expense Splitter API

## 🚀 Quick Setup

### Base URL
```
http://localhost:3000
```

### Environment Variables (Optional Setup in Postman)
1. Create a new Environment in Postman
2. Add these variables:
   - `base_url`: `http://localhost:3000`
   - `auth_token`: (will be set automatically from login response)

---

## 📋 Available API Endpoints

### 1. **Health Check Endpoint**
- **Method:** `GET`
- **URL:** `{{base_url}}/`
- **Purpose:** Test if server is running and database is connected

**Request:**
```http
GET http://localhost:3000/
```

**Expected Response:**
```json
{
  "message": "Expense Splitter API is running!",
  "database": "Connected"
}
```

---

### 2. **User Registration**
- **Method:** `POST`
- **URL:** `{{base_url}}/api/auth/register`
- **Purpose:** Create a new user account

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response (Success):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Postman Test Script (Optional):**
```javascript
// Save the token for future requests
if (pm.response.code === 201) {
    const responseJson = pm.response.json();
    pm.environment.set("auth_token", responseJson.token);
}
```

---

### 3. **User Login**
- **Method:** `POST`
- **URL:** `{{base_url}}/api/auth/login`
- **Purpose:** Authenticate existing user

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response (Success):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Postman Test Script (Optional):**
```javascript
// Save the token for future requests
if (pm.response.code === 200) {
    const responseJson = pm.response.json();
    pm.environment.set("auth_token", responseJson.token);
}
```

---

### 4. **Get Current User (Protected Route)**
- **Method:** `GET`
- **URL:** `{{base_url}}/api/auth/me`
- **Purpose:** Get current authenticated user information

**Headers:**
```
Authorization: Bearer {{auth_token}}
```

**Expected Response (Success):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## 🧪 Complete Testing Workflow

### Step 1: Test Server Health
1. Create new request: `GET {{base_url}}/`
2. Send request
3. Verify response shows "Connected" database status

### Step 2: Register New User
1. Create new request: `POST {{base_url}}/api/auth/register`
2. Add request body with user details
3. Send request
4. Save the returned token for next steps

### Step 3: Test User Login
1. Create new request: `POST {{base_url}}/api/auth/login`
2. Use same credentials from registration
3. Send request
4. Verify token is returned

### Step 4: Test Protected Route
1. Create new request: `GET {{base_url}}/api/auth/me`
2. Add Authorization header with Bearer token
3. Send request
4. Verify user information is returned

---

## 🔧 Postman Collection Setup

### Creating a Postman Collection

1. **Create New Collection:**
   - Name: "Shared Expense Splitter API"
   - Description: "API testing for expense splitting application"

2. **Add Requests to Collection:**
   - Health Check
   - User Registration  
   - User Login
   - Get Current User

3. **Set Up Environment:**
   - Create environment: "Development"
   - Add `base_url` variable: `http://localhost:3000`
   - Add `auth_token` variable: (empty initially)

### Collection Variables
```json
{
  "base_url": "http://localhost:3000",
  "auth_token": "",
  "test_email": "test@example.com",
  "test_password": "password123"
}
```

---

## 🚨 Common Error Responses

### 400 Bad Request
```json
{
  "errors": [
    {
      "msg": "Name is required",
      "param": "name",
      "location": "body"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "error": "Access denied. No token provided."
}
```

### 404 Not Found
```json
{
  "error": "Route not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Database connection failed"
}
```

---

## 📝 Test Scenarios

### Registration Testing
1. **Valid Registration**
   - Valid name, email, password
   - Should return 201 with token

2. **Invalid Email Format**
   - Use invalid email format
   - Should return 400 with validation error

3. **Duplicate Email**
   - Register same email twice
   - Should return 400 with "User already exists"

4. **Short Password**
   - Use password less than 6 characters
   - Should return 400 with validation error

### Login Testing
1. **Valid Credentials**
   - Correct email and password
   - Should return 200 with token

2. **Invalid Email**
   - Non-existent email
   - Should return 401 with "Invalid email or password"

3. **Wrong Password**
   - Valid email, wrong password
   - Should return 401 with "Invalid email or password"

### Protected Route Testing
1. **Valid Token**
   - Include Bearer token in header
   - Should return 200 with user data

2. **No Token**
   - Don't include Authorization header
   - Should return 401 with "Access denied"

3. **Invalid Token**
   - Use malformed or expired token
   - Should return 401 with "Invalid token"

---

## 🎯 Advanced Postman Features

### Pre-request Scripts
```javascript
// Generate random email for testing
const timestamp = Date.now();
pm.environment.set("random_email", `test${timestamp}@example.com`);
```

### Test Scripts for Assertions
```javascript
// Test for successful registration
pm.test("Registration successful", function () {
    pm.response.to.have.status(201);
    pm.expect(pm.response.json()).to.have.property("token");
});

// Test for token presence
pm.test("Token is returned", function () {
    const responseJson = pm.response.json();
    pm.expect(responseJson.token).to.not.be.undefined;
});

// Test for user object structure
pm.test("User object has required fields", function () {
    const responseJson = pm.response.json();
    pm.expect(responseJson.user).to.have.property("id");
    pm.expect(responseJson.user).to.have.property("name");
    pm.expect(responseJson.user).to.have.property("email");
});
```

### Collection Runner for Automated Testing
1. Use Collection Runner to run all tests sequentially
2. Set up data file for multiple test users
3. Generate reports for API testing results

---

## 🔍 Debugging Tips

### Common Issues:
1. **Server Not Running**
   - Ensure server is started: `npm start` or `node start.js`
   - Check server logs for errors

2. **Database Connection**
   - Verify MongoDB connection in server console
   - Check `.env` file configuration

3. **CORS Issues**
   - Server includes CORS middleware
   - Should work from Postman without issues

4. **Token Issues**
   - Verify token format: `Bearer <token>`
   - Check token hasn't expired (7-day expiry)

### Debug Requests:
```bash
# Check if server is running
curl http://localhost:3000/

# Test API directly
node test-api.js
```

---

## 📊 Expected Status Codes

| Endpoint | Method | Success Code | Error Codes |
|----------|--------|--------------|-------------|
| `/` | GET | 200 | 500 |
| `/api/auth/register` | POST | 201 | 400, 500 |
| `/api/auth/login` | POST | 200 | 400, 401, 500 |
| `/api/auth/me` | GET | 200 | 401, 500 |

---

## 🎉 Ready to Test!

Your Shared Expense Splitter API is ready for comprehensive testing with Postman. Start with the health check endpoint, then work through the authentication flow. The auto-restart functionality ensures your server stays running even if database connections fail temporarily.

**Quick Start Command:**
```bash
# Start server with auto-restart
cd server && node start.js
```

**Pro Tip:** Use Postman's Collection Runner to automate your entire test suite and catch regressions quickly!
