'use strict';

const express = require('express');
const htaskRouter = express.Router();

var router = function() {
    var htaskController = require('../controllers/htaskController')();

    htaskRouter.route('/postTask')
        .post(htaskController.postTask);

    return htaskRouter;
  };
module.exports = router;
