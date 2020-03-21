let colors = ['rgb(216, 36, 8, 0.7)','rgb(17, 145, 224, 0.7)', 'rgb(224, 221, 23, 0.7)'];
var i = 0;
var n = 3;

function getLabels(data, country) {
    var labels = [];
    // console.log(data);
    // console.log(data);

    data[country].forEach(({ date, confirmed, recovered, deaths }) =>
    labels.push(date));

    return labels;
}

function getConfirmed(data, country) {
    var dataset = [];

    data[country].forEach(({ date, confirmed, recovered, deaths }) =>
    dataset.push(confirmed));

    return dataset;
}

function getCountries(data) {
    var countries = [];

    for (var key of Object.keys(data)) {
        countries.push(key);
    }

    return countries;
}

function getChartData(data, country) {
    var chartData = {
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
    console.log(chartData);
    return chartData;
}


function renderChart1(chartData) {
    var ctx = document.getElementById('chart1');   

    var myChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
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


function addData(chart, jsonData, country) {
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

    var select = $('<select id="country-list"/>');

    for(var val in data) {
        $('<option />', {value: val, text: val}).appendTo(select);
    }
    
    select.appendTo('#add-country');


}
