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

	//slider for Act_avg
	$("#ActMedianSlider").slider({
		range:true,
		min:0,
		max:36,
		values:[0,36],
		slide : function(event, ui) {
	
			// get values 
			var val = {};
			val.min = ui.values[0];
			val.max = ui.values[1];
			
			// update college vis and call update function to update graphs
			cVis.fData["ACTCMMID"] = val;
			cVis.update();
			
			// update label
			$("#ActMedianVal").html(ui.values[0] + " - " + ui.values[1]);
			
		}
	});
	// setup defalt values in fData
	cVis.fData["ACTCMMID"] ={};
	cVis.fData["ACTCMMID"].min = 0;
	cVis.fData["ACTCMMID"].max = 36;
	$("#ActMedianVal").html("0 - 36");
	
	//Slider for tuition cost in state
	$("#TuitionCostInSlider").slider({
		range:true,
		min:0,
		max:55000,
		values:[0,55000],
		slide : function(event, ui) {
	
			// get values 
			var val = {};
			val.min = ui.values[0];
			val.max = ui.values[1];
			
			// update college vis and call update function to update graphs
			cVis.fData["TUITIONFEE_IN"] = val;
			cVis.update();
			
			// update label
			$("#TuitionCostInVal").html(ui.values[0] + " - " + ui.values[1]);
			
		}
	});
	// setup defalt values in fData
	cVis.fData["TUITIONFEE_IN"] ={};
	cVis.fData["TUITIONFEE_IN"].min = 0;
	cVis.fData["TUITIONFEE_IN"].max = 55000;
	$("#TuitionCostInVal").html("0 - 55,000");
	
	//Slider for tuition cost out of state
	$("#TuitionCostOutSlider").slider({
		range:true,
		min:0,
		max:55000,
		values:[0,55000],
		slide : function(event, ui) {
	
			// get values 
			var val = {};
			val.min = ui.values[0];
			val.max = ui.values[1];
			
			// update college vis and call update function to update graphs
			cVis.fData["TUITIONFEE_OUT"] = val;
			cVis.update();
			
			// update label
			$("#TuitionCostOutVal").html(ui.values[0] + " - " + ui.values[1]);
			
		}
	});
	// setup defalt values in fData
	cVis.fData["TUITIONFEE_OUT"] ={};
	cVis.fData["TUITIONFEE_OUT"].min = 0;
	cVis.fData["TUITIONFEE_OUT"].max = 55000;
	$("#TuitionCostOutVal").html("0 - 55,000");
	
	
	//Cheklist for population size
	$("#studentPop :checkbox").change(function(){
		
		var val ={min1:0, min2:0, max1:0, max2:0};
		if($("#small").is(":checked"))
		{
			if($("#medium").is(":checked"))
			{
				val.min1 = 0;
				val.min2 = 0;
				val.max1 = 15000;
				val.max2 = 15000;
				
				if($("#large").is(":checked"))
				{
					val.min1 = 0;
					val.min2 = 0;
				    val.max1 = 50000;
					val.max2 = 50000;
				}
			}
			else if($("#large").is(":checked"))
			{
				val.min1 = 0;
				val.min2 = 15001;
				val.max1 = 1999;
				val.max2 = 50000;
			}
			else
			{
				val.min1 = 0;
				val.min2 = 0;
				val.max1 = 1999;
				val.max2 = 1999;
			}
		}
		
		else if($("#medium").is(":checked"))
		{
			if($("#large").is(":checked"))
			{
				val.min1 = 2000;
				val.min2 = 2000;
				val.max1 = 50000;
				val.max2 = 50000;
			}
			else
			{
				val.min1 = 2000;
				val.min2 = 2000;
				val.max1 = 15000;
				val.max2 = 15000;
			}
		}
		
		else if($("#large").is(":checked"))
		{
			val.min1 = 15001;
			val.min2 = 15001;
			val.max1 = 50000;
			val.max2 = 50000;
		}
		else
		{
			val.min1 = 0;
			val.min2 = 0;
			val.max1 = 0;
			val.max2 = 0;
		}
		
		cVis.fData["UGDS"] = val;
		cVis.update();
		
	});
	
	cVis.fData["UGDS"] ={};
	cVis.fData["UGDS"].min1 = 0;
	cVis.fData["UGDS"].min2 = 0;
	cVis.fData["UGDS"].max1 = 50000; 
	cVis.fData["UGDS"].max2 = 50000;
	
	
	//Cheklist for type of school
	$("#schoolType :checkbox").change(function(){
		var val = {};
		
		if($("#public").is(":checked"))
		{
			val.min = 1;
			val.max = 1;
			
			if($("#private").is(":checked"))
			{
				val.min = 1;
				val.max = 2;
				
				if($("#privateFP").is(":checked"))
				{
					val.min = 1;
					val.max = 3;
				}
			}
		}
		else if($("#private").is(":checked"))
		{
			val.min = 2;
			val.max = 2;
			
			if($("#privateFP").is(":checked"))
			{
				val.min = 2;
				val.max = 3;
			}
		}
		else if($("#privateFP").is(":checked"))
		{
			val.min = 3;
			val.max = 3;
		}
		else
		{
			val.min = 0;
			val.max = 0;
		}
		
		cVis.fData["CONTROL"] = val;
		cVis.update();
	});
	
	cVis.fData["CONTROL"] ={};
	cVis.fData["CONTROL"].min = 1;
	cVis.fData["CONTROL"].max = 3;
	
	//Null filters
	$("#nullSAT :checkbox").change(function(){
		cVis.update();
	});
	
	$("#nullACT :checkbox").change(function(){
		cVis.update();
	});
	
	$("#nullTuitionIn :checkbox").change(function(){
		cVis.update();
	});
	
	$("#nullTuitionOut :checkbox").change(function(){
		cVis.update();
	});
	
	$("#nullPopulation :checkbox").change(function(){
		cVis.update();
	}); 
}


