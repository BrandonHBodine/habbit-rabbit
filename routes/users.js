'use strict';

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Habbit Rabbit' });
});

router.get('/:id', function(req, res, next) {
  // database interaction
  var habitData = {
      habits: ['coding', 'jogging', 'breathing'],
      streak: ['3'],
      streakHabit: ['coding']
    };
  res.render('show', habitData);
});


module.exports = router;
