/*
	This file holds the functions that build
	and get values from the usr/html.
*/



function createFilters(cVis) {
	
	// slider for Sat_Avg
	$("#SatAvgSlider").slider({
		range:true,
		min:0,
		max:2400,
		values:[0,2400],
		slide : function(event, ui) {
	
			// get values 
			var val = {};
			val.min = ui.values[0];
			val.max = ui.values[1];
			
			// update college vis and call update function to update graphs
			cVis.fData["Sat_Avg"] = val;
			cVis.update();
			
			// update label
			$("#SatAvgVal").html(ui.values[0] + " - " + ui.values[1]);
			
		}
	});
	// setup defalt values in fData
	cVis.fData["Sat_Avg"] ={};
	cVis.fData["Sat_Avg"].min = 0;
	cVis.fData["Sat_Avg"].max = 2400;
	$("#SatAvgVal").html("0 - 2400");

}


