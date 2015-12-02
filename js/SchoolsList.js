// list script

function requiredFieldValidator(value) {
	if (value == null || value == undefined || !value.length) {
	  return {valid: false, msg: "This is a required field"};
	} else {
	  return {valid: true, msg: null};
	}
}

function waitingFormatter(value) {
	return "wait...";
}

function renderSparkline(cellNode, row, dataContext, colDef) {
	var vals = [
	  dataContext.UGDS,
	  dataContext.TUITIONFEE_IN,
	  dataContext.TUITIONFEE_OUT,
	];

	$(cellNode).empty().sparkline(vals, {
				type: 'bar',
				width: '100%',
				barColor: "#AF0025",
				chartRangeMin: 0,
				chartRangeMax: 1,
				tooltipFormat: '{{offset:offset}} {{value}}',
				tooltipValueLookups: {
					'offset': {
						0: 'Population',
						1: 'Tuition In',
						2: 'Tuition Out',
					}
				},
				});
}


var SchoolsList = function(cVis) {

	this.cVis = cVis;
	
	
	
	

	this.build = function(schools){
		
		// clear current list
		$("#SchoolList").empty();
		
		/*
		listHTML = ""
		for( sc in schools)
		{
			//build  list item for school 
			listHTML += "<li id='" +schools[sc].UNITID+ "'>   "+ schools[sc].INSTNM  + "  <a href='"+ schools[sc].INSTURL +"'>Website</a></li>"
				
			
		}
		
		// append new list 
		$("#SchoolList").append(listHTML);
		
		console.log("list posted");
		
		// create little bar charts   
		// get max values for  scaling
		var UGDSmax = d3.max(schools , function(d) { if (d.UGDS != "NULL" ) return parseFloat(d.UGDS);});
		var TuitionIn = d3.max(schools , function(d) { if (d.TUITIONFEE_IN != "NULL" ) return parseFloat(d.TUITIONFEE_IN);});
		var TuitionOut = d3.max(schools , function(d) { if (d.TUITIONFEE_OUT != "NULL" ) return parseFloat(d.TUITIONFEE_OUT);});
		
		console.log("maxs found");
		
		for( sc in schools)
		{
			
			var data = []
			
			// scale data 
			if( schools[sc].UGDS != "NULL")
				data.push( (parseFloat(schools[sc].UGDS) / UGDSmax).toFixed(2) ) 
			else
				data.push(0)
			
			
			if( schools[sc].TUITIONFEE_IN != "NULL")
				data.push( (parseFloat(schools[sc].TUITIONFEE_IN) / TuitionIn).toFixed(2) ) 
			else
				data.push(0)
			
			
			if( schools[sc].TUITIONFEE_OUT != "NULL")
				data.push( (parseFloat(schools[sc].TUITIONFEE_OUT) / TuitionOut).toFixed(2) ) 
			else
				data.push(0)
			
			
			
			//  add a bar chart of data 
			// create an element and draw a sparkline
			var barchart = $('<span>&nbsp;</span>');
			barchart.sparkline(data, {
				type: 'bar',
				tooltipFormat: '{{offset:offset}} {{value}}',
				tooltipValueLookups: {
					'offset': {
						0: 'Pop',
						1: '$$ In',
						2: '$$ Out',
					}
				},
				});
			// insert the element somewhere into the DOM
			$('#'+schools[sc].UNITID).append(barchart);
			// actually render any undrawn sparklines that are now visible in the DOM
			
			
		}
		$.sparkline_display_visible();
			
		
		console.log(" lines posted ");
		
		
		$("#"+ cVis.SelectedSchool).addClass("Selected");
		
		// link event handler to list items. 
		$("#SchoolList li").click(function () {
			
			id = $(this).attr("id");
			
			cVis.SelectedSchool = id;
			
			$("#SchoolList li").removeClass("Selected");
			$(this).addClass("Selected");
			
			cVis.update();
		});
		*/
		
		
		sData = this.scaleData(schools);
		
		
		
		var grid;
		var columns = [
			{id: "title", name: "Title", field: "INSTNM", sortable: false, width: 408},
			{id: "chart", name: "Chart", sortable: false, width:70, formatter: waitingFormatter, rerenderOnResize: true, asyncPostRender: renderSparkline}
		];

		var options = {
			editable: true,
			enableAddRow: false,
			asyncEditorLoading: false,
			enableAsyncPostRender: true
		};
		
		
		sData.getItemMetadata = function(row){
			
			if(sData[row].UNITID == cVis.SelectedSchool)
				return { cssClasses: 'Selected' };
			return "";
		}
		
		
		grid = new Slick.Grid("#SchoolList", sData, columns, options);
		
		
		grid.onDblClick.subscribe(function(e, args){
			
			var cell = grid.getCellFromEvent(e);
			var d = grid.getColumns()[cell.cell];
			//var args; // object containing name, field, id, etc
			console.log("e args ");
			console.log(args);
			console.log(e);
			console.log(cell);
			console.log(d);
			
			console.log(sData[cell.row]);
			
			
			// on dbl click select school
			id = sData[cell.row].UNITID;
			
			cVis.SelectedSchool = id;
			
			$("#SchoolList li").removeClass("Selected");
			$(this).addClass("Selected");
			
			cVis.update();
			
		});	
		
	}

	
	
	this.scaleData = function(schools){ 
		
		// get max values for  scaling
		var UGDSmax = d3.max(schools , function(d) { if (d.UGDS != "NULL" ) return parseFloat(d.UGDS);});
		var TuitionIn = d3.max(schools , function(d) { if (d.TUITIONFEE_IN != "NULL" ) return parseFloat(d.TUITIONFEE_IN);});
		var TuitionOut = d3.max(schools , function(d) { if (d.TUITIONFEE_OUT != "NULL" ) return parseFloat(d.TUITIONFEE_OUT);});
		
		var data = [];
		
		for( sc in schools)
		{
			
			data[sc] = schools[sc];
			
			// scale data 
			if( schools[sc].UGDS != "NULL")
				data[sc].UGDS = (parseFloat(schools[sc].UGDS) / UGDSmax).toFixed(2) 
			else
				data[sc].UGDS = 0;
			
			
			if( schools[sc].TUITIONFEE_IN != "NULL")
				data[sc].TUITIONFEE_IN = (parseFloat(schools[sc].TUITIONFEE_IN) / TuitionIn).toFixed(2)
			else
				data[sc].TUITIONFEE_IN = 0
			
			
			if( schools[sc].TUITIONFEE_OUT != "NULL")
				data[sc].TUITIONFEE_OUT =  (parseFloat(schools[sc].TUITIONFEE_OUT) / TuitionOut).toFixed(2) 
			else
				data[sc].TUITIONFEE_OUT = 0
			
			
		}
	
		return data;
	}
	
	
}





