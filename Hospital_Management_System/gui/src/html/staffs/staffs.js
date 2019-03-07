const {
    print,
    connectHospitalMS
} = require("../../js/global");

function collectConsultants(connection) {
    var inputdata = $('#staff-consultant-search-input').val();
    query = 'SELECT Doctors.* FROM Doctors, Departments WHERE doctor_id = ? AND Doctors.department_id = Departments.department_id AND Departments.name = "Consultant"';
    if (inputdata == ""){
        query = "SELECT Doctors.* FROM Doctors, Departments WHERE Doctors.department_id = Departments.department_id AND Departments.name = 'Consultant'";
    }

    $("#staff-consultant-result").text("");

    connection.query(query, inputdata, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
        } else {
            $('#staff-consultant-table tr').not(':first').remove();
            var html = '';
            for (let a = 0; a < rows.length; a++) {
                html += "<tr>"
                for (let key in rows[a]) {
                    if(key == "departement_id") continue;
                    html += '<td>' + rows[a][key] + '</td>';
                }
                html += "</tr>"
            }
            $('#staff-consultant-table tr').first().after(html);
            if ($('#staff-consultant-table tr').length <= 1) {
                $("#staff-consultant-result").text("No such Consultant");
                $("#staff-consultant-result").addClass("text-warning")
            }
        }
        // $('#staff-consultant-search-input').val("");
    });
}



function collectInterns(connection) {
    var inputdata = $('#staff-intern-search-input').val();
    query = 'SELECT Doctors.* FROM Doctors, Departments WHERE doctor_id = ? AND Doctors.department_id = Departments.department_id AND Departments.name = "Intern"';
    if (inputdata == ""){
        query = "SELECT Doctors.* FROM Doctors, Departments WHERE Doctors.department_id = Departments.department_id AND Departments.name = 'Intern'";
    }

    $("#staff-intern-result").text("");

    connection.query(query, inputdata, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
        } else {
            $('#staff-intern-table tr').not(':first').remove();
            var html = '';
            for (let a = 0; a < rows.length; a++) {
                html += "<tr>"
                for (let key in rows[a]) {
                    if(key == "departement_id") continue;
                    html += '<td>' + rows[a][key] + '</td>';
                }
                html += "</tr>"
            }
            $('#staff-intern-table tr').first().after(html);
            if ($('#staff-intern-table tr').length <= 1) {
                $("#staff-intern-result").text("No such Intern");
                $("#staff-intern-result").addClass("text-warning")
            }
        }
        // $('#staff-consultant-search-input').val("");
    });
}


function collectNurses(connection){
    var inputdata = $('#staff-nurse-search-input').val();
    query = 'SELECT Doctors.* FROM Doctors, Departments WHERE doctor_id = ? AND Doctors.department_id = Departments.department_id AND Departments.name = "Nurse"';
    if (inputdata == ""){
        query = "SELECT Doctors.* FROM Doctors, Departments WHERE Doctors.department_id = Departments.department_id AND Departments.name = 'Nurse'";
    }

    $("#staff-nurse-result").text("");

    connection.query(query, inputdata, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
        } else {
            $('#staff-nurse-table tr').not(':first').remove();
            var html = '';
            for (let a = 0; a < rows.length; a++) {
                html += "<tr>"
                for (let key in rows[a]) {
                    if(key == "departement_id") continue;
                    html += '<td>' + rows[a][key] + '</td>';
                }
                html += "</tr>"
            }
            $('#staff-nurse-table tr').first().after(html);
            if ($('#staff-nurse-table tr').length <= 1) {
                $("#staff-nurse-result").text("No such nurse");
                $("#staff-nurse-result").addClass("text-warning")
            }
        }
        // $('#staff-consultant-search-input').val("");
    });
}


$("#staff-nurse-submit").click(() => {
    connectHospitalMS(collectNurses);
});
connectHospitalMS(collectNurses);


$("#staff-intern-submit").click(() => {
    connectHospitalMS(collectInterns);
});
connectHospitalMS(collectInterns);

$("#staff-consultant-submit").click(() => {
    connectHospitalMS(collectConsultants);
});
connectHospitalMS(collectConsultants);