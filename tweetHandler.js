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
      // console.log(data)
      if (data.length > 0) {
        var currentTweet = data[i];
        for(var i = data.length - 1; i >= 0; i--) {
          if (i === data.length - 1) {
            since_id = currentTweet.id + 1;
          }
          //This if statement determines whether we have already handled this specific tweet
          var tweetObj = currentTweet.user;
          module.exports.replyToMentions(tweetObj);
        }
      }
    });
  },

  replyToMentions: function(tweetObj){


    var to = '@' + 'AlbreyPreston' + ':';
    var responseText = 'yo sup brah';

    var tweet = to + ' ' + responseText;

    t.post('statuses/update', { status: tweet }, function(err, data, response){
      console('tweeted');
    });
  }

};