'use strict';

const express = require('express');
const hregRouter = express.Router();

var router = function(client) {
    var getDataService = require('../services/getDataService')();
    var hregController = require('../controllers/hregController')(getDataService, client);

    hregRouter.route('/getData')
        .get(hregController.getData);

    return hregRouter;
  };
module.exports = router;
