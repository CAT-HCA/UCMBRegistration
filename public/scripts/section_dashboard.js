"use strict";

$(document).ready(function() {
	//retrieving "section" data from json file
	$.getJSON("/api/teams", function(data) {
		//loop to populate drop down options
		for (let i = 0; i < data.length; i++) {
			$("#sectionDropDown").append(`<option value='${data[i].TeamId}'>${data[i].TeamName}</option>`);
		}
	});

	//retrieving "league"(instrument family) data from json file
	$.getJSON("/api/leagues", function(data) {
		//loop to populate drop down options
		for (let i = 0; i < data.length; i++) {
			$("#leagueDropDown").append(`<option value='${data[i].Code}'>${data[i].Name}</option>`);
		}
    });

    	//retrieving "league"(instrument family) data from json file
	$.getJSON("/api/teams", function(data) {
		//loop to populate drop down options
		for (let i = 0; i < data.length; i++) {
			$("#managerDropDown").append(`<option value='${data[i].TeamId}'>${data[i].ManagerName}</option>`);
		}
	});

});



