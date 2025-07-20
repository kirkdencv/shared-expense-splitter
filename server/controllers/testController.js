const mongoose = require('mongoose');

const testServer = (req, res) => {
    res.json({ 
        message: 'Expense Splitter API is running!',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
}

module.exports = {
    testServer
}