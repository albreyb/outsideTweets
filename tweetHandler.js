var twit = require('twit');
var wit = require('./wit.js');
var keys = require('./secrets.js');
var artists = require('./artistParser.js');
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
          var currentMention = {};
          currentMention.text = currentTweet.text;
          currentMention.screen_name = currentTweet.user.screen_name;
          module.exports.replyToMentions(currentMention);
        }
      }
    });
  },

  replyToMentions: function(currentMention){
     var stuff = 'hey';
     if (artists(currentMention.text)) {
      stuff = artists(currentMention.text);
    }
      
    wit.getWitForMessage(currentMention, function(witResponse) {
      var responseMsg = '@' + currentMention.screen_name + ": " + stuff.artist;
      console.log(responseMsg);
      if(witResponse.intent === 'artist'){
          // t.post('statuses/update', {status: responseMsg}, function(err){
          //   console.log(err);
          // });
      }
    });

  }
};