const testServer = (req, res) => {
    const mongoose = require('mongoose');
    res.json({ 
        message: 'Expense Splitter API is running!',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
}

module.exports = {
    testServer
}