const express = require('express');
const router = express.Router();
const Bill = require('../services/bill');

router.get('/', function(req, res, next) {
    let billList = Bill.GetBills();
    return res.json({
        billList: billList
    });
});
router.post('/', async (req, res, next) => {
    try {
        console.log(req.body);
        await Bill.AddBill(req.body);
        return res.json({
            code: 1001,
            msg: "已增加",
            result: {}
        });
    }
    catch (err){
        return res.json({
            code: 4004,
            msg: err.toString() || "未知错误",
            result: {}
        });
    }
});

module.exports = router;