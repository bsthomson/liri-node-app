require("dotenv").config();

const fs = require("fs");

const Spotify = require("node-spotify-api");
const Twitter = require("twitter");
const request = require("request");

const keys = require("./keys.js");
// const randomTxt = require("./random.txt");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var search = process.argv.slice(3).join(" ");

var trackQuery; 
function spotInput() {
    if (search === undefined) {
        trackQuery = "ace of base";
    } else {
        trackQuery = search;
    }
};

var movieQuery;
function movieInput() {
    if (search === undefined) {
        movieQuery = "mr nobody";
    } else {
        movieQuery = search;
    }
};

function myTweets () {
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
};

if (command === "my-tweets") {
    myTweets();
} else if (command === "spotify-this-song") {
    spotInput();
    spotify.search({type: 'track', query: trackQuery, limit: '1'}, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("----");
        console.log("The artist is " + data.tracks.items[0].album.artists[0].name);
        console.log("----");
        console.log("The full track name is " + "'" + data.tracks.items[0].name + "'");
        console.log("----");
        console.log("A demo can be heard at " + data.tracks.items[0].preview_url);
        console.log("----");
        console.log("An album the track can be found on is " + "'" + data.tracks.items[0].album.name + "'");        
    });
} else if (command === "movie-this") {
    movieInput();
    request('https://www.omdbapi.com/?apikey=trilogy&t=' + movieQuery + '&plot=short&r=json', function (error, response, body) {
        if (error) {
            return console.log('error', error); 
        } 
        movie = JSON.parse(body);
        console.log("----");
        console.log("The title of the movie is " + "'" + movie.Title + "'");
        console.log("----");
        console.log("This movie came out in " + movie.Year);
        console.log("----");
        console.log(movie.Ratings[0].Source + " " + movie.Ratings[0].Value);
        console.log("----");
        console.log(movie.Ratings[1].Source + " " + movie.Ratings[1].Value);
        console.log("----");
        console.log("This movie was produced in " + movie.Country);
        console.log("----");
        console.log("This movie came out in these languages " + movie.Language);
        console.log("----");
        console.log("Plot: " + movie.Plot);
        console.log("----");
        console.log("These were the actors in the movie: " + movie.Actors);
    })
} else if (command === "do-what-it-says") {
    fs.readFile("./random.txt", "utf8", (err, data) => {
        if (err) {
            return console.log(err);
        }
        var dataArray = data.split(",");
        
    })
} else {
    console.log("You speak gibberish and I wnat nothing to do with it");
};