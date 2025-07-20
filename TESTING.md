# 🧪 Testing Your Shared Expense Splitter

## 🚀 Quick Start

### Method 1: Automated Setup (Recommended)
```bash
# Run the automated setup script
start-dev.bat
```

### Method 2: Manual Setup

#### 1. Start the Backend Server
```bash
cd server
npm install
npm start
```
Server will run on: http://localhost:3000

#### 2. Test the API Endpoints
```bash
# In a new terminal, from the server directory:
node test-api.js
```

#### 3. Start the Frontend
```bash
cd client
npm install
npm run dev
```
Client will run on: http://localhost:5173

## 🧪 API Testing

### Using the REST Client (VS Code Extension)
1. Install the "REST Client" extension in VS Code
2. Open `server/api-tests.http`
3. Click "Send Request" above each endpoint

### Using the Test Script
```bash
cd server
node test-api.js
```

### Manual Testing with cURL
```bash
# Health check
curl http://localhost:3000/

# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"password\":\"password123\"}"

# Login user
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"john@example.com\",\"password\":\"password123\"}"
```

## 📋 Available Endpoints

- `GET /` - Server health check
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

## 🔧 Environment Setup

Make sure your `.env` file in the server directory contains:
```env
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
PORT=3000
NODE_ENV=development
```

## ✅ Issues Fixed

1. ✅ Added missing `path-to-regexp` dependency
2. ✅ Fixed login/getUser function implementation
3. ✅ Added authentication middleware
4. ✅ Created proper error handling
5. ✅ Added environment variable validation
6. ✅ Created comprehensive testing tools

## 🐛 Troubleshooting

If you encounter issues:

1. **Server won't start**: Check your `.env` file exists with correct values
2. **API tests fail**: Make sure the server is running first
3. **Database connection error**: Verify your MongoDB URI is correct
4. **Port already in use**: Change the PORT in your `.env` file

## 📝 Next Steps

1. Test all API endpoints
2. Connect React frontend to backend
3. Add more features (expenses, groups, etc.)
4. Implement proper error handling on frontend
