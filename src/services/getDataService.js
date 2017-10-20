'Use Strict';

const sql = require('mssql');

var getDataService = function () {
    var getData = function (cb) {
        
        // Database config.
        var config = {
            user: process.env.dbusr,
            password: process.env.dbpass,
            server: process.env.dbsvr,
            database: process.env.db
        };
    
        // Connect to database.
        sql.connect(config, function (err) {
            if (err) console.log(err);
    
            // Create request object.
            var request = new sql.Request();
    
            // Query to the database and get the records.
            request.query(process.env.dbsql, function (err, recordset) {
                if (err) {
                    cb(err, null);
                    sql.close();
                }
    
                // Send records back to controller.
                cb(err, recordset);
                // Close the connection.
                sql.close();
            });
        });

        // Error handler.
        sql.on('error', function (err) {
            cb(err, null);
            sql.close();
        });
    };

    return {
        getData: getData
    };
};
module.exports = getDataService;    