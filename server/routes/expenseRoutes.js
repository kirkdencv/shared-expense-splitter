const express = require('express');

const router = express.Router();

const expressController = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

const expenseController = require('../controllers/expenseController');
const { route } = require('./testRoutes');

router.post('/', authMiddleware, expressController.createExpense)
router.get('/:id', authMiddleware, expressController.getExpenseById)
router.put('/:id', authMiddleware, expressController.updateExpense)
router.delete('/:id', authMiddleware, expressController.deleteExpense)
const authMiddleware = require('../middleware/authMiddleware');

// Protect all expense routes
router.post('/', authMiddleware, expenseController.createExpense);
// You can add more protected routes here, e.g.:
// router.get('/', authMiddleware, expenseController.getExpenses);
// router.get('/:id', authMiddleware, expenseController.getExpenseById);
// router.put('/:id', authMiddleware, expenseController.updateExpense);
// router.delete('/:id', authMiddleware, expenseController.deleteExpense);

module.exports = router;