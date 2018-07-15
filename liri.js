require("dotenv").config();

const spot = require("node-spotify-api");
const Twitter = require("twitter");
const request = require("request");

const keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

if (process.argv[2] === "my-tweets") {
    var params = {screen_name: 'BBlimpson'};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
        if (error) {
            console.log(error);
        } else if (tweets.length < 21) {
            for (i=0; i < tweets.length; i++){
                console.log("On " + tweets[i].created_at + " Blam Blimpson tweeted " + tweets[i].text)
            };
        } else {
            for (i=0; i < 21; i++){
                console.log("On " + tweets[i].created_at + " Blam Blimpson tweeted " + tweets[i].text)
            };
        }       
    });
} else if (process.argv[2] === "spotify-this-song") {
    console.log("Songs, Yeah!");
} else if (process.argv[2] === "movie-this") {
    console.log("Movies, Yeah!");
} else if (process.argv[2] === "do-what-it-says") {
    console.log("do-what-it-says");
} else {
    console.log("You speak gibberish and I wnat nothing to do with it");
};