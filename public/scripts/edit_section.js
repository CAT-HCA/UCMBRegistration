$(function() {
	//pulling section ID form query string
	let urlParams = new URLSearchParams(location.search);
	let teamId = urlParams.get("id");
	let fieldFocus = urlParams.get("focus");
	//focuses on form field based on which dashboard
	//widget the clicked
	if (fieldFocus != "none") {
		$(`#${fieldFocus}`).focus();
		$("html, body").animate(
			{
				scrollTop: $(`#${fieldFocus}`).offset().top,
			},
			0
		);
	}
	//retrieving section data from json file and setting 
	// fields to those values
	$.getJSON("/api/teams/" + teamId, function(data) {
		$("#editSectionId").val(teamId);
		$("#editSectionTitle").val(data.TeamName);
		$("#editSectionLeagueSelectDropDown").val(data.League);
		$("#editSectionMaxMems").val(data.MaxTeamMembers);
		$("#editSectionMinAge").val(data.MinMemberAge);
		$("#editSectionMaxAge").val(data.MaxMemberAge);
		$("#editSectionGender").val(data.TeamGender);
		$("#editSectionManagerName").val(data.ManagerName);
		$("#editSectionManagerPhone").val(data.ManagerPhone);
		$("#editSectionManagerEmail").val(data.ManagerEmail);
		$("#editSectionPhotoUpload").val(data.Picture);
		$("#editSectionDescription").val(data.Description);
	//breadcrumb url to take back to section page
		$("#manageSectionCrumb")
			.attr("href", "team_details.html?id=" + teamId + "&name=" + data.TeamName + "&code=" + data.League)
			.html(data.TeamName + " Dashboard");
		//register button click event
		$("#editSectionBtn").on("click", function() {
			let validationResult = validateForm();
			if (validationResult == true) {
				finishEditSection(teamId, data.TeamName, data.League);
			}
		});
		//clear changes click event - will set all
		// fields back to current value
		$("#clearEditSectionBtn").on("click", function() {
			$.getJSON("/api/teams/" + teamId, function(data) {
				$("#editSectionId").val(teamId);
				$("#editSectionTitle").val(data.TeamName);
				$("#editSectionLeagueSelectDropDown").val(data.League);
				$("#editSectionMaxMems").val(data.MaxTeamMembers);
				$("#editSectionMinAge").val(data.MinMemberAge);
				$("#editSectionMaxAge").val(data.MaxMemberAge);
				$("#editSectionGender").val(data.TeamGender);
				$("#editSectionManagerName").val(data.ManagerName);
				$("#editSectionManagerPhone").val(data.ManagerPhone);
				$("#editSectionManagerEmail").val(data.ManagerEmail);
				$("#editSectionPhotoUpload").val(data.Picture);
				$("#editSectionDescription").val(data.Description);
			});
		});
		//go back/cancel click event
		$("#cxlEditSectionBtn").on("click", function() {
			window.location.assign(
				"team_details.html?id=" + teamId + "&name=" + data.TeamName + "&code=" + data.League
			);
		});
	});
});

function finishEditSection(teamId, sectionName, leagueCode) {
	$.ajax({
		url: "/api/teams",
		method: "PUT",
		data: $("#editSectionForm").serialize(),
		success: function(result) {
			window.location.assign("team_details.html?id=" + teamId + "&name=" + sectionName + "&code=" + leagueCode);
		},
	});
}

//function to validate form fields
function validateForm() {
	let errorArray = [];
	if (
		$("#editSectionTitle")
			.val()
			.trim() == ""
	) {
		errorArray[errorArray.length] = "Please enter a valid Section name";
	}
	if (
		$("#editSectionLeagueSelectDropDown")
			.val()
			.trim() == "-1"
	) {
		errorArray[errorArray.length] = "Please select an instrument family";
	}
	if (
		isNaN(
			$("#editSectionMaxMems")
				.val()
				.trim()
		)
	) {
		errorArray[errorArray.length] = "Maximum Section members must be a number";
	}
	//for best instrument balance, no section should have more than 75 members
	if (
		$("#editSectionMaxMems")
			.val()
			.trim() > 75
	) {
		errorArray[errorArray.length] = "No section can have more than 75 members";
	}
	if (
		isNaN(
			$("#editSectionMaxAge")
				.val()
				.trim()
		)
	) {
		errorArray[errorArray.length] = "Maximum member age must be a number";
	}
	if (
		$("#editSectionMaxAge")
			.val()
			.trim() > 100
	) {
		errorArray[errorArray.length] = "Maximum member age can be no more than 100";
	}
	if (
		$("#editSectionManagerName")
			.val()
			.trim() == ""
	) {
		errorArray[errorArray.length] = "Please enter a valid Section Leader name";
	}

	let phoneNumberPattern = /^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
	let answer = phoneNumberPattern.test($("#editSectionManagerPhone").val());
	if (answer != true) {
		errorArray[errorArray.length] = "Please enter a Section Leader phone number in the format 555-555-5555";
	}
	let emailPattern = new RegExp("^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$");
	let result = emailPattern.test($("#editSectionManagerEmail").val());
	if (result != true) {
		errorArray[errorArray.length] = "Please enter a valid Section Leader email address";
	}
	if (
		$("#editSectionDescription")
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
		$("#errorMessageDiv").css("background-color", "#f5baba");
		for (let i = 0; i < errorArray.length; i++) {
			$("<li>" + errorArray[i] + "</li>").appendTo($("#errorMessages"));
		}
		return false;
	}
}
