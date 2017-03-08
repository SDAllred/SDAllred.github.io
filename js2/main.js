


/*
	this function loads the files. 
	after they are loaded is calls the function Main.
	The files are send as parameters in the order they are listed. 
*/
queue()
	.defer(d3.csv, "data2/AvgTotal.csv")
	.defer(d3.csv, "data2/SumByDate.csv")
	.defer(d3.csv, "data2/Lines.csv")
	.await(Main);


function Main(error, avg, dateSum, lines) {
	
	// create main cVis object
	var cVis = new CollegeVis();
	
	// add the data2 to the College Vis object.
	//cVis.Data["avgTote"] = avgTote;
	cVis.Data["avg"] = avg;
	cVis.Data["dateSum"] = dateSum;
	cVis.Data["lines"] = lines;
	cVis.createGraphs();
	cVis.createLines();

	
	// call update to display graphs. 
	cVis.update();

	
}	







