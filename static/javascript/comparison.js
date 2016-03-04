var personas = [];

function readCombinedData() {

    var url = './samples/combined.json';

    var xmlhttp = new XMLHttpRequest();


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);

            data.forEach(function (persona) {

                var bigfive = persona.tree.children[0].children[0].children;

                bigfive.forEach(function (factor) {

                    switch (factor.id) {
                    case "Agreeableness":

                        break;

                    }

                    personas[persona.id].test = factor.percentage.toFixed(2) * 100;

                    //                    personas[persona.id][factor.id] = factor.percentage.toFixed(2) * 100;
                });

                console.log(data);
            })
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
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