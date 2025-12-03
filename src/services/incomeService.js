const Income = require('../models/Income');

const createIncome = async(data) =>{
    const newIncome = await Income.create(data);
    return newIncome;
};

module.exports ={
    createIncome,
};