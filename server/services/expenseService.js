const Expense = require('../models/Expense');
const Group = require('../models/Group');
const mongoose = require('mongoose')
const { validateObjectId } = require('../utils/validate')

const createExpenseService = async ({ description, amount, payer, participants, group }) => {

    // Check required fields
    if (!description || !amount || !payer || !participants || !group) {
        throw new Error("Missing required fields");
    }

    // validate amount
    if (typeof amount !== 'number' || amount <= 0) {
        throw new Error("Amount must be a positive number");
    }

    // Validate participants
    if (!Array.isArray(participants) || participants.length === 0) {
        throw new Error("Participants must be a non-empty array");
    }


    validateObjectId(group, 'group')
    validateObjectId(payer, 'payer')

    // Validate if each participants exists
    for (const p of participants) {
    validateObjectId(p.user, 'participant')
    }
    const groupDoc = await Group.findById(group);

    if (!groupDoc) {
        throw new Error("Group does not exist")
    }

    const isPayerInGroup = groupDoc.members.some(memberId => memberId.equals(payer))

    // Validate if participant is part of the group
    if (!isPayerInGroup) {
    throw new Error("Payer is not a member of the group");
    }

    // Validate if each participant is part of the group
    for (const p of participants) {
    if (!groupDoc.members.some(m => m.equals(p.user))) {
        throw new Error(`Participant ${p.user} is not a member of the group`);
    }
    }

    // validate amount and share total
    let totalShare = participants.reduce((acc, participant) => {
        return acc + Number(participant.share);
    }, 0)
    console.log(totalShare)

    if (totalShare != amount) {
        throw new Error("Kulang")
    }

    const expense = new Expense({
        description,
        amount,
        payer,
        participants,
        group,
    });

    await expense.save()
    return expense;
}


const getUserExpenses = async () => {
        const {
            groupId,
            payerId,
            participantId,
            startDate,
            endDate,
            minAmount,
            maxAmount,
            sortBy = 'createdAt'
        } = req.query
}

const getExpensebyIdService = async ({ id }) => {

        const expense = await Expense.findById(id)
            .populate('payer', 'name email')
            .populate('participants.user', 'name email')
            .populate('group', 'name members')
            .lean()
        
        return expense
}

module.exports = {
    createExpenseService,
    getExpensebyIdService
}