const express = require('express');

const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const expenseController = require('../controllers/expenseController');
// const { route } = require('./testRoutes');

router.post('/', authMiddleware, expenseController.createExpense)
router.get('', authMiddleware, expenseController.getUserExpenses)
router.get('/:id', authMiddleware, expenseController.getExpenseById)
router.put('/:id', authMiddleware, expenseController.updateExpense)
router.delete('/:id', authMiddleware, expenseController.deleteExpense)

// Protect all expense routes
// You can add more protected routes here, e.g.:
// router.get('/', authMiddleware, expenseController.getExpenses);
// router.get('/:id', authMiddleware, expenseController.getExpenseById);
// router.put('/:id', authMiddleware, expenseController.updateExpense);
// router.delete('/:id', authMiddleware, expenseController.deleteExpense);

module.exports = router;