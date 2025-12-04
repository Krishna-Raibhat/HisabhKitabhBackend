const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');
const authMiddleware = require('../middlewares/authMiddleware'); // verify JWT

// Create Income
router.post('/add', authMiddleware, incomeController.createIncome);

// Get Total Income
router.get('/total', authMiddleware, incomeController.totalIncome);

// Get Daily Income
router.get('/daily', authMiddleware, incomeController.dailyIncome);

// Get Monthly Income
router.get('/monthly', authMiddleware, incomeController.monthlyIncome);

// Get All Income Details
router.get('/details', authMiddleware, incomeController.incomeDetails);

// Get Last 7 Days Income Chart
router.get('/chart/last7days', authMiddleware, incomeController.last7DaysChart);

// Get Monthly Income Chart
router.get('/chart/monthly', authMiddleware, incomeController.monthlyIncomeChart);

module.exports = router;