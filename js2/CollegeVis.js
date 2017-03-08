

/* 
	This will be the main constructor for the CollegeVis class
	This class will build all of the other objects(maps, graphs, etc)
	and handle the updating. 
*/
function CollegeVis(){

	/*
	// fData holds the filter values given by the user inputs. 
	// when any of them are updated they update their value in
	// this array using their id name ex. 
		cVis.fData["Sat_Avg"] = NewValue;
	
	*/
//	this.fData = {};
	
	/*
	// Data holds the data2 used by the different graphs, etc.
	// this array using their id name ex. 
		cVis.fData["us.json"] = usStateData;
	*/
	this.Data = {};
//	this.fschools = [];
	

}


/*
	This is called after a filter value is updated to update
	all of the maps, graphs, etc.
*/
CollegeVis.prototype.update = function(){
	var self = this;
	
	
	self.updateGraphs(self.Data["dateSum"]);
	self.updateGraphs2(self.Data["avg"]);

	self.updateLines(self.Data["lines"]);




}




CollegeVis.prototype.updateGraphs = function(schools){
	var self = this;
	if( schools == null)
		self.graphs.build(self.Data["dateSum"]);
	else
		self.graphs.build(schools);
	
	
}


CollegeVis.prototype.updateGraphs2 = function(schools){
	var self = this;
	if( schools == null)
		self.grph2.buildavg(self.Data["avg"]);
	else
		self.grph2.buildavg(schools);


}


CollegeVis.prototype.updateLines = function(linedata){
	var self = this;
	if( linedata == null)
		self.sparkl.build(self.Data["lines"]);
	else
		self.sparkl.build(linedata);


}


/*
	loads all of the data2 and puts it into the self.Data array.

*/
CollegeVis.prototype.loadData = function(){
	var self = this;
	
	
	// d3.csv("data2/AvgTotal.csv", function (error, avgTote) {
	// 	if (error) throw error;
	// 	self.Data["avgTote"] =  avgTote;
	// });

	d3.csv("data2/SumByDate.csv", function (error, dateSum) {
		if (error) throw error;
		self.Data["dateSum"] =  dateSum;
	});

	d3.csv("data2/AvgTotal.csv", function (error, dateSum) {
		if (error) throw error;
		self.Data["avg"] =  avg;
	});

	d3.csv("data2/Lines.csv", function (error, lines) {
		if (error) throw error;
		self.Data["lines"] =  lines;
	});

	return true;
}







/*
	This creates the objects for handling the different graphs. 

*/
CollegeVis.prototype.createGraphs = function(){
	var self = this;

	self.graphs = new Graphs(self);
	self.grph2 = new Grph2(self);


}


CollegeVis.prototype.createLines = function(){
	var self = this;

	self.sparkl = new sparkl(self);


}