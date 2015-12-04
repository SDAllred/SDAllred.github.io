// The SVG container
var MapVis = function() {


	var width  = 1000,
		height = 600,
		active;

	//var color = d3.scale.category20c();

	var color = d3.scale.linear();
	color.domain([0, 20])
			.range(["#AF0025", "#FFCC00"]);

	var projection = d3.geo.albersUsa()
					.translate([450, 300])
					.scale(1200);

	var path = d3.geo.path()
		.projection(projection);

	var svg = d3.select("#map").append("svg")
		.attr("width", width)
		.attr("height", height);

	svg.append("rect")
		.attr("width", width)
		.attr("height", height)
		.on("click", reset);

	var g = svg.append("g");
	
/*
	queue()
		.defer(d3.json, "data/us.json")
		.defer(d3.tsv, "data/us-state-names.tsv")
		.defer(d3.csv, "data/ScoreCardData2013.Map.csv")
		.await(ready);
		
	function ready(error, usStateData, names ,schools) {
		
		if(!error){
			this.updateMap(usStateData, names ,schools);
		}
		else{
			alert(error);
		}
	}
*/




	function click(d) {
	  if (active === d) return reset();
	  g.selectAll(".active").classed("active", false);
	  d3.select(this).classed("active", active = d);

	  var b = path.bounds(d);
	  g.transition().duration(750).attr("transform",
		  "translate(" + projection.translate() + ")"
		  + "scale(" + .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height) + ")"
		  + "translate(" + -(b[1][0] + b[0][0]) / 2 + "," + -(b[1][1] + b[0][1]) / 2 + ")");
		  
		g.selectAll(".college").classed("hidden", false);
		g.selectAll(".counts").classed("hidden", true);
		//$(".college").toggleClass(".hidden");
		/*$(".college").each(function(){ 
			$(this).toggleClass("hidden"); 
		})	;*/
	}

	function reset() {
	  g.selectAll(".active").classed("active", active = false);
	  g.selectAll(".college").classed("hidden", true);
	  g.selectAll(".counts").classed("hidden", false);
	  g.transition().duration(750).attr("transform", "");
	}


	/*
	var tooltip = d3.select("#map").append("div")
		.attr("class", "tooltip");
	*/


	function drawStates(usStateData,names) {

		var states = topojson.feature(usStateData, usStateData.objects.states).features,
		  neighbors = topojson.neighbors(usStateData.objects.states.geometries),
		  i = -1,
		  n = states.length;

	  states.forEach(function(d,i) { 
		var tryit = names.filter(function(n) { return d.id == n.id; })[0];
		if (typeof tryit === "undefined"){
		  d.count = "";//"Unknown";
		  //console.log(d);
		  d.selected = false;
		} else {
		  d.count = tryit.count;
		  d.selected = tryit.selected;
		}
	  });

		var state = g.selectAll(".state").data(states);
		
		stateEnter = state.enter().append("g").attr("class", "state");

		stateEnter.append("path")
		  .attr("title", function(d,i) { return d.name; })
		  .attr("d", path)
		  .on("click", click)
		  .style("fill", function(d, i) { return color(d.color = d3.max(neighbors[i], function(n) { return states[n].color; }) + 1 | 0); });

		var texts = stateEnter.append("text")
			.attr("class","counts")
			.attr("x", function(d) {
				//console.log(d);
				//console.log(path.centroid(d));
				if(!isNaN(path.centroid(d)[0]))
					return path.centroid(d)[0];
				return 0;	
			} )
			.attr("y", function(d) {
				if(!isNaN(path.centroid(d)[0]))
					return path.centroid(d)[1];
				return 0;
			} )
			.attr("dy",".35em")
			.text(function(d) {
				if(d.count == 0)
					return "";
				return d.count;
				})
			.attr("text-anchor","middle")
			.attr('fill', '#C3C2C2');

		
		state.exit()
			.attr("opacity", 1)
			.transition()
			.duration(1000)
			.attr("opacity", 0)
			.remove();

		
		
		state.select(".counts")
			.text(function(d) {
				if(d.count == 0)
					return "";
				return d.count;
				});
		
		
		state.selectAll("text").filter(function(d){
			if(d.selected)
				return true;
			return false;
		}).attr("fill","#2B2A2A");
		
		state.selectAll("text").filter(function(d){
			if(!d.selected)
				return true;
			return false;
		}).attr("fill","#C3C2C2");
		//Show/hide tooltip
		/*
		country
		  .on("mousemove", function(d,i) {
			var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );

			tooltip
			  .classed("hidden", false)
			  .attr("style", "left:"+(mouse[0]+25)+"px;top:"+mouse[1]+"px")
			  .html(d.name)
		  })
		  .on("mouseout",  function(d,i) {
			tooltip.classed("hidden", true)
		  });
		*/


	}	


	function drawSchools(schools) {


		/*var gp = d3.select("#map svg").append("g")
				.attr("id","#points");
	*/
		var pts = g.selectAll(".college")
				.data(d3.values(schools));

		pts.enter().append("circle")
			.classed("college",true)
			.classed("hidden",true)
			;
				
				
				
		pts.exit()
				.attr("opacity", 1)
				.transition()
				.duration(1000)
				.attr("opacity", 0)
				.remove();		

				
		pts.attr("cx", function(d,i){
					//console.log(d)
					var pro = projection([d.LONGITUDE, d.LATITUDE]);
					if(pro) // test if location is in the projection.
						return pro[0];
					return 0;
					//return projection([d.longitude, d.latitude])[0]
				})
				.attr("cy", function (d, i) {
					var pro = projection([d.LONGITUDE, d.LATITUDE]);
					if(pro)
						return pro[1];
					return 0;
					//return projection([d.longitude, d.latitude])[1]
				})
				.attr("r", 1)
				.style("fill", "#2B2A2A")
				.attr("opacity", 1);

		// highlight selected school 
		pts.filter(function(d){
			if(d.selected)
				return true;
			return false;
		})
		.style("fill", "#C3C2C2")	//todo change to proper color?
		.each(function(){
			this.parentNode.appendChild(this);
		})
	}



	function CountSchools(names,schools){

		counts = new Array();
		
		
		
		for( st in names)
		{
			counts[st] = 0;
			names[st].count = 0;
			names[st].selected = false;
			for( sc in schools)
			{
				if(schools[sc].STABBR == names[st].code)
				{
					counts[st]++;
					names[st].count++;
					
					// if school selected
					if( schools[sc].selected)
						names[st].selected = true;
				}
			}
		}



	}
/*
	function filterData(schools) {

		var min = parseInt($("#satMin").val());
		var max = parseInt($("#satMax").val());

		fschools = new Array();
		for( var sc in schools)
		{
			if( (parseInt(schools[sc].SAT_AVG) > min) && (parseInt(schools[sc].SAT_AVG) < max) )
				fschools.push(schools[sc]);
		}

		console.log(fschools);
		return fschools;
	}
*/

	this.updateMap = function (usStateData, names , schools){

		//fschools = filterData(schools);
		
		CountSchools(names,schools);

		drawStates(usStateData,names);
		drawSchools(schools);

	}


}


