'use strict';
var express = require('express');
var router = express.Router();
// reqire pg that interacts with knex
var pg = require('pg');
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});
var streakArray = [];

function getMaxofArray(numArray) {
  return Math.max.apply(null, numArray);
}

//********* USER ROUTES***********//
/* GET users listing. */
router.get('/:id', function(req, res, next) {
  var userData = {};
  userData.habits = [];
  userData.streak = [];
  var id = req.params.id;
  // HABITS DATA REQUEST BASED ON USER ID
  knex.select('*').table('goodhabits').where('userid', id).then(function(success) {
    // NEED TO ADD VIEWS BASED ON DATA RETURNED
    for (var i = 0; i < success.length; i++) {
      userData.habits[i] = success[i];
    }
  }, function(failure) {
    console.log('The query Failed: ' + failure);
  });
  // HABIT LOG DATA REQUEST BASED ON USER ID
  knex.select('*').table('habitlog').where('userid', id).then(function(success) {
    // NEED TO ADD VIEWS BASED ON DATA RETURNED
    for (var k = 0; k < userData.habits.length; k++) {
      userData.habits[k].currentStreak = 0;
    }
    for (var j = 0; j < userData.habits.length; j++) {
      for (var i = 0; i < success.length; i++) {
        var milliseconds = Date.parse(success[i].logdate);
        var dateDiff = Date.now() - milliseconds;
        if (success[i].habitid == userData.habits[j].id && dateDiff / 86400000 > userData.habits[j].currentStreak) {
          userData.habits[j].currentStreak = (Math.round(dateDiff / 86400000));
          userData.habits[j].percentOfThirtyDays = (100 * (userData.habits[j].currentStreak) / 30);
        };
      }
    }
    userData.longest = [{
      longestCurrentStreak: 0
    }, {
      longestCurrentStreakName: ''
    }];
    for (var l = 0; l < userData.habits.length; l++) {
      if (userData.habits[l].currentStreak > userData.longest[0].longestCurrentStreak) {
        userData.longest[0].longestCurrentStreak = userData.habits[l].currentStreak;
        userData.longest[1].longestCurrentStreakName = userData.habits[l].habitname;

      }
    }
    res.render('show', userData);
  }, function(failure) {
    console.log('The query Failed: ' + failure);
  });


});
router.get('/', function(req, res, next) {
  res.render('users', {
    title: 'Habbit Rabbit'
  });
});
// Get USER by ID
router.get('/get/:id', function(req, res) {
  var id = req.params.id;
  knex.select('*').table('users').where('id', id).then(function(success) {
    // console.log(success[0].firstname);
    res.write(success[0].firstname);
    res.end();
  }, function(failure) {
    console.log('The query Failed: ' + failure);
  });
});
// Create User /users/create
router.post('/create', function(req, res) {
  var user = {};
  // set variables to the post request
  // user.id = ;
  user.firstname = req.body.firstName;
  user.lastname = req.body.lastName;
  user.email = req.body.userEmail;
  user.phone = req.body.phoneNum;
  user.username = req.body.newUsername;
  user.password = req.body.newPassword;
  res.write('this is the new page');
  res.end();
  // Write queries to interact with postgres
  knex('users').insert(user).then(function(success) {
    res.end('You Have signed up');
  }, function(failure) {
    console.log(failure);
  });
  // NEED TO HAVE VIEW MADE FOR THIS
}, function(failure) {
  res.write('this is the new page and you failed');
  res.end();
});
// ***** HABBIT ROUTES ******//
// The naming convention might be a little not good
// Create a habit for a user
router.post('/habits/create/:userid', function(req, res) {
  var userid = req.params.userid;
  var habit = {};
  //Set Object to have the key value pairs for the query
  habit.userid = userid;
  habit.habitname = req.body.habitname;
  habit.description = req.body.habitdescription;
  habit.interval = 24;
  habit.duration = 720;
  habit.reminderfreq = 24;
  habit.remindertype = req.body.notification;
  // INSERT INTO goodhabits VALUES(default, 1, 'Code', 'Code Every day', 24, 5000, 24, 'text');
  // Write queries to interact with postgres
  knex('goodhabits').insert(habit).then(function(success) {
    res.render('createHabit', {
      habit: 'Habit created'
    });
  }, function(failure) {
    console.log(failure);
  });
}, function(failure) {
  console.log('You failed to retrive route: ' + failure);
});
// Log a habit
router.post('/habits/log/:userid/:habitid', function(req, res) {
  var userid = req.params.userid;
  var habitid = req.params.habitid;
  var log = {};
  log.userid = userid;
  log.habitid = habitid;
  knex('habitlog').insert(habit).then(function(success) {
    console.log(success);
  }, function(failure) {
    console.log(failure);
  });
});
// Get habits based on user ID
router.get('/habits/get/:userid/:habitid', function(req, res) {
  var userid = req.params.userid;
  var habitid = req.params.habitid;
  res.write('/habits/create/' + userid + habitid);
  res.end();
}, function(failure) {
  console.log('You Failed: ' + failure);
});
router.get('/:id/habits/create', function(req, res, next) {
  res.render('createHabit', {
    title: 'Habbit Rabbit'
  });
});
router.post('/:id/habits/create', function(req, res, next) {
  console.log(req.body);
  res.render('createHabit', {
    title: 'Habbit Rabbit'
  });
});
// get habits based on user and habbit id
router.get('/habits/get/:userid/:habitid', function(req, res) {}, function(failure) {
  console.log('You Failed: ' + failure);
});
module.exports = router;
