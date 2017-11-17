'Use Strict';

const express = require('express');
const indexRouter = express.Router();

var router = function (client) {
    var getDataService = require('../services/getDataService')();
    var indexController = require('../controllers/indexController')(getDataService, client);

    indexRouter.route('/')
        .get(function (req, res) {
            res.send('Data harvester.');
        });

    indexRouter.route('/getData')
        .get(indexController.getData);

    indexRouter.route('/postTask')
        .post(indexController.postTask);
    
    return indexRouter;
};
module.exports = router;