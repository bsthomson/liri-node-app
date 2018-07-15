require("dotenv").config();
require("./keys.js");

const spot = require("node-spotify-api");
const Twitter = require("twitter");
const request = require("request");

// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

if (process.argv[2] === "my-tweets") {
    console.log(client);
} else if (process.argv[2] === "spotify-this-song") {
    console.log("Songs, Yeah!");
} else if (process.argv[2] === "movie-this") {
    console.log("Movies, Yeah!");
} else if (process.argv[2] === "do-what-it-says") {
    console.log("do-what-it-says");
} else {
    console.log("You speak gibberish and I wnat nothing to do with it");
};