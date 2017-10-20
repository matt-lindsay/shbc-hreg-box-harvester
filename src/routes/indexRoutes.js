'Use Strict';

const express = require('express');
const indexRouter = express.Router();

var router = function () {
    var getDataService = require('../services/getDataService')();
    var indexController = require('../controllers/indexController')(getDataService);

    indexRouter.route('/')
        .get(function (req, res) {
            res.send('Data harvester.');
        });

    indexRouter.route('/getData')
        .get(indexController.getData);
    
    return indexRouter;
};
module.exports = router;