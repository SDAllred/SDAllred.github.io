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

        /* Graph for median debt of graduates */
        var svgBounds2 = document.getElementById("debtChart").getBoundingClientRect(),
            xAxisSize2 = 100,
            yAxisSize2 = 60;

        // Create the x and y scales
        var xScale2 = d3.scale.ordinal()
            .domain(Gschools.map(function (d) {
                return d.INSTNM;
            }))
            .rangeRoundBands([yAxisSize2, svgBounds2.width - 200 - yAxisSize2]);

        var yScale2 = d3.scale.linear()
            .domain([0, d3.max(Gschools, function (d) {
                if (d.GRAD_DEBT_MDN_SUPP != "NULL" && d.GRAD_DEBT_MDN_SUPP != "PrivacySuppressed") {
                    return d.GRAD_DEBT_MDN_SUPP
                } else {
                        return 0
                }
            })])
            .range([svgBounds2.height -200 - xAxisSize2, 50]);



        var color2 = d3.scale.linear();
        color2.domain([d3.min(Gschools, function (d) {
                if (d.GRAD_DEBT_MDN_SUPP != "NULL" && d.GRAD_DEBT_MDN_SUPP != "PrivacySuppressed") {
                    return d.GRAD_DEBT_MDN_SUPP
                }
            }), d3.max(Gschools, function (d) {
            if (d.GRAD_DEBT_MDN_SUPP != "NULL" && d.GRAD_DEBT_MDN_SUPP != "PrivacySuppressed") {
                return d.GRAD_DEBT_MDN_SUPP
            }

            })])
            .range(["#AF0025", "#FFCC00"]);



         //Create the bars
        var bar2 = d3.select("#bars2");
        var nbar2 = bar2.selectAll("rect")
            .data(Gschools);
        nbar2.enter().append("rect");
        nbar2.exit().remove();
        nbar2.attr("transform", "translate(0, 0) scale(1, -1)")
            .attr("y", -399)
            .attr("x", function (d) {
                return xScale2(d.INSTNM);
            })
            .attr("height", function (d) {

                if (d.GRAD_DEBT_MDN_SUPP != "NULL" && d.GRAD_DEBT_MDN_SUPP != "PrivacySuppressed") {
                    return  (svgBounds2.height - 200 - xAxisSize2) - yScale2(d.GRAD_DEBT_MDN_SUPP)
                } else {
                        return 0
                }
            })
            .attr("width", function () {
                return (( svgBounds2.width - 300 - yAxisSize2) / Gschools.length)
            })
        .style("fill", function (d) {

            if (d.GRAD_DEBT_MDN_SUPP != "NULL" && d.GRAD_DEBT_MDN_SUPP != "PrivacySuppressed") {
                return  color2(d.GRAD_DEBT_MDN_SUPP)
            } else {
                    return "black";
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


        var xaxis2 = d3.svg.axis();
        xaxis2.scale(xScale2)
            .orient("bottom");

        var yaxis2 = d3.svg.axis();
        yaxis2.scale(yScale2)
            .orient("left");


        d3.select("#xAxis2")
            .attr("transform", "translate(0, 400)")
            .call(xaxis2)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.7em")
            .attr("dy", "-.2em")
            .attr("transform", function (d) {
                return "rotate(-90)";
            });

        d3.select("#yAxis2")
            .attr("transform", "translate(60 , 0)")
            .call(yaxis2);







        /* Graph for average cost of attendance */
        var svgBounds = document.getElementById("costChart").getBoundingClientRect(),
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












        /* Graph for admittance rate */
        var svgBounds3 = document.getElementById("admitChart").getBoundingClientRect(),
            xAxisSize3 = 100,
            yAxisSize3 = 60;

        // Create the x and y scales
        var xScale3 = d3.scale.ordinal()
            .domain(Gschools.map(function (d) {
                return d.INSTNM;
            }))
            .rangeRoundBands([yAxisSize3, svgBounds3.width - 200 - yAxisSize3]);

        var yScale3 = d3.scale.linear()
            .domain([0, d3.max(Gschools, function (d) {
                if (d.ADM_RATE != "NULL") {
                    return d.ADM_RATE
                }
            })])
            .range([svgBounds3.height -200 - xAxisSize3, 50]);



        var color3 = d3.scale.linear();
        color3.domain([d3.min(Gschools, function (d) {
                if (d.ADM_RATE != "NULL") {
                    return d.ADM_RATE
                }
            }), d3.max(Gschools, function (d) {
                if (d.ADM_RATE != "NULL") {
                    return d.ADM_RATE
                }

            })])
            .range(["#AF0025", "#FFCC00"]);



        //Create the bars
        var bar3 = d3.select("#bars3");
        var nbar3 = bar3.selectAll("rect")
            .data(Gschools);
        nbar3.enter().append("rect");
        nbar3.exit().remove();
        nbar3.attr("transform", "translate(0, 0) scale(1, -1)")
            .attr("y", -399)
            .attr("x", function (d) {
                return xScale3(d.INSTNM);
            })
            .attr("height", function (d) {

                if (d.ADM_RATE!= "NULL") {
                    return  (svgBounds3.height - 200 - xAxisSize3) - yScale3(d.ADM_RATE)
                }
            })
            .attr("width", function () {
                return (( svgBounds3.width - 300 - yAxisSize3) / Gschools.length)
            })
            .style("fill", function (d) {

                if (d.ADM_RATE != "NULL") {
                    return  color3(d.ADM_RATE)
                } else {
                    return "black";
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


        var xaxis3 = d3.svg.axis();
        xaxis3.scale(xScale3)
            .orient("bottom");

        var yaxis3 = d3.svg.axis();
        yaxis3.scale(yScale3)
            .orient("left");


        d3.select("#xAxis3")
            .attr("transform", "translate(0, 400)")
            .call(xaxis2)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.7em")
            .attr("dy", "-.2em")
            .attr("transform", function (d) {
                return "rotate(-90)";
            });

        d3.select("#yAxis3")
            .attr("transform", "translate(60 , 0)")
            .call(yaxis3);









    }
}