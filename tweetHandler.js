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
    t.get('statuses/mentions_timeline', {count: 10}, function(err, data, response){
      console.log(err);
      if (data.length > 0) {
            console.log(idStrings);
        for(var i = 0; i < data.length; i++){
          var currentTweet = data[i];
          //This if statement determines whether we have already handled this specific tweet
          if(!idStrings[currentTweet.id_str]){
           idStrings[currentTweet.id_str] = true;
            var tweetObj = {};
            tweetObj.user =  currentTweet.user.screen_name;
            tweetObj.text = currentTweet.text;
            latestMentions.push(tweetObj);
            console.log(latestMentions);
          }
        }
        module.exports.replyToMentions();
      }
    });
  },

  replyToMentions: function(){
    console.log(latestMentions);
    while (latestMentions.length > 0) {

      var currentMention = latestMentions.pop();
      console.log(currentMention);
      //responseTweet is the string we will send to twitter to tweet for us
      var responseTweet = 'Hello @';
      responseTweet += currentMention.user;
      responseTweet += '\nI hope you are having a wonderful day! \n-Your Favorite Node Server';
      console.log(responseTweet);

      //twit will now post this responseTweet to twitter. This function takes a string and a callback
      t.post('statuses/update', { status: responseTweet }, function(err, data, response){
        console.log('posted: ' + responseTweet);
      });

    }
  }

};