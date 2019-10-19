# Liri-Node-App
Language Interpretation and Recognition Interface using Node.js

**ABOUT THIS APP** 
- The LIRI app is a command line app that relies on node modules for calling upon certain APIs. The user is capable of passing the following arguments: "spotify-this-song", "concert-this", "movie-this" and "do-what-it-says". Following each command, is the command value that the command will be passed for execution.

- "Spotify-this-song" calls on Spotify's API to return track information (artist(s), and album) and a URL link to that song on Spotify's website.

- "Concert-this" calls on the Bands in Town Api, and returns the venue, city, and date of upcoming shows for the provided artist or band.

- "movie-this" takes in any given movie, and returns descriptive information for that movie (title, actors, plot, IMDB and rotten tomato ratings, year of release, country of origin, and languages the movie is available in)

- "do-what-it-says" reads from the "random.txt" file, which must contain 1) one of the four acceptable commands, and 2) a command value to be passed

- After each command, the data is organized and returned to the console log, and stored in a "log.txt" file for future reference. A log file is created if one does not already exist. 

**Command Line Input Examples** 
node liri spotify-this-song lose yourself
node liri concert-this post malone
node liri movie-this the great gatsby
node liri do-what-it-says

**Link to Video Demo**
https://drive.google.com/open?id=13Bi_1I5-DxavFG4RTAYeLHwPT8LYJ1jB

**Purpose of this app**
While this app may not yet serve enormous amounts of utility for the average person, it was fundamental in solidifying the programmer's (myself, Logan McNulty) knowledge of how node.JS interacts with javascript, how node modules can be utilized, and the power of command line applications in the software development space. 


**Modules and APIs required, and their Documentation Links**

- Node Moment API (to convert the Bands In Town Date/Time stamps from UTC)
https://momentjs.com/docs/

- Node Spotify API (for song data)
https://www.npmjs.com/package/node-spotify-api

- Dotenv (for storing keys in the node environment for reference by keys.js, required by the Spotify API)
https://www.npmjs.com/package/dotenv

- Axios (for retrieving JSON formatted data from Bands In Town, and OMDB APIs)
https://www.npmjs.com/package/axios

- Bands in town (for concert data)
https://app.swaggerhub.com/apis-docs/Bandsintown/PublicAPI/3.0.0

- OMDB API (for movie data)
http://www.omdbapi.com/

- File System Node Module (for writing to log.txt)
https://nodejs.org/api/fs.html

