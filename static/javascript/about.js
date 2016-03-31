function readPersonaData() {
    var url = './personas.json';

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.self = this;

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);

            littleWonders(data.results);

            console.log('fetched personas');
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function littleWonders(data) {

    var wonders = document.getElementById('wonders');

    data.forEach(function (persona) {

        var sketch = document.createElement('img');
        sketch.src = 'images/' + persona.sketch;
        sketch.className = "imageBowie";
        sketch.style.height = '240px';
        sketch.title = persona.name;
        sketch.onclick = function (e) {
            var path = './personality.html?persona=' + persona.name;
            window.open(path, '_self', false);
        }

        wonders.appendChild(sketch);
    })

}

window.onload = function () {
    readPersonaData();
}