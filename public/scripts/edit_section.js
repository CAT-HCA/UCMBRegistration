$(function() {
	//pulling section ID form query string
	let urlParams = new URLSearchParams(location.search);
	let teamId = urlParams.get("id");

	//retrieving section data from json file
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

			//register button click event
	$("#editSectionBtn").on("click", function() {
		finishEditSection(teamId, data.TeamName, data.League);
	});
	});



	//go back button click event
	$("#cxlEditBtn").on("click", function() {
		$.getJSON("/api/teams/1", function(data) {
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
});

function finishEditSection(teamId, sectionName, leagueCode) {
	$.ajax({
		url:"/api/teams",
		method: "PUT",
		data: $("#editSectionForm").serialize(),
		success: function(result) {
			window.location.assign("team_details.html?id=" + teamId + "&name=" + sectionName + "&code=" + leagueCode);
		},
	});
}
