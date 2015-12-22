'use strict';

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Habbit Rabbit' });
});

router.get('/:id', function(req, res, next) {
  // database interaction

  //knex.(where).then(function(user){

    //var progress  = user.streak/user.goal

//})

  var habitData = {
      habits: ['coding', 'jogging', 'breathing', 'eating'],
      streak: ['3'],
      streakHabit: ['coding'],
      goal: ['10'],
      progressBar: '60'
  };
  res.render('show', habitData);
});


module.exports = router;
