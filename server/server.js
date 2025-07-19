require('dotenv').config();

const express = require('express');
const connectDB = require('./db/connect');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Expense Splitter API is running!' });
});

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('✅ MongoDB Atlas Connected Successfully!');
        app.listen(PORT, () => {
            console.log(`🚀 Server is listening at port ${PORT}...`);
        });
    } catch (err) {
        console.log('❌ Database connection error:', err.message);
    }
}

start();