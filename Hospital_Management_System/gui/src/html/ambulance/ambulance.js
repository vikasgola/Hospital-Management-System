const {
    print,
    connectHospitalMS
} = require("../../js/global");

function collectAmbulanceInfomation(connection) {
    var inputdata = $('#ambulance-information-search-input').val();
    query = 'SELECT * FROM Ambulances WHERE ambulance_id = ?';
    if(inputdata == "") {
        query = 'SELECT * FROM Ambulances';
    }

    $("#ambulance-information-result").text("");
    connection.query(query, inputdata, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
        } else {
            $('#ambulance-information-table tr').not(':first').remove();
            var html = '';
            for (let a = 0; a < rows.length; a++) {
                html += "<tr>"
                for (let key in rows[a]) {
                    html += '<td>' + rows[a][key] + '</td>';
                }
                html += "</tr>"
            }
            $('#ambulance-information-table tr').first().after(html);
            if($('#ambulance-information-table tr').length <= 1){
                $("#ambulance-information-result").text("No such ambulance");
                $("#ambulance-information-result").addClass("text-warning")
            }
        }
        // $('#doctor-information-search-input').val("");
        
    });
}

$("#ambulance-information-submit").click(() => {
    connectHospitalMS(collectAmbulanceInfomation);
});
connectHospitalMS(collectAmbulanceInfomation);


function collectAvailableAmbulance(connection) {
    var inputdata = $('#ambulance-available-search-input').val();
    query = 'SELECT * FROM Ambulances WHERE ambulance_id = ? AND status = "available"';
    if(inputdata == "") {
        query = 'SELECT * FROM Ambulances WHERE status = "available"';
    }

    $("#ambulance-available-result").text("");
    connection.query(query, inputdata, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
        } else {
            $('#ambulance-available-table tr').not(':first').remove();
            var html = '';
            for (let a = 0; a < rows.length; a++) {
                html += "<tr>"
                for (let key in rows[a]) {
                    html += '<td>' + rows[a][key] + '</td>';
                }
                html += "</tr>"
            }
            $('#ambulance-available-table tr').first().after(html);
            if($('#ambulance-available-table tr').length <= 1){
                $("#ambulance-available-result").text("No such ambulance");
                $("#ambulance-available-result").addClass("text-warning")
            }
        }
        // $('#doctor-available-search-input').val("");
        
    });
}

$("#ambulance-available-submit").click(() => {
    connectHospitalMS(collectAvailableAmbulance);
});
connectHospitalMS(collectAvailableAmbulance);