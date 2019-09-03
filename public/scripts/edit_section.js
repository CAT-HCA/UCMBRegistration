"use strict";
//document ready event handler
$(function() {
	//pulling section ID form query string
	let urlParams = new URLSearchParams(location.search);
	let TeamId = urlParams.get("id");

	//retrieving section data from json file
	$.getJSON("/api/teams/1", function(data) {
		$("#editSectionId").val(1);
		$("#editSectionTitle").val(data.TeamName);
		$("#editSectionLeagueSelectDropDown").val(data.League);
		$("#editSectionMaxMems").val(data.MaxTeamMembers);
		$("#editSectionMinAge").val(data.MinMemberAge);
		$("#editSectionMaxAge").val(data.MaxMemberAge);
		$("#editSectionGender").val(data.TeamGender);
		$("#editSectionManagerName").val(data.ManagerName);
		$("#editSectionManagerPhone").val(data.ManagerPhone);
		$("#editSectionManagerEmail").val(data.ManagerEmail);
		$("#editSectionPhotoUpload").val("");
		$("#editSectionDescription").val("");
	});

	//register button click event
	$("#editSectionBtn").on("click", function() {
		finishEditSection();
	});

	//go back button click event
	$("#cxlEditBtn").on("click", function() {
		$.getJSON("/api/teams/1", function(data) {
			$("#editSectionId").val(1);
			$("#editSectionTitle").val(data.TeamName);
			$("#editSectionLeagueSelectDropDown").val(data.League);
			$("#editSectionMaxMems").val(data.MaxTeamMembers);
			$("#editSectionMinAge").val(data.MinMemberAge);
			$("#editSectionMaxAge").val(data.MaxMemberAge);
			$("#editSectionGender").val(data.TeamGender);
			$("#editSectionManagerName").val(data.ManagerName);
			$("#editSectionManagerPhone").val(data.ManagerPhone);
			$("#editSectionManagerEmail").val(data.ManagerEmail);
			$("#editSectionPhotoUpload").val("");
			$("#editSectionDescription").val("uiyhkjhjkh");
		});
	});
});

function finishEditSection() {
	$.ajax({
		url: "/api/teams/1",
		method: "PUT",
		data: $("#editSectionForm").serialize(),
		success: function(result) {
			alert("You're section has been successfully edit");
		},
	});
}
