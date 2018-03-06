const express = require('express');
const router = express.Router();
const Department = require('../services/department');

router.get('/', async function(req, res, next) {
    try {
        console.log("get department");
        let billList = await Department.GetDepartments();
        return res.json({
            code: 1001,
            msg: "",
            departmentsList: billList
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