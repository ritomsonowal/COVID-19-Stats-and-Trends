let colors = ['rgb(216, 36, 8, 0.7)','rgb(230, 171, 26)','rgb(17, 145, 224, 0.7)', 'rgb(224, 221, 23, 0.7)'];
var i = 0;
var n = 4;

function getLabels(data, country) {
    var labels = [];
    // console.log(data);
    // console.log(data);

    data[country].forEach(({ date, confirmed, recovered, deaths }) =>
    labels.push(date));

    return labels.slice(-27,-1);;
}

function getConfirmed(data, country) {
    var dataset = [];

    data[country].forEach(({ date, confirmed, recovered, deaths }) =>
    dataset.push(confirmed));

    return dataset.slice(-27,-1);
}

function getCountries(data) {
    var countries = [];

    for (var key of Object.keys(data)) {
        countries.push(key);
    }
    console.log(countries.sort());
    console.log("adfadsf");
    return countries.sort();
}

function getlineData(data, country) {
    var lineData = {
        labels: getLabels(data, country),
        datasets: [{
            label: country,
            data: getConfirmed(data, country),
            borderWidth: 1,
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
                text: 'Confirmed cases Graph'
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
                        beginAtZero: false,
                        suggestedMin: 500,
                        suggestedMax: 1000
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Confirmed Cases"
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
        data: getConfirmed(jsonData, country),
        borderWidth: 1,
        lineTension: 0,
        order: 0,
        fill: false,
        borderColor: colors[i]
        };

    i = (i+1)%n;

    chart.data.datasets.push(newDataset);
    chart.update();
    // console.log(newDataset);

    console.log("Updated!");
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
    
    console.log(perCases);
    
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
                borderWidth: 1,
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

    console.log("Updated!");
}
