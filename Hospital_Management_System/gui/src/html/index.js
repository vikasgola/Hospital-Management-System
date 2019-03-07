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

function doctorInformation() {
    $("#main-content").load("../html/doctors/information.html");
}

function wardInformation() {
    $("#main-content").load("../html/wards/information.html");
}

function operationTheater() {
    $("#main-content").load("../html/operation_theater/information.html");
}

function staffConsultant(){
    $("#main-content").load("../html/staffs/consultant.html");
}
function staffInterns(){
    $("#main-content").load("../html/staffs/interns.html");
}

function staffNurses(){
    $("#main-content").load("../html/staffs/nurses.html");
}

function doctorAppointment(){
    $("#main-content").load("../html/doctors/appointments.html");
}

function doctorAlert(){
    $("#main-content").load("../html/doctors/alerts.html");
}

$("#patient-registration-link").click(patientRegistration)
$("#patient-information-link").click(patientInformation)
$("#patient-history-link").click(patientHistory)
$("#doctor-information-link").click(doctorInformation)
$("#doctor-appointment-link").click(doctorAppointment)
$("#doctor-emergencyalert-link").click(doctorAlert)
$("#ward-information-link").click(wardInformation)
$("#operation-theater-link").click(operationTheater)
$("#staff-consultant-link").click(staffConsultant)
$("#staff-intern-link").click(staffInterns)
$("#staff-nurse-link").click(staffNurses)
