"use strict";
// document ready event listener
$(document).ready(function() {
	//pulling course ID form query string
	let urlParams = new URLSearchParams(location.search);
	let sectionId = urlParams.get("id");
	let sectionName = urlParams.get("name");
	 $("#newMemberSection").val(sectionName)

	//create new section (team) button click event
	$("#addMemberBtn").on("click", function() {
		let validationResult = validateForm();
		if (validationResult == true) {
			postNewMember(sectionId);
		}
	});

	//go back button click event
	$("#cxlAddMemberBtn").on("click", function() {
		window.location.assign("section_dashboard.html");
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
	let phoneNumberPattern = new RegExp("^D?(d{3})D?D?(d{3})D?(d{4})$");
	let answer = phoneNumberPattern.test($("#newMemberPhone").val());
	if (answer != true) {
		errorArray[errorArray.length] = "Please enter a Section Leader phone number in the format 555-555-5555";
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

function postNewMember(sectionId) {
	$.post("/api/teams/" + sectionId + "/members", $("#addMemberForm").serialize(), function(data) {});
}
