'use strict';

var express = require('express');
var router = express.Router();

// reqire pg that interacts with knex
var pg = require('pg');
//database requires
var knex = require('knex')({
  client: 'pg', //we will be using pg to connect to postgres
  connection: {
    host: '127.0.0.1', //localhost server
    port: 5432, //default pg server port
    user: 'Mundizzle', //your username
    database: 'habbitrabbit' //yourdatabase name
  }

});

//********* USER ROUTES***********//
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', {
    title: 'Habbit Rabbit'
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
    console.log('You Failed: ' + failure);
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

  console.log(user);
  console.log(knex.insert(user).into('users'));

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
// Create a habit for a user
router.get('/habits/create/:userid', function(req, res) {
  var userid = req.params.userid;
  res.write('/habits/create/' + userid);
  res.end();
}, function(failure) {
  console.log('You Failed: ' + failure);
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
