// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {
    'packages' : ['corechart']
});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(getData);

// load our data
function getData() {
    $.getJSON('data.json', drawCharts);
}

// draw charts from data
function drawCharts(json_data) {
    for (var i=0; i < json_data.length; i+=1) {
        $('body').append('<div id="visualization_' + i + '" style="width: 600px; height: 400px;"></div>');
        drawChart(json_data[i], i);
    }
}

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart(data, index) {
    var data_header = [''];
    var data_points = [''];

    for (i=0; i < data.answers.length; i+=1) {
        data_header.push(data.answers[i].label)
        data_points.push(data.answers[i].value)
    }
    switch(data.answers.length) {
        case 2:
            var colors = ['#FF0010', '#06D100'];
            break;
        case 3:
            var colors = ['#FF0010', '#5D7FBA', '#06D100'];
            break;
        default:
            var colors = ['#FF0010', '#EF777F', '#6CD168', '#06D100'];
            break;
    }

    var container_id = 'visualization_' + index;
    var wrapper = new google.visualization.ChartWrapper({
        chartType : 'ColumnChart',
        dataTable : [data_header, data_points],
        options : {
            'colors': colors,
            'title': data['text'],
            'vAxis':  {'title': 'Anzahl Kandidaten in %',
                       'maxValue': 100,
                       'minValue': 0},
            'legend': {'position': 'bottom'}
        },
        containerId : container_id
    });
    var datatable = wrapper.getDataTable();
    var formatter = new google.visualization.NumberFormat({suffix: ' %'});
    for (i=1; i <= data.answers.length; i+=1) {
        formatter.format(datatable, i);
    }
    wrapper.draw();
}

