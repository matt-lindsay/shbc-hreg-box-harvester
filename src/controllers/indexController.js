'Use Strict';

const fs = require('fs');
const path = require('path');
const diff = require('deep-diff');

const indexController = function (getDataService) {
    var getData = function (req, res) {
        getDataService.getData(function (err, results) {
            if (err) res.status(500).send(err);

            // New data from H Reg database in JSON format.
            var newData = results.recordset;
            // Data from last program execution stored in JSON format.
            var storedData = JSON.parse(fs.readFileSync(__dirname + '/../data/previousData.json'));
            // Comparison of new and stored JSON datasets.
            var differences = diff(storedData.sort(), newData.sort());
            // Newly added JSON objects.
            var recordsToInsert = [];
            differences.forEach(function (item) {
                if (item.item) {//recordsToInsert.push(item);
                    if (item.item.kind === 'N') {
                        console.log(item);
                        recordsToInsert.push(item.item.rhs);
                    }
                }
            });

            res.send(differences);
        });
    };

    return {
        getData: getData
    };
};
module.exports = indexController;