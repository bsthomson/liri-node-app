require("dotenv").config();

const fs = require("fs");

const Spotify = require("node-spotify-api");
const Twitter = require("twitter");
const request = require("request");

const keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var search = process.argv.slice(3).join(" ");

// var trackQuery; 
function spotInput() {
    if (search === "") {
        search = "ace of base";
    } debugger;
    spotify.search({type: 'track', query: search, limit: '1'}, function(err, data) {        
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var results = `
        \nArtist: ${data.tracks.items[0].album.artists[0].name}
        \nTrack: ${data.tracks.items[0].name}
        \nDemo: ${data.tracks.items[0].preview_url}
        \nAlbum: ${data.tracks.items[0].album.name}`
        console.log(results);
        logThis(results);        
    });
};

function movieInput() {
    if (search === "") {
        search = "mr nobody";
    }
    request('https://www.omdbapi.com/?apikey=trilogy&t=' + search + '&plot=short&r=json', function (error, response, body) {
        if (error) {
            return console.log('error', error); 
        } 
        movie = JSON.parse(body);
        var results = `
        \nThe title of the movie is '${movie.Title}'
        \nThis movie came out in ${movie.Year}
        \n${movie.Ratings[0].Source}: ${movie.Ratings[0].Value}
        \n${movie.Ratings[1].Source}: ${movie.Ratings[1].Value}
        \nThis movie was produced in ${movie.Country}
        \nLanguage(s): ${movie.Language}
        \nPlot: ${movie.Plot}
        \nActors: ${movie.Actors}`
        console.log(results);
        logThis(results);
    });
};

function myTweets () {
    var params = {screen_name: 'BBlimpson'};    
    client.get('statuses/user_timeline', params, function(error, tweets, response){        
        if (error) {
            console.log(error);
        } else if (tweets.length < 21) {
            for (i=0; i < tweets.length; i++){
                var results = "\nOn " + tweets[i].created_at + " Blam Blimpson tweeted " + tweets[i].text;
                console.log(results)
                logThis(results);
            };
        } else {
            for (i=0; i < 21; i++){
                var results = "\nOn " + tweets[i].created_at + " Blam Blimpson tweeted " + tweets[i].text;
                console.log(results)
                logThis(results);
            };
        }
    });
};

function logThis(results) {
    fs.appendFile('log.txt', results + ", ", (err) => {
        if (err) throw err;
    })
};

if (command === "my-tweets") {
    myTweets();
} else if (command === "spotify-this-song") {
    spotInput();
} else if (command === "movie-this") {
    movieInput();
} else if (command === "do-what-it-says") {
    fs.readFile("./random.txt", "utf8", (err, data) => {
        if (err) {
            return console.log(err);
        }
        var dataArray = data.split(",");
        if (dataArray[0] === 'my-tweets') {
            myTweets();
        } else if (dataArray[0] === "spotify-this-song") {
            search = dataArray[1];
            spotInput();
        } else if (dataArray[0] === "movie-this") {
            search = dataArray[1];
            movieInput();
        }
    })
} else {
    console.log("Possible commands: my-tweets, spotify-this-song (song), movie-this (movie), or do-what-it-says");
};