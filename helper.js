var Artist = require('./db/artists.js');
// var Stages = require('.db/stages.js');

var helper = {};

// get artist
helper.getArtistPerforms = function (filter, callback) {
  Artist.find(filter, function (err, results) {
    if (err) {
      console.log(err);
      return;
    }

    if (results) {
      callback(results);
    }
  });
};

// helper.getStagePerforms = function(name, time, callback) {
//   Stages.find({name : name}, function(err, results){
//     if (err) {
//       console.log(err);
//       return;
//     }

//     if (results.length) {
//       var lineUp = results[0].lineup;
//       for (var i = 0; i < lineUp.length; i++) {
//         // make sure same day
//         var now = new Date(time);
//         var date = new Date(lineUp[i]).toDateString();
//         var to = new Date(lineUp[i]).toDateString();

//         if (now.toDateString() === date && lineup.)
//       }
//       console.log(results) ;
//     }
//   });
// }
 
module.exports = helper;
