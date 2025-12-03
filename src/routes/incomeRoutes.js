const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');

// Create Income
router.post('/add', incomeController.createIncome);