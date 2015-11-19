/**
 * Created by sierra on 11/13/15.
 */
/*globals alert, document, d3, console*/




function updateBarChart() {

    var svgBounds = document.getElementById("barChart").getBoundingClientRect(),
        xAxisSize = 100,
        yAxisSize = 60;

    // Create the x and y scales
    var xScale = d3.scale.ordinal()
        .domain(1, 20)
        .rangeRoundBands([yAxisSize, svgBounds.width - yAxisSize]);

    var yScale = d3.scale.linear()
        .domain([0, 10000])
        .range([svgBounds.height - xAxisSize, 50]);



    //colorScale = d3.scale.linear();
    //colorScale.domain([0, d3.max(selectedSeries, function (d) {
    //        if (d.data_type == "Game") {
    //            return d.attendance
    //        } else {
    //            return 0
    //        }
    //    })])
    //    .range(["#eff3ff", "#2171b5"]);


    // Create the bars
    var bar = d3.select("#bars");
    var nbar = bar.selectAll("rect")
        .data(selectedSeries);
    nbar.enter().append("rect");
    nbar.exit().remove();
    nbar.attr("transform", "translate(0, 0) scale(1, -1)")
        .attr("y", -399)
        .attr("x", function (d) {
            return 10; //xScale(d.Date)
        })
        .attr("height", function (d) {
            return (svgBounds.height - xAxisSize) - 500 //yScale(d.attendance)
        })
        .attr("width", function () {
            return 20 //((svgBounds.width - 140) / selectedSeries.length)
        });
        //.style("fill", function (d) {
        //    return colorScale(d.attendance)
        //})


    //bar.selectAll("rect")
    //    .on("mouseover", function (d) {
    //        setHover(d)
    //    })
    //    .on("mouseout", function () {
    //        clearHover()
    //    })
    //    .on("click", function (d) {
    //        changeSelection(d)
    //    });


    // Create the axes (hint: use #xAxis and #yAxis)

    var xaxis = d3.svg.axis();
    xaxis.scale(xScale)
        .orient("bottom");

    var yaxis = d3.svg.axis();
    yaxis.scale(yScale)
        .orient("left");


    d3.select("#xAxis")
        .attr("transform", "translate(0, 400)")
        .call(xaxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.7em")
        .attr("dy", "-.2em")
        .attr("transform", function (d) {
            return "rotate(-90)";
        });

    d3.select("#yAxis")
        .attr("transform", "translate(60 , 0)")
        .call(yaxis);


}