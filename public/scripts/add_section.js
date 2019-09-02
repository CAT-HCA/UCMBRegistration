"use strict";
// document ready event listener
$(document).ready(function() {
	//retrieving "league"(instrument family) data from json file
	$.getJSON("/api/leagues", function(data) {
		//loop to populate drop down options
		for (let i = 0; i < data.length; i++) {
			$("#addTeamLeagueDropDown").append(`<option value='${data[i].Code}'>${data[i].Name}</option>`);
		}
	});
});
