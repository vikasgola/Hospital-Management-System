module.exports.connectHospitalMS = function (callFunction) {
    pool.getConnection((err, connection) => {
        callFunction(connection)
        if(err){
            console.log("Connection Error: ", err)
        }
        connection.release();
    });
}

module.exports.print = console.log