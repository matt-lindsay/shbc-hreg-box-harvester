const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
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
});

app.listen(port, function (err) {
    if (err) console.log(err);
    console.log('Server is running on port ' + port);
});