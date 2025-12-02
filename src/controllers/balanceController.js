const balanceService = require('../services/balanceService');

exports.getBalance = async (req, res) =>{
    try{
        const userId = req.user.userId;

        const balance = await balanceService.getBalanceByUserId(userId);

        if(!balance) {
            return res.status(404).json({message: 'Bakance not found for the respective user!'});
        }

        res.json({
            message: 'Successfully fetched balance!',
            balance: balance.balanceAmount,
        });
    } catch(err){
        console.error('Balance error: ', err);
        res.status(500).json({message: 'Server error!'});
    }
};