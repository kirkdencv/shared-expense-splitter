This is a simple full-stack app for splitting expenses with friends or roommates.

## 📁 Folders

- `client` → frontend
- `server` → backend

## ✅ What it does

- Register & login
- Create groups
- Add expenses
- See who owes who

## 📌 How to run

1. `git clone` this repo
2. `cd client` → `npm install`
3. `cd server` → `npm install`

# Shared Expense Splitter

## Backend Setup

### Prerequisites
- Node.js 16+ 
- MongoDB Atlas account

### Installation
1. Clone the repository
```bash
git clone https://github.com/kirkdencv/shared-expense-splitter.git
cd shared-expense-splitter/server
```

2. Install dependencies
```bash
npm install
```

3. Environment Setup
```bash
cp .env.example .env
# Edit .env with your MongoDB Atlas credentials
```

4. Start the server
```bash
npm start
```

### Current Status
- ✅ MongoDB Atlas connection working
- ✅ Express server running on port 3000
- ✅ Environment configuration setup
- 🔄 User authentication (in progress)
