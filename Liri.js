require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require('moment');


var nodeArgs = process.argv

var command = nodeArgs[2];
var commandValue = "";
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 2 && i < nodeArgs.length) {
      commandValue = commandValue + " " + nodeArgs[i];
    } else {
      commandValue += nodeArgs[i];
    }
  }
commandValue = commandValue.trim();


function liriLaunch (command){
    console.log();
    switch (command) {
        case "spotify-this-song":
            spotifyLaunch();
            break;
        case "concert-this":
            bandsInTown();
            break;
        case "movie-this":
            movieSearch();
            break;
        case "do-what-it-says":
            doWhat();
            break;
        default:
            console.log("not a recognized command");
    }
}

function bandsInTown() {
    if (commandValue === ""){
        console.log("Invalid artist or band entered");
    }
    else{
    var artistName = commandValue
    var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function(response) {
            console.log();
            for (i = 0; i < response.data.length; i++){
                var date = moment(response.data[i].datetime);
                var newDate = date.format("MM/DD/YY hh:mm");
                console.log(`-----${response.data[i].venue.name} in ${response.data[i].venue.city} on ${newDate}-----`);
            }
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }
};

function movieSearch() {
    if (commandValue === ""){
        var movieName = "Mr. Nobody";
    }
    else {var movieName = commandValue}

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    // console.log(queryUrl);
    axios.get(queryUrl).then(
        function(response) {
            // console.log(response.data);
            console.log(`-----Here's some information on ${movieName}-----`)
            console.log(`Title of Movie: ${response.data.Title}`)
            console.log(`Release Year: ${response.data.Year}`);
            console.log(`Country(s) of Origin: ${response.data.Country}`);
            console.log(`Language: ${response.data.Language}`);
            console.log(`Plot: ${response.data.Plot}`);
            console.log(`Actors: ${response.data.Actors}`);

            console.log(`\n-----Ratings-----`)
            var ratings = response.data.Ratings;
            for (i = 0; i <= 1; i++){
                console.log(`${ratings[i].Source}: ${ratings[i].Value} `)
            }
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
}

function doWhat(){
    console.log("do what mate?");
}

function spotifyLaunch () {
    if (commandValue === ""){
        var searchItem = {
            type: 'track',
            query: "The Sign Ace of Base",
    }}
    else{
        var searchItem = {
            type: 'track',
            query: commandValue
    }};

    spotify.search(searchItem, function(err, data) {
        if (err) {
            console.error("Error: " + err);
        }
        console.log(`-----Artist(s) featured on ${data.tracks.items[0].name}-----`)
        for (i = 0; i < data.tracks.items[0].artists.length; i++){
            console.log(`*${data.tracks.items[0].artists[i].name}*`);
        }
        console.log(`\n-----Listen to ${data.tracks.items[0].name} from the "${data.tracks.items[0].album.name}" album now-----`)
        console.log(data.tracks.items[0].external_urls.spotify);
})
}

liriLaunch(command);
