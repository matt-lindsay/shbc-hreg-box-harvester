'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const app = express();
var port = process.env.PORT || 3000;
var boxClient = require('./box');

var box = new boxClient();

var indexRouter = require('./src/routes/indexRoutes')();
var hregRouter = require('./src/routes/hregRoutes')(box);
var htaskRouter = require('./src/routes/htaskRoutes')(box);
var yearDateFormat = 'YYYY';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', indexRouter);
app.use('/hreg', hregRouter);
app.use('/htask', htaskRouter);

app.locals.moment = moment;
app.locals.yearDateFormat = yearDateFormat;

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Server is running on port ' + port);   
    }
});