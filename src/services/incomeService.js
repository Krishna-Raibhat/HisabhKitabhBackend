const Income = require('../models/Income');
const { Op, Sequelize } = require("sequelize");

const createIncome = async(data) =>{
    const newIncome = await Income.create(data);
    return newIncome;
};

// Totals
const getTotalIncome = async (userId) => {
    return await Income.sum("incomeAmount", { where: { userId } });
};

const getDailyIncome = async (userId, date) => {
    return await Income.sum("incomeAmount", {
        where: { userId, date }
    });
};

const getMonthlyIncome = async (userId, year, month) => {
    const startDate = `${year}-${month}-01`;
    const endDate = `${year}-${month}-31`;

    return await Income.sum("incomeAmount", {
        where: {
        userId,
        date: { [Op.between]: [startDate, endDate] }
        }
    });
};

// All income details
const getAllIncomeDetails = async (userId) => {
    return await Income.findAll({
        where: { userId },
       include: ["UserIncomeCategory", "PaymentMode"],
        order: [["date", "DESC"]],
    });
};

// Charts
const getLast7DaysIncomeChart = async (userId) => {
    const today = new Date();
    const start = new Date();
    start.setDate(today.getDate() - 6);

    return await Income.findAll({
        where: {
        userId,
        date: { [Op.between]: [start, today] }
        },
        attributes: [
            "date",
            [Sequelize.fn("SUM", Sequelize.col("income_amount")), "totalIncome"]
            ],
        group: ["date"],
        order: [["date", "ASC"]],
    });
};

const getMonthlyIncomeChart = async (userId, year) => {
    return await Income.findAll({
        where: {
            userId,
            date: {
                [Op.between]: [`${year}-01-01`, `${year}-12-31`]
            }
        },
        attributes: [
            [Sequelize.fn("MONTH", Sequelize.col("date")), "month"],
            [Sequelize.fn("SUM", Sequelize.col("income_amount")), "totalIncome"]
        ],
        group: ["month"],
        order: [["month", "ASC"]],
    });
};

// Export all

module.exports ={
    createIncome,
    getTotalIncome,
    getDailyIncome,
    getMonthlyIncome,
    getAllIncomeDetails,
    getLast7DaysIncomeChart,
    getMonthlyIncomeChart
};