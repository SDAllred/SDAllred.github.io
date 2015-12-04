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
	  dataContext.UGDSsc,
	  dataContext.TUITIONFEE_INsc,
	  dataContext.TUITIONFEE_OUTsc,
	];

	$(cellNode).empty().sparkline(vals, {
				type: 'bar',
				width: '100%',
				barWidth: '12px',
				barColor: "#AF0025",
				chartRangeMin: 0,
				chartRangeMax: 1,
				tooltipFormat: '{{offset:offset}} {{value}}% of max',
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
		
		$("#gsTitle").html(schools.length + " Schools Selected");
		
		sData = this.scaleData(schools);
		
		var grid;
		var columns = [
			{id: "chart", name: "Chart", width:70, formatter: waitingFormatter, rerenderOnResize: true, asyncPostRender: renderSparkline},
			{id: "title", name: "Title", field: "INSTNM", width: 408 , behavior: "selectAndMove", resizable: false, cssClass: "cell-reorder dnd"},
			{id: "UGDS", name: "Population", field: "UGDS", width: 70 ,sortable: true},
			{id: "TuIn", name: "Tuition In", field: "TUITIONFEE_IN", width: 70 ,sortable: true},
			{id: "TuOut", name: "Tuition Out", field: "TUITIONFEE_OUT", width: 70 ,sortable: true},
		];

		var options = {
			editable: true,
			enableAddRow: true,
			enableCellNavigation: true,
			asyncEditorLoading: false,
			enableAsyncPostRender: true,
			forceFitColumns:true,
			autoEdit: false,
			enableColumnReorder: false,
			multiColumnSort: true
		};
		
		
		sData.getItemMetadata = function(row){
			if( row < sData.length)
			{
				if(sData[row].UNITID == cVis.SelectedSchool)
					return { cssClasses: 'Selected' };
			}
			return "";
		}
		
		
		grid = new Slick.Grid("#SchoolList", sData, columns, options);
		
		// handle the school selection
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
			
			//update map and graphs 
			cVis.update();
			
		});	
		
		
		
		
		
		// handle the drag and drop 
		grid.setSelectionModel(new Slick.RowSelectionModel());
		
		  var moveRowsPlugin = new Slick.RowMoveManager({
			cancelEditOnDrag: true
		  });
		  
		  moveRowsPlugin.onBeforeMoveRows.subscribe(function (e, data) {
			for (var i = 0; i < data.rows.length; i++) {
			  // no point in moving before or after itself
			  if (data.rows[i] == data.insertBefore || data.rows[i] == data.insertBefore - 1) {
				e.stopPropagation();
				return false;
			  }
			}
			return true;
		  });
		  
		  moveRowsPlugin.onMoveRows.subscribe(function (e, args) {
			var extractedRows = [], left, right;
			var rows = args.rows;
			var insertBefore = args.insertBefore;
			left = sData.slice(0, insertBefore);
			right = sData.slice(insertBefore, sData.length);
			rows.sort(function(a,b) { return a-b; });
			for (var i = 0; i < rows.length; i++) {
			  extractedRows.push(sData[rows[i]]);
			}
			rows.reverse();
			for (var i = 0; i < rows.length; i++) {
			  var row = rows[i];
			  if (row < insertBefore) {
				left.splice(row, 1);
			  } else {
				right.splice(row - insertBefore, 1);
			  }
			}
			sData = left.concat(extractedRows.concat(right));
			var selectedRows = [];
			for (var i = 0; i < rows.length; i++)
			  selectedRows.push(left.length + i);
			grid.resetActiveCell();
			grid.setData(sData);
			grid.setSelectedRows(selectedRows);
			grid.render();
			
			// update the graphs with the new list
			cVis.fSchools = sData;
			cVis.updateGraphs(sData);
		  });
		  grid.registerPlugin(moveRowsPlugin);
		  /*
		  grid.onDragInit.subscribe(function (e, dd) {
			// prevent the grid from cancelling drag'n'drop by default
			e.stopImmediatePropagation();
		  });
		  grid.onDragStart.subscribe(function (e, dd) {
			var cell = grid.getCellFromEvent(e);
			if (!cell) {
			  return;
			}
			dd.row = cell.row;
			if (!data[dd.row]) {
			  return;
			}
			if (Slick.GlobalEditorLock.isActive()) {
			  return;
			}
			e.stopImmediatePropagation();
			dd.mode = "recycle";
			var selectedRows = grid.getSelectedRows();
			if (!selectedRows.length || $.inArray(dd.row, selectedRows) == -1) {
			  selectedRows = [dd.row];
			  grid.setSelectedRows(selectedRows);
			}
			dd.rows = selectedRows;
			dd.count = selectedRows.length;
			var proxy = $("<span></span>")
				.css({
				  position: "absolute",
				  display: "inline-block",
				  padding: "4px 10px",
				  background: "#e0e0e0",
				  border: "1px solid gray",
				  "z-index": 99999,
				  "-moz-border-radius": "8px",
				  "-moz-box-shadow": "2px 2px 6px silver"
				})
				.text("Drag to Recycle Bin to delete " + dd.count + " selected row(s)")
				.appendTo("body");
			dd.helper = proxy;
			$(dd.available).css("background", "pink");
			return proxy;
		  });
		  grid.onDrag.subscribe(function (e, dd) {
			if (dd.mode != "recycle") {
			  return;
			}
			dd.helper.css({top: e.pageY + 5, left: e.pageX + 5});
		  });
		  grid.onDragEnd.subscribe(function (e, dd) {
			if (dd.mode != "recycle") {
			  return;
			}
			dd.helper.remove();
			$(dd.available).css("background", "beige");
		  });
		  $.drop({mode: "mouse"});*/
		 /* $("#dropzone")
			  .bind("dropstart", function (e, dd) {
				if (dd.mode != "recycle") {
				  return;
				}
				$(this).css("background", "yellow");
			  })
			  .bind("dropend", function (e, dd) {
				if (dd.mode != "recycle") {
				  return;
				}
				$(dd.available).css("background", "pink");
			  })
			  .bind("drop", function (e, dd) {
				if (dd.mode != "recycle") {
				  return;
				}
				var rowsToDelete = dd.rows.sort().reverse();
				for (var i = 0; i < rowsToDelete.length; i++) {
				  data.splice(rowsToDelete[i], 1);
				}
				grid.invalidate();
				grid.setSelectedRows([]);
			  });
			  */
		  grid.onAddNewRow.subscribe(function (e, args) {
			var item = {name: "New task", complete: false};
			$.extend(item, args.item);
			data.push(item);
			grid.invalidateRows([data.length - 1]);
			grid.updateRowCount();
			grid.render();
		  });
			
		
		
		
		
		
		// sorting the list 
		grid.onSort.subscribe(function (e, args) {
			  var cols = args.sortCols;
			  sData.sort(function (dataRow1, dataRow2) {
				for (var i = 0, l = cols.length; i < l; i++) {
				  var field = cols[i].sortCol.field;
				  var sign = cols[i].sortAsc ? 1 : -1;
				  var value1 = dataRow1[field], value2 = dataRow2[field];
				  var result = (value1 == value2 ? 0 : (value1 > value2 ? 1 : -1)) * sign;
				  if (result != 0) {
					return result;
				  }
				}
				return 0;
			  });
			  grid.invalidate();
			  grid.render();
			  
				// update the graphs with the new list
				cVis.fSchools = sData;
				cVis.updateGraphs(sData);
			});
		
		
		$("#SSTopButton").click(function(){
			
			var extractedRows = [], left, right;
			var rows = grid.getSelectedRows();
			var insertBefore = 0;
			left = sData.slice(0, insertBefore);
			right = sData.slice(insertBefore, sData.length);
			rows.sort(function(a,b) { return a-b; });
			for (var i = 0; i < rows.length; i++) {
			  extractedRows.push(sData[rows[i]]);
			}
			rows.reverse();
			for (var i = 0; i < rows.length; i++) {
			  var row = rows[i];
			  if (row < insertBefore) {
				left.splice(row, 1);
			  } else {
				right.splice(row - insertBefore, 1);
			  }
			}
			sData = left.concat(extractedRows.concat(right));
			var selectedRows = [];
			for (var i = 0; i < rows.length; i++)
			  selectedRows.push(left.length + i);
			grid.resetActiveCell();
			grid.setData(sData);
			grid.setSelectedRows(selectedRows);
			grid.render();
			
			// update the graphs with the new list
			cVis.fSchools = sData;
			cVis.updateGraphs(sData);
		
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
				data[sc].UGDSsc = (parseFloat(schools[sc].UGDS) / UGDSmax).toFixed(2) 
			else
			{
				data[sc].UGDSsc = 0;
				data[sc].UGDS = "n/a";
			}
			if( schools[sc].TUITIONFEE_IN != "NULL")
				data[sc].TUITIONFEE_INsc = (parseFloat(schools[sc].TUITIONFEE_IN) / TuitionIn).toFixed(2)
			else
			{
				data[sc].TUITIONFEE_INsc = 0
				data[sc].TUITIONFEE_IN = "n/a";
			}
			if( schools[sc].TUITIONFEE_OUT != "NULL")
				data[sc].TUITIONFEE_OUTsc =  (parseFloat(schools[sc].TUITIONFEE_OUT) / TuitionOut).toFixed(2) 
			else
			{
				data[sc].TUITIONFEE_OUTsc = 0
				data[sc].TUITIONFEE_OUT = "n/a";
			}
			
		}
	
		return data;
	}
	
	
	this.updateData = function(newData){
		
		this.cVis.fschools = newData;
		
	}
	
}





