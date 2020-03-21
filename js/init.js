var jsonData;
var data;

var url = "https://pomber.github.io/covid19/timeseries.json"; 
var addedCountries = ["China", "India", "Italy"];

$(document).ready(function () {

    $.ajax({
        'async': false,
        'type': "GET",
        'global': false,
        'dataType': 'json',
        'url': url,
        'success': function (jsonData) {
            data = jsonData;
        }
    });

    console.log(data);

    // Render Chart 1
    chart1 = renderChart1(getChartData(data, "China"));
    
    addData(chart1, data, "India");
    addData(chart1, data, "Italy");

    $("#country-list-btn").click(function(){
        $("#add-country").toggle();
    });

    addCountryList(data);

    $("#add-country-btn").click(function(){
        addData(chart1, data, $('#country-list').val());
        console.log("Added new country!");
    });
});

