const {
    print,
    connectHospitalMS
} = require("../js/global");

function loadContent(event){
    $("#main-content").html('');
    $("#main-content").load(event.data);
}

$("#patient-registration-link").click("../html/patients/registration.html", loadContent)
$("#patient-information-link").click("../html/patients/information.html", loadContent)
$("#patient-history-link").click("../html/patients/history.html", loadContent)
$("#doctor-information-link").click("../html/doctors/information.html", loadContent)
$("#doctor-appointment-link").click("../html/doctors/appointments.html", loadContent)
$("#doctor-emergencyalert-link").click("../html/doctors/alerts.html", loadContent)
$("#ward-information-link").click("../html/wards/information.html", loadContent)
$("#operation-theater-link").click("../html/operation_theater/information.html", loadContent)
$("#staff-consultant-link").click("../html/staffs/consultant.html", loadContent)
$("#staff-intern-link").click("../html/staffs/interns.html", loadContent)
$("#staff-nurse-link").click("../html/staffs/nurses.html", loadContent)
$("#ambulance-information-link").click("../html/ambulance/information.html", loadContent)
$("#ambulance-available-link").click("../html/ambulance/available.html", loadContent)
$("#bed-information-link").click("../html/beds/information.html", loadContent)
// $("#bed-vacant-link").click("../html/beds/vacantbeds.html", loadContent)
