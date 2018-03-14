const express = require('express');
const router = express.Router();

const bill = require('./bill');
const department = require('./department');
const company = require('./company');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = function (app) {
    app.use('/', router) ;
    app.use('/api/bills', bill) ;
    app.use('/api/departments', department) ;
    app.use('/api/companies', company) ;
};