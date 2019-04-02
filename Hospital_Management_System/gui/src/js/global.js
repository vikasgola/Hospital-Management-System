module.exports.connectHospitalMS = function (callFunction) {
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