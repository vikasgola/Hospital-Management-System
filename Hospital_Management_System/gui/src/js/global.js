var connectHospitalMS = function (callFunction) {
    pool.getConnection((err, connection) => {
        if(err){
            console.log("Connection Error: ", err)
        }else{
            callFunction(connection);
        }
        connection.release();
    });
}

module.exports.print = console.log

var username = "admin";
var id = 0;

module.exports = {print: console.log, connectHospitalMS: connectHospitalMS, username: username, id:id};