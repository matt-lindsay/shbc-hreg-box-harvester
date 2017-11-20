'Use Strict';

const fs = require('fs');
const path = require('path');
const moment = require('moment');
const arrayDiffer = require('array-differ');
const BoxHTaskService = require('../services/BoxHTaskService');

var htaskController = function (client) {

    var postTask = function (req, res) {
        let data = req.body;

        // Box.
         var htaskBox = new BoxHTaskService(client);
        //  htaskBox.createTaskFolders(data, function (err, result) {
        //     if (err) res.status(500).send(err);
        //     res.status(201).send(result);
        //  });
        res.status(200).send(data);
    };

    return {
        postTask: postTask
    };
};
module.exports = htaskController;