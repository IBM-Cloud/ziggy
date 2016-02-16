var mugshots = [
    {
        name: "Man Who Sold The World",
        image: "early.png",
        style: "Psychedelic Folk",
        background: "#dd4131",
        date: "1967-72",
        description: "Electronica-influenced sound partly inspired by the industrial and drum and bass culture of the 1990s"
    },
    {
        name: "Ziggy Stardust",
        image: "ziggy.png",
        style: "Glam Rock",
        background: "#9694a2",
        date: "1972-73",
        description: "A rock star who acts as a messenger for extraterrestrial beings"
    },
    {
        name: "Aladdin Sane",
        image: "aladdin.png",
        style: "Glam Rock",
        background: "#f9df3c",
        date: "1972-73",
        description: "Electronica-influenced sound partly inspired by the industrial and drum and bass culture of the 1990s"
    },

    {
        name: "Berlin Trilogy",
        image: "berlin.png",
        style: "Industrial",
        background: "#014f83",
        date: "1976-79",
        description: "Electronica-influenced sound partly inspired by the industrial and drum and bass culture of the 1990s"
    },
    {
        name: "Pierrot",
        image: "pierrot.png",
        style: "New Wave",
        background: "#b18f67",
        date: "1980-83",
        description: "Electronica-influenced sound partly inspired by the industrial and drum and bass culture of the 1990s"
    },
    {
        name: "Modern Love",
        image: "modern.png",
        style: "Pop",
        background: "#8fa6ce",
        date: "1984-88",
        description: "Electronica-influenced sound partly inspired by the industrial and drum and bass culture of the 1990s"
    },
    {
        name: "Earthling",
        image: "earthling.png",
        style: "Electronic, Grunge",
        background: "#7bc253",
        date: "1992-98",
        description: "Electronica-influenced sound partly inspired by the industrial and drum and bass culture of the 1990s"
    },
    {
        name: "Lazarus",
        image: "lazarus.png",
        style: "Neoclassicist",
        background: "#f3776b",
        date: "2013-16",
        description: "Electronica-influenced sound partly inspired by the industrial and drum and bass culture of the 1990s"
    }
]

function drawChart() {
    google.charts.load('current', {
        'packages': ['sankey']
    });
    google.charts.setOnLoadCallback(readPersonaData);
}


function draw(chartdata) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'From');
    data.addColumn('string', 'To');
    data.addColumn('number', 'Weight');
    data.addRows(chartdata);

    // Sets chart options.
    var options = {
        width: 500,
        height: 400
    };

    var insights = document.getElementById('insights');
    var anchor = document.createElement('div');
    insights.appendChild(anchor);

    // Instantiates and draws our chart, passing in some options.
    var chart = new google.visualization.Sankey(anchor);
    chart.draw(data, options);
}


function readPersonaData() {

    var persona = getParameterByName('persona');

    console.log('readPersonaData');

    mugshots.forEach(function (mug) {
        if (mug.name === persona) {
            var pic = document.createElement('img');
            pic.src = 'images/mug/' + mug.image;
            pic.className = "pic"

            var avatar = document.getElementById('avatar');
            avatar.appendChild(pic);

            var banner = document.getElementById('banner');
            banner.style.backgroundImage = 'url(images/header/' + mug.image + ')';
            banner.style.backgroundSize = 'cover';

            changeColor(mug.background);

            var name = document.getElementById('personaName');
            name.innerHTML = mug.name;

            var description = document.getElementById('description');
            description.innerHTML = mug.description;

        }
    });


    function newTweet(chartdata) {
        var tweet = document.createElement('div');
        tweet.className = 'tweet';

        var icon = document.createElement('div');
        icon.className = 'icon';

        tweet.appendChild(icon);

        var content = document.createElement('div');
        content.className = 'content';
        tweet.appendChild(content);

        var from = document.createElement('div');
        from.className = 'from';
        content.appendChild(from);

        var tweetContent = document.createElement('div');
        tweetContent.className = 'tweetContent';
        content.appendChild(tweetContent);

        var chart = document.createElement('div');
        chart.className = 'chart';
        content.appendChild(chart);

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'From');
        data.addColumn('string', 'To');
        data.addColumn('number', 'Weight');
        data.addRows(chartdata);

        // Sets chart options.
        var options = {
            width: 400
        };

        var chart = new google.visualization.Sankey(chart);
        chart.draw(data, options);

        var tweets = document.getElementById('tweets');
        tweets.appendChild(tweet);
    }


    var xmlhttp = new XMLHttpRequest();
    var url = '../api/persona/' + persona;

    var openness = [];

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
            myFunction(data);

            var bigfive = data.results.tree.children[0].children[0].children;

            var factordata = [];
            /* Openness */

            /* Adventurousness, Artistic interests, Emotionality, Imagination, Intellect, Liberalism */

            bigfive.forEach(function (factor) {

                var total = 0;

                factordata = [];


                factor.children.forEach(function (trait) {

                    var fromName = document.createElement('div');
                    fromName.className = 'content';

                    fromName.innerHTML = trait.name;


                    var factors = factor.children.length;

                    var sankey = Math.round(trait.percentage * 100);

                    var contribution = Math.round(sankey / factors);

                    console.log(contribution);

                    total = total + contribution;


                    var traitdata = [factor.id, trait.name, contribution];

                    if (contribution > 0) {

                        factordata.push(traitdata);
                    }
                })

                newTweet(factordata);

            })
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function myFunction(arr) {}
}

function changeColor(color) {
    var cols = document.getElementsByClassName('count');
    for (i = 0; i < cols.length; i++) {
        cols[i].style.color = color;
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}