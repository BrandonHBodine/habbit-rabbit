//Initialize a REST client for Twilio in a single line:
var client = require('twilio')();
var schedule = require('node-schedule');

// reqire pg that interacts with knex
var pg = require('pg');

var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

var texter = {};

// set RecurrenceRule for
var rule = new schedule.RecurrenceRule();
rule.hour = 16;
rule.minute = 01;

texter.sendText = function(num, text){
  var number = '';
  if (num.length === 10){
    number = '+1' + num;
  } else if (num.length === 11){
    number = '+' + num;
  } else {
    number = num;
  }

  // Use this convenient shorthand to send an SMS:
  client.sendSms({
      to: number,
      from:'+17816674950',
      body: text
  }, function(error, message) {
      if (!error) {
          console.log('Success! The SID for this SMS message is:');
          console.log(message.sid);
          console.log('Message sent on:');
          console.log(message.dateCreated);
      } else {
          console.log('Oops! There was an error.');
      }
    });
  };

texter.scheduleTexts = function () {
  schedule.scheduleJob(rule, function () {
    knex.select('*').from('users').leftJoin('goodhabits', 'users.id', 'goodhabits.userid').then(function(success){
      for (var i = 0; i < success.length; i++) {
        if (success[i].id !== null){
          texter.sendText(success[i].phone, 'Have you logged about ' + success[i].habitname + ' today?');
        }
      }
    });
  });
};

texter.confirmText = function (phone, name) {
  texter.sendText(phone, 'Hi ' + name + ', welcome to Habbit Rabbit!');
};


module.exports = texter;
