var personas = [];

// Green 123, 194, 83

var green = [123, 194, 83];
var red = [221, 65, 49];
var blue = [1, 79, 131];
var yellow = [249, 223, 60];
var orange = [243, 119, 107];

var randomScalingFactor = function () {
    return Math.round(Math.random() * 100)
};

function makeRGB(color, opacity) {
    var rgb = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + opacity + ')';
    return rgb;
}

function basicLineChart(color) {

    var lineChartData = {
        datasets: [{

            label: "My First dataset",
            fillColor: makeRGB(color, 0.2),
            strokeColor: makeRGB(color, 1),
            pointColor: makeRGB(color, 1),
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: makeRGB(color, 1)

        }]
    }

    return lineChartData;
}

function process(persona, factor, collection) {
    var value = factor.percentage.toFixed(2) * 100;

    var data = {
        'name': personas[persona.data.id].name,
        'year': personas[persona.data.id].start,
        'value': value
    };

    collection.push(data);
}

function compare(a, b) {
    if (a.year < b.year)
        return -1;
    else if (a.year > b.year)
        return 1;
    else
        return 0;
}


function orderData(data) {

    var sorted = data.sort(compare);

    var sortedCount = 0;

    var orderedData = new Object();
    orderedData.labels = [];
    orderedData.data = [];

    sorted.forEach(function (element) {
        orderedData.labels[sortedCount] = element.year;
        orderedData.data[sortedCount] = element.value;
        sortedCount++;
    });

    return orderedData;
}


function buildLineData(data, color) {

    var ordered = orderData(data);

    var lineData = basicLineChart(color);

    lineData.labels = ordered.labels;
    lineData.datasets[0].data = ordered.data;

    return lineData;
}

function addChart(anchor, data) {
    var openness = document.getElementById(anchor);

    var opennessChart = document.createElement('canvas');

    opennessChart.height = 300;
    opennessChart.width = 300;

    openness.appendChild(opennessChart);

    var ctx = opennessChart.getContext("2d");

    var chart = new Chart(ctx).Line(data, {
        scaleOverride: true,
        scaleSteps: 10,
        scaleStepWidth: 10,
        scaleStartValue: 0
    });
}

function readCombinedData() {

    var url = './samples/combined.json';

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);

            var personaCount = 0;

            var openness = [];
            var conscientiousness = [];
            var agreeableness = [];
            var extraversion = [];
            var neuroticism = [];

            data.forEach(function (persona) {

                var bigfive = persona.data.tree.children[0].children[0].children;

                bigfive.forEach(function (factor) {

                    switch (factor.id) {

                    case "Openness":
                        process(persona, factor, openness);
                        break;

                    case "Conscientiousness":
                        process(persona, factor, conscientiousness);
                        break;

                    case "Agreeableness":
                        process(persona, factor, agreeableness);
                        break;

                    case "Extraversion":
                        process(persona, factor, extraversion);
                        break;

                    case "Neuroticism":
                        process(persona, factor, neuroticism);
                        break;

                    }
                });

                console.log(data);

                personaCount++;
            })

            addChart('openness', buildLineData(openness, orange));
            addChart('conscientiousness', buildLineData(conscientiousness, orange));
            addChart('agreeableness', buildLineData(agreeableness, orange));
            addChart('extraversion', buildLineData(extraversion, orange));
            addChart('neuroticism', buildLineData(neuroticism, orange));

        };
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function readPersonaData() {
    var url = './personas.json';

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);

            data.results.forEach(function (persona) {
                personas[persona.key] = persona;
            });

            console.log(data);

            readCombinedData();
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


window.onload = function () {
    readPersonaData();
}