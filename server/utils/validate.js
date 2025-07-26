const mongoose = require('mongoose');

function validateObjectId(id, label) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`Invalid ${label}'s ID`)
    }
}

module.exports = {
    validateObjectId
}