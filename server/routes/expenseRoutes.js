const express = require('express');
const expenseController = require('../controllers/expenseController');
const { route } = require('./testRoutes');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

// Protect all expense routes
router.post('/', authMiddleware, expenseController.createExpense);
// You can add more protected routes here, e.g.:
// router.get('/', authMiddleware, expenseController.getExpenses);
// router.get('/:id', authMiddleware, expenseController.getExpenseById);
// router.put('/:id', authMiddleware, expenseController.updateExpense);
// router.delete('/:id', authMiddleware, expenseController.deleteExpense);

module.exports = router;