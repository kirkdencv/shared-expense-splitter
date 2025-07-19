const mongoose = require('mongoose');

const connectDB = async (url) => {
    const connectionStrategies = [
        { url: url, options: {} },
        
        { 
            url: url.split('?')[0] + '?retryWrites=true&w=majority', 
            options: {} 
        },
        
        { 
            url: url.split('?')[0], 
            options: {} 
        },
        
        { 
            url: url.split('?')[0] + '?ssl=false&retryWrites=true&w=majority',
            options: {} 
        }
    ];

    for (let i = 0; i < connectionStrategies.length; i++) {
        try {
            console.log(`Attempting... ${i + 1}/${connectionStrategies.length}...`);
            
            // Disconnect any existing connection
            if (mongoose.connection.readyState !== 0) {
                await mongoose.disconnect();
            }
            
            const { url: strategyUrl, options } = connectionStrategies[i];
            console.log(`URL: ${strategyUrl.replace(/:[^:@]*@/, ':***@')}`); // Hide password in logs
            
            const connection = await mongoose.connect(strategyUrl, {
                serverSelectionTimeoutMS: 5000,
                ...options
            });
            
            console.log('MongoDB Connected...', i + 1);
            return connection;
            
        } catch (error) {
            console.log(`Option ${i + 1} failed:`, error.message);
            
            if (i === connectionStrategies.length - 1) {
                console.log('Failed..');
                throw new Error('Failed to connect to MongoDB...');
            }
        }
    }
};

module.exports = connectDB;