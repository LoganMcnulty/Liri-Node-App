//require inquirer and fs modules
    var inquirer = require("inquirer");
    var fs = require("fs");

//require dotenv to pass keys to keys.js for spotify, require keys.js, and require spotify API
    require("dotenv").config();
    var keys = require("./keys.js");
    var Spotify = require('node-spotify-api');

//spotify variable for executing search
    var spotify = new Spotify(keys.spotify);

//require axios for bands in town and omdb API pulls
    var axios = require("axios");

//require moment to convert concert dates for bands in town
    var moment = require('moment');

//store all process.argv array values in nodeArgs
    var nodeArgs = process.argv

// 2nd index of nodeArgs is the "command"
    var command = nodeArgs[2];

//slice together every argument >= 3 of the nodeArgs array and join into a string
    var commandValue = nodeArgs.slice(3).join(" ");

//divider for logging to log.txt
    var divider = "\n------------------------------------------------------------\n\n";

//liriLaunch command that reads from global command value using switch function to determine which sub function to run
//**command, value function calls are only used for "do-what-it-says" command**
//otherwise, the switch "command" is reading from the global command value 
    function liriLaunch (command, value){
        console.log();
        switch (command) {
            case "spotify-this-song":
                spotifyLaunch(value);
                break;
            case "concert-this":
                bandsInTown(value);
                break;
            case "movie-this":
                movieSearch(value);
                break;
            case "do-what-it-says":
                doWhat();
                break;
            default:
                console.log("not a recognized command");
        }
    }

//bandsIntown function
    function bandsInTown(value) {
//If a value is passed to the function, then use the value, with quotes removed, for the artistName to be used in the queryURL
        if(value){
            artistName = value.replace(/"/g, "");
        }
//if global command value is empty, then return this message
        else if (commandValue === ""){
            console.log("Invalid artist or band entered");
        }
//if no value is passed, then use global commandValue for artistName in queryURL
        else{
        var artistName = commandValue
        }
//axios API call
        var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
        axios.get(queryUrl).then(
            function(response) {
                console.log(`Upcoming concerts for ${artistName}`);

            
            // concert array for storage and push to log file later
                var concertArray = [];
            // for loop for printing each upcoming concert venue with a date time
            // loop also pushes each value to the conert array
                for (i = 0; i < response.data.length; i++){
                    var date = moment(response.data[i].datetime);
                    var newDate = date.format("MM/DD/YY hh:mm");
                    console.log(`-----${response.data[i].venue.name} in ${response.data[i].venue.city} on ${newDate}-----`);
                    var tempConcertString = (`${response.data[i].venue.name} in ${response.data[i].venue.city} on ${newDate}`);
                    concertArray.push(tempConcertString);
                }

            var artistIntro = (`${artistName} is playing at ... \n`)
            // write the concert array to the log.txt file
                fs.appendFile("log.txt", artistIntro + concertArray.join(', ') + divider, 
                function(err) {
                    if (err) throw err;
                });
            })
        //error trapping
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
        
    };

//see bandsIntown() above, these are the same 
    function movieSearch(value) {
        if (value){
            movieName = value;
        }

        else if (commandValue === ""){
            var movieName = "Mr. Nobody";
        }
        else {var movieName = commandValue}

        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl).then(
            function(response) {
                // console.log(response.data);
                    console.log(`-----Here's some information on ${movieName}-----`)
                    console.log(`Title of Movie: ${response.data.Title}`)
                    console.log(`Release Year: ${response.data.Year}`);
                    console.log(`Country(s) of Origin: ${response.data.Country}`);
                    console.log(`Language(s): ${response.data.Language}`);
                    console.log(`Plot: ${response.data.Plot}`);
                    console.log(`Actors: ${response.data.Actors}`);
                    console.log(`\n-----Ratings-----`)
                        // store ratings array, and use for loop to creat ratings strings
                        // limit to only first and second positions array in order to only pull IMDB and rotten tomatoes
                            var ratings = response.data.Ratings;
                                for (i = 0; i <= 1; i++){
                                    console.log(`${ratings[i].Source}: ${ratings[i].Value} `)
                                }
                    
                // store movie data in variable to push to log file 
                    var movieData = [
                    "Movie name: " + response.data.Title,
                    "Release Year: " + response.data.Year,
                    "Country(s) of Origin: " + response.data.Country,
                    "Language(s): " + response.data.Language,
                    "Plot: " + response.data.Plot,
                    "Actors: " + response.data.Actors,
                    "IMDB Rating: " + ratings[0].Value,
                    "Rotten Tomatoes Rating: " + ratings[1].Value
                    ].join("\n\n");
                    
                // push movieData to log.txt and add a divider
                    fs.appendFile("log.txt", movieData + divider, function(err) {
                        if (err) throw err;
                    });
                
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

//function that reads from the "random.txt" file, and does whatever is written in this file
    function doWhat(){
        fs.readFile("random.txt", "utf8", function(error, data) {
            // If the code experiences any errors it will log the error to the console.
            if (error) {
            return console.log(error);
            }
        
        //story the data in the txt file in an array split by commas
            var dataArr = data.split(",");
        //sub command to be passed to liriLaunch() is the first index of the dataArr variable
            subCommand = dataArr[0];
        //subCommandValue (artist, song, movie) variable created with empty string
            subCommandValue = ''
        //build subCommandValue using a for loop
                for (i = 1; i < dataArr.length; i++){
                subCommandValue = `${subCommandValue} ${dataArr[i]}`.trim();
                }
        //launch liriLaunch() passing subCommand and subCommandValue
            liriLaunch(subCommand, subCommandValue);
        });
    }

//spotify function
    function spotifyLaunch (value) {
    //update searchitem if a value is passed
        if (value){
            var searchItem = {
                type: 'track',
                query: value,
        }}
    // if global commandValue is empty, default to this track
        else if (commandValue === ""){
            var searchItem = {
                type: 'track',
                query: "The Sign Ace of Base",
        }}
    // otherwise use the global commandValue
        else{
            var searchItem = {
                type: 'track',
                query: commandValue
        }};

    // spotify search function, passsing "searchItem", returning errors, and data
        spotify.search(searchItem, function(err, data) {
        // console log error if returned
            if (err) {
                console.error("Error: " + err);
            }
        //console log track name, prepare for artists on track to be shown after this line
            console.log(`-----Artist(s) featured on ${data.tracks.items[0].name}-----`)
        
        // create an artistsOnTrack array for storing in log.txt
            var artistsOnTrack = [];

        // for loop in case there is more than one artist
        // console log each artist to the command line
        // push each artist to the artistsOnTrack array
            for (i = 0; i < data.tracks.items[0].artists.length; i++){
                console.log(`*${data.tracks.items[0].artists[i].name}*`);
                artistsOnTrack.push(data.tracks.items[0].artists[i].name);
            }

        //console log the track name, and from which album, with a link to the Spotify URL
            console.log(`\n-----Listen to ${data.tracks.items[0].name} from the "${data.tracks.items[0].album.name}" album now-----`)
            console.log(data.tracks.items[0].external_urls.spotify);

        // trackData to be pushed to log.txt
            var trackData = [
                "Track Name: " + data.tracks.items[0].name,
                "Artists on Track: " + artistsOnTrack.join(', '),
                "Track Album: " + data.tracks.items[0].album.name,
                "Listen to this track now: " + data.tracks.items[0].external_urls.spotify
            ].join("\n\n");

        //append log.txt with trackData and a divider
            fs.appendFile("log.txt", trackData + divider, function(err) {
                if (err) throw err;
              });
    })
}

//launch the liriLaunch function
liriLaunch(command);
