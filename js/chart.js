let colors = ['rgb(216, 36, 8, 0.7)','rgb(230, 171, 26)','rgb(17, 145, 224, 0.7)', 'rgb(224, 221, 23, 0.7)', 'rgb(117, 121, 127)'];
var i = 0;
var n = 5;

var popURL = "https://restcountries.eu/rest/v2/all?fields=name;nativeName;population";
var popData;
var days = 100;

$(document).ready(function () {

    $.ajax({
        'async': false,
        'type': "GET",
        'global': false,
        'dataType': 'json',
        'url': popURL,
        'success': function (jsonData) {
            popData = jsonData;
        }
    });
});

function getLabels(data, country) {
    var labels = [];
    var dates = [];
    // console.log(data);
    // console.log(data);

    data[country].forEach(({ date, confirmed, recovered, deaths }) =>
    dates.push(date));

    let i=0;
    var day = 1;

    for (i=0;i<dates.length;i++) {
        if (data[country][i]["confirmed"] >= days) {
            labels.push(day);
            day += 1;
        }
    }

    console.log(labels);

    return labels;
}

function getConfirmed(data, country) {
    var dataset = [];

    // data[country].forEach(({ date, confirmed, recovered, deaths }) =>
    // dataset.push(confirmed));
    let i=0;
    for (i=0;i<data[country].length;i++) {
        if (data[country][i]["confirmed"] >= days) {
            dataset.push(data[country][i]["confirmed"]);
        }
    }

    return dataset;
}

function getDeaths(data, country) {
    var dataset = [];

    // data[country].forEach(({ date, confirmed, recovered, deaths }) =>
    // dataset.push(confirmed));
    let i=0;
    for (i=0;i<data[country].length;i++) {
        if (data[country][i]["confirmed"] >= days) {
            dataset.push(data[country][i]["deaths"]);
        }
    }

    return dataset;
}

function getRecovered(data, country) {
    var dataset = [];

    // data[country].forEach(({ date, confirmed, recovered, deaths }) =>
    // dataset.push(confirmed));
    let i=0;
    for (i=0;i<data[country].length;i++) {
        if (data[country][i]["confirmed"] >= days) {
            dataset.push(data[country][i]["recovered"]);
        }
    }

    return dataset;
}

function getPopulation(country) {
    let i=0;

    for (i=0;i<250;i++) {
        if (popData[i]["name"] == country || popData[i]["nativeName"] == country) {
            return popData[i]["population"];
        }
    } return false;
}

function getCountries(data) {
    var countries = [];

    for (var key of Object.keys(data)) {
        countries.push(key);
    }
    // console.log(countries.sort());
    // console.log("adfadsf");
    return countries.sort();
}

function getLineDataset(data, country) {
    // var confirmedCases = getConfirmed(data, country);
    var population = getPopulation(country);
    if (population == false) {
        population = 1;
        console.log("Could not retrieve population for " + country);
    }
    // var linedata = [];
    // let i=0;

    // for (i=0;i<confirmedCases.length;i++) {
    //     linedata.push(confirmedCases[i]/population);
    // } return linedata;

    var confirmedCases = getConfirmed(data, country);
    var deaths = getDeaths(data, country);
    var recovered = getRecovered(data, country);

    var linedata = [];
    let i=0;

    for (i=0;i<confirmedCases.length;i++) {
        linedata.push((confirmedCases[i]-recovered[i]-deaths[i]));
    } return linedata;
}

function getlineData(data, country) {

    var lineData = {
        labels: getLabels(data, country),
        datasets: [{
            label: country,
            data: getLineDataset(data, country),
            borderWidth: 3,
            lineTension: 0,
            order: 0,
            fill: false,
            borderColor: colors[i]
            }]
        };
        
    i = (i+1)%n;
    console.log(lineData);
    return lineData;
}


function renderChart1(lineData) {
    var ctx = document.getElementById('chart1');   

    var myChart = new Chart(ctx, {
        type: 'line',
        data: lineData,
        options: {
            title: {
                display: true,
                text: 'Active Cases Graph'
            },
            tooltips: {
                mode: 'nearest'
            },            
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 20,
                    right: 20,
                    top: 0,
                    bottom: 0
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Active Cases"
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: false,
                        stepSize: 5
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Days since 100 confirmed"
                    }
                }]
            }
        }
    }); 

    setTimeout(function() { myChart.update(); },1000); 

    return myChart;
}


function addLineData(chart, jsonData, country) {
    var newDataset = {
        label: country,
        data: getLineDataset(jsonData, country),
        borderWidth: 3,
        lineTension: 0,
        order: 0,
        fill: false,
        borderColor: colors[i]
        };

    i = (i+1)%n;

    chart.data.datasets.push(newDataset);
    chart.update();
    // console.log(newDataset);

    // console.log("Updated!");
}

function addCountryList(data) {

    var countryList = getCountries(data);

    var select = $('<select id="country-list"/>');

    for(var val in countryList) {
        $('<option />', {value: countryList[val], text: countryList[val]}).appendTo(select);
    }
    
    select.appendTo('#add-country');

}

function getbarData(data, country) {
    var confirmedCases = getConfirmed(data, country);

    var perCases = (confirmedCases[confirmedCases.length-1]-confirmedCases[confirmedCases.length-2])*100/confirmedCases[confirmedCases.length-2] ;
    
    // console.log(perCases);
    
    return perCases;
}

function renderChart2(countries, barData) {
    var ctx = document.getElementById('chart2');   

    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: countries,
            datasets: [{
                barPercentage: 1,
                barThickness: 30,
                label: 'Percentage Increase in Confirmed Cases',
                data: barData,
                borderWidth: 5,
                backgroundColor: colors[0]
                }]
            },
        options: {
            tooltips: {
                mode: 'nearest'
            },
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Percentage increase in confirmed cases Graph'
            },
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 20,
                    right: 20,
                    top: 0,
                    bottom: 0
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: 10
                    },
                    gridLines: {
                        offsetGridLines: false
                    }
                }]
            }
        }
    }); 

    setTimeout(function() { myChart.update(); },1000); 

    return myChart;
}

function addCountryList2(data) {

    var countryList = getCountries(data);

    var select = $('<select id="country-list2"/>');

    for(var val in countryList) {
        $('<option />', {value: countryList[val], text: countryList[val]}).appendTo(select);
    }
    
    select.appendTo('#add-country2');

}

function addbarData(chart, jsonData, country) {
    var newDataset = getbarData(jsonData, country);

    chart.data.labels.push(country);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(newDataset);
    });
    chart.update();
    // console.log(newDataset);

    // console.log("Updated!");
}
