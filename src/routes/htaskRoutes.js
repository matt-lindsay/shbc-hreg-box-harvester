'use strict';

const express = require('express');
const htaskRouter = express.Router();

var router = function (client) {
    var htaskController = require('../controllers/htaskController')(client);

    htaskRouter.route('/postTask')
        .post(htaskController.postTask);

    return htaskRouter;
};
module.exports = router;