"use strict";
// document ready event listener
$(document).ready(function() {
	//pulling section ID form query string
	let urlParams = new URLSearchParams(location.search);
	let sectionId = urlParams.get("id");
	let sectionName = urlParams.get("name");
	let leagueCode = urlParams.get("code");
	 $("#newMemberSection").val(sectionName)
	 $("#addMemberCrumb").attr("href", "team_details.html?id=" + sectionId + "&name=" + sectionName + "&code=" + leagueCode)
	 .html(sectionName + " Dashboard");

	//create new section (team) button click event
	$("#addMemberBtn").on("click", function() {
		let validationResult = validateForm();
		if (validationResult == true) {
			postNewMember(sectionId, sectionName, leagueCode);
		}
	});

	//go back button click event
	$("#cxlAddMemberBtn").on("click", function() {
		window.location.assign("team_details.html?id=" + sectionId + "&name=" + sectionName + "&code=" + leagueCode);
	});
});

//function to validate text fields
function validateForm() {
	let errorArray = [];
	if (
		$("#newMemberName")
			.val()
			.trim() == ""
	) {
		errorArray[errorArray.length] = "Please enter a valid Member name";
	}
	if (
		$("#newMemberContactName")
			.val()
			.trim() == ""
	) {
		errorArray[errorArray.length] = "Please enter a valid Contact name";
	}

	if (
		isNaN(
			$("#newMemberAge")
				.val()
				.trim()
		)
	) {
		errorArray[errorArray.length] = "Member age must be a number";
	}
	if (
		$("#newMemberAge")
			.val()
			.trim() > 100
	) {
		errorArray[errorArray.length] = "Member must be younger than the team's maximum age requirement";
	}
	
	let emailPattern = new RegExp("^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$");
	let result = emailPattern.test($("#newMemberEmail").val());
	if (result != true) {
		errorArray[errorArray.length] = "Please enter a valid Section Leader email address";
	}
	let phoneNumberPattern = /^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
	let answer = phoneNumberPattern.test($("#newMemberPhone").val());
	if (answer != true) {
		errorArray[errorArray.length] = "Please enter a valid phone number in the format 555-555-5555";
	}

	if (errorArray.length == 0) {
		return true;
	}
	if (errorArray.length > 0) {
		$("#errorMessages").empty();
		$("#errorMessageDiv").css("background-color", "#f5baba" )
		for (let i = 0; i < errorArray.length; i++) {
			$("<li>" + errorArray[i] + "</li>").appendTo($("#errorMessages"));
		}
		return false;
	}
}

function postNewMember(sectionId, sectionName, leagueCode) {
	$.post("/api/teams/" + sectionId + "/members", $("#addMemberForm").serialize(), function(data) {});
	window.location.assign("team_details.html?id=" + sectionId + "&name=" + sectionName + "&code=" + leagueCode);
}
