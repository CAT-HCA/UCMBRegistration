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
			finishEditMember(sectionId, sectionName, leagueCode);
		});

	//retrieving section data from json file
	$.getJSON("/api/teams/" + sectionId + "/members/" + memberId, function(data) {

		$("#editMemberTitle").text(data.MemberName);
		$("#editMemberId").text(memberId);
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
			$("#editMemberId").text(data.MemberId);
			$("#editMemberSection").val(sectionName);
			$("#editMemberName").val(data.MemberName);
			$("#editMemberContactName").val(data.ContactName);
			$("#editMemberAge").val(data.Age);
			$("#editMemberGender").val(data.Gender);
			$("#editMemberEmail").val(data.Email);
			$("#editMemberPhone").val(data.Phone);
		});
	});
});

function finishEditMember(teamId, sectionName, leagueCode) {
	$.ajax({
		url: `/api/teams/${teamId}/members`,
		method: "PUT",
		data: $("#editMemberForm").serialize(),
		success: function(result) {
			window.location.assign("team_details.html?id=" + teamId + "&name=" + sectionName + "&code=" + leagueCode);
		},
	});
}
