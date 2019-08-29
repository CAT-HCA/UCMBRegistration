"use strict";
// document ready event listener
$(document).ready(function() {
	//retrieving "team" (section and section leader) data from json file
	$.getJSON("/api/teams", function(data) {
		//loop to populate drop down options
		for (let i = 0; i < data.length; i++) {
			$("#sectionDropDown").append(`<option value='${data[i].TeamId}'>${data[i].TeamName}</option>`);
			$("#managerDropDown").append(`<option value='${data[i].TeamId}'>${data[i].ManagerName}</option>`);
			createHtml(data[i], i);
		}
	});
	//retrieving "league"(instrument family) data from json file
	$.getJSON("/api/leagues", function(data) {
		//loop to populate drop down options
		for (let i = 0; i < data.length; i++) {
			$("#leagueDropDown").append(`<option value='${data[i].Code}'>${data[i].Name}</option>`);
		}
	});

	// call to courses api to pull courses matching selected category
	$("#leagueDropDown").on("change", function() {
		$("#sectionCardDiv").empty();
		if ($("#leagueDropDown").val() != "-1") {
			$.getJSON("/api/teams/byleague/" + $("#leagueDropDown").val(), function(data) {
				for (let i = 0; i < data.length; i++) {
					createHtml(data[i], i);
				}
			});
		}
	});

	// call to courses api to pull courses matching selected category
	$("#sectionDropDown").on("change", function() {
		$("#sectionCardDiv").empty();
		callGetTeams($("#sectionDropDown"), "/api/teams/");
	});

	// call to courses api to pull courses matching selected category
	$("#managerDropDown").on("change", function() {
		$("#sectionCardDiv").empty();
		callGetTeams($("#managerDropDown"));
	});
});

function callGetTeams(dropDownField) {
	if (dropDownField.val() != "-1") {
		$.getJSON("/api/teams/" + dropDownField.val(), function(data) {
			createHtml(data, dropDownField.val());
		});
	}
}
function createHtml(section, i) {
	//appending section cards to card div
	$("#sectionCardDiv").append(
		$("<div />")
			.addClass("card col-12 col-md-6 col-lg-4 col-xl-3 float-left m-4 .d-flex")
			.attr("id", `cardId${[i]}`)
	);

	//appending image to card
	$(`#cardId${[i]}`).append(
		$("<img />")
			.addClass("card-img-top")
			.attr({ src: "/images/mello_sec.jpg", alt: "Marching Band Member" })
	);
	// code for src attr once pictures are found src: section.Picture
	//appending card body to card
	$(`#cardId${[i]}`).append(
		$("<div />")
			.addClass("card-header")
			.attr("id", `cardHeadingDiv${[i]}`)
	);

	//appending header to title div
	$(`#cardHeadingDiv${[i]}`).append(
		$("<h2 />")
			.addClass("card-title")
			.attr("id", `cardHeading${[i]}`)
			.html(section.TeamName)
	);

	//appending header to title div
	$(`#cardId${[i]}`).append(
		$("<div />")
			.addClass("list-group")
			.attr("id", `list-groupId${[i]}`)
	);

	//appending header to title div
	$(`#list-groupId${[i]}`).append(
		$("<p />")
			.addClass("font-weight-bold")
			.html("Section Leader:")
	);
	$(`#list-groupId${[i]}`).append($("<p />").html(section.ManagerName));

	//appending header to title div
	$(`#cardId${[i]}`).append(
		$("<div />")
			.addClass("card-body text-center")
			.attr("id", `cardBtnDiv${[i]}`)
	);

	//appending header to title div
	$(`#cardBtnDiv${[i]}`).append(
		$("<a />")
			.addClass("btn btn-sm btn-primary col-5 cardBodyText mx-2")
			.attr("href", "#")
			.html("View Section")
	);
	//appending header to title div
	$(`#cardBtnDiv${[i]}`).append(
		$("<a />")
			.addClass("btn btn-sm btn-primary col-5 cardBodyText")
			.attr("href", "#")
			.html("Delete Section")
	);
}
