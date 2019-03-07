const {
    print,
    connectHospitalMS
} = require("../../js/global");

function registerPatient(connection) {
    var correct = true;
    var inputdata = [];
    var $inputs = $('#patient-registration :input');

    $inputs.each(function () {
        if (($(this).is(':radio') && !($(this).is(":checked"))) || $(this).is(':submit'))
            return;
        else {
            inputdata.push($(this).val());
            if (inputdata[inputdata.length - 1] == "" || !inputdata[inputdata.length - 1]) {
                $("#patient-registration-result").text("Wrong Input");
                $("#patient-registration-result").addClass("text-warning")
                correct = false;
            }
        }
    });

    if (!correct) return;

    query = "INSERT INTO Patients(name, address, email, mobileNumber, dob, gender) VALUES (?)";
    print(inputdata, inputdata.length)
    connection.query(query, [inputdata], function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
        } else {
            $("#patient-registration-result").text("Succesfully Registered");
            $("#patient-registration-result").addClass("text-info")
        }
    });
}


function collectPatientInfomation(connection) {
    var inputdata = $('#patient-information-search-input').val();
    query = 'SELECT * FROM Patients WHERE patient_id = ?';
    if (inputdata == "") {
        query = 'SELECT * FROM Patients';        
    }

    $("#patient-information-result").text("");

    connection.query(query, inputdata, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
        } else {
            $('#patient-information-table tr').not(':first').remove();
            var html = '';
            for (let a = 0; a < rows.length; a++) {
                html += "<tr>"
                for (let key in rows[a]) {
                    html += '<td>' + rows[a][key] + '</td>';
                }
                html += "</tr>"
            }
            $('#patient-information-table tr').first().after(html);
            if ($('#patient-information-table tr').length <= 1) {
                $("#patient-information-result").text("No such patient");
                $("#patient-information-result").addClass("text-warning")
            }
        }
        // $('#patient-information-search-input').val("");
    });
}

function collectPatientHistory(connection) {
    var inputdata = $('#patient-history-search').val();
    query = 'SELECT * FROM PatientHistory WHERE patient_id = ?';
    if (inputdata == "") {
        query = 'SELECT * FROM PatientHistory';        
    }

    $("#patient-history-result").text("");

    connection.query(query, inputdata, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
        } else {
            $('#patient-history-table tr').not(':first').remove();
            var html = '';
            for (let a = 0; a < rows.length; a++) {
                html += "<tr>"
                for (let key in rows[a]) {
                    html += '<td>' + rows[a][key] + '</td>';
                }
                html += "</tr>"
            }
            $('#patient-history-table tr').first().after(html);
            if ($('#patient-history-table tr').length <= 1) {
                $("#patient-history-result").text("No such patient");
                $("#patient-history-result").addClass("text-warning")
            }
        }
        // $('#patient-history-search').val("");
    });
}


$("#patient-registration").submit(() => {
    connectHospitalMS(registerPatient);
});

$("#patient-information-submit").click(() => {
    connectHospitalMS(collectPatientInfomation);
});
connectHospitalMS(collectPatientInfomation);


$("#patient-history-submit").click(() => {
    connectHospitalMS(collectPatientHistory);
});
connectHospitalMS(collectPatientHistory);
