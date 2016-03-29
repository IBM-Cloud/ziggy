var sortingHat;

var keys = ['Agreeableness', 'Conscientiousness', 'Openness', 'Extraversion', 'Emotional range'];

function SortingHat() {
    this.personas;
}

SortingHat.prototype.fetchPersonas = function () {
    var url = './personas.json';

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.self = this;

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);

            xmlhttp.self.personas = data.results;

            console.log('fetched personas');
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

SortingHat.prototype.compare = function compare(a, b) {
    if (a.distance < b.distance)
        return -1;
    else if (a.distance > b.distance)
        return 1;
    else
        return 0;
}


SortingHat.prototype.renderBowie = function (e) {
    console.log('render bowie');

    var stage = document.getElementById('stage');
    stage.innerHTML = "";
    var h = stage.parentElement.clientHeight - 260;
    stage.style.height = h + 'px';

    var loading = document.createElement('img');
    loading.src = './images/loading.svg';

    loading.style.height = h - 140 + 'px';
    loading.style.color = 'orange';
    stage.appendChild(loading);

    var username = document.getElementById('twitterForm');

    console.log(username.value);

    var url = '../api/twitter/' + username.value;

    var xmlhttp = new XMLHttpRequest();

    var comparisons = [];

    var personaData = this.personas;

    var self = this;

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);

            personaData.forEach(function (persona) {
                data.results[persona.name].name = persona.name;
                comparisons.push(data.results[persona.name]);
            })

            var person = data.results['twitter'];

            var sorted = comparisons.sort(self.compare);

            var match = sorted[0].name;

            var matchData = [];

            var twitterData = [];

            keys.forEach(function (key) {

                var value = sorted[0][key];

                var fixed = value.toFixed(2) * 100;

                fixed = Math.round(fixed);

                matchData.push(fixed);

                var twitterValue = person[key];

                twitterFixed = twitterValue.toFixed(2) * 100;

                twitterFixed = Math.round(twitterFixed);

                twitterData.push(twitterFixed);
            })


            personaData.forEach(function (persona) {

                if (persona.name === match) {
                    stage.innerHTML = "";

                    var w = stage.parentElement.clientWidth - 380;

                    var bowie = document.createElement('img');
                    bowie.src = './images/' + persona.sketch;
                    bowie.style.height = h - 40 + 'px';
                    stage.appendChild(bowie);


                    var infoArea = document.createElement('div');
                    infoArea.className = 'infoarea';
                    stage.appendChild(infoArea);

                    var feedback = document.createElement('div');
                    feedback.innerHTML = 'You match ' + sorted[0].name + '!';
                    feedback.className = 'feedback';

                    var furthest = sorted.length - 1;

                    var description = document.createElement('div');
                    description.innerHTML = 'Personality Insight analysis of your tweets showed that you most closely matched <a href="./personality.html?persona=' + sorted[0].name + '">' + sorted[0].name + '.</a>' + ' You were furthest away from <a href="./personality.html?persona=' + sorted[furthest].name + '">' + sorted[furthest].name + '.</a>'

                    description.className = 'feedback-info';

                    var chartHeight = (h - 100) / 2;
                    chartHeight = chartHeight.toFixed(0);

                    var content = document.createElement('div');
                    content.className = 'chartContent';
                    content.style.width = '500px';
                    content.style.height = chartHeight + 'px';
                    content.style.marginTop = '20px';

                    var polar = document.createElement('canvas');
                    polar.height = chartHeight;
                    polar.width = 500;

                    content.appendChild(polar);

                    infoArea.appendChild(content);
                    infoArea.appendChild(feedback);
                    infoArea.appendChild(description);

                    var ctx = polar.getContext("2d");

                    var stuff = {
                        labels: keys,
                        datasets: [{
                            label: sorted[0].name,
                            fillColor: "rgba(220,220,220,0.2)",
                            strokeColor: "rgba(220,220,220,1)",
                            pointColor: "rgba(220,220,220,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: matchData
                        }, {
                            label: username.value,
                            fillColor: "rgba(255, 199, 102,0.2)",
                            strokeColor: "rgba(255, 199, 102,1)",
                            pointColor: "rgba(255, 199, 102,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(255, 199, 102,1)",
                            data: twitterData
                        }]
                    };

                    var myRadarChart = new Chart(ctx).Radar(stuff, {});

                }
            })


            console.log(data);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function renderBowie() {
    sortingHat.renderBowie();
}

window.onload = function () {
    sortingHat = new SortingHat();
    sortingHat.fetchPersonas();
}