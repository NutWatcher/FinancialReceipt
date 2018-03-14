const express = require('express');
const router = express.Router();
const Company = require('../services/company');

router.get('/', async function(req, res, next) {
    try {
        console.log("get company");
        let param = {};
        param["name"] = req.query.name || "";
        let companyList = await Company.SearchCompany(param);
        return res.json({
            code: 1001,
            msg: "",
            companyList: companyList
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