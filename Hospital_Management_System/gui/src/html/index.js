const {
    print,
    connectHospitalMS
} = require("../js/global");

function patientRegistration() {
    $("#main-content").html('');
    $("#main-content").load("../html/patients/registration.html");
}


function patientInformation() {
    $("#main-content").html('');
    $("#main-content").load("../html/patients/information.html");
}

function patientHistory() {
    $("#main-content").html('');
    $("#main-content").load("../html/patients/history.html");
}


function getPatient() {
    console.log($("#patient-information-search-input").val())
    $("#patient-information-search-input").val("");
}

function getDoctor() {
    console.log($("#doctor-information-search-input").val())
    $("#doctor-information-search-input").val("");
}


function searchPatientHistory() {
    console.log("asddsad");
    var value = $("#patient-history-search").val().toLowerCase();
    $("#patient-history-table tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}


function doctorInformation() {
    $(document).ready(function () {
        $("#main-content").load("../html/doctors/information.html");
    });
}

function wardInformation(){
    $(document).ready(function () {
        $("#main-content").load("../html/wards/information.html");
    });
}

$("#patient-registration-link").click(patientRegistration)
$("#patient-information-link").click(patientInformation)
$("#patient-history-link").click(patientHistory)
$("#doctor-information-link").click(doctorInformation)
$("#ward-information-link").click(wardInformation)
