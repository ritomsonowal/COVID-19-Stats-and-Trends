var jsonData;
var data;
var population;

var covidURL = "https://pomber.github.io/covid19/timeseries.json"; 
var addedCountries = ["China", "India", "Italy"];
var addedbarCountries = ["China", "India", "Italy", "United Kingdom", "US", "Spain"];

$(document).ready(function () {

    $.ajax({
        'async': false,
        'type': "GET",
        'global': false,
        'dataType': 'json',
        'url': covidURL,
        'success': function (jsonData) {
            data = jsonData;
        }
    });

    console.log(data);

    // Render Chart 1
    chart1 = renderChart1(getlineData(data, "China"));
    
    addLineData(chart1, data, "India");
    addLineData(chart1, data, "Italy");

    $("#country-list-btn").click(function(){
        $("#add-country").toggle();
        $("#add-country-btn").toggle();
    });

    addCountryList(data);
    addCountryList2(data);

    $("#add-country-btn").click(function(){
        addLineData(chart1, data, $('#country-list').val());
        console.log("Added new country!");
    });

    // Render Chart 2
    var barData = []
    console.log(addedbarCountries);
    for (var x in addedbarCountries) {
        barData.push(getbarData(data, addedbarCountries[x]));
    }
    console.log(barData);
    chart2 = renderChart2(addedbarCountries, barData);

    $("#country-list-btn2").click(function(){
        $("#add-country2").toggle();
        $("#add-country-btn2").toggle();
    });

    $("#add-country-btn2").click(function(){
        addbarData(chart2, data, $('#country-list2').val());
        console.log("Added new country!");
    });

});

