//Initialize a REST client for Twilio in a single line:
var client = require('twilio')();
var schedule = require('node-schedule');

var texter = {};

// set RecurrenceRule for
var rule = new schedule.RecurrenceRule();
rule.hour = 14;
rule.minute = 54;

texter.scheduleText = function(num, text){

  schedule.scheduleJob(rule, function () {
    console.log(num, text);

  // Use this convenient shorthand to send an SMS:
  client.sendSms({
      to: num,
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
  });
};


module.exports = texter;
