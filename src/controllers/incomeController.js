const incomeService = require('../services/incomeService');

//add income
const createIncome = async (req, res) =>{
    try{
        const{
            userId,
            incomeAmount,
            categoryId,
            paymentModeId,
            remarks,
            path,
            date,  
        } = req.body;

        // Basic validation 
        if (!userId || !incomeAmount || !categoryId || !paymentModeId || !date) {
        return res.status(400).json({ message: 'Missing required fields.' });
        }

        const saved = await incomeService.createIncome({
        userId,
        incomeAmount,
        categoryId,
        paymentModeId,
        remarks,
        path,
        date,
        });
        return res.status(201).json({ message: 'Income added successfully!', data: saved });

    } catch (err) {
        console.error('createIncome error:', err);
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
    
};

//get total income balance
const totalIncome = async (req, res) => {
    try {
        const total = await incomeService.getTotalIncome(req.user.userId);
        res.json({ success: true, totalIncome: total || 0 });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
    
//get daily income balance
const dailyIncome = async (req, res) => {
    try {
        const total = await incomeService.getDailyIncome(
            req.user.userId,
            req.query.date
        );
        res.json({ success: true, dailyIncome: total || 0 });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

//get monthly income balance
const monthlyIncome = async (req, res) => {
    try {
        const total = await incomeService.getMonthlyIncome(
            req.user.userId,
            req.query.year,
            req.query.month
        );
        res.json({ success: true, monthlyIncome: total || 0 });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

//get all the income details of all time
const incomeDetails = async (req, res) => {
    try {
        const data = await incomeService.getAllIncomeDetails(req.user.userId);
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

    

//charts
const last7DaysChart = async (req, res) => {
    try {
        const data = await incomeService.getLast7DaysIncomeChart(req.user.userId);
        res.json({ success: true, chart: data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const monthlyIncomeChart = async (req, res) => {
    try {
        const data = await incomeService.getMonthlyIncomeChart(
            req.user.userId,
            req.query.year
        );
        res.json({ success: true, chart: data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


module.exports ={
    createIncome,
    totalIncome,
    dailyIncome,
    monthlyIncome,
    incomeDetails,
    last7DaysChart,
    monthlyIncomeChart

}