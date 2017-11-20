'Use Strict';

const express = require('express');
const indexRouter = express.Router();

var router = function (client) {
    var indexController = require('../controllers/indexController')(client);

    indexRouter.route('/')
        .get(function (req, res) {
            res.send('Housing Services data harvester.');
        });

    indexRouter.route('/postTask')
        .post(indexController.postTask);
    
    return indexRouter;
};
module.exports = router;