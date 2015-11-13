



	queue()
		.defer(d3.json, "data/us.json")
		.defer(d3.tsv, "data/us-state-names.tsv")
		.defer(d3.csv, "data/ScoreCardData2013.Map.csv")
		.await(Main);
		
	function Main(error, usStateData, stateNames,schools) {
		
		// create main cVis object
		var cVis = new CollegeVis();
		//cVis.loadData();
		cVis.Data["usStateData"] = usStateData;
		cVis.Data["stateNames"] = stateNames;
		cVis.Data["schools"] = schools;
		cVis.createGraphs();

		
		// create filters and pass handle to update fData	
		createFilters(cVis);	

		
		// call update to display graphs. 
		cVis.update();

		

	}	


/*
// this is launched when the html finishes loading 
$(document).ready( function() {
	
	





});

*/







