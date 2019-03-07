const {
    print,
    connectHospitalMS
} = require("../../js/global");

function collectDoctorInfomation(connection) {
    var inputdata = $('#doctor-information-search-input').val();
    query = 'SELECT * FROM Doctors WHERE doctor_id = ?';
    if(inputdata == "") return;

    $("#doctor-information-result").text("");
    connection.query(query, inputdata, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
        } else {
            $('#doctor-information-table tr').not(':first').remove();
            var html = '';
            for (let key in rows[0]){
                html += '<tr><td>' + key +
                '</td><td>' + rows[0][key] + '</td></tr>';
            }
            $('#doctor-information-table tr').first().after(html);
            if($('#doctor-information-table tr').length <= 1){
                $("#doctor-information-result").text("No such doctor");
                $("#doctor-information-result").addClass("text-warning")
            }
        }
        $('#doctor-information-search-input').val("");
        
    });
}

$("#doctor-information-submit").click(() => {
    connectHospitalMS(collectDoctorInfomation);
});