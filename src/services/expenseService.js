const Expense = require('../models/Expense');

const createExpense = async (data) => {
  const newExpense = await Expense.create(data);
  return newExpense;
};

module.exports = {
  createExpense,
};