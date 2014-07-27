var twit = require('twit');
var wit = require('./wit.js');
var keys = require('./secrets.js');

var consumer_key = keys.consumer_key;
var consumer_secret = keys.consumer_secret;
var access_token = keys.access_token_key;
var access_token_secret = keys.access_token_secret;



var t = new twit({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token: access_token,
  access_token_secret: access_token_secret
});

var latestMentions = [];
var idStrings = {};

var since_id;

module.exports = {

  getMentions: function() {
    t.get('/statuses/mentions_timeline', { since_id: since_id }, function(err, data, response){
      if (data.length > 0) {

        for(var i = data.length - 1; i >= 0; i--) {
          var currentTweet = data[i];
          if (i === data.length - 1) {
            since_id = currentTweet.id + 1;
          }
          //This if statement determines whether we have already handled this specific tweet
          var tweetObj = {};
          tweetObj.text = currentTweet.text;
          tweetObj.user = currentTweet.user.screen_name;
          module.exports.replyToMentions(tweetObj);
        }
      }
    });
  },

  replyToMentions: function(currentMention){
    //responseMsg is the string we will send to twitter to tweet for us
    wit.getWitForMessage(currentMention, function(witResponse) {
      var responseMsg = '@' + witResponse.message.user + ":";
      if(witResponse.intent === 'greeting'){
        console.log('A greeting was found!');
        responseMsg += '\nHello!';
        t.updateStatus(responseMsg, function(){
          console.log('a response tweet: ');
          console.log(responseMsg);
        });
      }
      else if(witResponse.intent === 'Farewell'){
        console.log('A farewell was found!');
        responseMsg += '\nGoodbye!';
        t.updateStatus(responseMsg, function(){
          console.log('a response tweet: ');
          console.log(responseMsg);
        });
      }
      else if(witResponse.intent === 'Joke'){
        console.log('A joke was requested!');
        unirest.get('http://tambal.azurewebsites.net/joke/random', function(data){
          console.log(data.body);
          responseMsg += '\n' + data.body.joke;
          t.updateStatus(responseMsg, function(){
            console.log('a response tweet: ');
            console.log(responseMsg);
          });
        });
      }
      else if(witResponse.intent === 'rude'){
        console.log('Something rude was said!');
        responseMsg += '\nThat was rude! I\'m a PG robot';
        t.updateStatus(responseMsg, function(){
          console.log('a response tweet: ');
          console.log(responseMsg);
        });
      } else{
        console.log('Unhandled intent!!!');
        console.log('Unhandled intent!!!');
        console.log('Unhandled intent!!!');
        }
      });

    }
};