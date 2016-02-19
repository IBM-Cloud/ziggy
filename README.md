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
    * Once the application is running be sure to initially request `/setup` from a browser to cache all personas.

##### ToDo: Document needed lyrics database...  Probably can't include ziggy-scrape repo if this is made public.



##### API routes

*  `/api/personas`  will return a JSON object listing personas and the albums that have been assigned to them.
*  `/api/persona/<NAME>` will send a concatenated string containing the lyrics from every song in every album for the passed persona to the Watson Personality Insights service and return the calculated profile for that persona as a JSON object
* `/api/twitter/<TWITTER HANDLE>` will pull the most recent 3200 tweets from the passed twitter handle and calculate a Watson personality profile from them.  The Euclidean distance for this profile will be calculated for each of the personas and a JSON object will be returned containing a summary of each persona with the distance along with the Twitter profile's summary.

