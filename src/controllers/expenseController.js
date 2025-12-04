const expenseService = require('../services/expenseService');

const createExpense = async (req, res) => {
  try {
    const {
      userId,
      expenseAmount,
      categoryId,
      paymentModeId,
      remarks,
      path,
      date,
    } = req.body;

    if (!userId || !expenseAmount || !categoryId || !paymentModeId || !date) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const saved = await expenseService.createExpense({
      userId,
      expenseAmount,
      categoryId,
      paymentModeId,
      remarks,
      path,
      date,
    });

    return res.status(201).json({ message: 'Expense added successfully', data: saved });
  } catch (err) {
    console.error('createExpense error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
    createExpense,
};