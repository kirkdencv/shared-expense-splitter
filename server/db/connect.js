const mongoose = require('mongoose')

const connectDB = async (url) => {
   try {
      console.log('Connecting to MongoDB database...')
      
      await mongoose.connect(url, {
         serverSelectionTimeoutMS: 10000, // 10 second timeout
         socketTimeoutMS: 45000,
         bufferCommands: false,
         maxPoolSize: 10
      })
      
      console.log('MongoDB database connection established successfully')
      return true
   } catch (error) {
      console.error('MongoDB connection failed:', error.message)
      throw error
   }
}

module.exports = connectDB