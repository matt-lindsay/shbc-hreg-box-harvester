const express = require('express');
const app = express();

app.get('/', function (req, res) {
    var sql = require('mssql');

    // Database config.
    var config = {
        user: '',
        password: '',
        server: '',
        database: ''
    };

    // Connect to database.
    sql.connect(config, function (err) {
        if (err) console.log(err);

        // Create request object.
        var request = new sql.request();

        // Query to the database and get the records.
        request.query('select * from table', function (err, recordset) {
            if (err) console.log(err);

            // Send records as a response.
            res.send(recordset);
        });
    });
});

var server = app.listen(process.env.PORT, function () {
    console.log('Server is running...');
});