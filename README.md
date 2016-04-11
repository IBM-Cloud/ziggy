### Little Wonder: Exploring David Bowie's lyrics with Python, Watson & Bluemix
 
![concept](illustrations/bowie-hi.png) 
 
From 'Space Oddity' to 'Blackstar', David Bowie inspired us with his diverse personas. What can IBM Watson reveal about those iconic personalities through natural language analysis? That's the mission of 'Ziggy' a little Python app that builds a database of songs, and digs into the style and tone of writing within them. In this session, we'll see how Ziggy works, discuss use cases for the technology, compare outputs, and think about future iterations.

Reference:

http://blog.danwin.com/examples-of-web-scraping-in-python-3-x-for-data-journalists/

### Getting Started

#### Application Requirements
* Python 2.7.11

##### (Mostly) Local Development

1. Clone or download this repo onto your machine.
1. Install [application requirements](application-requirements) as needed.
1. Open application directory in your terminal and run
    `pip install -r ./requirements.txt`
1. This application cannot run without coupled Bluemix services (Watson personality insights and a Cloudant database).  To run a local copy of the application, complete the following steps.
    1.  Create and bind the required services (personality insights, and Cloudant) to your app. 
    1.  Install go-lang, if needed.
    1.  Install [copyenv](https://github.com/jthomas/copyenv), a cf tools plugin by running:
        1.  `go get github.com/jthomas/copyenv `
        1.  ` cf install-plugin $GOPATH/bin/copyenv`
    1.  Now run ```eval `$(cf copyenv <app name>)` ```
1. Lastly, the app features a Twitter integration, so Twitter OAuth credentials are needed as well.  If you don't have them, [start here](https://dev.twitter.com/oauth/overview/application-owner-access-tokens).
    1.  Run the following  `export TWITTER_CREDS='{"access_key": "<ACCESS KEY>", "access_secret": "<ACCESS SECRET>", "consumer_key": "<CONSUMER KEY>", "consumer_secret": "<CONSUMER SECRET>"}'`
1. Run `python ./server.py` to start your server.
1. Open a browser to [http://127.0.0.1:5000/setup](http://127.0.0.1:5000/setup)

##### Deploy to Bluemix

1. Create services in your Bluemix org and space that will align with the services expected in `manifest.yml`.
    * `cf create-service cloudantNoSQLDB Shared cloudant_ziggy`
    * `cf create-service personality_insights tiered insights_ziggy`
    * `cf create-service tone_analyzer tiered tone_ziggy`
    * Once the application is running be sure to initially request `/setup` from a browser to cache all personas.
    
##### Lyrics

This project depends on a private song database. For rights reasons it cannot share lyrics! You'll need to create a database of lyrics to work with - while deploying the Bowie app as is may be interesting, it might be fun to use the same approach with a different artist.

The song database is a list of json documents that take this structure:

{
  "_id": "SONG NAME",
  "url": "URL to song ( optional )",
  "name": "SONG NAME",
  "lyrics": "SONG LYRICS"
}

The albums database is a list of json documents that take this structure:

{
  "_id": "ALBUM NAME",
  "songs": [
    "SONG ONE",
    "SONG TWO",
    "SONG THREE",
    "SONG FOUR",
    "SONG FIVE",
    "SONG SIX",
    "SONG SEVEN",
    "SONG EIGHT",
    "SONG NINE",
    "SONG TEN"
  ]
}

Where the song names match to ids of the songs in the songs database

It is important that the song name is the same in the name and _id fields, as this is used as a key.

The personas.json document would also need to change if you choose a different artist, that document lists personas where each persona has a set of albums that need to match the ALBUM NAME in the id of an album document. You can see personas.json for Bowie in the code.

Assuming you took a persona type approach for another artist, you would need to include some new artwork too! We'd be glad to see insights on other artists, so let us know if you do :)


##### API routes

*  `/api/personas`  will return a JSON object listing personas and the albums that have been assigned to them.
*  `/api/persona/<NAME>` will send a concatenated string containing the lyrics from every song in every album for the passed persona to the Watson Personality Insights service and return the calculated profile for that persona as a JSON object
* `/api/twitter/<TWITTER HANDLE>` will pull the most recent 3200 tweets from the passed twitter handle and calculate a Watson personality profile from them.  The Euclidean distance for this profile will be calculated for each of the personas and a JSON object will be returned containing a summary of each persona with the distance along with the Twitter profile's summary.

