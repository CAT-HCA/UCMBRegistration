"use strict";
// document ready event listener
$(document).ready(function() {
	//pulling course ID form query string
	let urlParams = new URLSearchParams(location.search);
	let sectionName = urlParams.get("name");
	let sectionId = urlParams.get("id");
	let leagueCode = urlParams.get("code");
	$("#addSectionCrumb").attr("href", "team_details.html?id=" + sectionId + "&name=" + sectionName + "&code=" + leagueCode)
	.html(data.TeamName + " Dashboard");

	//retrieving "league"(instrument family) data from json file
	$.getJSON("/api/leagues", function(data) {
		//loop to populate drop down options
		for (let i = 0; i < data.length; i++) {
			$("#addTeamLeagueDropDown").append(`<option value='${data[i].Code}'>${data[i].Name}</option>`);
		}
	});

	//create new section (team) button click event
	$("#createSectionBtn").on("click", function() {
		let validationResult = validateForm();
		if (validationResult == true) {
			postNewSection();
		}
	});

	//go back button click event
	$("#cxlCreateBtn").on("click", function() {
		window.location.assign("section_dashboard.html");
	});
});

//function to validate text fields
function validateForm() {
	let errorArray = [];
	if (
		$("#newSectionTitle")
			.val()
			.trim() == ""
	) {
		errorArray[errorArray.length] = "Please enter a valid Section name";
	}
	if (
		$("#addTeamLeagueDropDown")
			.val()
			.trim() == "-1"
	) {
		errorArray[errorArray.length] = "Please select an instrument family";
	}
    if (isNaN($("#newSectionMaxMems").val().trim())) {
		errorArray[errorArray.length] = "Maximum Section members must be a number";
    }
    if (
		$("#newSectionMaxMems")
			.val()
			.trim() > 75
	) {
		errorArray[errorArray.length] = "No section can have more than 75 members";
    }
    if (isNaN($("#newSectionMaxAge").val().trim())) {
		errorArray[errorArray.length] = "Maximum member age must be a number";
    }
    if (
		$("#newSectionMaxAge")
			.val()
			.trim() > 100
	) {
		errorArray[errorArray.length] = "Maximum member age can be no more than 100";
    }
	if (
		$("#newSectionManagerName")
			.val()
			.trim() == ""
	) {
		errorArray[errorArray.length] = "Please enter a valid Section Leader name";
	}

	//let phoneNumberPattern = new RegExp("^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$");
	let phoneNumberPattern = /^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
	let answer = phoneNumberPattern.test($("#newSectionManagerPhone").val());
	if (answer != true) {
		errorArray[errorArray.length] = "Please enter a Section Leader phone number in the format 555-555-5555";
	}
	let emailPattern = new RegExp("^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$");
	let result = emailPattern.test($("#newSectionManagerEmail").val());
	if (result != true) {
		errorArray[errorArray.length] = "Please enter a valid Section Leader email address";
	}
	if (
		$("#newSectionDescription")
			.val()
			.trim() == ""
	) {
		errorArray[errorArray.length] = "Please enter a section/instrument description";
	}
	if (errorArray.length == 0) {
		return true;
	}
	if (errorArray.length > 0) {
		$("#errorMessages").empty();
		for (let i = 0; i < errorArray.length; i++) {
			$("<li>" + errorArray[i] + "</li>").appendTo($("#errorMessages"));
		}
		return false;
	}
}

function postNewSection() {
	$.post("/api/teams", $("#addSectionForm").serialize(), function(data) {});
	window.location.assign("/section_dashboard.html");
}
