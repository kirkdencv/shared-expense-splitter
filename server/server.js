require('dotenv').config();

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