


/*
	this function loads the files. 
	after they are loaded is calls the function Main.
	The files are send as parameters in the order they are listed. 
*/
queue()
	.defer(d3.json, "data/us.json")
	.defer(d3.tsv, "data/us-state-names.tsv")
	.defer(d3.csv, "data/2013Data.csv")
	.await(Main);


function Main(error, usStateData, stateNames, schools) {
	
	// create main cVis object
	var cVis = new CollegeVis();
	
	// add the data to the College Vis object.
	cVis.Data["usStateData"] = usStateData;
	cVis.Data["stateNames"] = stateNames;
	cVis.Data["schools"] = schools;
	cVis.createGraphs();

	
	// create filters and pass handle to update fData	
	createFilters(cVis);	

	
	// call update to display graphs. 
	cVis.update();

	
}	







