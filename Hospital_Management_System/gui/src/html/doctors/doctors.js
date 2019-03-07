const {
    print,
    connectHospitalMS
} = require("../../js/global");

function collectDoctorInfomation(connection) {
    var inputdata = $('#doctor-information-search-input').val();
    query = 'SELECT * FROM Doctors WHERE doctor_id = ?';
    if(inputdata == "") {
        query = 'SELECT * FROM Doctors';        
    }

    $("#doctor-information-result").text("");
    connection.query(query, inputdata, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
        } else {
            $('#doctor-information-table tr').not(':first').remove();
            var html = '';
            for (let a = 0; a < rows.length; a++) {
                html += "<tr>"
                for (let key in rows[a]) {
                    html += '<td>' + rows[a][key] + '</td>';
                }
                html += "</tr>"
            }
            $('#doctor-information-table tr').first().after(html);
            if($('#doctor-information-table tr').length <= 1){
                $("#doctor-information-result").text("No such doctor");
                $("#doctor-information-result").addClass("text-warning")
            }
        }
        // $('#doctor-information-search-input').val("");
        
    });
}


function collectDoctorAppointments(connection) {
    var inputdata = $('#doctor-appointment-search-input').val();
    query = 'SELECT * FROM Appointments WHERE appointment_id = ?';
    if(inputdata == "") {
        query = 'SELECT * FROM Appointments';
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
                    html += '<td>' + rows[a][key] + '</td>';
                }
                html += "</tr>"
            }
            $('#doctor-appointment-table tr').first().after(html);
            if($('#doctor-appointment-table tr').length <= 1){
                $("#doctor-appointment-result").text("No such Appointment");
                $("#doctor-appointment-result").addClass("text-warning")
            }
        }
        // $('#doctor-appointment-search-input').val("");
        
    });
}


$("#doctor-appointment-submit").click(() => {
    connectHospitalMS(collectDoctorAppointments);
});
connectHospitalMS(collectDoctorAppointments);



function collectDoctorEmergencyAlerts(connection) {
    var inputdata = $('#doctor-alert-search-input').val();
    query = 'SELECT * FROM EmergencyAlerts WHERE alert_id = ?';
    if(inputdata == "") {
        query = 'SELECT * FROM EmergencyAlerts';
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


$("#doctor-information-submit").click(() => {
    connectHospitalMS(collectDoctorInfomation);
});
connectHospitalMS(collectDoctorInfomation);