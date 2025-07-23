const Expense = require('../models/Expense');
const {createExpenseService} = require('../services/expenseService');

const createExpense = async (req, res) => {
    try {
        const expense = await createExpenseService(req.body);
        res.status(201).json(expense);
        console.log("Success Aye")
    } catch (error) {
    console.error('Error creating expense:', error.message);
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
    createExpense
}