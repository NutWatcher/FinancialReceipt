const express = require('express');
const router = express.Router();
const Bill = require('../services/bill');
const Excel = require('../services/excel');

router.get('/billGroupByTurnOutSubject', async function(req, res, next) {
    try {
        console.log("get billGroupByTurnOutSubject");
        let billList = await Bill.GetBillsGroupByTurnOutSubject(req.query);
        let url = await Excel.GroupByTurnOutSubject(billList, req.query['date']);
        setTimeout(() =>{
            return res.json({
                code: 1001,
                msg: "",
                result: {
                    fileName:"cc",
                    fileUrl:url
                }
            });
        },3000);
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