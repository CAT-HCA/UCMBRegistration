"use strict";
// document ready event listener
$(document).ready(function() {
	//pulling course ID form query string
	let urlParams = new URLSearchParams(location.search);
	let sectionName = urlParams.get("name");
	let sectionId = urlParams.get("id");
	$("#sectionTitle").html(sectionName + " Dashboard");
	$("#dashboardTitle").html(sectionName + " Dashboard");
});
