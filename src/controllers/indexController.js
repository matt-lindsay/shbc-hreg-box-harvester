'use strict';

var indexController = function () {

    var welcome = function (req, res) {
        res.status(200).send('SHBC Housing Services data harvester.');
    };

    return {
        welcome: welcome
    };
};
module.exports = indexController;