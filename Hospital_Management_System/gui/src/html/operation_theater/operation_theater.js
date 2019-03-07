const {
    print,
    connectHospitalMS
} = require("../../js/global");

// TODO: uncompleted new table has to be created
// use id based search

function fillOperationTheater(connection) {

    query = 'SELECT * FROM OperationTheaters';
    connection.query(query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
        } else {
            $('#opth-information-table tr').not(':first').remove();
            var html = '';
            for (let a = 0; a < rows.length; a++) {
                html += "<tr>"
                for (let key in rows[a]) {
                    html += '<td>' + rows[a][key] + '</td>';
                }
                html += "</tr>"
            }
            $('#opth-information-table tr').first().after(html);
            // if ($('#opth-information-table tr').length <= 1) {
            //     $("#patient-history-result").text("No such patient");
            //     $("#patient-history-result").addClass("text-warning")
            // }
        }
    });
}


connectHospitalMS(fillOperationTheater);