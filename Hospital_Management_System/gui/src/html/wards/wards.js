const {
    print,
    connectHospitalMS
} = require("../../js/global");


function wardInformation(connection) {
    
    query = 'SELECT * FROM Wards';
    connection.query(query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
        } else {
            $('#ward-information-table tr').not(':first').remove();
            var html = '';
            for (let a = 0; a < rows.length; a++) {
                html += "<tr>"
                for (let key in rows[a]) {
                    html += '<td>' + rows[a][key] + '</td>';
                }
                html += "</tr>"
            }
            $('#ward-information-table tr').first().after(html);
        }
    });
}


connectHospitalMS(wardInformation);