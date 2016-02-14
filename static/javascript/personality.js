function drawChart() {
    google.charts.load('current', {
        'packages': ['sankey']
    });
    google.charts.setOnLoadCallback(readPersonaData);
    //    var data = new google.visualization.DataTable();
    //    data.addColumn('string', 'From');
    //    data.addColumn('string', 'To');
    //    data.addColumn('number', 'Weight');
    //    data.addRows(chartdata);
    //
    //    // Sets chart options.
    //    var options = {
    //        width: 400,
    //    };
    //
    //    var insights = document.getElementById('insights');
    //    var anchor = document.createElement('div');
    //
    //
    //    // Instantiates and draws our chart, passing in some options.
    //    var chart = new google.visualization.Sankey(anchor);
    //    chart.draw(data, options);
}


function draw(chartdata) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'From');
    data.addColumn('string', 'To');
    data.addColumn('number', 'Weight');
    data.addRows(chartdata);

    // Sets chart options.
    var options = {
        width: 300,
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

                    var factors = factor.children.length;

                    var sankey = Math.round(trait.percentage * 100);

                    var contribution = Math.round(sankey / factors);

                    console.log(contribution);

                    total = total + contribution;

                    openness[trait.name] = {
                        name: trait.name,
                        percentage: trait.percentage,
                        sankey: sankey,
                        contribution: contribution
                    }

                    var traitdata = [factor.id, trait.name, contribution];

                    if (contribution > 0) {

                        factordata.push(traitdata);
                    }
                })

                draw(factordata);

            })
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function myFunction(arr) {}
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