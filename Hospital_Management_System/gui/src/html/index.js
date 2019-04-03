const {
    print,
    connectHospitalMS
} = require("../js/global");
let global = require("../js/global");

function loadContent(event) {
    $("#main-content").html('');
    $("#main-content").load(event.data);
}

$("#receptionist-side-menu").hide();
$("#doctor-side-menu").hide();
// $("#welcome-msg").hide();
// $("#login").hide();

function checkLogin(connection){
    query = "select * from DoctorLogin";
    let flag = true;
    connection.query(query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
        } else {
            for (let a = 0; a < rows.length; a++) {
                if(rows[a]["username"] == $("#username").val() && rows[a]["password"] == $("#password").val()){
                    $("#doctor-side-menu").show();
                    $("#welcome-msg").hide();
                    $("#login").hide();
                    global.username = $("#username").val();
                    global.id = rows[a]["doctor_id"];
                    flag = false;
                }
            }
            if(flag)
                alert("wrong username or password");
        }
    });
}

$("#loginbtn").click(function () {
    if ($("#username").val() == "admin" && $("#password").val() == "admin") {
        username = "admin";
        $("#receptionist-side-menu").show();
        $("#welcome-msg").hide();
        $("#login").hide();
    } else {
        connectHospitalMS(checkLogin);
    }
});

$("#patient-registration-link").click("../html/patients/registration.html", loadContent)
$("#patient-information-link").click("../html/patients/information.html", loadContent)
$("#patient-history-link").click("../html/patients/history.html", loadContent)
$("#patient-history-link2").click("../html/patients/history.html", loadContent)
$("#doctor-information-link").click("../html/doctors/information.html", loadContent)
$("#doctor-appointment-link").click("../html/doctors/appointments.html", loadContent)
$("#doctor-appointment-link2").click("../html/doctorlogin/requested.html", loadContent)
$("#doctor-appointment-link3").click("../html/doctorlogin/appointments.html", loadContent)
$("#doctor-emergencyalert-link").click("../html/doctors/alerts.html", loadContent)
$("#doctor-emergencyalert-link2").click("../html/doctorlogin/alerts.html", loadContent)
$("#ward-information-link").click("../html/wards/information.html", loadContent)
$("#operation-theater-link").click("../html/operation_theater/information.html", loadContent)
$("#staff-consultant-link").click("../html/staffs/consultant.html", loadContent)
$("#staff-intern-link").click("../html/staffs/interns.html", loadContent)
$("#staff-nurse-link").click("../html/staffs/nurses.html", loadContent)
$("#ambulance-information-link").click("../html/ambulance/information.html", loadContent)
$("#ambulance-available-link").click("../html/ambulance/available.html", loadContent)
$("#bed-information-link").click("../html/beds/information.html", loadContent)
$("#doctor-profile-link").click("../html/doctorlogin/profile.html", loadContent)