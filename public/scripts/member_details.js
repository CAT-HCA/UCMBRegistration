"use strict";

$(function() {
	//pulling section ID form query string
	let urlParams = new URLSearchParams(location.search);
	let sectionId = urlParams.get("id");
	let sectionName = urlParams.get("name");
	let leagueCode = urlParams.get("code");
	let memberId = urlParams.get("memberid");

	$("#viewMemberCrumb")
		.attr("href", "team_details.html?id=" + sectionId + "&name=" + sectionName + "&code=" + leagueCode)
		.html(sectionName + " Dashboard");

	//go back button click event
	$("#goBackViewMemberBtn").on("click", function() {
		window.location.assign("team_details.html?id=" + sectionId + "&name=" + sectionName + "&code=" + leagueCode);
	});
	//register button click event
	$("#editViewMemberBtn").on("click", function() {
		window.location.assign(
			`edit_member.html?id=${sectionId}&name=${sectionName}&code=${leagueCode}&memberid=${memberId}`
		);
	});

	//register button click event
	$("#deleteViewMemberBtn").on("click", function() {
		$.ajax({
			url: "/api/teams/" + sectionId + "/members/" + memberId,
			method: "DELETE",
			success: function(result) {
				alert("The member has been successfully deleted!");
				window.location.assign("team_details.html?id=" + sectionId + "&name=" + sectionName + "&code=" + leagueCode);
			},
		});
	});

	//retrieving section data from json file
	$.getJSON("/api/teams/" + sectionId + "/members/" + memberId, function(data) {
		$("#viewMemberTitle").text(data.MemberName);
		$("#viewMemberId").val(memberId);
		$("#viewMemberSection").val(sectionName);
		$("#viewMemberName").val(data.MemberName);
		$("#viewMemberContactName").val(data.ContactName);
		$("#viewMemberAge").val(data.Age);
		$("#viewMemberGender").val(data.Gender);
		$("#viewMemberEmail").val(data.Email);
		$("#viewMemberPhone").val(data.Phone);

		//go back button click event
		$("#clearEditMemberBtn").on("click", function() {
            $("#viewMemberTitle").text(data.MemberName);
            $("#viewMemberId").val(memberId);
            $("#viewMemberSection").val(sectionName);
            $("#viewMemberName").val(data.MemberName);
            $("#viewMemberContactName").val(data.ContactName);
            $("#viewMemberAge").val(data.Age);
            $("#viewMemberGender").val(data.Gender);
            $("#viewMemberEmail").val(data.Email);
            $("#viewMemberPhone").val(data.Phone);
		});
	});
});


