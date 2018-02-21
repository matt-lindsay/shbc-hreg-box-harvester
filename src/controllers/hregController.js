'use strict';

const fs = require('fs');
const BoxHRegService = require('../services/BoxHRegService');
//const boxClient = require('../resources/box');

var hregController = function(getDataService, client) {
    let moment = require('moment');
    let arrayDiffer = require('array-differ');

    var getData = function(req, res) {
        //let client = new boxClient();

        getDataService.getData(function(err, results) {
            if (err) {
              res.status(500).send(err);
            } else {
              let timestamp = moment().format('YYYY-MM-DD h:mm:ss a');
              // New data from H Reg database in JSON format.
              let newData = results.recordset;
              // Sort new data.
              let newSortedData = [];
              newData.forEach(function(item) {
                  newSortedData.push(item.HREG);
                });
              // Data from last program execution stored in JSON format.
              let storedData = JSON.parse(fs.readFileSync(
                  __dirname + '/../data/previousData.json'));
              // Comparison of new and stored JSON datasets.
              let differences = arrayDiffer(newSortedData, storedData);
              if (differences.length === 0) {
                console.log('>>> ' + timestamp + ' No New Data.');
                res.status(200).send(JSON.stringify('No new data.'));
              } else {
                // Box.
                var hregBox = new BoxHRegService(client);
                hregBox.createFolders(differences, function(err, result) {
                        if (err) {
                          res.status(500).send(err);
                        } else {
                          res.status(201).send(result);
                          // Overwrite previousData.json
                          fs.writeFileSync(__dirname + '/../data/previousData.json', JSON.stringify(
                              newSortedData), { encoding: 'utf-8' });
                        }
                      });
              }
            }
          });
      };

    return {
        getData: getData
      };
  };
module.exports = hregController;
