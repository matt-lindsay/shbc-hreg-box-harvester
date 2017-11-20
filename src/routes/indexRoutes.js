'Use Strict';

const express = require('express');
const indexRouter = express.Router();

var router = function (client) {
    var indexController = require('../controllers/indexController')(client);

    indexRouter.route('/')
        .get(indexController.welcome);
    
    return indexRouter;
};
module.exports = router;