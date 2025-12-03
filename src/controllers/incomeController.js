const incomeService = require('../services/incomeService');

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

module.exports ={
    createIncome,
}