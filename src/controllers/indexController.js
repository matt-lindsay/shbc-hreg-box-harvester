'Use Strict';

const fs = require('fs');
const path = require('path');
const arrayDiffer = require('array-differ');
const BoxService = require('../services/BoxService');

var indexController = function (getDataService) {
    
    var getData = function (req, res) {
        getDataService.getData(function (err, results) {
            if (err) res.status(500).send(err);

            // New data from H Reg database in JSON format.
            let newData = results.recordset;
            // Sort new data.
            let newSortedData = [];
            newData.forEach(function (item) {
                newSortedData.push(item.HREG);
            });
            // Data from last program execution stored in JSON format.
            let storedData = JSON.parse(fs.readFileSync(__dirname + '/../data/previousData.json'));
            // Comparison of new and stored JSON datasets.
            let differences = arrayDiffer(newSortedData, storedData);
            if (differences.length == 0) {
                console.log('>>> No New Data.');
                res.status(200).send(JSON.stringify('No new data.'));
            } else {
                // Box.
                var box = new BoxService();
                box.createFolders(differences, function (err, result) {
                    res.status(201).send(result);
                    // Overwrite previousData.json
                    fs.writeFileSync(__dirname + '/../data/previousData.json', JSON.stringify(newSortedData), { encoding: 'utf-8' });
                });
            }
        });
    };

    return {
        getData: getData
    };
};
module.exports = indexController;