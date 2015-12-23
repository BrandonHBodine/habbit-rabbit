'use strict';

var express = require('express');
var router = express.Router();

var pg = require('pg');
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Habbit Rabbit' });
});

/* GET home page. */
router.get('/index.html', function(req, res, next) {
  res.render('index', { title: 'Habbit Rabbit' });
});

// AUTHENTICATION FOR USER SIGNIN
router.post('/signin', function(req, res, next) {
  // knex call for user match
  var user = {};
  user.username = req.body.username;
  user.password = req.body.password;

  // Write queries to interact with postgres
  knex.select('*').from('users').where('username', user.username).then(function(success){
    // loop through users
    for (var i = 0; i < success.length; i++) {
      if (success[i].password === user.password){
        user.id = success[i].id;
        // if match found - redirect to user page
        res.redirect('/users/'+user.id);
      }
      else {
        // return fail message
      }
    }

  }, function(failure) {
    console.log(failure);
  });
  // NEED TO HAVE VIEW MADE FOR THIS
}, function(failure) {
  res.write('this is the new page and you failed');
  res.end();
});

// // ***** TEXT MESSAGE ROUTES *****//
// // send confirmation text Message t
// router.get('/text', function(req, res){
//   res.write('you got a text!');
//   text.send('+15088435229', 'this is a message');
//   res.end();
// }, function(failure){
//   console.log('sorry, try again :(');
// });

module.exports = router;
