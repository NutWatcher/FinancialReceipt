const express = require('express');
const router = express.Router();
const Bill = require('../services/bill');

router.get('/', async function(req, res, next) {
    try {
        console.log("get bills");
        let billList = await Bill.GetBills();
        return res.json({
            code: 1001,
            msg: "已增加",
            billList: billList
        });
    }
    catch (err){
        console.log(err.stack);
        return res.json({
            code: 4004,
            msg: err.toString() || "未知错误",
            result: {}
        });
    }
});
router.post('/', async (req, res, next) => {
    try {
        console.log("post bills");
        console.log(req.body);
        await Bill.AddBill(req.body);
        return res.json({
            code: 1001,
            msg: "已增加",
            result: {}
        });
    }
    catch (err){
        console.log(err.stack);
        return res.json({
            code: 4004,
            msg: err.toString() || "未知错误",
            result: {}
        });
    }
});

module.exports = router;