const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceController');
const authMiddleware = require('../middlewares/authMiddleware'); // verify JWT

//get logged-in user's balance
router.get('/', authMiddleware, balanceController.getBalance);

module.exports = router;