const Expense = require('../models/Expense');
const {createExpenseService, getExpensebyIdService} = require('../services/expenseService');

const createExpense = async (req, res) => {
    try {
        const expense = await createExpenseService(req.body);
        res.status(201).json(expense);
    } catch (err) {
    console.error('Error creating expense:', error.message);
    res.status(400).json({ error: err.message });
  }
}

// ala pa
const getUserExpenses = async (req, res) => {
}

const getExpenseById = async (req, res) => {
    try {
        const expense = await getExpensebyIdService(req.params)
        res.status(201).json(expense)
    } catch (err) {
        console.error('Error fetching expense by ID:', err)
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    createExpense,
    getUserExpenses,
    getExpenseById
}