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
<<<<<<< HEAD
router.get('/', function(req, res) {
  res.send('respond with a resource');
=======
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Habbit Rabbit' });
>>>>>>> features/signupviews
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

// Create User
router.get('/create', function(req, res) {
  res.write('/create');
  res.end();
  // set
  console.log(req.body.user.firstname);
  console.log(req.body.user.lastname);
  console.log(req.body.user.email);
  console.log(req.body.user.phone);
  console.log(req.body.user.username);
  console.log(req.body.user.password);

  console.log(req.body.user.firstname);
  console.log(req.body.user.lastname);
  console.log(req.body.user.email);
  console.log(req.body.user.phone);
  console.log(req.body.user.username);
  console.log(req.body.user.password);
}, function(failure) {
  console.log('You Failed: ' + failure);
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
