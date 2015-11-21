// list script 


var SchoolsList = function(cVis) {

	this.cVis = cVis;
	
	
	
	

	this.build = function(schools){
		
		// clear current list
		$("#SchoolList").empty();
		
		listHTML = ""
		for( sc in schools)
		{
			//build  list item for school 
			listHTML += "<li id='" +schools[sc].UNITID+ "'>   "+ schools[sc].INSTNM  + "  <a href='"+ schools[sc].INSTURL +"'>Website</a></li>"
			
		}
		
		// append new list 
		$("#SchoolList").append(listHTML);
		
		$("#"+ cVis.SelectedSchool).addClass("Selected");
		
		// link event handler to list items. 
		$("#SchoolList li").click(function () {
			
			id = $(this).attr("id");
			
			cVis.SelectedSchool = id;
			
			$("#SchoolList li").removeClass("Selected");
			$(this).addClass("Selected");
			
			cVis.update();
		});
	}

}


