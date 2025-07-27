const express = require('express');
const router = express.Router();

const expressController = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');



router.post('/', authMiddleware, expressController.createExpense)
router.get('/:id', authMiddleware, expressController.getExpenseById)
router.put('/:id', authMiddleware, expressController.updateExpense)
router.delete('/:id', authMiddleware, expressController.deleteExpense)

module.exports = router;