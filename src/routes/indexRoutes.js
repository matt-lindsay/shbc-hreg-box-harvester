'Use Strict';

const express = require('express');
const indexRouter = express.Router();

var router = function () {
    var indexController = require('../controllers/indexController')();

    indexRouter.route('/')
        .get(indexController.getData);
    return indexRouter;
};
module.exports = router;