const express = require('express');
const router = express.Router();
const Bill = require('../services/bill');
const Company = require('../services/company');
const Department = require('../services/department');

router.get('/taxTurnOutSubjects', async function(req, res, next) {
    try {
        console.log("get taxTurnOutSubjects");
        let taxTurnOutSubjectsList = await Bill.GetTaxTurnOutSubjectList();
        return res.json({
            code: 1001,
            msg: "",
            taxTurnOutSubjectsList: taxTurnOutSubjectsList
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
router.get('/professions', async function(req, res, next) {
    try {
        console.log("get professions");
        let professionsList = await Bill.GetProfessions();
        return res.json({
            code: 1001,
            msg: "",
            professionsList: professionsList
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
router.get('/closeDate', async function(req, res, next) {
    try {
        console.log("get closeDate");
        let closeDate = await Bill.GetCloseTime();
        return res.json({
            code: 1001,
            msg: "",
            closeDate: closeDate.date
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
router.post('/closeDate', async (req, res, next) => {
    try {
        console.log("post closeDate");
        console.log(req.body);
        let closeTime = req.body["closeDate"] ;
        //todo 权限设置
        if (closeTime == '2017/02'){
            return res.json({
                code: 4000,
                msg: "没有权限修改",
                result: {}
            });
        }
        await Bill.SetCloseTime(closeTime);
        return res.json({
            code: 1001,
            msg: "已修改截断时间",
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
router.get('/', async function(req, res, next) {
    try {
        console.log("get bills");
        let billList = await Bill.GetBills(req.query);
        return res.json({
            code: 1001,
            msg: "",
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
router.put('/', async (req, res, next) => {
    console.log("put in");
    console.log(req.body);
    return res.json({
        code: 1001,
        msg: "已修改",
        result: {}
    });
});
router.delete('/', async (req, res, next) => {
    try {
        console.log("delete in");
        console.log(req.body);
        await Bill.DeleteBills(req.body);
        return res.json({
            code: 1001,
            msg: "已删除",
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
router.post('/', async (req, res, next) => {
    try {
        console.log("post bills");
        console.log(req.body);
        let companyName = req.body["company"] ;
        let company = await Company.GetIdByInitCompanyName(companyName);
        console.log(company);
        req.body["companyId"] = company["id"];
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