'use strict';

var express = require('express');
var router = express.Router();
var text = require('../ahoy.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Habbit Rabbit' });
});

/* GET home page. */
router.get('/index.html', function(req, res, next) {
  res.render('index', { title: 'Habbit Rabbit' });
});

// ***** TEXT MESSAGE ROUTES *****//
// send confirmation text Message t
router.get('/text', function(req, res){
  res.write('you got a text!');
  text.send('+15088435229', 'this is a message');
  res.end();
}, function(failure){
  console.log('sorry, try again :(');
});

module.exports = router;
