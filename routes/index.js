'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Habbit Rabbit' });
});

/* GET home page. */
router.get('/index.html', function(req, res, next) {
  res.render('index', { title: 'Habbit Rabbit' });
});

module.exports = router;
