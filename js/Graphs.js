/**
 * Created by sierra on 11/13/15.
 */
/*globals alert, document, d3, console*/




var Graphs = function(cVis) {

    this.cVis = cVis;


    this.build = function(schools) {

        Gschools = new Array();


        if(schools.length > 10){


            for(var i = 0; i < 11; i++){



                Gschools.push(schools[i]);

            }

        } else {

            for(var sch in schools)

            Gschools.push(schools[sch]);
        }


        var svgBounds = document.getElementById("barChart").getBoundingClientRect(),
            xAxisSize = 100,
            yAxisSize = 60;


        // Create the x and y scales
        var xScale = d3.scale.ordinal()
            .domain(Gschools.map(function (d) {
                return d.INSTNM;
            }))
            .rangeRoundBands([yAxisSize, svgBounds.width - 200 - yAxisSize]);

        var yScale = d3.scale.linear()
            .domain([0, d3.max(Gschools, function (d) {
                if (d.COSTT4_A != "NULL") {
                    return d.COSTT4_A
                } else {

                    if(d.COSTT4_P != "NULL"){
                        return d.COSTT4_P;
                    } else {
                        return 0
                    }
                }
            })])
            .range([svgBounds.height -200 - xAxisSize, 50]);



        var color = d3.scale.linear();
        color.domain([d3.min(Gschools, function (d) {
                if (d.COSTT4_A != "NULL") {
                    return d.COSTT4_A
                } else {

                    if(d.COSTT4_P != "NULL"){
                        return d.COSTT4_P;
                    } else {
                        return 0
                    }
                }
            }), d3.max(Gschools, function (d) {
                if (d.COSTT4_A != "NULL") {
                    return d.COSTT4_A
                } else {

                    if(d.COSTT4_P != "NULL"){
                        return d.COSTT4_P;
                    } else {
                        return 0
                    }
                }
            })])
            .range(["#AF0025", "#FFCC00"]);

        //colorScale = d3.scale.linear();
        //colorScale.domain([0, d3.max(selectedSeries, function (d) {
        //        if (d.data_type == "Game") {
        //            return d.attendance
        //        } else {
        //            return 0
        //        }
        //    })])
        //    .range(["#eff3ff", "#2171b5"]);


         //Create the bars
        var bar = d3.select("#bars");
        var nbar = bar.selectAll("rect")
            .data(Gschools);
        nbar.enter().append("rect");
        nbar.exit().remove();
        nbar.attr("transform", "translate(0, 0) scale(1, -1)")
            .attr("y", -399)
            .attr("x", function (d) {
                return xScale(d.INSTNM);
            })
            .attr("height", function (d) {

                if (d.COSTT4_A != "NULL") {
                    return  (svgBounds.height - 200 - xAxisSize) - yScale(d.COSTT4_A)
                } else {

                    if (d.COSTT4_P != "NULL") {
                        return (svgBounds.height - 200 - xAxisSize) - yScale(d.COSTT4_P);
                    } else {
                        return 0
                    }
                }
            })
            .attr("width", function () {
                return (( svgBounds.width - 300 - yAxisSize) / Gschools.length)
            })
        .style("fill", function (d) {

            if (d.COSTT4_A != "NULL") {
                return color(d.COSTT4_A);
            } else {

                if (d.COSTT4_P != "NULL") {
                    return  color(d.COSTT4_P);
                } else {
                    return "black";
                }
            }



        });


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
}