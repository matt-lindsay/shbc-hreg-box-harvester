'use strict';

const BoxHTaskService = require('../services/BoxHTaskService');
//const boxClient = require('../resources/box');

var htaskController = function(client) {
    var postTask = function(req, res) {
        //let client = new boxClient();

        let data = req.body;

        // Box.
        var htaskBox = new BoxHTaskService(client);
        htaskBox.createTaskFolders(data, function(err, result) {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(201).send(result);
            }
          });
        // console.log(data); // DEBUG TASK SYSTEM OUTPUT TO CONSOLE.
        // res.status(200).send(data);
      };

    return {
        postTask: postTask
      };
  };
module.exports = htaskController;
