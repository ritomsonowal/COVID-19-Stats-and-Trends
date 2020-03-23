var jsonData;
var data;
var population;

var covidURL = "https://pomber.github.io/covid19/timeseries.json"; 
var addedlineCountries = ["China", "India", "Italy", "United Kingdom", "US", "Spain", "France"];
var addedbarCountries = ["China", "India", "Italy", "United Kingdom", "US", "Spain", "France"];

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
    
    // addLineData(chart1, data, "India");
    // addLineData(chart1, data, "Italy");

    let i=0;
    for (i=0;i<addedlineCountries.length;i++) {
        addLineData(chart1,data,addedlineCountries[i]);
    }

    $("#country-list-btn").click(function(){
        $("#add-country").toggle();
        $("#add-country-btn").toggle();
    });

    addCountryList(data);
    addCountryList2(data);

    $("#add-country-btn").click(function(){
        if (addedlineCountries.includes($('#country-list').val())) {
            alert("Already added country!");
        } else {
            addLineData(chart1, data, $('#country-list').val());
            addedlineCountries.push($('#country-list').val());
            console.log("Added new country!");
        }
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
        if (addedbarCountries.includes($('#country-list2').val()) ) {
            alert("Already added country!");
        } else {
            addbarData(chart2, data, $('#country-list2').val());
            addedbarCountries.push($('#country-list2').val());
            console.log("Added new country!");
        }
    });

});

