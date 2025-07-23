const express = require('express');
const expressController = require('../controllers/expenseController');
const { route } = require('./testRoutes');

const router = express.Router();

router.post('/', expressController.createExpense)

module.exports = router;