'Use Strict';

const fs = require('fs');
const path = require('path');
const deepDiff = require('deep-diff');

const indexController = function (getDataService) {
    var getData = function (req, res) {
        getDataService.getData(function (err, results) {
            if (err) res.status(500).send(err);

            var newData = results.recordset;
            var previousData = JSON.parse(fs.readFileSync(__dirname + '/../data/previousData.json'));
            // returning an object, not json
            res.send(previousData);
        });
    };

    return {
        getData: getData
    };
};
module.exports = indexController;