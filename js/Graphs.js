/**
 * Created by sierra on 11/13/15.
 */
/*globals alert, document, d3, console*/




var Graphs = function(cVis) {

    this.cVis = cVis;
	

	$("#GroupValue").change(function(e){
		cVis.updateGraphs(cVis.fschools);
	});
	
	$("#GroupSize").change(function(e){
		cVis.updateGraphs(cVis.fschools);
	});
	
    this.build = function(schools) {

        Gschools = new Array();

		count = $("#GroupSize").val();
		
        if(schools.length > count){


            for(var i = 0; i <= count; i++){

                Gschools.push(schools[i]);

            }

        } else {

            for(var sch in schools)
				Gschools.push(schools[sch]);
        }

		// get selected data type 
		dataType = $("#GroupValue").val();
		
		// set data up for graph creater
		for( sch in Gschools)
		{
			if (Gschools[sch][dataType] != "NULL" && Gschools[sch][dataType] != "PrivacySuppressed") {
				Gschools[sch].Data = parseFloat(Gschools[sch][dataType]);
			} else {
					Gschools[sch].Data =  0;
			}
			
		}

		// build the graph 
		this.buildGraph("GroupChart",Gschools,1700,300);
		
	}
	
	// this builds the graph. 
	// id = the id of the svg 
	// data = this is what is going to be displayed. each element needs the attributes .INSTNM and .Data
	// widthT , heightT - height and width of the svg
	this.buildGraph = function(id,data,widthT,heightT)
	{
		var svg = d3.select("#"+id);
		var marginLeft = 100;
		var marginBottom = 50;
		var spacing = 2;
		var width = widthT - marginLeft;
		var height = heightT - marginBottom;
		var barWidth = width/data.length - spacing;
		
		
		var yScale = d3.scale.linear()
			.domain([0, d3.max(data, function (d) {
				return d.Data;
			})])
			.range([ height, marginBottom]);
			
		var xScale = d3.scale.linear()
			.domain([0, data.length])
			.range([marginLeft, width]);
		
		
		var color = d3.scale.linear()
				.domain([d3.min(data, function (d) {
					return d.Data;
				}), d3.max(data, function (d) {
					return d.Data;
				})])
				.range(["#AF0025", "#FFCC00"]);
		
		
		// the data binding
		var bars = svg.selectAll("rect")
				.data(data);

		var tip = d3.tip()
				.attr("class", "d3-tip")
				.offset([-20, 0])
				.html(function(d) { 
					if(d.Data == 0)
						return "("+d.INSTNM+" ,n/a)";
					return "("+d.INSTNM+", "+d.Data+")";
					});		
		
		
		// how do we handle new elements?
		// we start with a transparent gray bar of width 0
		bars.enter().append("rect")
				.attr("x", 0)
				.attr("y", height)
				.attr("width", 0)
				.attr("height", 0)
				.attr("opacity", 0)
				.classed("bars", true);
		
		bars.call(tip);	
		//bars.on("mouseover", function(){d3.select(this).style("fill", "black");})
		//	.on("mouseout", function(){d3.select(this).style("fill", "steelblue");});
			
		bars.on("click", function(d,i) { console.log(d);})
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide);
			
		bars.transition()
				.duration(2000)
				.attr("x", function(d,i){
					return xScale(i);
				})
				.attr("y", function (d, i) {
					if( d.Data == 0)
						return (height/2);
					return yScale(d.Data);
				})
				.attr("width", function() {return barWidth-spacing;})
				.attr("height", function (d, i) {
					if( d.Data == 0)
						return (height/2);
					return height - yScale(d.Data);
				})
				.style("fill", function(d){
					if(d.Data == 0)
						return "grey";
					return color(d.Data);
					})
				.attr("opacity", function(d){ if(d.Data == 0) return 0.5; return 1;});
			
		// how do we handle things that are removed?
		// we increase opacity
		bars.exit()
				.attr("opacity", 1)
				.transition()
				.duration(3000)
				.attr("opacity", 0)
				.remove();
		
		// add in axis 
		/*var xaxis2 = d3.svg.axis();
			xaxis2.scale(xScale2)
				.orient("bottom");*/

		var yaxis = d3.svg.axis()
			.scale(yScale)
			.orient("left");

	/*
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
	*/
		d3.select("#yAxis")
			.attr("class","axis")
			.attr("transform", "translate("+marginLeft+" , 0)")
			.call(yaxis);

		
	}
}