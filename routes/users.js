'use strict';

var express = require('express');
var router = express.Router();

// reqire pg that interacts with knex
var pg = require('pg');

var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

//********* USER ROUTES***********//

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;

  // HABITS DATA REQUEST BASED ON USER ID
  knex.select('*').table('goodhabits').where('userid', id).then(function(success) {
    // NEED TO ADD VIEWS BASED ON DATA RETURNED
    console.log(success);
  }, function(failure) {
    console.log('The query Failed: ' + failure);
  });

  // HABIT LOG DATA REQUEST BASED ON USER ID
  knex.select('*').table('habitlog').where('userid', id).then(function(success) {
    // NEED TO ADD VIEWS BASED ON DATA RETURNED
    console.log(success);
  }, function(failure) {
    console.log('The query Failed: ' + failure);
  });

  res.render('users', {
    title: 'Show page for user with ID:' + id
  });

});

// Get USER by ID
router.get('/get/:id', function(req, res) {

  var id = req.params.id;
  knex.select('*').table('users').where('id', id).then(function(success) {
    console.log(success[0].firstname);
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
  habit.habitname = req.body.habitName;
  habit.description = req.body.habitDescription;
  habit.interval = req.body.habitInterval;
  habit.duration = req.body.habitDuration;
  habit.reminderfreq = req.body.habitReminderFreq;
  habit.remindertype = req.body.habitReminderType;


  // INSERT INTO goodhabits VALUES(default, 1, 'Code', 'Code Every day', 24, 5000, 24, 'text');
  // Write queries to interact with postgres
  knex('goodhabits').insert(habit).then(function(success) {
    res.write('/habits/create/' + userid);
    res.end();

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
router.get('/habits/get/:userid/:habitid', function(req, res) {

}, function(failure) {
  console.log('You Failed: ' + failure);
});


// Update a habit For a user
router.get('/habits/update/:userid/:habitid', function(req, res) {}, function(failure) {
  console.log('You Failed: ' + failure);
});



module.exports = router;
