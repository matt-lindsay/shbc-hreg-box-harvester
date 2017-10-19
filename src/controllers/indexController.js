'Use Strict';

const indexController = function () {
    var getData = function (req, res) {
        var sql = require('mssql');
    
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
                if (err) console.log(err);
    
                // Send records as a response.
                res.send(recordset);
            });
        });
    };

    return {
        getData: getData
    };
};
module.exports = indexController;