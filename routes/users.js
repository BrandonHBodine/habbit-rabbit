'use strict';

var express = require('express');
var router = express.Router();

var streakArray = [];

function getMaxofArray(numArray) {
  return Math.max.apply(null, numArray);
}

var data = [{
  habits: 'coding',
  streak: '4',
  streakHabit: 'coding',
  goal: '10',
  progressBar: '60'
}, {
  habits: 'jogging',
  streak: '6',
  streakHabit: 'jogging',
  goal: '10',
  progressBar: '80'
}, {
  habits: 'breathing',
  streak: '3',
  streakHabit: 'breathing',
  goal: '10',
  progressBar: '10'
}, {
  habits: 'eating',
  streak: '10',
  streakHabit: 'eating',
  goal: '10',
  progressBar: '100'
}];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', {
    title: 'Habbit Rabbit'
  });
});

router.get('/:id', function(req, res, next) {
  // var longestStreak = getMaxofArray(streakArray);
  // var longStreak = getMaxofArray(streakArray);
  // for (var i = 0; i <= data.length-1; i++) {
  //   streakArray.push(data[i].streak);
  //   return streakArray;
  //   console.log(streakArr);
  // }
  var userData = {
    name: "Alya",
    habits: data,
    // streak:
    // longestStreak: longStreak
  };

  res.render('show', userData);
  // var longestStreak = getMaxofArray(streakArray);
});


module.exports = router;
