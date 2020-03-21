var dates = [];
var cases = [];

$(document).ready(function () {
    // fetch("https://pomber.github.io/covid19/timeseries.json")
    // .then(response => response.json())
    // .then(data => {
    //     data["China"].forEach(({ date, confirmed, recovered, deaths }) =>
    //     dates.push(date)
    //     )
    // });

    $.get("https://pomber.github.io/covid19/timeseries.json", function(data, status){
        // alert("Data: " + data + "\nStatus: " + status);
        // console.log(data["China"]);

        data["China"].forEach(({ date, confirmed, recovered, deaths }) =>
        dates.push(date));

        data["China"].forEach(({ date, confirmed, recovered, deaths }) =>
        cases.push(confirmed));
      });

    // console.log(dates);
    // console.log(cases);
});

// var cases = [300, 500, 2300, 2500, 3000 ];
// var dates = [2,3,4,6,7]


window.onload = function () {
    var ctx = document.getElementById('chart1');
    console.log(cases);
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Mainland China',
                data: cases,
                borderWidth: 1,
                lineTension: 0,
                order: 0
            }]
        },
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
                    }
                }],
                scaleLabel: [{
                    display: true,
                    labelString: "Confirmed Cases"
                }]
            }
        }
    });    

    setTimeout(function() { myChart.update(); },1000);
}