'Use Strict';

const fs = require('fs');
const path = require('path');
const arrayDiffer = require('array-differ');

const indexController = function (getDataService) {
    var getData = function (req, res) {
        getDataService.getData(function (err, results) {
            if (err) res.status(500).send(err);

            // New data from H Reg database in JSON format.
            var newData = results.recordset;
            // Sort new data.
            var newSortedData = [];
            newData.forEach(function (item) {
                newSortedData.push(item.HREG);
            });
            // Data from last program execution stored in JSON format.
            var storedData = JSON.parse(fs.readFileSync(__dirname + '/../data/previousData.json'));
            // Comparison of new and stored JSON datasets.
            var differences = arrayDiffer(newSortedData, storedData);
      
            res.send(differences);
        });
    };

    return {
        getData: getData
    };
};
module.exports = indexController;