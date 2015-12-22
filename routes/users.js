'use strict';

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Habbit Rabbit' });
});

router.get('/:id', function(req, res, next) {
  // database interaction
  // show view
});

router.get('/:id/habits/create', function(req, res, next) {
  res.render('createHabit', { title: 'Habbit Rabbit' });
});

router.post('/:id/habits/create', function(req, res, next) {
  console.log(req.body);
  res.render('createHabit', { title: 'Habbit Rabbit' });
});

module.exports = router;
