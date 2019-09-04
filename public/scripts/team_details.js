"use strict";
// document ready event listener
$(document).ready(function() {
	//pulling section ID form query string
	let urlParams = new URLSearchParams(location.search);
	let sectionName = urlParams.get("name");
	let sectionId = urlParams.get("id");
	let leagueCode = urlParams.get("code");
	$("#sectionTitle").html(sectionName + " Dashboard");
	$("#dashboardTitle").html(sectionName + " Dashboard");

	$.getJSON("/api/leagues/" + leagueCode, function(data) {
		$("#instFamId").html(data.Name);
	});

	$.getJSON("/api/teams/" + sectionId, function(data) {
		$("#instrumentId").html(data.TeamName);
		$("#maxSectionMems").html(data.MaxTeamMembers);
		$("#minMemAge").html(data.MinMemberAge);
		$("#maxMemAge").html(data.MaxMemberAge);
		$("#membersEnrolled").html(data.Members.length);
		$("#sectionLeaderName").html(data.ManagerName);
		$("#sectionLeaderPhone").html(data.ManagerPhone);
		$("#sectionLeaderEmail").html(data.ManagerEmail);
		$("#sectionPhoto").prop("src", data.Picture);
		$("#descriptionId").html(data.Description);
		for (let i = 0; i < data.Members.length; i++) {
			createMemberRow(
				data.Members[i].MemberName,
				data.Members[i].MemberId,
				sectionId,
				data.TeamName,
				leagueCode,
				i
			);
		}
	});

	assignSideNavLinks(sectionName, sectionId, leagueCode);
	$("#deleteTeam").on("click", function() {
		$.ajax({
			url: "/api/teams/" + sectionId,
			method: "DELETE",
			success: function(result) {
				alert("The team has been successfully deleted!");
				window.location.assign("section_dashboard.html");
			},
		});
	});

	$("#sectInfoEdit").attr("href", "edit_section.html?id=" + sectionId + "&focus=editSectionId");
	$("#membershipInfoEdit").attr("href", "edit_section.html?id=" + sectionId + "&focus=editSectionMaxMems");
	$("#sectLeaderEdit").attr("href", "edit_section.html?id=" + sectionId + "&focus=editSectionManagerName");
	$("#sectPhotoEdit").attr("href", "edit_section.html?id=" + sectionId + "&focus=editSectionPhotoUpload");


});

function createMemberRow(memberName, memberId, sectionId, sectionName, leagueCode, i) {
	$("#membershipListId").append(
		$("<li />")
			.addClass("list-group-item")
			.attr("id", "membershipList" + i)
	);
	$("#membershipList" + i).append(
		$("<a />").html(
			`${memberName} <a href="edit_member.html?id=${sectionId}&name=${sectionName}&code=${leagueCode}&memberid=${memberId}" class="float-right mx-2"><i class="far fa-edit float-right"></i></a>
<a href="member_details.html?id=${sectionId}&name=${sectionName}&code=${leagueCode}&memberid=${memberId}" class="float-right mx-2"><i class="fas fa-info-circle float-right"></i></a>`
		)
	);
}

function assignSideNavLinks(sectionName, sectionId, leagueCode) {
	$("#editTeamDetails").attr("href", "edit_section.html?id=" + sectionId + "&focus=none");
	$("#addTeamMember").attr(
		"href",
		"add_member.html?id=" + sectionId + "&name=" + sectionName + "&code=" + leagueCode
	);
}
