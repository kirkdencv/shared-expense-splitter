const Expense = require('../models/Expense');
const {createExpenseService, getExpensebyIdService, updateExpenseService, deleteExpenseService} = require('../services/expenseService');
const AppError = require('../utils/appError');

const createExpense = async (req, res) => {
    try {
        const expense = await createExpenseService(req.body);
        res.status(201).json(expense);
    } catch (err) {
    console.error('Error creating expense:', err.message);
    res.status(400).json({ error: err.message });
  }
}

// ala pa
const getUserExpenses = async (req, res) => {
}

const getExpenseById = async (req, res) => {
    try {
        const expense = await getExpensebyIdService(req.params)
        res.status(200).json(expense)
    } catch (err) {
        console.error('Error fetching expense by ID:', err)
        res.status(500).json({ error: err.message })
    }
}

const updateExpense = async (req, res) => {
    try {
        const expense = await updateExpenseService(req.body, {id: req.params.id, userId: req.user.id})
        res.status(201).json(expense)
    } catch (err) {
        console.error('Error updating expense', err)

        if (err instanceof AppError) {
            return res.status(err.statusCode).json({ error: err.message });
        }

        res.status(500).json({ error: err.message })
    }
}

const deleteExpense = async (req, res) => {
    try {
        const expense = await deleteExpenseService({
            id: req.params.id,
            userId: req.user.id
        })
        res.status(200).json(expense)
    } catch (err) {
        console.error('Error updating expense', err)

        if (err instanceof AppError) {
            return res.status(err.statusCode).json({ error: err.message });
        }
        
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    createExpense,
    getUserExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
}