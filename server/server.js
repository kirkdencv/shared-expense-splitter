require('dotenv').config();

// Validate required environment variables
if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI environment variable is required');
    process.exit(1);
}

if (!process.env.JWT_SECRET) {
    console.error('❌ JWT_SECRET environment variable is required');
    process.exit(1);
}

const express = require('express');
const connectDB = require('./db/connect');
const cors = require('cors');

// Route imports
const testRoutes = require('./routes/testRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use('/', testRoutes)
app.use('/api/auth', authRoutes);

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