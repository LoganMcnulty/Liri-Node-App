require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

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
console.log(commandValue);

function liriLaunch (command){
    switch (command) {
        case "spotify-this-song":
          spotifyLaunch();
          break;
    default:
    console.log("not a recognized command");
}
}

liriLaunch(command);

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
            console.error(err);
        }
    console.log(data.tracks.items[0].artists[0].name);
    // console.log(data.tracks.items[0]);

})
}
