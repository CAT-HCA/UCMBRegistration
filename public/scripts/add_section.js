"use strict";
// document ready event listener
$(document).ready(function() {
	//retrieving "league"(instrument family) data from json file
	$.getJSON("/api/leagues", function(data) {
		//loop to populate drop down options
		for (let i = 0; i < data.length; i++) {
			$("#addTeamLeagueDropDown").append(`<option value='${data[i].Code}'>${data[i].Name}</option>`);
		}
	});

	//create new section (team) button click event
	$("#createSectionBtn").on("click", function() {
		let validationResult = validateForm();
		if (validationResult == true) {
			postNewSection();
		}
	});

	//go back button click event
	$("#cxlCreateBtn").on("click", function() {
		window.location.assign("section_dashboard.html");
	});
});

//function to validate text fields
function validateForm(){
    let errorArray = [];
    if($("#newSectionTitle").val().trim() == ""){
        errorArray[errorArray.length] = "Please enter a valid Section name"
    }
    if($("#addTeamLeagueDropDown").val().trim() == "-1"){
        errorArray[errorArray.length] = "Please select an instrument family"
    }
    if($("#newSectionManagerName").val().trim() == ""){
        errorArray[errorArray.length] = "Please enter a valid Section Leader name"
    }

    let phoneNumberPattern = new RegExp ("^[2-9]\d{2}-\d{3}-\d{4}$");
    let answer = phoneNumberPattern.test($("#newSectionManagerPhone").val())
    if( answer!= true){
        errorArray[errorArray.length] = "Please enter a Section Leader phone number in the format 555-555-5555"
    }
    let emailPattern = new RegExp ("^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$");
    let result = emailPattern.test($("#newSectionManagerPhone").val())
    if( result!= true){
        errorArray[errorArray.length] = "Please enter a valid Section Leader email address"
    }
    if($("#newSectionDescription").val().trim() == ""){
        errorArray[errorArray.length] = "Please enter a valid Course meeting dates and times"
    }
    if(errorArray.length == 0){
        return true;
    }
    if(errorArray.length > 0){
        $("#errorMessages").empty();
        for(let i = 0; i < errorArray.length; i++){
            $("<li>" + errorArray[i] + "</li>").appendTo($("#errorMessages"))
        }
        return false;
    }
}


function postNewSection() {
	$.post("/api/teams", $("#addSectionForm").serialize(), function(data) {});
	window.location.assign("/section_dashboard.html");
}