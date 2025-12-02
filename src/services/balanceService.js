const Balance = require('../models/Balance');

const getBalanceByUserId = async (userId) => {
  // Find the balance for a given user
  const balance = await Balance.findOne({
    where: { userId },
    attributes: ['balanceAmount'], // only return the balance
  });

  if (!balance) {
    return null; //  no balance record found
  }

  return balance;
};

module.exports = {
    getBalanceByUserId,
};