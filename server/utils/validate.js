const mongoose = require('mongoose');

function validateObjectId(id, label) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`Invalid ${label}'s ID`)
    }
}

function validateParticipantsInGroup(participants, group) {
    const groupUserSet = new Set(group.members.map(userId => userId.toString()))

    const invalidParticipants = participants.filter(participant =>
        !groupUserSet.has(participant.user.toString())
    )

    if (invalidParticipants.length > 0) {
        const invalidUserIds = invalidParticipants.map(p => p.user.toString())
        throw new Error(`These participants are not in the group: ${invalidUserIds.join(', ')}`)
    }
}

module.exports = {
    validateObjectId,
    validateParticipantsInGroup
}