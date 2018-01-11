const express = require('express');
const router = express.Router();
const Bill = require('../services/bill');

router.get('/', function(req, res, next) {
    let billList = Bill.GetBills();
    return res.json({
        billList: billList
    });
});
router.post('/add', function(req, res, next) {
    console.log(req.body);
    res.render('index', { title: 'Express11' });
});

module.exports = router;