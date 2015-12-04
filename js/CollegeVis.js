

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
	this.fData = {};
	
	/*
	// Data holds the data used by the different graphs, etc.
	// this array using their id name ex. 
		cVis.fData["us.json"] = usStateData;
	*/
	this.Data = {};

	this.SelectedSchool ="";
}


/*
	This is called after a filter value is updated to update
	all of the maps, graphs, etc.
*/
CollegeVis.prototype.update = function(){
	var self = this;
	
	
	// updated filtered school list 
	self.fschools = self.filterData();
	
	
	// update graphs,etc
	self.map.updateMap(self.Data["usStateData"], self.Data["stateNames"], fschools);
	self.SelectedList.build(self.fschools);
	self.updateGraphs(self.fschools);




}



CollegeVis.prototype.updateGraphs = function(schools){
	var self = this;
	
	self.graphs.build(schools);
	
	
}


/*
	loads all of the data and puts it into the self.Data array.

*/
CollegeVis.prototype.loadData = function(){
	var self = this;
	
	// put all the data you are loading here. 
	d3.json("data/us.json", function (error, usStateData) {
		if (error) throw error;
		self.Data["usStateData"] = usStateData;
	});
	
	d3.tsv("data/us-state-names.tsv", function (error, stateNames) {
		if (error) throw error;
		self.Data["stateNames"] = stateNames;
	});
	
	d3.csv("data/ScoreCardData2013.Map.csv", function (error, schools) {
		if (error) throw error;
		self.Data["schools"] = schools;
	});

	return true;
}



/*
	This uses the values stored in the self.fData to filter the 
	list of schools. 

*/
CollegeVis.prototype.filterData = function(){
	var self = this;
	

	// create array of new filtered list
	fschools = new Array();
	var schools = self.Data["schools"];
	
	
	
	for( var sc in schools)
	{
		add = false
		// sat_avg filter
		if( (parseInt(schools[sc].SAT_AVG) > self.fData["Sat_Avg"].min) && (parseInt(schools[sc].SAT_AVG) < self.fData["Sat_Avg"].max) )
			add= true;
		
		// act_avg filter
		if( (parseInt(schools[sc].ACTCMMID) > self.fData["ACTCMMID"].min) && (parseInt(schools[sc].ACTCMMID) < self.fData["ACTCMMID"].max) )
			add= true;
		
		// tuitionfee_in filter
		if( (parseInt(schools[sc].TUITIONFEE_IN) > self.fData["TUITIONFEE_IN"].min) && (parseInt(schools[sc].TUITIONFEE_IN) < self.fData["TUITIONFEE_IN"].max) )
			add= true;
		
		// tuitionfee_out filter
		if( (parseInt(schools[sc].TUITIONFEE_OUT) > self.fData["TUITIONFEE_OUT"].min) && (parseInt(schools[sc].TUITIONFEE_OUT) < self.fData["TUITIONFEE_OUT"].max) )
			add= true;
		
		// population size filter
		if(self.fData["UGDS"].min1 == self.fData["UGDS"].min2 && self.fData["UGDS"].max1 == self.fData["UGDS"].max2)
		{
			if( (parseInt(schools[sc].UGDS) >= self.fData["UGDS"].min1) && (parseInt(schools[sc].UGDS) <= self.fData["UGDS"].max1) )
				add= true;
		}
		else
		{
			if( ((parseInt(schools[sc].UGDS) >= self.fData["UGDS"].min1) && (parseInt(schools[sc].UGDS) <= self.fData["UGDS"].max1)) && ((parseInt(schools[sc].UGDS) >= self.fData["UGDS"].min2) && (parseInt(schools[sc].UGDS) <= self.fData["UGDS"].max2)))
				add= true;
		}
		
		// type of school  filter
		if( (parseInt(schools[sc].CONTROL) >= self.fData["CONTROL"].min) && (parseInt(schools[sc].CONTROL) <= self.fData["CONTROL"].max) )
			add= true;
		// selected school filter
		schools[sc].selected = false;
		if( schools[sc].UNITID == self.SelectedSchool)
		{
			add = true;
			schools[sc].selected = true;
		}	
		
		
		
		
		// add to list 
		if(add)
			fschools.push(schools[sc]);
		
	}

	
	
	// return filtered schools
	//console.log(fschools);
	return fschools;

}



/*
	This creates the objects for handling the different graphs. 

*/
CollegeVis.prototype.createGraphs = function(){
	var self = this;
	
	self.map = new MapVis();
	self.SelectedList = new SchoolsList(self);
	self.graphs = new Graphs(self);
	
}