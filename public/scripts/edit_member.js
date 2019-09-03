"use strict";

$(function() {
	//pulling section ID form query string
	let urlParams = new URLSearchParams(location.search);
	let sectionId = urlParams.get("id");
	let sectionName = urlParams.get("name");
	let leagueCode = urlParams.get("code");
	let memberId = urlParams.get("memberid");

	$("#editMemberCrumb")
		.attr("href", "team_details.html?id=" + sectionId + "&name=" + sectionName + "&code=" + leagueCode)
		.html(sectionName + " Dashboard");
	//go back button click event
	$("#cxlEditMemberBtn").on("click", function() {
		window.location.assign("team_details.html?id=" + sectionId + "&name=" + sectionName + "&code=" + leagueCode);
	});
	//register button click event
	$("#editMemberBtn").on("click", function() {
		let validationResult = validateForm();
		if (validationResult == true) {
		finishEditMember(sectionId, sectionName, leagueCode);
		}
	});

	//retrieving section data from json file
	$.getJSON("/api/teams/" + sectionId + "/members/" + memberId, function(data) {
		$("#editMemberTitle").text(data.MemberName);
		$("#editMemberId").val(memberId);
		$("#editMemberSection").val(sectionName);
		$("#editMemberName").val(data.MemberName);
		$("#editMemberContactName").val(data.ContactName);
		$("#editMemberAge").val(data.Age);
		$("#editMemberGender").val(data.Gender);
		$("#editMemberEmail").val(data.Email);
		$("#editMemberPhone").val(data.Phone);

		//go back button click event
		$("#clearEditMemberBtn").on("click", function() {
			$("#editMemberTitle").text(data.MemberName);
			$("#editMemberId").val(data.MemberId);
			$("#editMemberSection").val(sectionName);
			$("#editMemberName").val(data.MemberName);
			$("#editMemberContactName").val(data.ContactName);
			$("#editMemberAge").val(data.Age);
			$("#editMemberGender").val(data.Gender);
			$("#editMemberEmail").val(data.Email);
			$("#editMemberPhone").val(data.Phone);
		});

				//go clear changes click event
				$("#cxlEditMemberBtn").on("click", function() {
					window.location.assign(
						"team_details.html?id=" + teamId + "&name=" + data.TeamName + "&code=" + data.League
					);
				});
	});
});

function finishEditMember(teamId, sectionName, leagueCode) {
	alert($("#editMemberForm").serialize());
	$.ajax({
		url: `/api/teams/${teamId}/members`,
		method: "PUT",
		data: $("#editMemberForm").serialize(),
		success: function(result) {
			window.location.assign("team_details.html?id=" + teamId + "&name=" + sectionName + "&code=" + leagueCode);
		},
	});
}

//function to validate text fields
function validateForm() {
	let errorArray = [];
	if (
		$("#editMemberName")
			.val()
			.trim() == ""
	) {
		errorArray[errorArray.length] = "Please enter a valid Member name";
	}
	if (
		$("#editMemberContactName")
			.val()
			.trim() == ""
	) {
		errorArray[errorArray.length] = "Please enter a valid Contact name";
	}

	if (
		isNaN(
			$("#editMemberAge")
				.val()
				.trim()
		)
	) {
		errorArray[errorArray.length] = "Member age must be a number";
	}
	if (
		$("#editMemberAge")
			.val()
			.trim() > 100
	) {
		errorArray[errorArray.length] = "Member must be younger than the team's maximum age requirement";
	}
	
	let emailPattern = new RegExp("^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$");
	let result = emailPattern.test($("#editMemberEmail").val());
	if (result != true) {
		errorArray[errorArray.length] = "Please enter a valid member email address";
	}
	let phoneNumberPattern = /^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
	let answer = phoneNumberPattern.test($("#editMemberPhone").val());
	if (answer != true) {
		errorArray[errorArray.length] = "Please enter a valid member phone number in the format 555-555-5555";
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