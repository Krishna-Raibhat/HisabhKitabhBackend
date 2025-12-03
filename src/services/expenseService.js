const Expense = require('../models/Expense');
const UserExpenseCategory = require("../models/UserExpenseCategory");
const PaymentMode = require("../models/PaymentMode");
const { Op } = require("sequelize");

const createExpense = async (data) => {
  const newExpense = await Expense.create(data);
  return newExpense;
};


module.exports = {
  createExpense,
};
