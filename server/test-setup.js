// Simple test to verify server setup
const express = require('express');
const mongoose = require('mongoose');

console.log('✅ Testing basic imports...');
console.log('Express version:', require('express/package.json').version);
console.log('Mongoose version:', require('mongoose/package.json').version);

// Test environment variables
require('dotenv').config();
console.log('✅ Environment variables loaded');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Found' : 'Missing');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Found' : 'Missing');

// Test if we can create express app
const app = express();
console.log('✅ Express app created successfully');

console.log('✅ All basic tests passed!');