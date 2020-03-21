// function generateLabels(data, country) {                       
//     var labels = [];

//     data[country].forEach(({ date, confirmed, recovered, deaths }) =>
//         labels.push(date));
    
//     return labels;
// }

// function generateData(data, country) {                       
//     var data = [];

//     data[country].forEach(({ date, confirmed, recovered, deaths }) =>
//         data.push(confirmed));
    
//     return data;
// }


function generateLabelsFromTable()
{                       
    var labels = [];

    var rows = $("tr");
    rows.each(function(index){
        if (index != 0)  // we dont need first row of table
        {
            var cols = $(this).find("td");      
            labels.push(cols.first().text());                           
        }
    });
    return labels;
}
function generateDataSetsFromTable()
{
    var data;
    var datasets = [];
    var rows = $("tr");
    rows.each(function(index){
        if (index != 0) // we dont need first row of table
        {
            var cols = $(this).find("td");  
            var data = [];
            cols.each(function(innerIndex){
                if (innerIndex!=0) // we dont need first columns of the row                 
                    data.push($(this).text());                                          
            });
						var colors = [];
colors.push(                        
{
        fillColor : "rgba(95,137,250,0.5)",
        strokeColor : "rgba(95,137,250,0.9)",
        highlightFill: "rgba(95,137,250,0.75)",
        highlightStroke: "rgba(95,137,250,1)"
});
colors.push(                        
{
        fillColor : "rgba(245,75,75,0.5)",
        strokeColor : "rgba(245,75,75,0.8)",
        highlightFill : "rgba(245,75,75,0.75)",
        highlightStroke : "rgba(245,75,75,1)"
});
colors.push(                        
{
        fillColor : "rgba(98,223,114,0.5)",
        strokeColor : "rgba(98,223,114,0.8)",
        highlightFill : "rgba(98,223,114,0.75)",
        highlightStroke : "rgba(98,223,114,1)",
});

            var dataset = 
            {
            fillColor : colors[index%3].fillColor,
                strokeColor : colors[index%3].strokeColor,
                highlightFill: colors[index%3].highlightFill,
                highlightStroke: colors[index%3].highlightStroke,
                data : data
            }

            datasets.push(dataset);

        }
    });
    return datasets;
}
var barChartData = {
    labels : generateLabelsFromTable(),
    datasets : generateDataSetsFromTable()
};
function drawChart() {
            var ctx = document.getElementById("canvas_bar").getContext("2d");
            window.myBar = new Chart(ctx).Bar(barChartData, {
                responsive : true
            });
}
drawChart();