/*globals d3, topojson, document*/
// These are helpers for those using JSHint

var data,
    locationData,
    teamSchedules,
    selectedSeries,
    colorScale;

var scale,
    translate,
    area; // minimum area threshold for simplification


	
var zoom = d3.behavior.zoom()
    .scaleExtent([1, 8])
    .on("zoom", zoomed);

function zoomed() {
  g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}	
	
function updateMap() {
	var w = $("#map").attr("width");
    var h = $("#map").attr("height");
	
	var svg = d3.select("#map");
	
	g = svg.select("#mapRect");

	svg.append("rect")
    .attr("class", "overlay")
    .attr("width", w)
    .attr("height", h);
		
	svg.call(zoom)
		.call(zoom.event);
	
	
    // ******* TODO: PART III *******
    
	var projection = d3.geo.albersUsa().scale(1000).translate([w / 2, h / 2]);
    // Draw the games on the map (hint: use #points)
    var pts = d3.select("#map").select("#points").selectAll("circle")
			.data(d3.values(locationData));
    // NOTE: locationData is *NOT* a Javascript Array, like
    // we'd normally use for .data() ... instead, it's just an
    // object (often called an Associative Array)!
	pts.enter().append("circle")
			.attr("cx", function(d,i){
				//console.log(d)
				var pro = projection([d.longitude, d.latitude]);
				if(pro) // test if location is in the projection.
					return pro[0];
				return 0;
				//return projection([d.longitude, d.latitude])[0]
			})
			.attr("cy", function (d, i) {
				var pro = projection([d.longitude, d.latitude]);
				if(pro)
					return pro[1];
				//return projection([d.longitude, d.latitude])[1]
			})
			.attr("r", 1)
			.style("fill", "grey")
			.attr("opacity", 1)
			;
    
    // ******* TODO: PART V *******
	/*
	pts.on("mouseover",function(d){
		var text = ""
		for(var g = 0; g < d.games.length;g++)
		{	
			if( g!=0)
			{
				text+=", ";
			}
			text += d.games[g]["Visit Team Name"]+"@"+d.games[g]["Home Team Name"]
			
		}
		$("#info").html(text);
	})
	pts.on("click",function(d){
		changeSelection(d);
	});*/
	pts.exit()
			.attr("opacity", 1)
			.transition()
			.duration(1000)
			.attr("opacity", 0)
			.remove();
    // Update the circle appearance (set the fill to the
    // mean attendance of all selected games... if there
    // are no matching games, revert to the circle's default style)
	/*
	pts.filter(function(d){
			for(var i=0;i< selectedSeries.length;i++)
			{
				if((selectedSeries[i].longitude == d.longitude) && (selectedSeries[i].latitude == d.latitude))
					return true;
			}
			return false;
		})
		.style("fill", function (d) {
            // color according to the group
			return colorScale(getAvg(d) * 0.005);
        })
		.attr("r",function(d){
			return Math.sqrt(getAvg(d)* 0.005)
		})	
	// if not in selected series
	pts.filter(function(d){
			for(var i=0;i< selectedSeries.length;i++)
			{
				if((selectedSeries[i].longitude == d.longitude) && (selectedSeries[i].latitude == d.latitude))
					return false;
			}
			return true;
		})
		.attr("r", 5)
		.style("fill", "grey");	
*/			
}

function drawStates(usStateData) {
    // ******* TODO: PART III *******
	var w = $("#map").attr("width");
    var h = $("#map").attr("height");
	var projection = d3.geo.albersUsa().scale(1000).translate([w / 2, h / 2]);
    var path = d3.geo.path().projection(projection);
    // Draw the background (state outlines; hint: use #states)
	var svg = d3.select("#map").select("#states")
                .datum(topojson.feature(usStateData, usStateData.objects.states))
            // here we use the familiar d attribute again to define the path
                .attr("d", path);
	
}


/* DATA DERIVATION */

// You won't need to edit any of this code, but you
// definitely WILL need to read through it to
// understand how to do the assignment!

function dateComparator(a, b) {
    // Compare actual dates instead of strings!
    return Date.parse(a.Date) - Date.parse(b.Date);
}

function isObjectInArray(obj, array) {
    // With Javascript primitives (strings, numbers), you
    // can test its presence in an array with
    // array.indexOf(obj) !== -1
    
    // However, with actual objects, we need this
    // helper function:
    var i;
    for (i = 0; i < array.length; i += 1) {
        if (array[i] === obj) {
            return true;
        }
    }
    return false;
}

function deriveLocationData() {
    var key;

    // Obviously, lots of games are played in the same location...
    // ... but we only want one interaction target for each
    // location! In fact, when we select a location, we want to
    // know about ALL games that have been played there - which
    // is a different slice of data than what we were given. So
    // let's reshape it ourselves!

    // We're going to create a hash map, keyed by the
    // concatenated latitude / longitude strings of each game
    locationData = {};

    data.forEach(function (d) {
        // Only deal with games that have a location
		
		//todo   -- add filter for schools outside the continental US
        if (
            d.LATITUDE != "NULL" &&
            d.LONGITUDE != "NULL") {

            key = d.LATITUDE + "," + d.LONGITUDE;

            // Each data item in our new set will be an object
            // with:

            // latitude and longitude properties,

            // a data_type property, similar to the ones in the
            // original dataset that you can use to identify
            // what type of selection the current selection is,
            
            // and a list of all the original game objects that
            // happened at this location
            
            if (!locationData.hasOwnProperty(key)) {
                locationData[key] = {
                    "latitude": d.LATITUDE,
                    "longitude": d.LONGITUDE,
                    "data_type": "Location",
                    "games": []
                };
            }
            locationData[key].games.push(d);
        }
    });

    // Finally, let's sort each list of games by date
    for (key in locationData) {
        if (locationData.hasOwnProperty(key)) {
            locationData[key].games = locationData[key].games.sort(dateComparator);
        }
    }
}



/* DATA LOADING */

// This is where execution begins; everything
// above this is just function definitions
// (nothing actually happens)

d3.json("data/us.json", function (error, usStateData) {
    if (error) throw error;
    
    drawStates(usStateData);
});

d3.csv("data/BasicData.csv", function (error, loadedData) {
    if (error) throw error;

    // Store the data in a global variable for all functions to access
    data = loadedData;

    // These functions help us get slices of the data in
    // different shapes
    deriveLocationData();
    
    

    // Draw everything for the first time
    updateMap();
});