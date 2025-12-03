const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Create Expense
router.post('/add', expenseController.createExpense);