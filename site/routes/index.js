const express = require('express');
const router = express.Router();

const bill = require('./bill');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = function (app) {
    app.use('/', router) ;
    app.use('/bills', bill) ;
};