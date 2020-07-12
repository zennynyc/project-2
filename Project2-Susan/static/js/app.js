
var dropdownbox = d3.select("#selDataset")

d3.csv("data/confirmed_us_daily.csv").then((dailydata) => {
    console.log(dailydata);

    //us line chart
    var us_data = dailydata.filter(eachdata => eachdata.state == "United States");
    console.log(us_data);
    var us_objectvalues = Object.values(us_data[0]);
    var us_objectkeys = Object.keys(us_data[0]);

    var us_line_y = us_objectvalues.slice(40);
    console.log(us_line_y);
    var us_line_x = us_objectkeys.slice(40);
    console.log(us_line_x);

    var us_trace_line = {
        x: us_line_x,
        y: us_line_y,
        type: "line",
    };

    var us_line_data = [us_trace_line];
    var us_line_layout = { title: "New Cases Confirmed by day in US"};
    Plotly.newPlot("us_line_confirmed", us_line_data, us_line_layout);

    //us map
    var map_data = dailydata.filter(eachdata => eachdata.code != "");

    var map_locations = map_data.map((eachdata) => {
        return eachdata.code;
    });
    var map_total_cases = map_data.map((eachdata) => {
        return eachdata.total;
    });
    var map_state_names = map_data.map((eachdata) => {
        return eachdata.state;
    });

    console.log(map_total_cases);

    var us_map_data = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: map_locations,
        z: map_total_cases,
        text: map_state_names,
        autocolorscale: true,
    }];

    var us_map_layout = {
        title: 'Cumulative Cases by State',
        geo:{
            scope: 'usa',
            countrycolor: 'rgb(255, 255, 255)',
            showland: true,
            landcolor: 'rgb(217, 217, 217)',
            showlakes: true,
            lakecolor: 'rgb(255, 255, 255)',
            subunitcolor: 'rgb(255, 255, 255)',
            lonaxis: {},
            lataxis: {}
        },
        width: 1100, 
        height: 400, 
        margin: { t: 60, b: 60 }
    };

    Plotly.newPlot("us_map_confirmed", us_map_data, us_map_layout, {showLink: false});
    
    
    map_state_names.forEach(element => {
        dropdownbox.append("option").text(element);
    });
});

function byStateCharts() {

    var selected_state = dropdownbox.property("value");

    d3.csv("data/confirmed_us_daily.csv").then((data) => {

        var data_for_selectedstate = data.filter(eachdata => eachdata.state == selected_state);
        console.log(data_for_selectedstate);
        var object_values = Object.values(data_for_selectedstate[0]);
        var object_keys = Object.keys(data_for_selectedstate[0]);
    
        //line area
        var line_y = object_values.slice(40);
        console.log(line_y);
        var line_x = object_keys.slice(40);
        console.log(line_x);
    
        var trace_line = {
            x: line_x,
            y: line_y,
            //text: bar_text,
            type: "line",
            //orientation: "h"
        };
    
        var data_line = [trace_line];
    
        //var layout_line = { width: 450, height: 400, margin: { t: 10, b: 0 } };
    
        Plotly.newPlot("line", data_line);
        
    
    
    });
};

dropdownbox.on("change", byStateCharts);

