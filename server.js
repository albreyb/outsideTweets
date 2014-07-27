var app = require('express')();
var twit = require('twit');
var wit = require('./wit.js');

var consumer_key = require('./secrets.js').consumer_key;
var consumer_secret = require('./secrets.js').consumer_secret;
var access_token = require('./secrets.js').access_token_key;
var access_token_secret = require('./secrets.js').access_token_secret;

var port = process.env.port || 3000;



twit.get('/statuses/mentions_timeline', {count: 10}, function(data){
  console.log('data');
});

var server = app.listen(port, function() {
  console.log('listening to port!');
});
