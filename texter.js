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
rule.hour = 15;
rule.minute = 01;

texter.getUsers = function(){
  schedule.scheduleJob(rule, function () {
    console.log('so...what?');
  });
};

texter.sendText = function(num, text){
  var number = '';
  if (num.length === 10){
    number = '+1' + num;
  } else if (num.length === 11){
    number = '+' + num;
  } else {
    number = num;
  }
    console.log(number, text);

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

  knex.select('*').from('users').leftJoin('goodhabits', 'users.id', 'goodhabits.userid').then(function(success){
    for (var i = 0; i < success.length; i++) {
      console.log(success[i]);
      if (success[i].id !== null){
        texter.sendText(success[i].phone, 'Hi ' + success[i].firstname + ', have you logged about ' + success[i].habitname + ' today?');
      }
    }


  });


  // get users who haven't logged today
  // knex.select('*').table('users').then(function(success) {
  //   var counter = 0;
  //   var users = {};
  //   for (var i = 0; i < success.length; i++) {
  //     users[success[i].id] = {};
  //     users[success[i].id].phone = success[i].phone;
  //     users[success[i].id].fname = success[i].firstname;
  //
  //     knex.select('*').table('goodhabits').where('userid', success[i].id).then(function (greatSuccess) {
  //       console.log(greatSuccess);
  //       if (greatSuccess.length >= 1){
  //         // loop through
  //         for (var j = 0; j < greatSuccess.length; j++){
  //           users[greatSuccess[j].userid].habit[j] = greatSuccess[j].habitname;
  //         //   console.log(greatSuccess);
  //         //   console.log(phone + ' ' + name + ' this is a message about ' + greatSuccess[j].habitname);
  //         }
  //
  //         // texter.sendText()
  //       } else {
  //         console.log('no habits');
  //       }
  //       counter++;
  //       if (counter === success.length){
  //         // texter.sendText(phone, 'Hi ' + success[i].firstname + ', have you logged about ' + greatSuccess[j].habitname + ' today?');
  //         console.log(users);
  //       }
  //     });
  //   }
  // });


module.exports = texter;
