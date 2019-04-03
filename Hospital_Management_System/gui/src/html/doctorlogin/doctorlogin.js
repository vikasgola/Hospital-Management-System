const {
    print,
    connectHospitalMS
} = require("../../js/global");
let global = require("../../js/global");

function collectDoctorAppointments(connection) {
    var inputdata = [$('#doctor-appointment-search-input').val(), global.id];
    query = 'SELECT * FROM Appointments WHERE appointment_id = ? AND status="pending" AND doctor_id = ?';
    if (inputdata[0] == "") {
        inputdata = global.id;
        query = 'SELECT * FROM Appointments WHERE status="pending" AND doctor_id = ?';
    }

    $("#doctor-appointment-result").text("");
    connection.query(query, inputdata, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
        } else {
            $('#doctor-appointment-table tr').not(':first').remove();
            var html = '';
            for (let a = 0; a < rows.length; a++) {
                html += "<tr>"
                for (let key in rows[a]) {
                    if (key == "status") {
                        html += '<td><button id="a' + rows[a]["appointment_id"] + '" class="rowthis btn btn-success">Accept</button> <button class="rowthis btn btn-danger" id="r' + rows[a]["appointment_id"] + '" >Reject</button></td>';
                    }
                    html += '<td>' + rows[a][key] + '</td>';
                }
                html += "</tr>"
            }
            $('#doctor-appointment-table tr').first().after(html);

            $(".rowthis").click(function () {
                var inputdata = $(this).attr('id').substring(1);
                if ($(this).attr('id')[0] == "a")
                    query = "update Appointments set status='accepted' WHERE appointment_id=?";
                else
                    query = "update Appointments set status='rejected' WHERE appointment_id=?";

                connection.query(query, inputdata, function (err, rows, fields) {
                    if (err) {
                        console.log("An error ocurred performing the query.");
                        console.log(err);
                    } else {
                        connectHospitalMS(collectDoctorAppointments);
                    }
                    // $('#doctor-appointment-search-input').val("");
                });
            });

            if ($('#doctor-appointment-table tr').length <= 1) {
                $("#doctor-appointment-result").text("No such Appointment");
                $("#doctor-appointment-result").addClass("text-warning")
            }
        }
        // $('#doctor-appointment-search-input').val("");
    });
}


function collectDoctorAppointments2(connection) {
    var inputdata = [$('#doctor-appointment-search-input2').val(), global.id];
    query = 'SELECT * FROM Appointments WHERE appointment_id = ? AND status="accepted" AND timestamp > NOW() AND doctor_id = ?';
    if (inputdata[0] == "") {
        inputdata = global.id;
        query = 'SELECT * FROM Appointments WHERE status="accepted" AND timestamp > NOW() AND doctor_id = ?';
    }

    $("#doctor-appointment-result2").text("");
    connection.query(query, inputdata, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
        } else {
            $('#doctor-appointment-table2 tr').not(':first').remove();
            var html = '';
            for (let a = 0; a < rows.length; a++) {
                html += "<tr>"
                for (let key in rows[a]) {
                    html += '<td>' + rows[a][key] + '</td>';
                }
                html += "</tr>"
            }
            $('#doctor-appointment-table2 tr').first().after(html);
            if ($('#doctor-appointment-table2 tr').length <= 1) {
                $("#doctor-appointment-result2").text("No such Appointment");
                $("#doctor-appointment-result2").addClass("text-warning")
            }
        }
        // $('#doctor-appointment-search-input').val("");

    });
}


$("#doctor-appointment-submit").click(() => {
    connectHospitalMS(collectDoctorAppointments);
});
connectHospitalMS(collectDoctorAppointments);

$("#doctor-appointment-submit2").click(() => {
    connectHospitalMS(collectDoctorAppointments2);
});
connectHospitalMS(collectDoctorAppointments2);


function collectDoctorEmergencyAlerts(connection) {
    var inputdata = [$('#doctor-alert-search-input').val(), global.id];
    query = 'SELECT * FROM EmergencyAlerts WHERE alert_id = ? AND doctor_id = ?';
    if(inputdata[0] == "") {
        inputdata = global.id;
        query = 'SELECT * FROM EmergencyAlerts WHERE doctor_id = ?';
    }

    $("#doctor-alert-result").text("");
    connection.query(query, inputdata, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
        } else {
            $('#doctor-alert-table tr').not(':first').remove();
            var html = '';
            for (let a = 0; a < rows.length; a++) {
                html += "<tr>"
                for (let key in rows[a]) {
                    html += '<td>' + rows[a][key] + '</td>';
                }
                html += "</tr>"
            }
            $('#doctor-alert-table tr').first().after(html);
            if($('#doctor-alert-table tr').length <= 1){
                $("#doctor-alert-result").text("No such Alert");
                $("#doctor-alert-result").addClass("text-warning")
            }
        }
        // $('#doctor-alert-search-input').val("");
        
    });
}


$("#doctor-alert-submit").click(() => {
    connectHospitalMS(collectDoctorEmergencyAlerts);
});
connectHospitalMS(collectDoctorEmergencyAlerts);
