/**
 * Created by sierra on 3/8/17.
 */

var sparkl = function(cVis){

    // $('.js2-report-sparkline').each(function(sparklineId) {
//
//
//
//     var th = $(this),

    this.cVis = cVis;

    this.build = function(data){


        for (j = 1; j < 14; ++j) {

            dDate = new Array();

            for(var ln in data)


                if (data[ln]["Day"] == j) {

                    dDate.push(data[ln]);

                }

            this.buildLines("js-report-sparkline-"+j+"",dDate,1700,150,j);

        }


        j=0;







    }



    this.buildLines = function(id, data, widthT, heightT, sparklineId){


        var container = d3.select("#"+id);

        console.log(data);
        var parseDate = d3.time.format("%I:%M %p");

        data.forEach(function(d) {
            d.date = parseDate.parse(d.Start);
            d.end = parseDate.parse(d.End);
            // d.date = new Date((d.sdate.getTime() +  d.edate.getTime()) / 2);
            d.sduration = +d.RunTotal;
            d.value = +d.Label;
            d.doing = d.Project;
           // console.log(d.date)
        });


        // Get width and height of the container
        var w = widthT //th.width(),
            h = heightT//th.height(),

        // Setting the margins
        // You may set different margins for X/Y
            xMargin = 30,
            yMargin = 20,

        // Scale functions
        // Setting the range with the margin

            y = d3.scale.linear()
                .domain([0, 0])
                .range([h - yMargin, yMargin]),
            x = d3.time.scale()
                .domain(d3.extent(data, function(d) { return d.date; }))
                .range([xMargin, w - xMargin]),

            x2 = d3.time.scale()
                .domain(d3.extent(data, function(d) { return d.end; }))
                .range([xMargin, w - xMargin]),


        // Scale functions for creating the gradient fill/stroke
        // Calculating the color according to data2 in the range of colors
        // That user has passed with the data2-range-[high-low]-color attributes
            gradientY = d3.scale.linear()
                .domain([1,2,3,4,5,6,7,8,9,10,11,12,13,14])
                .range(['#8342f4', '#28a335', '#af1635', '#ea8b38', '#fff200', '#ea98e1', '#7ab6cc', '#296382', '#c193b0', '#ff3a54', '#ffbb28', '#1cbfa1', '#4e821f', '#dd4d00']),


                //"Consumer Purchases", "Eating/drinking", "Education", "Exercise", "Household", "Personal Care", "Religious", "Sleep", "Socializing/Leisure", "Spending Time With Husband", "Telephone", "Traveling", "Volunteer", "Work"
                // This is a different margin than the one for the chart
        // Setting the gradient stops from 0% to 100% will cause wrong color ranges
        // Because data2 points are position in the center of containing rect
            percentageMargin =  100 / data.length, //
            percentageX = d3.scale.linear()
                .domain([0, data.length - 1])
                .range([percentageMargin, 100 - percentageMargin]),

        // Create S
           // container = d3.select(this).append("div"),

        // Create SVG object and set dimensions
            vis = container
                .append("svg:svg")
                .attr("width", w)
                .attr("height", h)
                .attr("id", "sv" + sparklineId + "");

        // Create the group object and set styles for gradient definition
        // Which is about to add in a few lines
        xAxis = vis.append("svg:g")
            .attr("class", "x-axis")
            .attr("transform", "translate(" + 0 + "," + (h-yMargin) + ")")
            .attr("stroke", "white")
            .call(
                d3.svg.axis()
                    .scale(x)
                    .orient("bottom")
                    .ticks(22)
                    .tickSize(-h+(yMargin*2), 0, 0)
                    .tickFormat(d3.time.format("%I:%M %p"))
            );
        xAxis.selectAll("text")
            .style("text-anchor", "middle")
            .attr("transform", "translate(0,5)")
            .attr("fill", "white")
            .attr("stroke-width", "0");




        g = vis.append("svg:g")
            .attr("stroke", "url(#sparkline-gradient-" + sparklineId + ")")
            .attr("fill", "url(#sparkline-gradient-" + sparklineId + ")"),


            // Create the line
            // Using cardinal interpolation because we need
            // The line to pass on every point
            area = d3.svg.area()
                .interpolate("cardinal")
                .x(function(d,i) { return x(d.date); }),
            line = d3.svg.line()
                .interpolate("linear")
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.sduration); });




        g.append("svg:path").attr("class","area").attr("d", area(data)).attr("style", "fill:url(#area-fill)");

        // Create points
        // We are only creating points for first and last data2
        // Because that looks cooler :)

        // Append the line to the group
        g.append("svg:path").attr("d", line(data));


        var position = getPosition(vis);




        for (i = 0; i < data.length; ++i) {
            var tooltip = container
                .append("div")
                .attr("class", "chart-tooltip")
                .attr("data2-index", i).html(data[i].doing + "");
            $tooltip = $(".chart-tooltip[data2-index="+i+"]");
            $tooltip.data({
                calcY: y,
                calcX: x
            });
            var tooltipLeft = $tooltip.data("calcX")(data[i].date) - ($tooltip.width() / 2);
            var tooltipTop = $tooltip.data("calcY")(0);
            console.log(tooltipLeft);
            // Position it again
            $tooltip.css({
                left: (tooltipLeft + w/2 + 90) + "px",
                top: position.y + "px"
            });
        }


        // Create tooltip







        // Bind calculator functions to tooltip


        // Create the gradient effect
        // This is where the magic happens
        // We get datas and create gradient stops with calculated colors
        var defs = vis.append("svg:defs");
        defs.append("svg:linearGradient")
            .attr("id", "sparkline-gradient-" + sparklineId)
            .attr("x1", "0%").attr("x2", "100%")
            .attr("gradientUnits", "userSpaceOnUse")
            .selectAll(".gradient-stop")
            .data(data)
            .enter()
            .append("svg:stop").attr('offset', function(d, i) {
            return ((((d.sduration) / 24) * 100)) + "%"; //percentageX(i)//
        }).attr("style", function(d) {
            return "stop-color:" + gradientY(d.value) + ";stop-opacity:1";
        });
        // areaFill = defs.append("svg:linearGradient");
        // areaFill.attr("id", "area-fill");
        // areaFill.attr("x1", "0%").attr("x2", "100%")
        // areaFill.append("svg:stop").attr('offset', "0%").attr("style", 'stop-color:white;stop-opacity:0.1');
        // areaFill.append("svg:stop").attr('offset', "100%").attr("style", 'stop-color:white;stop-opacity:0');


        // Creating invisible rectangles for a better hover interaction
        // Because otherwise user would need to hover to the line or point
        // Which is a terrible experience
        // Creating full height invisible bars and binding mouse events
        // To do some special stuff like showing data2 or adding classes to
        // The point in the targeted area

        var rect = g.selectAll(".bar-rect")
            .data(data)
            .enter().append("svg:rect")
            .attr("class", "bar-rect")
            .attr("x", function(d, i) { return x(d.date) - (w / data.length / 2) })
            .attr("y", 0)
            .attr("width", w / data.length)
            .attr("height", h)
            .on("mouseenter", function(d, i) {
                $('.chart-tooltip[data2-index='+i+']').addClass('hover');
                // Add hover class to the targeted point
                var thisPoint = $(this).parent().parent().find('.point:eq(' + i + ')');
                thisPoint.attr('class', (i===0||i===(data.length-1)) ? 'end point hover' : 'point hover');
            }).on("mouseleave", function(d, i) {
                $('.chart-tooltip').removeClass('hover');
                // Remove hover class from the targeted point
                var thisPoint = $(this).parent().parent().find('.point:eq(' + i + ')');
                thisPoint.attr('class', (i===0||i===(data.length-1)) ? 'end point' : 'point');
            });

        // Helper function to calculate the HTML content of the tooltip
        // Tooltip may contain any HTML
        function formatTooltip(d, i) {
            return '<div class="title">' + d.value + '</div>'
        }


    }

    function getPosition(el) {
        var xPos = 0;
        var yPos = 0;

        while (el) {
            if (el.tagName == "BODY") {
                // deal with browser quirks with body/window/document and page scroll
                var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                var yScroll = el.scrollTop || document.documentElement.scrollTop;

                xPos += (el.offsetLeft - xScroll + el.clientLeft);
                yPos += (el.offsetTop - yScroll + el.clientTop);
            } else {
                // for all other non-BODY elements
                xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                yPos += (el.offsetTop - el.scrollTop + el.clientTop);
            }

            el = el.offsetParent;
        }
        return {
            x: xPos,
            y: yPos
        };
    }

    
    
    


}
