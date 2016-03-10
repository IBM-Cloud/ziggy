var sortingHat;

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
    loading.style.height = h - 100 + 'px';
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

            var sorted = comparisons.sort(self.compare);

            var match = sorted[0].name;

            personaData.forEach(function (persona) {

                if (persona.name === match) {
                    stage.innerHTML = "";

                    var bowie = document.createElement('img');
                    bowie.src = './images/' + persona.sketch;
                    bowie.style.height = h - 40 + 'px';
                    stage.appendChild(bowie);
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