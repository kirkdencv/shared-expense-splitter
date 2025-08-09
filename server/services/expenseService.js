const Expense = require('../models/Expense');
const Group = require('../models/Group');
const { validateObjectId, validateParticipantsInGroup } = require('../utils/validate');
const AppError = require('../utils/appError');  

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

    validateObjectId(id, "Expense")

    const expense = await Expense.findById(id)
        .populate('payer', 'name email')
        .populate('participants.user', 'name email')
        .populate('group', 'name members')
        .lean()
    
    return expense
}

const updateExpenseService = async ({ description, amount, participants, group }, { id, userId}) => {

    validateObjectId(id, "Expense")
    validateObjectId(userId, "Payer")

    const expense = await Expense.findById(id)
    const updateData = {}
    if (!expense) { throw new Error("Expense not found") }

    if (userId.toString() !== expense.payer.toString()) {throw new AppError("Only creator can update this expense", 403)}

    // Validation
    if (amount !== undefined) {
        if (typeof amount !== "number" || amount <= 0) {
            throw new Error("Amount must be a positive number")
        }
        updateData.amount = amount
    }

    if (description !== undefined) {
        if (typeof description !== "string" || description.trim().length === 0) {
            throw new Error("Description must be a non-empty string")
        }
        updateData.description = description.trim()
    }

    if (group !== undefined || participants !== undefined) {

        if (group !== undefined) {
            validateObjectId(group, "Group");
            updateData.group = group;
        }   

        const targetGroupId = group !== undefined ? group : expense.group;
        const participantsToCheck = participants !== undefined ? participants : expense.participants;

        // Check if participants array is valid
        if (!Array.isArray(participantsToCheck) || participantsToCheck.length === 0) {
            throw new AppError("Participants must be a non-empty array", 400);
        }

        // Check if the participants inside the array if valid objects
        participantsToCheck.forEach((p, index) => {
            validateObjectId(p.user, `Participant ${index}`);
        })

        // Check if the participants is part of the group
        const currentGroupObject = await Group.findById(targetGroupId);
        if (!currentGroupObject) throw new AppError("Group not found", 404);
        validateParticipantsInGroup(participantsToCheck, currentGroupObject);

        if (participants !== undefined) updateData.participants = participants;
    }

    const updatedExpense = await Expense.findByIdAndUpdate(id, updateData, {new: true, runValidators: true})
        .populate('payer', 'name email')
        .populate('participants.user', 'name email')
        .populate('group', 'name members')
    
    return updatedExpense
}

const deleteExpenseService = async ({ id, userId }) =>  {

    validateObjectId(userId, "User ID")
    validateObjectId(id, "Expense")

    const expense = await Expense.findById(id);
    if (!expense) {throw new Error("Expense not found")}

    if (expense.payer.toString() !== userId.toString()) {
        throw new AppError("Only creator can delete this expense", 403)
    }

    await Expense.findByIdAndDelete(id)

    return { message: "Expense deleted successfully", deletedExpenseId: id}
}




module.exports = {
    createExpenseService,
    getExpensebyIdService,
    updateExpenseService,
    deleteExpenseService
}