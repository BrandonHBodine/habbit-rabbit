//Initialize a REST client in a single line:
var client = require('twilio')();


var text = {};

text.send = function (num, text) {
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
};

module.exports = text;
