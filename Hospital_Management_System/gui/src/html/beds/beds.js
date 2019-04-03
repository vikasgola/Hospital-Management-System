const {
    print,
    connectHospitalMS
} = require("../../js/global");

function collectBedInfomation(connection) {
    var inputdata = $('#bed-information-search-input').val();
    query = 'SELECT * FROM Beds WHERE bed_id = ?';
    if(inputdata == "") {
        query = 'SELECT * FROM Beds';        
    }

    $("#bed-information-result").text("");
    connection.query(query, inputdata, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
        } else {
            $('#bed-information-table tr').not(':first').remove();
            var html = '';
            for (let a = 0; a < rows.length; a++) {
                html += "<tr>"
                for (let key in rows[a]) {
                    if(key == "patient_id"){
                        if(rows[a][key] == null){
                            html += '<td><button class="btn btn-primary">Add</button></td>';
                        }else{
                            html += '<td>' + rows[a][key]+"<br>";
                            html += '<button class="btn btn-primary">Remove</button></td>';
                        }
                    }else{
                        html += '<td>' + rows[a][key] + '</td>';
                    }
                }
                html += "</tr>"
            }
            $('#bed-information-table tr').first().after(html);
            if($('#bed-information-table tr').length <= 1){
                $("#bed-information-result").text("No such doctor");
                $("#bed-information-result").addClass("text-warning")
            }
        }
        // $('#bed-information-search-input').val("");
        
    });
}


$("#bed-information-submit").click(() => {
    connectHospitalMS(collectBedInfomation);
});
connectHospitalMS(collectBedInfomation);